import { ReactElement } from "react";

export type FieldOption = {
  label: string | ReactElement;
  value: string | number | boolean;
};

export type FieldOptions = FieldOption[];

export type TextField = {
  type: "text";
  label: string;
};

export type LabelField = {
  type: "label";
  label: string;
  divider?: boolean;
};

export type UnitField = {
  type: "unit";
  label: string;
  step?: number;
  max?: number;
  min?: number;
  options?: FieldOptions;
  renderOption?: (props: FieldOption) => ReactElement;
};

export type ColorField = {
  type: "color";
  label: string;
};

export type SelectField = {
  type: "select";
  label: string;
  options: FieldOptions;
  renderOption?: (props: FieldOption) => ReactElement;
};

export type RadioField = {
  type: "radio";
  label: string;
  column: "grid-cols-1" | "grid-cols-2" | "grid-cols-3";
  options: FieldOptions;
  renderOption?: (props: FieldOption) => ReactElement;
};

export type NumberField = {
  type: "number";
  label: string;
  step?: number;
  max?: number;
  min?: number;
};

export type CustomField = {
  type: "custom";
  label: string;
  render: ({ onChange, field, name, label, value }) => ReactElement;
};

export type Field =
  | TextField
  | LabelField
  | UnitField
  | ColorField
  | SelectField
  | RadioField
  | NumberField
  | CustomField;

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
  title: string;
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

export type Invitation = {
  id: string;
  slug: string;
  title: string;
  is_published: boolean;
  is_template: boolean;
  user_id: string;
  data: Story[];
  created_at: string;
  updated_at: string;
  viewed_at: string;
};
