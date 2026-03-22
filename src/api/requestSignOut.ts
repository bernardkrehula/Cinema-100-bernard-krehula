import supabase from "#/config/supabaseClientVite";

export const requestSingOut = async () => {
  try {
    const response = await supabase.auth.signOut();
    return response;
  } catch (error) {
    throw Error;
  }
};
