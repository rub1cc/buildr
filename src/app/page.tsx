import { Button } from "@/components/ui/button";
import { generateSlug } from "@/lib/generate-slug";
import { Invitation } from "@/lib/types";
import {
  Component1Icon,
  DotsHorizontalIcon,
  LayersIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { formatDistanceToNow } from "date-fns";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: invitations }: { data: Invitation[] } = await supabase
    .from("invitations")
    .select("*")
    .order("viewed_at", {
      ascending: false,
    });

  const createNewInvitation = async () => {
    try {
      const newData: Partial<Invitation> = {
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
      const res = await supabase.from("invitations").insert([newData]);
      if (res.error) throw res.error;
      return res.data;
    } catch (err) {
      Promise.reject(err);
    }
  };

  return (
    <div className="flex">
      <div className="w-[280px] bg-white h-screen py-8 px-6 flex flex-col justify-between">
        <div>
          <div>
            <div className="flex items-center gap-2">
              <img
                src="https://www.gravatar.com/avatar/530282150e58ef8190aa99d13f8aebf5"
                className="w-10 h-10 rounded"
              />
              <span>Faraz</span>
            </div>
          </div>
          <nav className="mt-8">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-2">
                <Component1Icon className="w-4 h-4 mr-2" />
                My Invitations
              </li>
              <li className="flex items-center gap-2">
                <LayersIcon className="w-4 h-4 mr-2" />
                My Templates
              </li>
            </ul>
          </nav>
        </div>
        <Button variant="secondary">Log out</Button>
      </div>
      <main className="w-full h-screen bg-gray-50 py-8 px-6">
        <div className="w-full max-w-[800px] mx-auto">
          <div className="flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">My Invitations</h1>
            <Button
              size="sm"
              // onClick={() => {
              //   createInvitation.mutate();
              // }}
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              New
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-8">
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
                <div
                  key={invitation.id}
                  className="py-4 px-6 rounded-lg hover:bg-white flex items-center justify-between group"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">{invitation.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">
                        Viewed {viewTimeAgo}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                      <span className="text-gray-500">
                        Edited {editTimeAgo}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="transition duration-200 opacity-0 group-hover:opacity-100"
                  >
                    <DotsHorizontalIcon className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
