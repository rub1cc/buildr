"use client";
import { Field } from "@/components/field";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CopyIcon,
  CursorArrowIcon,
  DotIcon,
  DoubleArrowDownIcon,
  DoubleArrowUpIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { cloneElement } from "react";

import { EditorProvider, useEditor } from "@/components/editor/context";
import { EditorConfig, EditorData, FieldValue, Story } from "@/types/config";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../ui/context-menu";

const Draggable = ({ children, id, isSelected }) => {
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

type EditorProps = {
  stories: Story[];
  data: EditorData;
  onChange: (v) => void;
  config: EditorConfig;
};

export const Editor = (props: EditorProps) => {
  return (
    <EditorProvider
      stories={props.stories}
      data={props.data}
      config={props.config}
      onChange={props.onChange}
    >
      <EditorComponent />
    </EditorProvider>
  );
};

function EditorComponent() {
  const {
    data,
    config,
    selectedElement,
    setSelectedElement,

    addComponent,
    duplicateSelectedComponent,
    deleteSelectedComponent,
    updateSelectedComponent,
    moveSelectedComponentForward,
    moveSelectedComponentToFront,
    moveSelectedComponentBackward,
    moveSelectedComponentToBack,
  } = useEditor();

  const fields =
    selectedElement !== null
      ? config.components[data.content[selectedElement].type]?.fields
      : {};

  return (
    <DndContext
      onDragStart={(e) => {
        const selectedElementIndex = e.active.id
          .toString()
          .startsWith("draggable-")
          ? Number(e.active.id.toString().split("-")[1])
          : null;

        if (selectedElementIndex !== null) {
          setSelectedElement(selectedElementIndex);
        }
      }}
      onDragEnd={(e) => {
        const selectedElementIndex = e.active.id
          .toString()
          .startsWith("draggable-")
          ? Number(e.active.id.toString().split("-")[1])
          : null;

        if (selectedElementIndex !== null) {
          updateSelectedComponent({
            ...data.content[selectedElementIndex]?.props,
            left: Math.floor(
              data.content[selectedElementIndex]?.props.left + e.delta.x
            ),
            top: Math.floor(
              data.content[selectedElementIndex]?.props.top + e.delta.y
            ),
          });
        }
      }}
    >
      <div className="w-[280px] bg-white p-4 fixed left-0 h-[95svh] shadow ring-offset-white overflow-y-auto">
        <p className="text-xs font-semibold mb-4">Elements</p>
        <ul className="grid grid-cols-2 gap-4">
          {Object.keys(config.components).map((componentName) => (
            <li
              key={componentName}
              role="button"
              onClick={() => {
                addComponent(componentName);
              }}
              className="flex items-center gap-2"
            >
              <span className="w-[30px] h-[30px] flex justify-center items-center p-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-700">
                {config.components[componentName].icon}
              </span>
              <span className="text-xs">{componentName}</span>
            </li>
          ))}
        </ul>
        <Separator className="my-4" />
        <p className="text-xs font-semibold mb-4">Layers</p>
        <ul className="flex flex-col-reverse gap-4">
          {data.content.length === 0 && (
            <div className="flex flex-col justify-center items-center p-4 gap-2 text-gray-500 text-xs bg-gray-100 rounded-lg border border-gray-200">
              <p>No elements</p>
            </div>
          )}
          {data.content?.map((item, i) => {
            return (
              <li
                key={item.props.id}
                className={cn([
                  "flex items-center justify-between text-xs h-[30px]",
                  selectedElement === i && "text-purple-500",
                ])}
                role="button"
                onClick={() => {
                  setSelectedElement(i);
                }}
              >
                <span className="flex items-center gap-2">
                  <DotIcon />
                  {config.components[item.type].icon} {item.type}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        id="preview"
        className="w-full bg-gray-100 flex justify-center items-center h-[95svh] "
        onClick={() => {
          setSelectedElement(null);
        }}
      >
        <div
          id="frame"
          className={cn([
            "bg-white relative",
            "w-screen max-w-[375px] h-screen max-h-[667px]",
            "shadow ring-offset-white",
            "flex flex-col",
            selectedElement === null && "overflow-hidden",
          ])}
        >
          {data.content.map((item, i) => {
            return (
              <ContextMenu key={item.props.id}>
                <ContextMenuTrigger>
                  {config.components[item.type] ? (
                    <Draggable
                      id={"draggable-" + i}
                      isSelected={selectedElement === i}
                    >
                      {config.components[item.type].render({
                        ...config.components[item.type].defaultProps,
                        ...item.props,
                      })}
                    </Draggable>
                  ) : (
                    <div>No configuration for {item.type}</div>
                  )}
                </ContextMenuTrigger>
                <ContextMenuContent
                  className="z-10"
                  updatePositionStrategy="always"
                >
                  <ContextMenuItem
                    onClick={() => {
                      duplicateSelectedComponent();
                    }}
                  >
                    Duplicate
                  </ContextMenuItem>
                  <ContextMenuItem
                    onClick={() => {
                      deleteSelectedComponent();
                    }}
                  >
                    Delete
                  </ContextMenuItem>
                  <ContextMenuSub>
                    <ContextMenuSubTrigger>Move</ContextMenuSubTrigger>
                    <ContextMenuSubContent>
                      <ContextMenuItem
                        onClick={() => {
                          moveSelectedComponentToFront();
                        }}
                      >
                        Bring to Front
                      </ContextMenuItem>
                      <ContextMenuItem
                        onClick={() => {
                          moveSelectedComponentForward();
                        }}
                      >
                        Bring Forward
                      </ContextMenuItem>
                      <ContextMenuItem
                        onClick={() => {
                          moveSelectedComponentBackward();
                        }}
                      >
                        Send Backward
                      </ContextMenuItem>
                      <ContextMenuItem
                        onClick={() => {
                          moveSelectedComponentToBack();
                        }}
                      >
                        Send to Back
                      </ContextMenuItem>
                    </ContextMenuSubContent>
                  </ContextMenuSub>
                </ContextMenuContent>
              </ContextMenu>
            );
          })}
        </div>
      </div>
      <div
        id="panel"
        className="w-[280px] bg-white p-4 flex flex-col gap-2 fixed right-0 h-[95svh] shadow ring-offset-white overflow-y-auto pb-32"
      >
        {selectedElement === null && (
          <div className="flex flex-col justify-center items-center p-4 gap-2 text-gray-500 text-xs bg-gray-100 rounded-lg border border-gray-200">
            <CursorArrowIcon />
            <p>Please select an element</p>
          </div>
        )}
        {selectedElement !== null && (
          <div className="fixed right-0 w-[280px] bottom-0 p-4 border-t border-gray-200 bg-white z-10">
            <p className="text-xs font-semibold mb-2">Utilities</p>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => duplicateSelectedComponent()}
              >
                <CopyIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteSelectedComponent()}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveSelectedComponentToFront()}
              >
                <DoubleArrowUpIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveSelectedComponentForward()}
              >
                <ChevronUpIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveSelectedComponentBackward()}
              >
                <ChevronDownIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveSelectedComponentToBack()}
              >
                <DoubleArrowDownIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
        {Object.keys(fields).map((fieldName) => {
          const field = fields[fieldName];

          const _onChange = (value: FieldValue, name = fieldName) => {
            let currentProps;
            let newProps;

            if (selectedElement !== null) {
              currentProps = data.content[selectedElement]?.props;
            } else {
              currentProps = {};
            }

            newProps = {
              ...currentProps,
              [name]: value,
            };

            if (selectedElement !== null) {
              updateSelectedComponent(newProps);
            }
          };

          if (field.type === "label") {
            return (
              <>
                {field.divider && <Separator className="my-4" />}
                <p className="text-xs font-semibold">{field.label}</p>
              </>
            );
          }

          return (
            <div
              key={`${data.content[selectedElement]?.props.id}_${fieldName}`}
              className="pl-4"
            >
              <Field
                field={field}
                name={fieldName}
                label={field.label}
                value={data.content[selectedElement]?.props[fieldName]}
                onChange={_onChange}
              />
            </div>
          );
        })}
      </div>
    </DndContext>
  );
}
