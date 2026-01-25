import dataJs from "../data/dataJs.ts";
import supabase from "#/config/supabaseClientNode";

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
