import type { ComponentConfig } from "@/types/config";
import {
  BORDER_RADIUS_OPTIONS,
  FONT_FAMILY_OPTIONS,
  FONT_SIZE_OPTIONS,
  POSITION_FIELDS,
} from "@/utils/contants";
import { getUnitValue } from "@/utils/functions";
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
    _width: {
      type: "unit",
      label: "Width",
      step: 10,
      options: [
        { value: "auto", label: "auto" },
        { value: "px", label: "px" },
        { value: "%", label: "%" },
      ],
    },
    _height: {
      type: "unit",
      label: "Height",
      step: 10,
      options: [
        { value: "auto", label: "auto" },
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
    _left: 0,
    _top: 0,
    _width: {
      value: 100,
      unit: "px",
    },
    _height: {
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
    _left,
    _top,
    // size
    _height,
    _width,
    // custom
    id,
    children,
    backgroundColor,
    color,
    borderRadius,
    fontSize,
    fontFamily,
    editMode,
    qs,
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
          ...(!editMode
            ? { position: "absolute", left: _left, top: _top }
            : {}),
          ...(!editMode
            ? { width: getUnitValue(_width), height: getUnitValue(_height) }
            : { width: "100%", height: "100%" }),
        }}
      >
        {children}
      </button>
    );
  },
};
