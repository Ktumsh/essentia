import { useEffect, RefObject, Dispatch, SetStateAction } from "react";

const useScrollCheck = (
  containerRef: RefObject<HTMLElement | null>,
  setHasScroll: Dispatch<SetStateAction<boolean>>,
) => {
  useEffect(() => {
    const checkScroll = () => {
      if (containerRef.current) {
        setHasScroll(
          containerRef.current.scrollWidth > containerRef.current.clientWidth,
        );
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [containerRef, setHasScroll]);
};

export default useScrollCheck;
