import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/cn";
import {
  AlignBottomIcon,
  AlignCenterHorizontallyIcon,
  AlignCenterVerticallyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignTopIcon,
} from "@radix-ui/react-icons";
import { useEditor } from "@/lib/editor-context";

export const CustomAlignField = () => {
  const { data, selectedElement, updateSelectedComponent } = useEditor();
  return (
    <div
      className={cn([
        "grid items-center gap-1.5 rounded-lg p-1.5 w-full bg-neutral-800",
        "grid-cols-3",
      ])}
    >
      <Toggle
        pressed={false}
        onClick={() => {
          const newProps = {
            ...data.content[selectedElement].props,
            left: 0,
          };
          updateSelectedComponent(newProps);
        }}
      >
        <AlignLeftIcon />
      </Toggle>
      <Toggle
        pressed={false}
        onClick={() => {
          const id = data.content[selectedElement].props.id;
          const el = document.getElementById(id) as HTMLElement;
          const frame = document.getElementById("frame");
          const x = frame.offsetWidth / 2 - el.offsetWidth / 2;
          const newProps = {
            ...data.content[selectedElement].props,
            left: Math.floor(x),
          };
          updateSelectedComponent(newProps);
        }}
      >
        <AlignCenterHorizontallyIcon />
      </Toggle>
      <Toggle
        pressed={false}
        onClick={() => {
          const id = data.content[selectedElement].props.id;
          const el = document.getElementById(id) as HTMLElement;
          const frame = document.getElementById("frame");
          const x = frame.offsetWidth - el.offsetWidth;
          const newProps = {
            ...data.content[selectedElement].props,
            left: x,
          };
          updateSelectedComponent(newProps);
        }}
      >
        <AlignRightIcon />
      </Toggle>
      <Toggle
        pressed={false}
        onClick={() => {
          const newProps = {
            ...data.content[selectedElement].props,
            top: 0,
          };
          updateSelectedComponent(newProps);
        }}
      >
        <AlignTopIcon />
      </Toggle>
      <Toggle
        pressed={false}
        onClick={() => {
          const id = data.content[selectedElement].props.id;
          const el = document.getElementById(id) as HTMLElement;
          const frame = document.getElementById("frame");
          const y = frame.offsetHeight / 2 - el.offsetHeight / 2;
          const newProps = {
            ...data.content[selectedElement].props,
            top: Math.floor(y),
          };
          updateSelectedComponent(newProps);
        }}
      >
        <AlignCenterVerticallyIcon />
      </Toggle>
      <Toggle
        pressed={false}
        onClick={() => {
          const id = data.content[selectedElement].props.id;
          const el = document.getElementById(id) as HTMLElement;
          const frame = document.getElementById("frame");
          const y = frame.offsetHeight - el.offsetHeight;
          const newProps = {
            ...data.content[selectedElement].props,
            top: Math.floor(y),
          };
          updateSelectedComponent(newProps);
        }}
      >
        <AlignBottomIcon />
      </Toggle>
    </div>
  );
};
