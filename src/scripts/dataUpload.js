import dataJs from "../data/dataJs.js";
import supabase from "../config/supabaseClientNode.js";
import clearMovieTables from "./clearMoviesTable.js";

const uploadData = async () => {
  await clearMovieTables();
  try {
    const { data } = await supabase
    .from("movies")
    .insert(dataJs)
    .select()   
    return data
  } catch (error) {
    console.log(error);
  }
};
uploadData();
