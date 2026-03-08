import supabase from "#/config/supabaseClientVite";

export const reuqestMovieByGenre = async (movieGenre: string) => {
  try {
    const { data } = await supabase
    .from("movies")
    .select()
    .or(`genre.cs.["${movieGenre}"]`);
    return data;
  } catch (error) {
    throw Error;
  }
};
