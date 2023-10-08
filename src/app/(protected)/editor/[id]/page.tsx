import { Editor } from "@/components/editor";
import { Database } from "@/lib/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const res = await supabase
    .from("invitations")
    .select("*")
    .eq("id", params.id);

  if (res.error) {
    notFound();
  }

  return <Editor {...res.data[0]} />;
}
