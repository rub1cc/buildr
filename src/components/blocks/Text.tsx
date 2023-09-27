import { ComponentConfig } from "@/types/config";
import {
  FONT_FAMILY_OPTIONS,
  FONT_SIZE_OPTIONS,
  FONT_WEIGHT_OPTIONS,
  POSITION_FIELDS,
  TEXT_ALIGN_OPTIONS,
  TEXT_DECORATION_OPTIONS,
} from "@/utils/contants";
import { getFontWeightStyle, getUnitValue } from "@/utils/functions";
import { TextIcon } from "@radix-ui/react-icons";

export const Text: ComponentConfig = {
  icon: <TextIcon />,
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
    textAlign: {
      type: "radio",
      label: "Align",
      column: "grid-cols-3",
      options: TEXT_ALIGN_OPTIONS,
    },
    textDecoration: {
      type: "radio",
      label: "Decoration",
      column: "grid-cols-3",
      renderOption: (option) => (
        <span
          style={{
            textDecoration: option.value as string,
          }}
        >
          {option.label}
        </span>
      ),
      options: TEXT_DECORATION_OPTIONS,
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
    fontWeight: {
      type: "select",
      label: "Weight",
      renderOption: (option) => {
        return (
          <span
            style={{
              ...getFontWeightStyle(option.value),
            }}
          >
            {option.label}
          </span>
        );
      },
      options: FONT_WEIGHT_OPTIONS,
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
      value: 32,
      unit: "px",
    },
    children: "Text",
    fontWeight: "regular",
    fontSize: {
      value: 18,
      unit: "px",
    },
    fontFamily: "Inter",
    textAlign: "center",
    textDecoration: "none",
    color: "#000000",
  },
  render: ({
    // position
    _left,
    _top,
    // size
    _width,
    _height,
    // custom
    id,
    children,
    fontSize,
    fontFamily,
    fontWeight,
    textAlign,
    textDecoration,
    color,
    editMode,
    qs,
  }) => {
    return (
      <p
        id={id}
        style={{
          fontSize: getUnitValue(fontSize),
          fontFamily,
          textAlign,
          textDecoration,
          color,
          ...(fontWeight ? getFontWeightStyle(fontWeight) : {}),
          ...(!editMode
            ? { position: "absolute", left: _left, top: _top }
            : {}),
          ...(!editMode
            ? { width: getUnitValue(_width), height: getUnitValue(_height) }
            : { width: "100%", height: "100%" }),
        }}
      >
        {children}
      </p>
    );
  },
};