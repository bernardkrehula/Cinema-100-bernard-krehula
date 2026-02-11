import supabase from "../config/supabaseClientVite";
//Baciti error umjesto samo console.log
export const requestMovies = async () => {
  try {
    const response = await supabase
    .from("movies")
    .select();

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
