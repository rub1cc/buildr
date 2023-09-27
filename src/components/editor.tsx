"use client";
import { cn } from "@/lib/utils";
import { getUnitValue, reorder, replace } from "@/utils/functions";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CopyIcon,
  CursorArrowIcon,
  DotIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Field } from "./field";
import { Button } from "./ui/button";
import { Popover } from "./ui/popover";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import { DndContext, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Component, EditorConfig, FieldValue } from "@/types/config";

const Draggable = ({ id, children, selected }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  if (!selected) {
    return children;
  }

  return React.cloneElement(children, {
    ref: setNodeRef,
    style: {
      ...children.props.style,
      ...style,
    },
    ...listeners,
    ...attributes,
  });
};

type EditorProps = {
  data: {
    content: Component[]
  }
  onChange: (v) => void,
  config: EditorConfig 
}

export function Editor({ data: initialData, onChange, config }: EditorProps) {
  const [data, setData] = useState(initialData);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const qs = useSearchParams();

  const fields =
    selectedIndex !== null
      ? config.components[data.content[selectedIndex].type]?.fields
      : {};

  useEffect(() => {
    onChange && onChange(data);
  }, [data]);

  return (
    <DndContext
      onDragEnd={(e) => {
        console.log(data.content[selectedIndex]);
        setData({
          ...data,
          content: replace(data.content, selectedIndex, {
            ...data.content[selectedIndex],
            props: {
              ...data.content[selectedIndex].props,
              _left: data.content[selectedIndex].props._left + e.delta.x,
              _top: data.content[selectedIndex].props._top + e.delta.y,
            },
          }),
        });
      }}
    >
      <div className="w-[280px] bg-white p-4 fixed left-0 h-[95svh] shadow ring-offset-white overflow-y-auto">
        <Tabs defaultValue="elements" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="elements">Elements</TabsTrigger>
            <TabsTrigger value="layers">Layers</TabsTrigger>
          </TabsList>
          <TabsContent value="elements" className="pt-4">
            <ul className="grid grid-cols-2 gap-4">
              {Object.keys(config.components).map((componentName) => (
                <li
                  key={componentName}
                  role="button"
                  onClick={() => {
                    const newData = { ...data };
                    const newComponent = {
                      type: componentName,
                      props: {
                        ...config.components[componentName].defaultProps,
                        id: `${componentName}-${new Date().getTime()}`,
                      },
                    };
                    newData.content.push(newComponent as Component);
                    setData(newData);
                    setSelectedIndex(data.content.length - 1);
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
          </TabsContent>
          <TabsContent value="layers" className="pt-4">
            <ul className="flex flex-col-reverse gap-4">
              {data.content?.map((item, i) => {
                return (
                  <li
                    key={item.props.id}
                    className={cn([
                      "flex items-center justify-between text-xs",
                      selectedIndex === i && "text-purple-500",
                    ])}
                    role="button"
                    onClick={() => {
                      setSelectedIndex(i);
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <DotIcon />
                      {config.components[item.type].icon} {item.type}
                    </span>
                    <div className="flex items-center gap-2">
                      {i != data.content.length - 1 && (
                        <Button
                          className="w-5 h-5"
                          variant="secondary"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setData({
                              ...data,
                              content: reorder(data.content, i, i + 1),
                            });
                            setSelectedIndex(i + 1);
                          }}
                        >
                          <ChevronUpIcon className="w-4 h-4" />
                        </Button>
                      )}
                      {i != 0 && (
                        <Button
                          className="w-5 h-5"
                          variant="secondary"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setData({
                              ...data,
                              content: reorder(data.content, i, i - 1),
                            });
                            setSelectedIndex(i - 1);
                          }}
                        >
                          <ChevronDownIcon className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </TabsContent>
        </Tabs>
      </div>
      <div
        id="preview"
        className="w-full bg-gray-100 flex justify-center items-center h-[95svh] "
        onClick={() => {
          setSelectedIndex(null);
        }}
      >
        <div
          id="frame"
          className={cn([
            "bg-white relative",
            "w-screen max-w-[375px] h-screen max-h-[667px]",
            "shadow ring-offset-white",
            "flex flex-col",
            selectedIndex === null && "overflow-hidden",
          ])}
        >
          {data.content.map((item, i) => {
            return (
              <Popover key={item.props.id} open={selectedIndex == i}>
                <Draggable id={item.props.id} selected={selectedIndex === i}>
                  <PopoverTrigger asChild>
                    <div
                      id={item.props.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedIndex(i);
                      }}
                      className={cn([
                        "absolute resize",
                        "select-none",
                        "border border-gray-200",
                        "border-2 border-transparent",
                        selectedIndex === i
                          ? "border-purple-500"
                          : "hover:border-purple-200",
                        selectedIndex === i && "element-selected",
                      ])}
                      style={{
                        zIndex: i,
                        top: item.props._top,
                        left: item.props._left,
                        width: getUnitValue(item.props._width),
                        height: getUnitValue(item.props._height),
                      }}
                    >
                    {config.components[item.type] ? (
                      config.components[item.type].render({
                        ...config.components[item.type].defaultProps,
                        ...item.props,
                        qs,
                        editMode: true,
                      })
                    ) : (
                      <div>No configuration for {item.type}</div>
                    )}
                    </div>
                  </PopoverTrigger>
                </Draggable>
                <PopoverContent className="z-10">
                  <div className="flex bg-white border border-gray-200 shadow-md p-1 rounded-md gap-1 my-1">
                    <Button
                      className="w-7 h-7"
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newData = { ...data };
                        const id = `${
                          newData.content[i].type
                        }-${new Date().getTime()}`;
                        const newItem = {
                          ...newData.content[i],
                          props: {
                            ...newData.content[i].props,
                            id,
                          },
                        };
                        newData.content.splice(i + 1, 0, newItem);
                        setSelectedIndex(i + 1);
                        setData(newData);
                      }}
                    >
                      <CopyIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      className="w-7 h-7"
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newData = { ...data };
                        newData.content.splice(i, 1);
                        setSelectedIndex(null);
                        setData(newData);
                      }}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            );
          })}
        </div>
      </div>
      <div
        id="panel"
        className="w-[280px] bg-white p-4 flex flex-col gap-2 fixed right-0 h-[95svh] shadow ring-offset-white overflow-y-auto"
      >
        {selectedIndex === null && (
          <div className="flex flex-col justify-center items-center p-4 gap-2 text-gray-500 text-xs bg-gray-100 rounded-lg border border-gray-200">
            <CursorArrowIcon />
            <p>Please select an element</p>
          </div>
        )}
        {Object.keys(fields).map((fieldName) => {
          const field = fields[fieldName];

          const _onChange = (value: FieldValue, name = fieldName) => {
            let currentProps;
            let newProps;

            if (selectedIndex !== null) {
              currentProps = data.content[selectedIndex].props;
            } else {
              currentProps = {};
            }

            newProps = {
              ...currentProps,
              [name]: value,
            };

            if (selectedIndex !== null) {
              setData({
                ...data,
                content: replace(data.content, selectedIndex, {
                  ...data.content[selectedIndex],
                  props: newProps,
                }),
              });
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
              key={`${data.content[selectedIndex].props.id}_${fieldName}`}
              className="pl-4"
            >
              <Field
                field={field}
                name={fieldName}
                label={field.label}
                value={data.content[selectedIndex].props[fieldName]}
                onChange={_onChange}
              />
            </div>
          );
        })}
      </div>
    </DndContext>
  );
}
