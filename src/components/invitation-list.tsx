"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Database } from "@/lib/types/supabase";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const InvitationList = ({
  invitations,
}: {
  invitations: Database["public"]["Tables"]["invitations"]["Row"][];
}) => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const onDelete = async (id: string) => {
    const res = await supabase.from("invitations").delete().eq("id", id);
    if (res.error) return Promise.reject(res.error);
    router.refresh();
    return Promise.resolve();
  };

  const onView = async (id) => {
    await supabase
      .from("invitations")
      .update({ viewed_at: new Date().toISOString() })
      .eq("id", id);
  };

  return (
    <table>
      {invitations?.map((invitation) => {
        const viewTimeAgo = formatDistanceToNow(
          new Date(invitation.viewed_at),
          {
            addSuffix: true,
          }
        );
        const editTimeAgo = formatDistanceToNow(
          new Date(invitation.updated_at),
          {
            addSuffix: true,
          }
        );

        return (
          <tr
            key={invitation.id}
            className="py-4 px-6 rounded inline-block relative flex items-center justify-between group text-neutral-500 text-sm hover:bg-neutral-900"
          >
            <Link
              onClick={() => onView(invitation.id)}
              href={`/editor/${invitation.id}`}
              className="absolute inset-0 opacity-0"
            >
              Edit invitation {invitation.title}
            </Link>
            <td className="text-white">{invitation.title}</td>
            <td>opened {viewTimeAgo}</td>
            <td>updated {editTimeAgo}</td>
            <td>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    onClick={(e) => e.stopPropagation()}
                    size="icon"
                    variant="ghost"
                    className="transition duration-200 relative"
                  >
                    <DotsHorizontalIcon className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="rounded-lg p-1 w-[150px] bg-neutral-800 border-neutral-800"
                  side="bottom"
                  align="end"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start font-normal text-neutral-300"
                  >
                    Duplicate
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start font-normal hover:text-red-500 text-neutral-300"
                    onClick={() =>
                      toast.promise(onDelete(invitation.id), {
                        loading: "Deleting...",
                        success: "Deleted!",
                        error: "Failed to delete",
                      })
                    }
                  >
                    Delete
                  </Button>
                </PopoverContent>
              </Popover>
            </td>
          </tr>
        );
      })}
    </table>
  );
};
