export const getPlanType = (type: string) => {
  if (type === "premium") {
    return "Premium";
  } else if (type === "premium-plus") {
    return "Premium Plus";
  } else {
    return "Gratis";
  }
};
