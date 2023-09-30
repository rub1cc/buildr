import { POSITION_FIELDS } from "@/lib/contants";
import { getUnitValue } from "@/lib/get-unit-value";
import { ComponentConfig } from "@/lib/types";
import { FrameIcon } from "@radix-ui/react-icons";

export const Rectangle: ComponentConfig = {
  icon: <FrameIcon />,
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
      type: "number",
      label: "Radius",
      step: 4,
    },
    borderWidth: {
      type: "number",
      label: "Border Width",
      step: 1,
    },
    borderColor: {
      type: "color",
      label: "Border Color",
    },
  },
  defaultProps: {
    left: 0,
    top: 0,
    height: {
      value: 150,
      unit: "px",
    },
    width: {
      value: 150,
      unit: "px",
    },
    backgroundColor: "#99EEFE",
    borderRadius: 0,
    borderWidth: 2,
    borderColor: "#2CC2E3",
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
    url,
    objectFit,
    backgroundColor,
    borderRadius,
    borderColor,
    borderWidth,
    ...props
  }) => {
    return (
      <div
        id={id}
        alt={id}
        src={url}
        objectFit={objectFit}
        style={{
          position: "absolute",
          left,
          top,
          backgroundColor,
          overflow: "hidden",
          borderColor,
          borderWidth,
          borderRadius,
          width: getUnitValue(width),
          height: getUnitValue(height),
        }}
        {...props}
      ></div>
    );
  },
};
