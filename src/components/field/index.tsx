import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/cn";
import { Field, FieldValue, UnitValue } from "@/lib/types";
import { Color, SketchPicker } from "react-color";
import { NumberInput } from "../ui/number-input";

type FieldProps = {
  name: string;
  field: Field;
  value: FieldValue;
  label: string;
  onChange: (v: FieldValue) => void;
};

export function Field({ name, field, value, label, onChange }: FieldProps) {
  if (field.type === "text") {
    return (
      <div className="flex w-full max-w-sm items-center gap-1.5">
        <Label htmlFor={name} className="w-[150px] text-xs truncate">
          {label}
        </Label>
        <Input
          id={name}
          value={value as string}
          onChange={(e) => onChange(e.currentTarget.value)}
          className="px-2 py-1 text-xs bg-neutral-800 ring-0 border-none wrap text-white"
        />
      </div>
    );
  }

  if (field.type === "number") {
    return (
      <div className="flex w-full max-w-sm items-center gap-1.5">
        <Label className="w-[150px] text-xs truncate">{label}</Label>
        <div className={cn([`flex items-center w-full gap-2 relative`])}>
          <NumberInput
            value={value as string}
            onChange={onChange}
            max={field.max}
            step={field.step || 1}
            min={field.min || 0}
          ></NumberInput>
        </div>
      </div>
    );
  }
  if (field.type === "unit") {
    return (
      <div className="flex w-full max-w-sm items-center gap-1.5">
        <Label className="w-[150px] text-xs truncate">{label}</Label>
        <div className={cn([`flex items-center w-full gap-2 relative`])}>
          {(value as UnitValue).unit === "auto" ? (
            <Input
              value="auto"
              disabled={true}
              className={cn([
                "px-1 w-full bg-neutral-800 ring-0 border-none px-2 text-white",
              ])}
            ></Input>
          ) : (
            <NumberInput
              value={(value as UnitValue).value as string}
              step={field.step || 1}
              onChange={(v) => {
                const max = field.max;
                if (v > max) {
                  onChange(max);
                  return;
                }
                onChange({
                  ...(value as UnitValue),
                  value: v,
                });
              }}
              max={field.max}
              min={field.min || 0}
            ></NumberInput>
          )}
          <Select
            onValueChange={(v) => {
              onChange({
                ...(value as UnitValue),
                unit: v,
              });
            }}
          >
            <SelectTrigger className="w-full text-xs bg-neutral-800 ring-0 border-0 text-white">
              <SelectValue
                placeholder={
                  field.options.find(
                    (o) => o.value === (value as UnitValue).unit
                  )?.label
                }
              />
            </SelectTrigger>
            <SelectContent className="text-xs bg-neutral-800 border-none">
              {field.options.map((option) => (
                <SelectItem
                  key={option.value as string}
                  value={option.value as string}
                  className="focus:bg-neutral-700 focus:text-neutral-400 hover:bg-neutral-700 text-white"
                >
                  {field.renderOption
                    ? field.renderOption(option)
                    : option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }

  if (field.type === "radio") {
    if (!field.options) {
      return null;
    }

    return (
      <div className="flex w-full items-center max-w-sm gap-1.5">
        <Label className="w-[150px] text-xs truncate">{label}</Label>
        <div
          className={cn([
            "grid items-center gap-1.5 bg-neutral-800 rounded-lg p-1.5 w-full",
            field.column,
          ])}
        >
          {field.options.map((option) => {
            return (
              <Toggle
                key={option.value as string}
                className="data-[state=on]:bg-neutral-700 data-[state=on]:text-white hover:bg-neutral-700 text-white hover:text-white data-[state=on]:shadow data-[state=on]:ring-offset-white data-[state=on]:ring-gray-950"
                pressed={value === option.value}
                onPressedChange={() => {
                  onChange(option.value);
                }}
              >
                {field.renderOption ? field.renderOption(option) : option.label}
              </Toggle>
            );
          })}
        </div>
      </div>
    );
  }

  if (field.type === "select") {
    if (!field.options) {
      return null;
    }

    return (
      <div className="flex w-full max-w-sm items-center gap-1.5">
        <Label className="w-[150px] text-xs truncate">{label}</Label>
        <Select onValueChange={onChange}>
          <SelectTrigger className="w-full text-xs bg-neutral-800 ring-0 border-0 text-white">
            <SelectValue
              placeholder={field.options.find((o) => o.value === value)?.label}
            />
          </SelectTrigger>
          <SelectContent className="text-xs min-w-[200px] bg-neutral-800 border-none">
            {field.options.map((option) => (
              <SelectItem
                key={option.value as string}
                value={option.value as string}
                className="focus:bg-neutral-700 focus:text-white hover:bg-neutral-700 text-white"
              >
                {field.renderOption ? field.renderOption(option) : option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  if (field.type === "custom") {
    if (!field.render) {
      return null;
    }

    return (
      <div className="flex w-full max-w-sm gap-1.5">
        <Label className="w-[150px] text-xs truncate mt-1">{label}</Label>
        {field.render({ name, field, value, label, onChange })}
      </div>
    );
  }

  if (field.type === "color") {
    return (
      <div className="flex w-full max-w-sm items-center gap-1.5">
        <Label className="w-[150px] text-xs truncate mt-1">{label}</Label>
        <Popover>
          <PopoverTrigger className="text-xs bg-neutral-800 rounded-lg w-full px-2 py-2.5 flex items-center text-white">
            <span
              className={`w-5 h-5 rounded-md block mr-2`}
              style={{
                backgroundColor: value as string,
              }}
            ></span>
            {value as string}
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 border-none shadow-none select-none"
            align="end"
          >
            <SketchPicker
              color={value as Color}
              onChange={(color: { hex: string }) => onChange(color.hex)}
              className="border-none shadow-none"
              styles={{
                default: {
                  picker: {
                    backgroundColor: "#262626",
                  },
                },
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }
}
