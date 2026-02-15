import supabase from "#/config/supabaseClientVite";

export const requestMovies = async () => {
  try {
    const response = await supabase
    .from("movies")
    .select();

    return response.data;
  } catch (error) {
    throw Error
  }
};
