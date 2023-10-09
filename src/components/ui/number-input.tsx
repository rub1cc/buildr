import { cn } from "@/lib/cn";
import { Input } from "./input";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { Button } from "./button";
import { useEffect, useState } from "react";

type NumberInputProps = {
  value: string;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
  step?: number;
};

export function NumberInput({
  value,
  onChange,
  max,
  min,
  step,
}: NumberInputProps) {
  const [val, setVal] = useState(value);

  const handleChange = (e) => {
    setVal(e.target.value);
  };

  useEffect(() => {
    onChange(Number(val));
  }, [val]);

  return (
    <div className="relative">
      <Input
        value={value as string}
        type="number"
        onChange={handleChange}
        max={max}
        step={step || 1}
        min={min || 0}
        className={cn([
          "px-1 w-full bg-neutral-800 ring-0 border-none px-2 text-white",
        ])}
        style={{
          appearance: "textfield",
          MozAppearance: "textfield",
          WebkitAppearance: "textfield",
        }}
      ></Input>
      <div className="flex flex-col absolute right-0 top-0 bottom-0">
        <Button
          variant="secondary"
          className="p-0 min-h-auto"
          onClick={() => {
            if (Number(val) >= max) return;
            setVal(String(Number(val) + 1));
          }}
        >
          <TriangleUpIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="secondary"
          className="p-0 min-h-auto"
          onClick={() => {
            if (Number(val) <= min) return;
            setVal(String(Number(val) - 1));
          }}
        >
          <TriangleDownIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
