import { requestLogIn } from "#/api/auth/requestLogin";
import { requestSignUp } from "#/api/auth/requestSingUp";
import supabase from "#/config/supabaseClientVite";
import type { AuthDataType } from "#/types/auth.types.ts/AuthDataType";
import type { CredentialsType } from "#/types/auth.types.ts/CredentialsType";
import { GenericError } from "#/utils/GenericError";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import * as v from "valibot";

export const useAuth = () => {
  const [error, setError] = useState<string>();
  const [data, setData] = useState<AuthDataType>({
    success: false,
    data: {
      user: null,
      session: null,
    },
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  const DemoLogin = async () => {
    const inputValue = {
      email: "demo@demo.com",
      password: "demo1234",
    };
    const result = await requestLogIn(inputValue);
    if(result.success) return navigate('/homepage');
  };
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: {subscription}} = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    const clearSession = () => subscription.unsubscribe();

    return clearSession();
  }, []);

  useEffect(() => {
    if (session === null) return
    navigate("/homepage");
  }, [session]);

  const LocalErrorValidator = (inputValue: CredentialsType) => {
    const LoginScheme = v.object({
      email: v.pipe(
        v.string("Your email must be a string."),
        v.nonEmpty("Please enter your email."),
        v.email("The email address is badly formatted."),
      ),
      password: v.pipe(
        v.string("Your password must be a string."),
        v.nonEmpty("Please enter your password."),
        v.minLength(8, "Your password must have 8 characters or more."),
      ),
    });
    const response = v.parse(LoginScheme, inputValue);
    return response;
  };
  const handleAuthentication = async (
    inputValue: CredentialsType,
    name: string,
  ) => {
    setLoading(true);
    try {
      LocalErrorValidator(inputValue);
      const result =
        name != "login"
          ? await requestSignUp(inputValue)
          : await requestLogIn(inputValue);
      if (result.success) {
        setData(result as AuthDataType);
        navigate("/homepage");
      } else if (!result.success) {
        console.log(result);
        setError(result.error?.message);
      }
    } catch (error: unknown) {
      if (error instanceof v.ValiError) {
        setError(error.message);
      } else if (error instanceof GenericError) {
        console.error("GenericError caught:", error);
      } else {
        console.error("Unknown error:", error);
      }
    }
    setLoading(false);
    cleanErorrs();
  };
  const cleanErorrs = () => {
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  return { data, error, isLoading, handleAuthentication, DemoLogin };
};
