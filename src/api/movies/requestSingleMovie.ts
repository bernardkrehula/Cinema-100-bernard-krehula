import supabase from "#/config/supabaseClientVite";
import { GenericError } from "#/utils/GenericError";
import { isAuthApiError } from "@supabase/supabase-js";

export const requestSingleMovie = async (id: string | undefined) => {
  const response = await supabase.from("movies").select().eq("id", id).single();

  if (response.error) {
    if (isAuthApiError(response)) {
      return response.error;
    } else {
      throw new GenericError();
    }
  }
};
