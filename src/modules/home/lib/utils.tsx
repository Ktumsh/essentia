export const getItemBackgroundColor = (id: number): string => {
  const colorMap: Record<number, string> = {
    1: "bg-amber-400",
    2: "bg-red-500",
    3: "bg-indigo-500",
    4: "bg-lime-500",
    5: "bg-blue-500",
    6: "bg-pink-500",
  };

  return colorMap[id];
};
