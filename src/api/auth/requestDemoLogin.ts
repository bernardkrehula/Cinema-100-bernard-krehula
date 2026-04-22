import supabase from "#/config/supabaseClientVite";
import { GenericError } from "#/utils/GenericError";
import { isAuthApiError } from "@supabase/supabase-js";

export const requestDemoLogin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "demo@demo.com",
    password: "demo1234",
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
