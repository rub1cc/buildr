import { CustomAlignField } from "@/components/field/custom/align-field";
import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";
import type { Field, FieldOptions } from "@/lib/types";

export const FONT_FAMILY_OPTIONS = [
  "Inter",
  "Damion",
  "Poppins",
  "Pacifico",
  "Charmonman",
  "Roboto",
  "Libre Caslon Text",
].sort();

export const FONT_WEIGHT_OPTIONS: FieldOptions = [
  {
    value: "regular",
    label: "Regular",
  },
  {
    value: "italic",
    label: "Italic",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "medium-italic",
    label: "Medium Italic",
  },
  {
    value: "semibold",
    label: "Semibold",
  },
  {
    value: "semibold-italic",
    label: "Semibold Italic",
  },
  {
    value: "bold",
    label: "Bold",
  },
  {
    value: "bold-italic",
    label: "Bold Italic",
  },
];

export const TEXT_DECORATION_OPTIONS: FieldOptions = [
  {
    value: "none",
    label: "Aa",
  },
  {
    value: "underline",
    label: "Aa",
  },
  {
    value: "line-through",
    label: "Aa",
  },
];

export const FONT_SIZE_OPTIONS: FieldOptions = [
  {
    value: "px",
    label: "px",
  },
];

export const TEXT_ALIGN_OPTIONS: FieldOptions = [
  {
    value: "left",
    label: <TextAlignLeftIcon />,
  },
  {
    value: "center",
    label: <TextAlignCenterIcon />,
  },
  {
    value: "right",
    label: <TextAlignRightIcon />,
  },
];

export const BORDER_RADIUS_OPTIONS: FieldOptions = [
  {
    value: "px",
    label: "px",
  },
  {
    value: "%",
    label: "%",
  },
];

export const POSITION_FIELDS: { [key: string]: Field } = {
  label_position: {
    type: "label",
    label: "Position",
  },
  top: {
    type: "number",
    label: "Top",
    step: 10,
  },
  left: {
    type: "number",
    label: "Left",
    step: 10,
  },
  _alignment: {
    type: "custom",
    label: "Align",
    render: CustomAlignField,
  },
};
