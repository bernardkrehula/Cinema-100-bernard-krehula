import type { StateType } from "./StateType";

export type ActionType =
  | { type: "setData"; reducerAction: StateType["data"] }
  | { type: "setError"; reducerAction: string }
  | { type: "setLoading"; reducerAction: boolean };
