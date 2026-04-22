import supabase from "#/config/supabaseClientVite";
import { GenericError } from "#/utils/GenericError";
import { isAuthApiError } from "@supabase/supabase-js";

export const requestSaveBookmarkMovie = async (movie_id: string) => {
  const {
    data: {
      session: {
        user: { id: user_id },
      },
    },
  } = await supabase.auth.getSession();

  let query = await supabase
    .from("bookmarks")
    .select("movie_id, user_id")
    .match({ movie_id: movie_id, user_id: user_id });

  if (query.data.length != 0) return;

  const { data, error } = await supabase
    .from("bookmarks")
    .insert([{ id: crypto.randomUUID(), movie_id, user_id }]);

  if (error) {
    if (isAuthApiError(error)) {
      return { success: false, error };
    } else {
      throw new GenericError();
    }
  }
  return { data, error };
};
