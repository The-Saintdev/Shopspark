import {supabase} from '@/lib/supabase';


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
}){
    const {data, error} = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name: firstName,
                last_name: lastName,
            }
        }
    });

    if(error){
        throw error;
    }

    const user = data.user;
    if (!user) {
        throw new Error("User not Found");
    }

    const {error: profileError} = await supabase
        .from('profile')
        .insert({
            id: user.id,
            first_name: firstName,
            last_name: lastName,
            email,
        });

        if(profileError){
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