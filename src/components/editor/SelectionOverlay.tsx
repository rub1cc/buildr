export const SelectionOverlay = ({ id }: { id: string }) => {
  if (typeof window === "undefined") return null;

  const el = document.getElementById(id);
  if (!el) return null;

  const { top, left, width, height } = el.getBoundingClientRect();

  const containerRect =
    typeof window !== "undefined"
      ? document.getElementById("frame").getBoundingClientRect()
      : null;

  return (
    <div
      className="absolute z-50 border-2 border-purple-500 cursor-move pointer-events-none"
      style={{
        top: top - (containerRect?.top || 0) + "px",
        left: left - (containerRect?.left || 0) + "px",
        width: width + "px",
        height: height + "px",
      }}
    ></div>
  );
};
