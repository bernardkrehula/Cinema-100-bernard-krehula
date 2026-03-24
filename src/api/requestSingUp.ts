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
    if (error) return { success: false, error };
    return { success: true, data };
  } catch (error) {
    throw Error;
  }
};
