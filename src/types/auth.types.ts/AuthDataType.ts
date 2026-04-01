import type { AuthError, User } from "@supabase/supabase-js";
import type { Session } from "react-router-dom";

export type AuthDataType = {
    success: boolean;
    error: AuthError;
    data?: undefined;
} | {
    success: boolean;
    data: {
        user: User | null;
        session: Session | null;
    };
    error?: undefined;
}