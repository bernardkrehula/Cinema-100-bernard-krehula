import supabase from "#/config/supabaseClientVite";
import { useEffect, useState } from "react";
import { useNavigate, type Session } from "react-router-dom";

export const useSession = () => {
    const [session, setSession] = useState<Session | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session);
        });
    
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session);
        });
    
        const clearSession = () => subscription.unsubscribe();
    
        return clearSession();
      }, []);
    
      useEffect(() => {
        if (session === null) return;
        navigate("/homepage");
      }, [session]);
}