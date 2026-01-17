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
        .from('profiles')
        .insert({
            id: user.id,
            firstName,
            lastName,
            email,
        });

        if(profileError){
            throw profileError;
        }
        return user;
}