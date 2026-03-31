import type { Session } from "react-router-dom";

export type AuthContextType = {
  session: Session | null | undefined;
  DemoLogin: (navigate: (path: string) => void) => void;
};
