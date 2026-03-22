import supabase from "#/config/supabaseClientVite";

type LoginType = {
    email: string;
    password: string;
}

export const requestLogIn = async(inputValue: LoginType) => {
    const { email, password } = inputValue;

    try{
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        
        if(error) return {succes: false, error};
        return {sucess: true, data};
    }
    catch(error){
        throw Error
    }
}