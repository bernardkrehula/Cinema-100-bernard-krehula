import supabase from "#/config/supabaseClientVite";

export const requestMoviesReset = async () => {
  const { data: movies } = await supabase
    .from("movies")
    .update({ isSaved: false })
    .eq("isSaved", true);

  const { data: trending_movies } = await supabase
    .from("trending_movies")
    .update({ isSaved: false })
    .eq("isSaved", true);

    return { movies, trending_movies };
};
