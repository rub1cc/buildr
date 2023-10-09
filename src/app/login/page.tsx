"use client";
import { Button } from "@/components/ui/button";
import { Database } from "@/lib/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Page() {
  const supabase = createClientComponentClient<Database>();

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_BASE_URL + "/auth/callback",
      },
    });
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-neutral-950">
      <div className="w-full max-w-[350px] text-center">
        <p className="text-2xl text-neutral-400">Sign in to</p>
        <p className="text-5xl text-white">Snapvite.co</p>
        <p className="text-neutral-400 mt-4">
          Login to start creating invitations
        </p>
        <Button onClick={login} size="lg" className="w-full mt-8">
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="mr-2">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.12112 7.14231V9.20025H11.5931C11.4521 10.0836 10.5431 11.7877 8.12112 11.7877C6.03125 11.7877 4.3262 10.0912 4.3262 8.00022C4.3262 5.90951 6.03125 4.21296 8.12112 4.21296C9.30964 4.21296 10.1061 4.71012 10.5607 5.13841L12.2229 3.57031C11.1564 2.59105 9.77419 2 8.12202 2C4.73812 2 2 4.68355 2 8C2 11.3164 4.73812 14 8.12202 14C11.6544 14 14 11.5649 14 8.13798C14 7.74424 13.9571 7.44438 13.9042 7.14432L8.12202 7.14188L8.12112 7.14233V7.14231Z"
              fill="currentColor"
            ></path>
          </svg>
          Login with Google
        </Button>
      </div>
    </div>
  );
}
