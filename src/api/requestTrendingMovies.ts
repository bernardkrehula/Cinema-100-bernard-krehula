import supabase from "../config/supabaseClientVite";

export const requestTrendingMovies = async () => {
  try {
    const response = await supabase
    .from("trending_movies")
    .select();

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
