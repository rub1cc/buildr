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
        <Button onClick={login} size="lg" className="w-full mt-6">
          Login
        </Button>
      </div>
    </div>
  );
}
