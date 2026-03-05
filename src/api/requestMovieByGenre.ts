import supabase from "#/config/supabaseClientVite";

export const reuqestMovieByGenre = async (movieGenre: string) => {
  try {
    const { data } = await supabase.from("movies").select().eq("genre", movieGenre);
    return data;
  } catch (error) {
    throw Error;
  }
};
