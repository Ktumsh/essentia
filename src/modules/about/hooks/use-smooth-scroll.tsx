import { useCallback } from "react";

const useSmoothScroll = (sectionId: string) => {
  return useCallback(() => {
    document.querySelector(sectionId)?.scrollIntoView({ behavior: "smooth" });
  }, [sectionId]);
};

export default useSmoothScroll;
