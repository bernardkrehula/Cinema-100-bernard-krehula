import supabase from "../config/supabaseClientNode.js";

const clearMovieTables = async () => {
  try {
    const { data } = await supabase
    .rpc("clear_movies_table") 
      
    return data;
  } catch (error) {
    console.log(error);
  }
};
export default clearMovieTables;