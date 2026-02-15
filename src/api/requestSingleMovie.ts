import supabase from "#/config/supabaseClientVite";

export const requestSingleMovie = async (id: string) => {
  try {
    const response = await supabase
    .from("movies")
    .select()
    .eq('id', id)

    return response.data;
  } catch (error) {
    throw Error
  }
};
