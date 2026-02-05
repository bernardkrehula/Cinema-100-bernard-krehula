import supabase from "../config/supabaseClientVite";

export const requestMovies = async () => {
  try {
    const response = await supabase
    .from("movies")
    .select();

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
