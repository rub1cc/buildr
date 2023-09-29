import { FontWeight } from "@/lib/types";

export const getFontWeightStyle = (weight: FontWeight) => {
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