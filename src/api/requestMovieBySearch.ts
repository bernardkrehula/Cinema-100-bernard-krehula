import supabase from "#/config/supabaseClientVite";

export const requestMovieBySearch = async (value: string) => {
  try {
    const response = await supabase
      .from("movies")
      .select("*")
      .ilike('title', `%${value}%`)
    return response;
  } catch (error) {
    throw Error;
  }
};
