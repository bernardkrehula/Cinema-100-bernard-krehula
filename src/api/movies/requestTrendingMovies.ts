import supabase from "#/config/supabaseClientVite";
import { requestSyncMoviesWithBookmarks } from "./requestSyncMoviesWithBookmarks";

export const requestTrendingMovies = async () => {
  const response = await supabase
    .from("trending_movies")
    .select()
    .order("id", { ascending: true });

  if (response.error) {
    throw new Error(response.error.message);
  }
  return response;
};
