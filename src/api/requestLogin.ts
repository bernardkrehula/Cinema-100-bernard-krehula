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
        
        if(error) return {success: false, error};
        return {success: true, data};
    }
    catch(error: unknown){
        //Odraditi customClassu generic error 
        const genericError = error
        error.isCustom = true
        throw genericError
    }
}