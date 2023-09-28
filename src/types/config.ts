import { ReactElement } from "react";

export type FieldOption = {
  label: string | ReactElement;
  value: string | number | boolean;
};

export type FieldOptions = FieldOption[];

export type Field = {
  type:
    | "text"
    | "label"
    | "unit"
    | "color"
    | "select"
    | "radio"
    | "number"
    | "custom";
  label: string;
  divider?: boolean;
  step?: number;
  min?: number;
  max?: number;
  unit?: string;
  render?: ({ onChange, field, name, label, value }) => ReactElement;
  column?: "grid-cols-1" | "grid-cols-2" | "grid-cols-3";
  options?: FieldOptions;
  renderOption?: (props: FieldOption) => ReactElement;
};

export type FieldValue = string | number | boolean | UnitValue;

export type UnitValue = { unit: string; value: number | string };

export type ComponentConfig = {
  icon: ReactElement;
  fields: {
    [key: string]: Field;
  };
  defaultProps: {
    [key: string]: FieldValue;
  };
  render: (props) => ReactElement;
};

export type EditorConfig = {
  components: {
    [key: string]: ComponentConfig;
  };
};

export type Story = {
  title: string
  content: Component[];
};

export type EditorData = {
  content: Component[];
};

export type Component = {
  type: string;
  props: ComponentProps;
};

export type ComponentProps = {
  id: string;
  [key: string]: any;
};

export type FontWeight =
  | "regular"
  | "italic"
  | "medium"
  | "medium-italic"
  | "semibold"
  | "semibold-italic"
  | "bold"
  | "bold-italic";
