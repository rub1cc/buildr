"use client";
import { Database } from "@/lib/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { cloneElement } from "react";

export const LogoutButton = ({ children }) => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const onClick = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return cloneElement(children, { onClick });
};
