"use client";
import { User } from "@supabase/supabase-js";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export function UserAvatar({ email, user }: { email: string; user: User }) {
  console.log({ user });
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user.user_metadata.avatar_url} />
            </Avatar>
            <span className="truncate w-[150px] text-neutral-300 font-medium">
              {user.user_metadata.full_name}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span>{email}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
