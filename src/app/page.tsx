"use client";

import { Button } from "@/components/ui/button";
import {
  Component1Icon,
  DotsHorizontalIcon,
  LayersIcon,
  PlusIcon
} from "@radix-ui/react-icons";

export default function Home() {
  return (
    <div className="flex">
      <div className="w-[280px] bg-white h-screen py-8 px-6">
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
      <main className="w-full h-screen bg-gray-50 py-8 px-6">
        <div className="w-full max-w-[800px] mx-auto">
          <div className="flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">My Invitations</h1>
            <Button size="sm">
              <PlusIcon className="w-4 h-4 mr-2" />
              New
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-8">
            <div className="py-4 px-6 rounded-lg hover:bg-white flex items-center justify-between group">
              <div className="flex flex-col">
                <span className="font-semibold">Untitled</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Viewed 3 months ago</span>
                  <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                  <span className="text-gray-500">Edited 3 months ago</span>
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
          </div>
        </div>
      </main>
    </div>
  );
}
