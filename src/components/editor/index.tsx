"use client";

import { Button as ButtonBlock } from "@/components/blocks/Button";
import { Image } from "@/components/blocks/Image";
import { Rectangle } from "@/components/blocks/Rectangle";
import { Text } from "@/components/blocks/Text";
import { EditorConfig, Story } from "@/lib/types";
import { EditorComponent } from "./component";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types/supabase";
import { toast } from "sonner";

const config: EditorConfig = {
  components: {
    Text,
    Image,
    Rectangle,
    Button: ButtonBlock,
  },
};
export const Editor = (
  props: Database["public"]["Tables"]["invitations"]["Row"]
) => {
  const supabase = createClientComponentClient<Database>();

  const onPublish = async (v: Story[]) => {
    const res = await supabase
      .from("invitations")
      .update({
        data: v,
        updated_at: new Date().toISOString(),
        viewed_at: new Date().toISOString(),
      })
      .eq("id", props.id);

    if (res.error) return Promise.reject(res.error);

    return Promise.resolve();
  };

  return (
    <EditorComponent
      stories={props.data as Story[]}
      title={props.title}
      slug={props.slug}
      config={config}
      onChange={console.log}
      onPublish={(v) =>
        toast.promise(onPublish(v), {
          loading: "Saving...",
          success: "Saved!",
          error: "Failed to save",
        })
      }
    />
  );
};
