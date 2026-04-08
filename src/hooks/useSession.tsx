import supabase from "#/config/supabaseClientVite";
import type { Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

export const useSession = () => {
  const navigate = useNavigate();

  const hanldeSession = () => {
    const checkSesion = (session: Session | null) => {
      if (!session) navigate("/login");
      else navigate("/homepage");
    };
    supabase.auth.getSession().then(({ data: { session } }) => {
      checkSesion(session);
    });
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
