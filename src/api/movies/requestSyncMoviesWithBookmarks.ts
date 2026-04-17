import supabase from "#/config/supabaseClientVite";
import type { MovieIconType } from "#/types/movie.types.ts/MovieIconType";
import { requestSyncSavedMovies } from "./reqeustSyncSavedMovies";

export const requestSyncMoviesWithBookmarks = async () => {
  const {
    data: {
      session: {
        user: { id: user_id },
      },
    },
  } = await supabase.auth.getSession();

  const { data: bookmarks, error } = await supabase
    .from("bookmarks")
    .select("id, isSaved")
    .eq("user_id", user_id);

  await Promise.all(
    bookmarks.map((moive) => {
      const { id, isSaved } = moive;
      return requestSyncSavedMovies(id, isSaved);
    }),
  );
  if (error) {
    throw new Error(error.message);
  }
  return;
};
