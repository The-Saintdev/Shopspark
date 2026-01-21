import { supabase } from '@/lib/supabase';

// Sign up a new user and create their profile
export async function signUp({
    email,
    password,
    firstName,
    lastName,
}: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name: firstName,
                last_name: lastName,
            }
        }
    });

    if (error) {
        throw error;
    }

    const user = data.user;
    if (!user) {
        throw new Error("User not found");
    }

    // Insert profile with column names matching the SQL schema
    const { error: profileError } = await supabase
        .from('profile')
        .insert({
            id: user.id,
            first_name: firstName,
            last_name: lastName,
            email,
        });

    if (profileError) {
        throw profileError;
    }

    return user;
}


// Sign in an existing user
export async function signIn({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw error;
    }

    return data.user;
}

// Sign out the current user
export async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw error;
    }
}

// Get current user session
export async function getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        throw error;
    }

    return user;
}

// Get current user profile
export async function getUserProfile(userId: string) {
    const { data, error } = await supabase
        .from('profile')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        throw error;
    }

    return data;
}