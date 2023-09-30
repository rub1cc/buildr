import { cn } from "@/lib/cn";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cloneElement } from "react";

export const Draggable = ({ children, id, isSelected }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id,
    });
  
    const style = {
      transform: CSS.Transform.toString(transform),
    };
  
    return (
      <>
        {cloneElement(children, {
          ref: setNodeRef,
          className: "cursor-move",
          style: {
            ...children.props.style,
            ...style,
          },
        })}
        <div
          className={cn([
            "absolute",
            "border-2 border-transparent hover:border-purple-500 cursor-move",
            isSelected && "border-purple-500",
          ])}
          style={{
            top: children.props.style.top,
            left: children.props.style.left,
            width: children.props.style.width,
            height: children.props.style.height,
            ...style,
          }}
          {...listeners}
          {...attributes}
        ></div>
      </>
    );
  };