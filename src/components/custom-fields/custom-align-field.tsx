import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { AlignBottomIcon, AlignCenterHorizontallyIcon, AlignCenterVerticallyIcon, AlignLeftIcon, AlignRightIcon, AlignTopIcon } from "@radix-ui/react-icons";

export const CustomAlignField = ({ onChange }) => {
  return (
    <div
      className={cn([
        "grid items-center gap-1.5 bg-gray-100 rounded-lg p-1.5 w-full",
        "grid-cols-3",
      ])}
    >
      <Toggle
        pressed={false}
        onClick={() => {
          onChange(0, "_left");
        }}
      >
        <AlignLeftIcon />
      </Toggle>
      <Toggle
        pressed={false}
        onClick={() => {
          const el = document.querySelector(".element-selected") as HTMLElement;
          const frame = document.getElementById("frame");
          const x = frame.offsetWidth / 2 - el.offsetWidth / 2;
          onChange(Math.floor(x), "_left");
        }}
      >
        <AlignCenterHorizontallyIcon />
      </Toggle>
      <Toggle
        pressed={false}
        onClick={() => {
          const el = document.querySelector(".element-selected") as HTMLElement;
          const frame = document.getElementById("frame");
          const x = frame.offsetWidth - el.offsetWidth;
          onChange(Math.floor(x), "_left");
        }}
      >
        <AlignRightIcon />
      </Toggle>
      <Toggle
        pressed={false}
        onClick={() => {
          onChange(0, "_top");
        }}
      >
        <AlignTopIcon />
      </Toggle>
      <Toggle
        pressed={false}
        onClick={() => {
          const el = document.querySelector(".element-selected") as HTMLElement;
          const frame = document.getElementById("frame");
          const y = frame.offsetHeight / 2 - el.offsetHeight / 2;
          onChange(Math.floor(y), "_top");
        }}
      >
        <AlignCenterVerticallyIcon />
      </Toggle>
      <Toggle
        pressed={false}
        onClick={() => {
          const el = document.querySelector(".element-selected") as HTMLElement;
          const frame = document.getElementById("frame");
          const y = frame.offsetHeight - el.offsetHeight;
          onChange(Math.floor(y), "_top");
        }}
      >
        <AlignBottomIcon />
      </Toggle>
    </div>
  );
};
