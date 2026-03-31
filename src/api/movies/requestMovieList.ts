import supabase from "#/config/supabaseClientVite";

export const reuqestMovieList = async (movieRange: {
  from: number;
  to: number;
}) => {
  const { from, to } = movieRange;
  try {
    const response = await supabase.from("movies").select("*", {count: "exact"}).range(from, to);
    return response;
  } catch (error) {
    throw Error;
  }
};
