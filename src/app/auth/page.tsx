"use client";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";
import { appEnv } from "@/lib/env";

const supabase = createClient(
  appEnv.client.NEXT_PUBLIC_SUPABASE_URL,
  appEnv.client.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const Page = () => (
  <div className="w-screen h-screen flex justify-center items-center">
    <div className="w-full max-w-[500px] shadow p-8 rounded-xl border border-gray-100">
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]}/>
    </div>
  </div>
);

export default Page;
