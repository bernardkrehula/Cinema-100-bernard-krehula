import dataJs from "../data/dataJs.js";
import supabase from "../config/supabaseClientNode.js";

const getRandomMovies = () => {
  const randomMovies = [...dataJs].sort(() => 0.5 - Math.random());
  return randomMovies.slice(0, 20);
}

const trendingMoviesUpload = async () => {
    const trendingMovies = getRandomMovies();
    try {
    const { data, error } = await supabase
    .from("trending_movies")
    .insert(trendingMovies)
    .select()   
    console.log(data, error)
    return data;
    } catch (error) {
    console.log(error);
    }
};
trendingMoviesUpload();