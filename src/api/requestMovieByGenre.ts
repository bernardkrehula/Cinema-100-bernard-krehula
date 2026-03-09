import supabase from "#/config/supabaseClientVite";

export const reuqestMovieByGenre = async (
  movieGenre: string,
  movieRange: {
    from: number;
    to: number;
  },
) => {
  const { from, to } = movieRange;
  try {
    const { data } = await supabase
      .from("movies")
      .select()
      .or(`genre.cs.["${movieGenre}"]`)
      .range(from, to);
      console.log(data)
    return data;
  } catch (error) {
    throw Error;
  }
};
