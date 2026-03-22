import supabase from "#/config/supabaseClientVite";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext("");

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);



  useEffect(() => {
    supabase.auth.getSession().then(({data: {session} }) => {
        setSession(session);
    }) 
  })

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
