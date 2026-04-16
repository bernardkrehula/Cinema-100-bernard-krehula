import supabase from "#/config/supabaseClientVite";

export const requestSyncSavedMovies = async (id: string, isSaved: boolean) => {
  await supabase
    .from("movies")
    .update({ isSaved: isSaved })
    .eq("id", id)
    .select();

  await supabase
    .from("trending_movies")
    .update({ isSaved: isSaved })
    .eq("id", id);

  return;
};
