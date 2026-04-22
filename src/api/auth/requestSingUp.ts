import supabase from "#/config/supabaseClientVite";
import type { CredentialsType } from "#/types/auth.types.ts/CredentialsType";
import { GenericError } from "#/utils/GenericError";
import { isAuthApiError } from "@supabase/supabase-js";

export const requestSignUp = async (inputValue: CredentialsType) => {
  const { email, password } = inputValue;
  const { data, error } = await supabase.auth.signUp({
    email: email as string,
    password: password as string,
  });
  if (error) {
    if (isAuthApiError(error)) {
      return { success: false, error };
    } else {
      throw new GenericError();
    }
  }
  return { success: true, data };
};
