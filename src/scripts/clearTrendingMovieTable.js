import supabase from "../config/supabaseClientNode.js";

const clearTrendingMovieTables = async () => {
  try {
    const { data } = await supabase
    .rpc("clear_trending_movies_table") 
      
    return data;
  } catch (error) {
    console.log(error);
  }
};
export default clearTrendingMovieTables;