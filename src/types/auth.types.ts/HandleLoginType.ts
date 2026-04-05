import type { AuthError } from "@supabase/supabase-js";

export type HandleLoginType =
  | { success: boolean; error?: AuthError; data?: undefined }
  | { success: boolean; data: any; error?: undefined };