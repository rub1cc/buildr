"use client";
import { Field } from "@/components/field";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/cn";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CopyIcon,
  CursorArrowIcon,
  DotIcon,
  DoubleArrowDownIcon,
  DoubleArrowUpIcon,
  EyeOpenIcon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";

import { EditorProvider, useEditor } from "@/lib/editor-context";
import { Draggable } from "@/components/draggable";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { EditorConfig, FieldValue, Story } from "@/lib/types";
import { DndContext } from "@dnd-kit/core";

type EditorProps = {
  stories: Story[];
  onChange: (v: Story[]) => void;
  onPublish: (v: Story[]) => void;
  config: EditorConfig;
};

export const Editor = (props: EditorProps) => {
  return (
    <EditorProvider
      stories={props.stories}
      config={props.config}
      onChange={props.onChange}
    >
      <EditorComponent onPublish={props.onPublish} />
    </EditorProvider>
  );
};

function EditorComponent({ onPublish }: { onPublish: (v: Story[]) => void }) {
  const {
    stories,
    selectedStory,
    setSelectedStory,
    moveSelectedStoryLeft,
    moveSelectedStoryRight,

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
    <>
      <nav className="flex justify-between items-center h-[5svh] px-4 border-b border-gray-100 shadow ring-offset-white">
        <p className="font-bold">Snapvite.co</p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <EyeOpenIcon className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button size="sm" onClick={() => onPublish(stories)}>
            Publish
            <ChevronDownIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </nav>

      <div id="main" className="flex h-[95svh]">
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
          <div
            id="sidebar"
            className="w-[280px] z-10 bg-white p-4 fixed left-0 h-[95svh] shadow ring-offset-white overflow-y-auto"
          >
            <p className="text-xs font-semibold mb-4">Elements</p>
            <ul className="grid grid-cols-1 gap-4">
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
            <Separator className="my-8" />
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
            className="w-full bg-gray-100 flex flex-col justify-center items-center h-[95svh] "
            onClick={() => {
              setSelectedElement(null);
            }}
          >
             <Button
              id="frame-prev"
              size="icon"
              variant="ghost"
              className={cn([
                "cursor-pointer",
                "bg-gray-50 rounded-full hover:bg-gray-200 absolute -translate-x-[220px] w-10 h-10",
                "flex flex-col",
              ])}
            >
              <PlusIcon className="w-4 h-4"/>
            </Button>
             <Button
              id="frame-prev"
              size="icon"
              variant="ghost"
              className={cn([
                "cursor-pointer",
                "bg-gray-50 rounded-full hover:bg-gray-200 absolute translate-x-[220px] w-10 h-10",
                "flex flex-col",
              ])}
            >
              <PlusIcon className="w-4 h-4"/>
            </Button>
            {selectedStory < stories.length - 1 && (
              <div
                id="frame-next"
                onClick={() => setSelectedStory(selectedStory + 1)}
                className={cn([
                  "cursor-pointer",
                  "bg-white absolute translate-x-[120%] -translate-y-[20px] scale-[95%] opacity-50",
                  "w-screen max-w-[375px] h-screen max-h-[667px]",
                  "shadow ring-offset-white",
                  "flex flex-col",
                ])}
              >
                {stories[selectedStory + 1].content.map((item) => {
                  return config.components[item.type]
                    ? config.components[item.type].render({
                        ...config.components[item.type].defaultProps,
                        ...item.props,
                      })
                    : null;
                })}
              </div>
            )}
            {selectedStory > 0 && (
              <div
                id="frame-prev"
                onClick={() => setSelectedStory(selectedStory - 1)}
                className={cn([
                  "cursor-pointer",
                  "bg-white absolute -translate-x-[120%] -translate-y-[20px] scale-[95%] opacity-50",
                  "w-screen max-w-[375px] h-screen max-h-[667px]",
                  "shadow ring-offset-white",
                  "flex flex-col",
                ])}
              >
                {stories[selectedStory - 1].content.map((item) => {
                  return config.components[item.type]
                    ? config.components[item.type].render({
                        ...config.components[item.type].defaultProps,
                        ...item.props,
                      })
                    : null;
                })}
              </div>
            )}
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
            <div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => moveSelectedStoryLeft()}
              >
                <ArrowLeftIcon className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => moveSelectedStoryRight()}
              >
                <ArrowRightIcon className="w-4 h-4" />
              </Button>
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
                    disabled={selectedElement === data.content.length - 1}
                    onClick={() => moveSelectedComponentToFront()}
                  >
                    <DoubleArrowUpIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={selectedElement === data.content.length - 1}
                    onClick={() => moveSelectedComponentForward()}
                  >
                    <ChevronUpIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={selectedElement === 0}
                    onClick={() => moveSelectedComponentBackward()}
                  >
                    <ChevronDownIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={selectedElement === 0}
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
      </div>
    </>
  );
}