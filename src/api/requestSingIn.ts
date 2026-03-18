import supabase from "#/config/supabaseClientVite";

type SingInType = {
    email: string;
    password: string;
}

export const requestSignIn = async(inputValue: SingInType) => {
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