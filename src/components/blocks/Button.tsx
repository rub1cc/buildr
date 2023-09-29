import type { ComponentConfig } from "@/lib/types";
import {
  BORDER_RADIUS_OPTIONS,
  FONT_FAMILY_OPTIONS,
  FONT_SIZE_OPTIONS,
  POSITION_FIELDS,
} from "@/lib/contants";
import { getUnitValue } from "@/lib/get-unit-value";
import { ButtonIcon } from "@radix-ui/react-icons";

export const Button: ComponentConfig = {
  icon: <ButtonIcon />,
  fields: {
    ...POSITION_FIELDS,
    label_size: {
      type: "label",
      label: "Size",
      divider: true,
    },
    width: {
      type: "unit",
      label: "Width",
      step: 10,
      options: [
        { value: "px", label: "px" },
        { value: "%", label: "%" },
      ],
    },
    height: {
      type: "unit",
      label: "Height",
      step: 10,
      options: [
        { value: "px", label: "px" },
        { value: "%", label: "%" },
      ],
    },
    label_style: {
      type: "label",
      label: "Style",
      divider: true,
    },
    backgroundColor: {
      type: "color",
      label: "Background",
    },
    borderRadius: {
      type: "unit",
      label: "Radius",
      options: BORDER_RADIUS_OPTIONS,
    },
    label_text: {
      type: "label",
      label: "Text",
      divider: true,
    },
    children: {
      type: "text",
      label: "Content",
    },
    fontSize: {
      type: "unit",
      label: "Size",
      options: FONT_SIZE_OPTIONS,
    },
    fontFamily: {
      type: "select",
      label: "Font",
      renderOption: (option) => (
        <span
          style={{
            fontFamily: option.value as string,
          }}
        >
          {option.label}
        </span>
      ),
      options: FONT_FAMILY_OPTIONS.map((font) => ({
        value: font,
        label: font,
      })),
    },
    color: {
      type: "color",
      label: "Color",
    },
  },
  defaultProps: {
    left: 0,
    top: 0,
    width: {
      value: 100,
      unit: "px",
    },
    height: {
      value: 40,
      unit: "px",
    },
    backgroundColor: "#000000",
    borderRadius: {
      value: 100,
      unit: "px",
    },
    children: "Button",
    fontSize: {
      value: 14,
      unit: "px",
    },
    fontFamily: "Inter",
    color: "#FFFFFF",
  },
  render: ({
    // position
    left,
    top,
    // size
    height,
    width,
    // custom
    id,
    children,
    backgroundColor,
    color,
    borderRadius,
    fontSize,
    fontFamily,
    ...props
  }) => {
    return (
      <button
        id={id}
        style={{
          backgroundColor,
          fontFamily,
          color,
          fontSize: getUnitValue(fontSize),
          borderRadius: getUnitValue(borderRadius),
          position: "absolute",
          left,
          top,
          width: getUnitValue(width),
          height: getUnitValue(height),
        }}
        {...props}
      >
        {children}
      </button>
    );
  },
};
