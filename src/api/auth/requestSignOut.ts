import supabase from "#/config/supabaseClientVite";

export const requestSingOut = async () => {
  try {
    const response = await supabase.auth.signOut();
    if(response.error) return {success: false}
    return {success: true};
  } catch (error) {
    throw Error;
  }
};
