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
    const response = await supabase
      .from("movies")
      .select("*", { count: "exact" })
      .or(`genre.cs.["${movieGenre}"]`)
      .range(from, to);
    return response;
  } catch (error) {
    throw Error;
  }
};
