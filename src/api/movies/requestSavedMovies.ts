import supabase from "#/config/supabaseClientVite";
import { GenericError } from "#/utils/GenericError";
import { isAuthApiError } from "@supabase/supabase-js";

export const requestSavedMovies = async () => {
  const {
    data: {
      session: {
        user: { id: user_id },
      },
    },
  } = await supabase.auth.getSession();

  const response = await supabase
    .from("bookmarks")
    .select("movie_id")
    .eq("user_id", user_id);

  if (response.error) {
    if (isAuthApiError(response.error)) {
      throw response.error;
    } else {
      throw new GenericError();
    }
  }
  return response;
};
