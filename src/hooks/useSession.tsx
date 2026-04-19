import supabase from "#/config/supabaseClientVite";
import { useState } from "react";

export const useSession = () => {
  const hanldeSession = async() => {
    supabase.auth.getSession();
  };
  const clearSession = () => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      subscription.unsubscribe();
    });
  };

  return { hanldeSession, clearSession };
};
