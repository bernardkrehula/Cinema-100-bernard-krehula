import { requestLogIn } from "#/api/auth/requestLogin";
import supabase from "#/config/supabaseClientVite";
import type { AuthContextType } from "#/types/auth.types.ts/AuthContextType";
import type { Session } from "@supabase/supabase-js";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  const DemoLogin = async (navigate: (path: string) => void) => {
    const inputValue = {
      email: "demo@demo.com",
      password: "demo1234",
    };
    const result = await requestLogIn(inputValue);
    if (result.success) return navigate("/homepage");
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, DemoLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
