import supabase from "#/config/supabaseClientVite";

type LoginType = {
    email: string;
    password: string;
}

export const requestLogIn = async(inputValue: LoginType) => {
    const { email, password } = inputValue;

    try{
        const response = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        console.log(response)
        return response;
    }
    catch(error){
        throw Error
    }
}