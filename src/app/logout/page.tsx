"use client";
import { Database } from "@/lib/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const logout = async () => {
      const supabase = createClientComponentClient<Database>();
      await supabase.auth.signOut();
      router.replace("/login");
    };
    logout();
  }, []);

  return null;
}
