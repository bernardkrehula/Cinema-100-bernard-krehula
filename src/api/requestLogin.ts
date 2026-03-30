import supabase from "#/config/supabaseClientVite";
import { GenericError } from "#/helpers/GenericError";

type LoginType = {
  email: string;
  password: string;
};

export const requestLogIn = async (inputValue: LoginType) => {
  const { email, password } = inputValue;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) return { success: false, error };
    return { success: true, data };
  } catch (error: unknown) {
    throw new GenericError(error);
  }
};
