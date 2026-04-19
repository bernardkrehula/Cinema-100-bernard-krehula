import supabase from "#/config/supabaseClientVite";
import type { MovieIconType } from "#/types/movie.types.ts/MovieIconType";
import { GenericError } from "#/utils/GenericError";
import { isAuthApiError } from "@supabase/supabase-js";

export const requestSaveBookmarkMovie = async (movie: MovieIconType) => {
  const {
    data: {
      session: {
        user: { id: user_id },
      },
    },
  } = await supabase.auth.getSession();

  const newMovie = {...movie, isSaved: true}

  const { data, error } = await supabase
    .from("bookmarks")
    .insert([{ user_id, ...newMovie}]);
            console.log('ova funkcija se pokrece')

  if (error) {
    if (isAuthApiError(error)) {
      return { success: false, error };
    } else {
      throw new GenericError();
    }
  }
  return { data, error };
};
