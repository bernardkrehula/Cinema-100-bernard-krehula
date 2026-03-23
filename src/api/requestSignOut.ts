import supabase from "#/config/supabaseClientVite";

export const requestSingOut = async () => {
  try {
    const response = await supabase.auth.signOut();
    console.log(response)
    if(response.error) return {succes: false}
    return {succes: true};
  } catch (error) {
    throw Error;
  }
};
