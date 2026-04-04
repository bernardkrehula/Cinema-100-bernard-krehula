import type { AuthDataType } from "#/types/auth.types.ts/AuthDataType";
import type { CredentialsType } from "#/types/auth.types.ts/CredentialsType";
import { GenericError } from "#/utils/GenericError";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as v from "valibot";


type UseAuthType = {
  handler: () => void;
  authScheme: () => void;
};

export const useAuth = (handler, authScheme) => {
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<AuthDataType>({
    success: false,
    data: {
      user: null,
      session: null,
    },
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const testAuth = () => {
    const result = handler
    console.log(result())
  }
  
  const handleAuthentication = async () => {
    setLoading(true);
    try {
      const result = await handler();
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
    clearErorrs(); 
  };
  const clearErorrs = () => {
    setTimeout(() => {
      setError("");
    }, 5000);
  };
  

  return { data, error, isLoading };
};
