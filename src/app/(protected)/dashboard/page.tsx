import { CreateInvitationButton } from "@/components/create-invitation-button";
import { InvitationList } from "@/components/invitation-list";
import { LogoutButton } from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { NavMenus } from "@/lib/nav-menus";
import { Database } from "@/lib/types/supabase";
import { ExitIcon } from "@radix-ui/react-icons";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: invitations } = await supabase
    .from("invitations")
    .select("*")
    .order("viewed_at", {
      ascending: false,
    });

  return (
    <div className="flex">
      <div className="w-[280px] bg-neutral-950 h-screen py-8 px-4 flex flex-col justify-between">
        <NavMenus />

        <div className="flex items-center gap-2">
          <UserAvatar email={user.email} user={user} />
          <LogoutButton>
            <Button variant="ghost" size="icon">
              <ExitIcon className="w-4 h-4" />
            </Button>
          </LogoutButton>
        </div>
      </div>
      <main className="w-full h-screen bg-neutral-950 py-8 px-6">
        <div className="w-full mx-auto">
          <div className="flex items-center justify-between px-6">
            <h1 className="text-xl text-white">All invitations</h1>

            <CreateInvitationButton user={user} />
          </div>
          <div className="grid grid-cols-1 gap-4 mt-8">
            <Suspense fallback="Loading...">
              <InvitationList invitations={invitations} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
