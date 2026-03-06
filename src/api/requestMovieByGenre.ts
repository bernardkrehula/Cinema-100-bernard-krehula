import supabase from "#/config/supabaseClientVite";

export const reuqestMovieByGenre = async (movieGenre: string) => {
  try {
    const { data, error } = await supabase
    .from("movies")
    .select()
    .or(`genre.cs.["${movieGenre}"]`);
    console.log(data, error)
    return data;
  } catch (error) {
    throw Error;
  }
};
