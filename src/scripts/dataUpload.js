import dataJs from "../data/dataJs.js";
import supabase from "../config/supabaseClientNode.js";

const uploadData = async () => {
  try {
    const { data, error } = await supabase
    .from("movies")
    .insert(dataJs)
    .select()

    
    console.log('radi', data, error)
  } catch (error) {
    console.log(error);
  }
};
uploadData();
