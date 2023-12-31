import { ImageWithFallback } from "@/components/image-with-fallback";
import { POSITION_FIELDS } from "@/lib/contants";
import { getUnitValue } from "@/lib/get-unit-value";
import { ComponentConfig } from "@/lib/types";
import { ImageIcon } from "@radix-ui/react-icons";

export const Image: ComponentConfig = {
  icon: <ImageIcon />,
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
    borderRadius: {
      type: "number",
      label: "Radius",
      step: 4,
    },
    label_image: {
      type: "label",
      label: "Image",
      divider: true,
    },
    url: {
      type: "text",
      label: "Url",
    },
    objectFit: {
      type: "radio",
      label: "Sizing",
      column: "grid-cols-2",
      options: [
        {
          value: "cover",
          label: "Fill",
        },
        {
          value: "contain",
          label: "Fit",
        },
      ],
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
    objectFit: "cover",
    borderRadius: 4,
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
    borderRadius,
    ...props
  }) => {
    return (
      <ImageWithFallback
        id={id}
        alt={id}
        src={url}
        objectFit={objectFit}
        style={{
          position: "absolute",
          overflow: 'hidden',
          left,
          top,
          borderRadius,
          width: getUnitValue(width),
          height: getUnitValue(height),
        }}
        {...props}
      />
    );
  },
};
