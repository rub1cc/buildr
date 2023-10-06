"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const logout = async () => {
      const supabase = createClientComponentClient();
      await supabase.auth.signOut();
      router.replace("/login");
    };
    logout();
  }, []);

  return null;
}
