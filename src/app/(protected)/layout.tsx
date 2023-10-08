import { Database } from "@/lib/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const res = await supabase.auth.getUser();

  if (!res.data.user) {
    redirect("/login");
  }

  return children;
}
