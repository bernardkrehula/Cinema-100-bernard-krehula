import supabase from "#/config/supabaseClientVite";
import { GenericError } from "#/utils/GenericError";
import { isAuthApiError } from "@supabase/supabase-js";

export const requestSingOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    if (isAuthApiError(error)) {
      return { success: false, error };
    } else {
      throw new GenericError();
    }
  }
  return { success: true };
};
