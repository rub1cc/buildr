import { cn } from "@/lib/utils";
import { Field, FieldValue, UnitValue } from "@/types/config";
import { ChangeEvent } from "react";
import { SketchPicker } from "react-color";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Toggle } from "./ui/toggle";

type FieldProps = {
  name: string;
  field: Field;
  value: FieldValue;
  label: string;
  onChange: (v: FieldValue) => void;
};

export function Field({
  name,
  field,
  value,
  label,
  onChange,
}: FieldProps) {
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
          className="px-2 py-1 text-xs bg-gray-100 ring-0 border-none wrap"
        />
      </div>
    );
  }

  if (field.type === "number") {
    return (
      <div className="flex w-full max-w-sm items-center gap-1.5">
        <Label className="w-[150px] text-xs truncate">{label}</Label>
        <div className={cn([`flex items-center w-full gap-2 relative`])}>
          <Input
            value={value as string}
            type="number"
            onChange={(v) => {
              onChange(Number(v.target.value));
            }}
            max={field.max}
            step={field.step || 1}
            className={cn(["px-1 w-full bg-gray-100 ring-0 border-none px-2"])}
          ></Input>
        </div>
      </div>
    );
  }
  if (field.type === "unit") {
    return (
      <div className="flex w-full max-w-sm items-center gap-1.5">
        <Label className="w-[150px] text-xs truncate">{label}</Label>
        <div className={cn([`flex items-center w-full gap-2 relative`])}>
          <Input
            value={(value as UnitValue).value}
            type="number"
            disabled={(value as UnitValue).unit === "auto"}
            step={field.step || 1}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const max = field.max;
              if (Number(e.target.value) > max) {
                onChange(max);
                return;
              }
              onChange({
                ...(value as UnitValue),
                value: e.target.value,
              });
            }}
            max={field.max}
            className={cn(["px-1 w-full bg-gray-100 ring-0 border-none px-2"])}
          ></Input>
          <Select
            onValueChange={(v) => {
              onChange({
                ...(value as UnitValue),
                unit: v,
              });
            }}
          >
            <SelectTrigger className="w-full text-xs bg-gray-100 ring-0 border-0">
              <SelectValue
                placeholder={
                  field.options.find(
                    (o) => o.value === (value as UnitValue).unit
                  )?.label
                }
              />
            </SelectTrigger>
            <SelectContent className="text-xs">
              {field.options.map((option) => (
                <SelectItem
                  key={option.value as string}
                  value={option.value as string}
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
            "grid items-center gap-1.5 bg-gray-100 rounded-lg p-1.5 w-full",
            field.column,
          ])}
        >
          {field.options.map((option) => {
            return (
              <Toggle
                key={option.value as string}
                className="data-[state=on]:bg-white data-[state=on]:shadow data-[state=on]:ring-offset-white data-[state=on]:ring-gray-950"
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
          <SelectTrigger className="w-full text-xs bg-gray-100 ring-0 border-0">
            <SelectValue
              placeholder={field.options.find((o) => o.value === value)?.label}
            />
          </SelectTrigger>
          <SelectContent className="text-xs min-w-[200px]">
            {field.options.map((option) => (
              <SelectItem
                key={option.value as string}
                value={option.value as string}
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
          <PopoverTrigger className="text-xs bg-gray-100 rounded-lg w-full px-2 py-2.5 flex items-center">
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
              color={value}
              onChange={(color: { hex: string }) => onChange(color.hex)}
              className="border-none shadow-none"
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }
}
