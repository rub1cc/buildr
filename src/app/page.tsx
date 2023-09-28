"use client";
import { Button as ButtonBlock } from "@/components/blocks/Button";
import { Image } from "@/components/blocks/Image";
import { Text } from "@/components/blocks/Text";

import { Editor } from "@/components/editor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CopyIcon,
  EyeOpenIcon,
  Pencil1Icon,
  PlusCircledIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { PopoverClose } from "@radix-ui/react-popover";
import { useState } from "react";
import { EditorConfig } from '@/types/config'

const config: EditorConfig = {
  components: {
    Text,
    Image,
    Button: ButtonBlock,
  },
};

const defaultStories = [
  {
    title: 'Story 1',
    content: []
  },
  {
    title: 'Story 2',
    content: []
  },
  {
    title: 'Story 3',
    content: []
  }
]

export default function Home() {
  const [stories, setStories] = useState({
    [`Story-` + new Date().getTime()]: {
      title: "Cover",
      content: [],
    },
    [`Story2-` + new Date().getTime()]: {
      title: "Mempelai",
      content: [],
    },
  });

  const [selectedStoryId, setSelectedStoryId] = useState(
    Object.keys(stories)[0]
  );

  return (
    <>
      <nav className="flex justify-between items-center h-[5svh] px-4 border-b border-gray-100 shadow ring-offset-white">
        <p className="font-bold">Snapvite.co</p>
        <div className="flex items-center gap-2 absolute h-[5svh] w-full justify-center">
          <Popover>
            <PopoverTrigger>
              <Label className="mr-2">Story</Label>
              <Badge variant="secondary">
                {stories[selectedStoryId]?.title}
              </Badge>
            </PopoverTrigger>
            <PopoverContent className="p-2 grid w-[350px] ml-4">
              {Object.keys(stories).map((key) => (
                <div key={key} className="flex items-center gap-1.5">
                  <Input
                    className="p-0 border-none h-auto truncate"
                    value={stories[key].title}
                  ></Input>
                  <div className="flex items-center">
                    <PopoverClose>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedStoryId(key);
                        }}
                      >
                        <Pencil1Icon className="w-4 h-4" />
                      </Button>
                    </PopoverClose>
                    <Button variant="ghost" size="icon">
                      <ChevronUpIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ChevronDownIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <CopyIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                variant="ghost"
                onClick={() => {
                  setStories({
                    ...stories,
                    [`Story-` + new Date().getTime()]: {
                      title: "Story -" + new Date().getTime(),
                      content: [],
                    },
                  });
                }}
              >
                <PlusCircledIcon className="w-4 h-4 mr-2" />
                Add new
              </Button>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <EyeOpenIcon className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button size="sm">
            Publish
            <ChevronDownIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </nav>

      <div id="main" className="flex h-[95svh]">
        <Editor
          key={selectedStoryId}
          stories={defaultStories}
          data={stories[selectedStoryId] || {}}
          config={config}
          onChange={(v) => {
            const newData = { ...stories };

            newData[selectedStoryId] = v;

            setStories(newData);
          }}
        />
      </div>
    </>
  );
}
