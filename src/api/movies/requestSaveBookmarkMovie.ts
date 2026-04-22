import supabase from "#/config/supabaseClientVite";
import { GenericError } from "#/utils/GenericError";
import { isAuthApiError } from "@supabase/supabase-js";

export const requestSaveBookmarkMovie = async (id: string) => {
  const {
    data: {
      session: {
        user: { id: user_id },
      },
    },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("bookmarks")
    .insert([{ id, user_id }]);

  if (error) {
    if (isAuthApiError(error)) {
      return { success: false, error };
    } else {
      throw new GenericError();
    }
  }
  return { data, error };
};
