"use client";
import { Button } from "@/components/ui/button";
import { generateSlug } from "@/lib/generate-slug";
import { Database } from "@/lib/types/supabase";
import { PlusIcon } from "@radix-ui/react-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const CreateInvitationButton = ({ user }: { user: User }) => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const createInvitation = async () => {
    const newData: Database["public"]["Tables"]["invitations"]["Insert"] = {
      title: "Untitled",
      slug: generateSlug(),
      data: [
        {
          title: "Story-" + new Date().getTime(),
          content: [],
        },
      ],
      user_id: user.id,
    };
    const res = await supabase
      .from("invitations")
      .insert([newData])
      .select("id");
    if (res.error) return Promise.reject(res.error);
    router.refresh();
    router.push(`/editor/${res.data[0].id}`);
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() =>
        toast.promise(createInvitation, {
          loading: "Creating new invitation...",
          success: "Invitation created!",
          error: "Failed to create invitation",
        })
      }
    >
      <PlusIcon className="w-4 h-4 mr-2" />
      Create
    </Button>
  );
};
