import supabase from "#/config/supabaseClientVite";

type SingInType = {
    email: string;
    password: string;
}

export const requestSignUp = async(inputValue: SingInType) => {
    const { email, password } = inputValue;

    try{
        const response = await supabase.auth.signUp({
            email: email,
            password: password
        })
        const newSession = await supabase.auth.getUser()
        console.log("response: ", response, "session: ", newSession)
        return response;
    }
    catch(error){
        throw Error
    }
}