export const getUnitValue = (obj: { unit: string; value: number }) => {
  if (obj?.unit === "auto") {
    return "auto";
  }
  return obj?.value + obj?.unit;
};
