export const getProgressColor = (value: number) => {
  if (value === 0) return "bg-transparent";
  if (value <= 25) return "bg-red-500";
  if (value <= 50) return "bg-amber-500";
  if (value <= 75) return "bg-lime-500";
  return "bg-green-500";
};
