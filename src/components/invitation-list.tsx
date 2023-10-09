"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { generateSlug } from "@/lib/generate-slug";
import { Database } from "@/lib/types/supabase";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { formatDistanceToNow } from "date-fns";
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

  const onDuplicate = async (
    invitation: Database["public"]["Tables"]["invitations"]["Insert"]
  ) => {
    const newData = { ...invitation };
    delete newData.id;
    newData.slug = generateSlug();
    newData.created_at = new Date().toISOString();
    newData.updated_at = new Date().toISOString();
    newData.viewed_at = new Date().toISOString();
    newData.title = `${newData.title} (copy)`;
    newData.is_published = false;
    newData.is_template = false;

    const res = await supabase.from("invitations").insert([newData]);
    if (res.error) return Promise.reject(res.error);
    router.refresh();
    return Promise.resolve();
  };

  const onView = async (id) => {
    await supabase
      .from("invitations")
      .update({ viewed_at: new Date().toISOString() })
      .eq("id", id);

    router.push(`/editor/${id}`);
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
          <tbody key={invitation.id}>
            <tr
              className="rounded cursor-pointer inline-block relative flex items-center justify-between group text-neutral-500 text-sm hover:bg-neutral-900"
              onClick={() => onView(invitation.id)}
              role="link"
            >
              <td className="text-white flex flex-col gap-2 p-4">
                {invitation.title}
                <div className="flex gap-2 items-center">
                  <span className="text-neutral-400">viewed {viewTimeAgo}</span>
                  <div className="w-[2px] h-[2px] rounded-full bg-neutral-400"></div>
                  <span className="text-neutral-400">
                    updated {editTimeAgo}
                  </span>
                </div>
              </td>
              <td className="py-4 pr-4">
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
                    className="rounded-lg p-1 w-[150px]"
                    side="bottom"
                    align="end"
                  >
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.promise(onDuplicate(invitation), {
                          loading: "Duplicating...",
                          success: "Duplicated!",
                          error: "Failed to duplicate",
                        });
                      }}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start font-normal hover:bg-neutral-700"
                    >
                      Duplicate
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start font-normal hover:text-red-500 hover:bg-neutral-700"
                      onClick={(e) => {
                        e.stopPropagation();

                        toast.promise(onDelete(invitation.id), {
                          loading: "Deleting...",
                          success: "Deleted!",
                          error: "Failed to delete",
                        });
                      }}
                    >
                      Delete
                    </Button>
                  </PopoverContent>
                </Popover>
              </td>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
};
