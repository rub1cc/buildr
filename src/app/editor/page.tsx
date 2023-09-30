"use client";
import { Button as ButtonBlock } from "@/components/blocks/Button";
import { Rectangle } from "@/components/blocks/Rectangle";
import { Image } from "@/components/blocks/Image";
import { Text } from "@/components/blocks/Text";

import { Editor } from "@/components/editor";
import { EditorConfig } from "@/lib/types";

const config: EditorConfig = {
  components: {
    Text,
    Image,
    Rectangle,
    Button: ButtonBlock,
  },
};

const initialStories = [
  {
    title: "Story 1",
    content: [],
  },
  {
    title: "Story 2",
    content: [],
  },
  {
    title: "Story 3",
    content: [],
  },
];

export default function Home() {
  return (
    <Editor
      stories={initialStories}
      config={config}
      onChange={console.log}
      onPublish={(v) => alert(JSON.stringify(v))}
    />
  );
}
