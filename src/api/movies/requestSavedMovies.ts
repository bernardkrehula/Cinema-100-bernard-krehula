import supabase from "#/config/supabaseClientVite";
import type { FilteredMovies } from "#/types/movie.types.ts/FilteredMovies";
import { GenericError } from "#/utils/GenericError";
import { isAuthApiError } from "@supabase/supabase-js";

export const requestSavedMovies = async () => {
  const response = await supabase.from("bookmarks").select("id");

  if (response.error) {
    if (isAuthApiError(response.error)) {
      throw response.error;
    } else {
      throw new GenericError();
    }
  }
  return response;
};
