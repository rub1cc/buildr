import { ImageWithFallback } from "@/components/image-with-fallback";
import { ComponentConfig } from "@/types/config";
import { POSITION_FIELDS } from "@/utils/contants";
import { getUnitValue } from "@/utils/functions";
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
    _width: {
      type: "unit",
      label: "Width",
      step: 10,
      options: [
        { value: "px", label: "px" },
        { value: "%", label: "%" },
      ],
    },
    _height: {
      type: "unit",
      label: "Height",
      step: 10,
      options: [
        { value: "px", label: "px" },
        { value: "%", label: "%" },
      ],
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
    _left: 0,
    _top: 0,
    _height: {
      value: 150,
      unit: "px",
    },
    _width: {
      value: 150,
      unit: "px",
    },
    objectFit: "cover",
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
    url,
    objectFit,
    editMode,
    qs,
  }) => {
    if (!editMode) {
      return (
        <div
          id={id}
          style={{
            position: "absolute",
            left: _left,
            top: _top,
            width: getUnitValue(_width),
            height: getUnitValue(_height),
          }}
        >
          <ImageWithFallback
            alt={id}
            src={url}
            fill
            style={{
              objectFit,
            }}
          />
        </div>
      );
    }
    return (
      <ImageWithFallback
        alt={id}
        src={url}
        fill
        style={{
          objectFit,
        }}
      />
    );
  },
};
