import supabase from "#/config/supabaseClientVite";
import { requestSyncSavedMovies } from "./reqeustSyncSavedMovies";

export const requestRemoveBookmarkMovie = async (id: string) => {
  const {
    data: {
      session: {
        user: { id: user_id },
      },
    },
  } = await supabase.auth.getSession();
  const { data, error } = await supabase
    .from("bookmarks")
    .delete()
    .match({ user_id: user_id, id: id })

  await requestSyncSavedMovies(id, false);

  if (error) {
    throw new Error(error.message);
  }

  return;
};
