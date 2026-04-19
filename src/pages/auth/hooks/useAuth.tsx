import type { CredentialsType } from "#/types/auth.types.ts/CredentialsType";
import { GenericError } from "#/utils/GenericError";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import * as v from "valibot";
import type { LoginScheme } from "../Forms/LoginForm";
import type { StateType } from "#/types/auth.types.ts/StateType";
import type { ActionType } from "#/types/auth.types.ts/ActionType";
import { defaultUser } from "#/data/defaultUser";

const reducer = (state: StateType, action?: ActionType) => {
  const { type, reducerAction } = action;
  switch (type) {
    case "setData": {
      return {
        ...state,
        data: reducerAction,
      };
    }
    case "setError": {
      return {
        ...state,
        error: reducerAction,
      };
    }
    case "setLoading": {
      return {
        ...state,
        isLoading: reducerAction,
      };
    }
    default:
      return state;
  }
};
type HandlerType = (value?: CredentialsType) => Promise<any>;

export const useAuth = (
  handler: HandlerType,
  authScheme?: typeof LoginScheme,
) => {
  const initaialValue = {
    success: false,
    data: {
      user: defaultUser,
      session: {
        access_token: "",
        token_type: "",
        expires_in: 0,
        expires_at: 0,
        refresh_token: "",
        user: defaultUser,
        weak_password: null,
      },
    },
    error: "",
    isLoading: false,
  };
  const [state, dispatch] = useReducer(reducer, initaialValue);
  const navigate = useNavigate();
  const LocalErrorValidator = (credentials: CredentialsType) => {
    const response = v.parse(authScheme, credentials);
    return response;
  };
  const { data, error, isLoading } = state;

  const handleReducer = (type: ActionType["type"], reducerAction: any) => {
    dispatch({
      type: type,
      reducerAction: reducerAction,
    });
  };

  const clearErorrs = () => {
    setTimeout(() => {
      handleReducer("setError", "");
    }, 5000);
  };

  const handleAuth = async (credentials: CredentialsType | null) => {
    handleReducer("setLoading", true);
    try {
      if(credentials != null) LocalErrorValidator(credentials);
      const result = await handler(credentials);

      if (result.success) {
        handleReducer("setData", result);
        navigate("/homepage");
      } else if (!result.success) {
        handleReducer("setError", result.error.message);
      }
    } catch (error: unknown) {
      if (error instanceof v.ValiError) {
        handleReducer("setError", error.message);
      } else if (error instanceof GenericError) {
        console.error("GenericError caught:", error);
      } else {
        console.error("Unknown error:", error);
      }
    }
    handleReducer("setLoading", false);
    clearErorrs();
  };

  return { data, error, isLoading, handleAuth };
};
