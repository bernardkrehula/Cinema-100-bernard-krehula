import supabase from "#/config/supabaseClientVite";
import type { MovieIconType } from "#/types/movie.types.ts/MovieIconType";
import { GenericError } from "#/utils/GenericError";
import { isAuthApiError } from "@supabase/supabase-js";
import { requestSyncSavedMovies } from "./reqeustSyncSavedMovies";

export const requestSaveBookmarkMovie = async (movie: MovieIconType) => {
  const {
    data: {
      session: {
        user: { id: user_id },
      },
    },
  } = await supabase.auth.getSession();
  const { id } = movie;
  const newMovie = {...movie, isSaved: true}

  const { data, error } = await supabase
    .from("bookmarks")
    .insert([{ user_id, ...newMovie}]);

  await requestSyncSavedMovies(id, true);
  if (error) {
    if (isAuthApiError(error)) {
      return { success: false, error };
    } else {
      throw new GenericError();
    }
  }
  return { data, error };
};
