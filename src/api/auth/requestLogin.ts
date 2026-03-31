import supabase from "#/config/supabaseClientVite";
import type { CredentialsType } from "#/types/auth.types.ts/CredentialsType";
import { GenericError } from "#/utils/GenericError";

export const requestLogIn = async (inputValue: CredentialsType) => {
  const { email, password } = inputValue;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) return { success: false, error };
    return { success: true, data };
  } catch (error) {
    throw new GenericError(error);
  }
};
