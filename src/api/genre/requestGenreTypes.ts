import supabase from "#/config/supabaseClientVite";

export const requestGenreTypes = async () => {
  try {
    const { data } = await supabase
    .from("movies")
    .select("genre")
    return data;
  } catch (error) {
    throw Error
  }
};
