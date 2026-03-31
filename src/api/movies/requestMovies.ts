import supabase from "#/config/supabaseClientVite";

export const requestMovies = async () => {
  try {
    const { data } = await supabase
    .from("movies")
    .select("length")

    return data;
  } catch (error) {
    throw Error
  }
};
