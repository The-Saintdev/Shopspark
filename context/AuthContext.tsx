import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// Profile type matching the database schema
export interface UserProfile {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    sex?: "Male" | "Female" | "Others" | null;
    phone_number?: string | null;
    address?: string | null;
    country?: string | null;
    state?: string | null;
    avatar_url?: string | null;
    created_at?: string;
    updated_at?: string;
}

interface AuthContextType {
    user: User | null;
    profile: UserProfile | null;
    loading: boolean;
    signOut: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Fetch user profile from the profile table
    const fetchProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from("profile")
                .select("*")
                .eq("id", userId)
                .single();

            if (error) {
                console.error("Error fetching profile:", error.message);
                return null;
            }

            return data as UserProfile;
        } catch (error) {
            console.error("Error fetching profile:", error);
            return null;
        }
    };

    // Refresh the user profile
    const refreshProfile = async () => {
        if (user) {
            const userProfile = await fetchProfile(user.id);
            setProfile(userProfile);
        }
    };

    // Sign out the user
    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            setUser(null);
            setProfile(null);
            router.replace("/auth/login");
        } catch (error) {
            console.error("Error signing out:", error);
            throw error;
        }
    };

    // Initialize auth state
    useEffect(() => {
        // Get initial session
        const initializeAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (session?.user) {
                    setUser(session.user);
                    const userProfile = await fetchProfile(session.user.id);
                    setProfile(userProfile);
                }
            } catch (error) {
                console.error("Error initializing auth:", error);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === "SIGNED_IN" && session?.user) {
                    setUser(session.user);
                    const userProfile = await fetchProfile(session.user.id);
                    setProfile(userProfile);
                } else if (event === "SIGNED_OUT") {
                    setUser(null);
                    setProfile(null);
                }
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                profile,
                loading,
                signOut: handleSignOut,
                refreshProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
