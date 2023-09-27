import { Component } from "@/types/config";

export const replace = (
  list: Component[],
  index: number,
  newItem: Component
): Component[] => {
  const result = Array.from(list);
  result.splice(index, 1);
  result.splice(index, 0, newItem);

  return result;
};

export const reorder = (
  list: Component[],
  startIndex: number,
  endIndex: number
): Component[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const getUnitValue = (obj: { unit: string; value: number }) => {
  if (obj?.unit === "auto") {
    return "auto";
  }
  return obj?.value + obj?.unit;
};

export const getFontWeightStyle = (
  weight:
    | "regular"
    | "italic"
    | "medium"
    | "medium-italic"
    | "semibold"
    | "semibold-italic"
    | "bold"
    | "bold-italic"
) => {
  const className = {
    regular: {
      fontWeight: "400",
    },
    italic: {
      fontStyle: "italic",
    },
    medium: {
      fontWeight: "500",
    },
    "medium-italic": {
      fontWeight: "500",
      fontStyle: "italic",
    },
    semibold: {
      fontWeight: "600",
    },
    "semibold-italic": {
      fontWeight: "600",
      fontStyle: "italic",
    },
    bold: {
      fontWeight: "700",
    },
    "bold-italic": {
      fontWeight: "700",
      fontStyle: "italic",
    },
  };
  return className[weight];
};
