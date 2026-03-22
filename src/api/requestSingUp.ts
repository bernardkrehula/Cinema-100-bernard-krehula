import supabase from "#/config/supabaseClientVite";

type SingInType = {
  email: string;
  password: string;
};

export const requestSignUp = async (inputValue: SingInType) => {
  const { email, password } = inputValue;

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    console.log(error)
    if (error) return { succes: false, error };
    return { succes: true, data };
  } catch (error) {
    throw Error;
  }
};
