import supabase from "#/config/supabaseClientVite";
import { GenericError } from "#/utils/GenericError";
import { isAuthApiError } from "@supabase/supabase-js";

export const requestTrendingMovies = async () => {
  const response = await supabase
    .from("trending_movies")
    .select()
    .order("id", { ascending: true });

  if (response.error) {
    if (isAuthApiError(response)) {
      return response.error;
    } else {
      throw new GenericError();
    }
  }
  return response;
};
