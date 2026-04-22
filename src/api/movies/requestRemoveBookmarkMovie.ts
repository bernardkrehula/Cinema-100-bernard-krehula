import supabase from "#/config/supabaseClientVite";
import { GenericError } from "#/utils/GenericError";
import { isAuthApiError } from "@supabase/supabase-js";

export const requestRemoveBookmarkMovie = async (movie_id: string) => {
  const {
    data: {
      session: {
        user: { id: user_id },
      },
    },
  } = await supabase.auth.getSession();
  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .match({ user_id: user_id, movie_id: movie_id });

  if (error) {
    if (isAuthApiError(error)) {
      return error;
    } else {
      throw new GenericError();
    }
  }

  return;
};
