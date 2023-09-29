import { replace } from "@/lib/replace";
import { reorder } from "@/lib/reorder";

import {
  Component,
  ComponentProps,
  EditorConfig,
  EditorData,
  Story,
} from "@/lib/types";
import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type EditorContextState = {
  stories: Story[];
  selectedStory: number | null;
  setSelectedStory: (index: number) => void;

  data: EditorData;
  config: EditorConfig;
  selectedElement: number | null;
  setSelectedElement: (index: number) => void;

  addComponent: (name: string) => void;
  duplicateSelectedComponent: () => void;
  deleteSelectedComponent: () => void;
  updateSelectedComponent: (newProps: ComponentProps) => void;
  moveSelectedComponentForward: () => void;
  moveSelectedComponentToFront: () => void;
  moveSelectedComponentBackward: () => void;
  moveSelectedComponentToBack: () => void;
};

const editorContext = createContext<EditorContextState | null>(null);

export const useEditor = () => {
  const ctx = useContext(editorContext);
  if (typeof ctx === "undefined") {
    throw new Error("useEditor must be called inside EditorProvider");
  }
  return ctx;
};

type EditorProviderProps = {
  children: ReactElement;
  stories: Story[];
  config: EditorConfig;
  onChange: (data: Story[]) => void;
};

export const EditorProvider = ({
  children,
  stories: initalStories,
  config,
  onChange,
}: EditorProviderProps) => {
  const [data, setData] = useState<Story | null>(initalStories[0]);
  const [stories, setStories] = useState<Story[]>(initalStories);

  const [selectedStory, setSelectedStory] = useState<number | null>(0);
  const [selectedElement, setSelectedElement] = useState<number | null>(null);

  useEffect(() => {
    onChange && onChange(stories);
  }, [stories]);

  useEffect(() => {
    selectedStory !== null && setStories(replace(stories, selectedStory, data));
  }, [data]);

  const handleSelectStory = (index: number) => {
    setSelectedStory(index);
    setData(stories[index]);
  };

  const addComponent = (name: string) => {
    const newData = { ...data };
    const newComponent = {
      type: name,
      props: {
        ...config.components[name].defaultProps,
        id: `${name}-${new Date().getTime()}`,
      },
    };
    newData.content.push(newComponent as Component);
    setData(newData);
    setTimeout(() => {
      setSelectedElement(data.content.length - 1);
    }, 0);
  };

  const duplicateSelectedComponent = () => {
    if (selectedElement === null) return null;
    const newData = { ...data };
    const id = `${
      newData.content[selectedElement]?.type
    }-${new Date().getTime()}`;
    console.log(newData.content[selectedElement].props);
    const newItem = {
      ...newData.content[selectedElement],
      props: {
        ...newData.content[selectedElement].props,
        top:
          newData.content[selectedElement].props.top +
          Number(newData.content[selectedElement].props.height.value),
        id,
      },
    };
    newData.content.splice(selectedElement + 1, 0, newItem);
    setData(newData);
    setTimeout(() => {
      setSelectedElement(selectedElement + 1);
    }, 0);
  };

  const deleteSelectedComponent = () => {
    if (selectedElement === null) return null;
    const newData = { ...data };
    newData.content.splice(selectedElement, 1);
    setData(newData);
    setSelectedElement(null);
  };

  const updateSelectedComponent = (newProps: ComponentProps) => {
    if (selectedElement === null) return null;
    setData({
      ...data,
      content: replace(data.content, selectedElement, {
        ...data.content[selectedElement],
        props: newProps,
      }),
    });
  };

  const moveSelectedComponentForward = () => {
    if (selectedElement === null || selectedElement === data.content.length - 1)
      return;
    setData({
      ...data,
      content: reorder(data.content, selectedElement, selectedElement + 1),
    });
    setTimeout(() => {
      setSelectedElement(selectedElement + 1);
    }, 0);
  };

  const moveSelectedComponentToFront = () => {
    if (selectedElement === null || selectedElement === data.content.length - 1)
      return;
    setData({
      ...data,
      content: reorder(data.content, selectedElement, data.content.length - 1),
    });
    setTimeout(() => {
      setSelectedElement(data.content.length - 1);
    }, 0);
  };

  const moveSelectedComponentBackward = () => {
    if (selectedElement === null || selectedElement === 0) return;
    setData({
      ...data,
      content: reorder(data.content, selectedElement, selectedElement - 1),
    });
    setTimeout(() => {
      setSelectedElement(selectedElement - 1);
    }, 0);
  };

  const moveSelectedComponentToBack = () => {
    if (selectedElement === null || selectedElement === 0) return;
    setData({
      ...data,
      content: reorder(data.content, selectedElement, 0),
    });
    setTimeout(() => {
      setSelectedElement(0);
    }, 0);
  };

  return (
    <editorContext.Provider
      value={{
        config,
        stories,
        data,

        selectedStory,
        setSelectedStory: handleSelectStory,

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
      }}
    >
      {children}
    </editorContext.Provider>
  );
};
