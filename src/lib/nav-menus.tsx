"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "./cn";
import { Component2Icon, FileIcon } from "@radix-ui/react-icons";

const menus = [
  {
    label: "Invitations",
    children: [
      {
        name: "All invitations",
        href: "/dashboard",
        icon: <FileIcon className="w-4 h-4" />,
      },
      {
        name: "Templates",
        href: "/templates",
        icon: <Component2Icon className="w-4 h-4" />,
      },
    ],
  },
];

export function NavMenus() {
  const pathname = usePathname();
  return (
    <nav>
      {menus.map((m) => (
        <div key={m.label} className="flex flex-col gap-4">
          <p className="text-xs text-neutral-400">{m.label}</p>
          <ul className="flex flex-col">
            {m.children.map((menu) => (
              <li key={menu.name} className="flex items-center">
                <Link
                  href={menu.href}
                  className={cn([
                    "flex items-center gap-1.5",
                    "font-normal text-sm justify-start px-4 py-2 w-full rounded text-neutral-400 hover:bg-neutral-800",
                    pathname === menu.href && "bg-neutral-800",
                  ])}
                >
                  {menu.icon}
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
