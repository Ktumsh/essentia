export const getResourceColor = (
  index: number,
  colorType: "gradient" | "background" | "text",
): string => {
  const colorMap: {
    gradient: { [key: number]: string };
    background: { [key: number]: string };
    text: { [key: number]: string };
  } = {
    gradient: {
      0: "from-emerald-600 to-emerald-500",
      1: "from-fuchsia-600 to-fuchsia-500",
      2: "from-yellow-500 to-yellow-400",
      3: "from-blue-600 to-blue-500",
      4: "from-rose-600 to-rose-500",
      5: "from-lime-600 to-lime-500",
    },
    background: {
      0: "bg-emerald-100 dark:bg-emerald-950",
      1: "bg-fuchsia-100 dark:bg-fuchsia-950",
      2: "bg-yellow-100 dark:bg-yellow-950",
      3: "bg-blue-100 dark:bg-blue-950",
      4: "bg-rose-100 dark:bg-rose-950",
      5: "bg-lime-100 dark:bg-lime-950",
    },
    text: {
      0: "text-emerald-600",
      1: "text-fuchsia-600",
      2: "text-yellow-500",
      3: "text-blue-600",
      4: "text-rose-600",
      5: "text-lime-600",
    },
  };

  return colorMap[colorType][index];
};

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
