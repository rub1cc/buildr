import { createClient } from "@supabase/supabase-js";
import { appEnv } from "./env";

export const supabase = createClient(
  appEnv.client.NEXT_PUBLIC_SUPABASE_URL,
  appEnv.client.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
