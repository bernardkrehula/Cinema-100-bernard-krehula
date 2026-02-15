import supabase from "#/config/supabaseClientVite";

export const requestSingleMovie = async (id: string | undefined) => {
  try {
    const response = await supabase
    .from("movies")
    .select()
    .eq('id', id)
    .single()

    return response.data;
  } catch (error) {
    throw Error
  }
};
