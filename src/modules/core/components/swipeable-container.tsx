import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { useSwipeable } from "react-swipeable";

interface SwipeableContainerProps {
  onSwipedLeft: () => void;
  onSwipedRight: () => void;
  isMenuOpen: boolean;
  children: ReactNode;
}

const SwipeableContainer = ({
  onSwipedLeft,
  onSwipedRight,
  isMenuOpen,
  children,
}: SwipeableContainerProps) => {
  const handlers = useSwipeable({
    onSwipedLeft,
    onSwipedRight,
    trackMouse: true,
  });

  return (
    <div
      {...handlers}
      className={cn(
        "absolute inset-0 size-full transition-all block md:hidden",
        isMenuOpen ? "z-[100] duration-0" : "z-10 delay-[400ms] duration-0"
      )}
    >
      {children}
    </div>
  );
};

export default SwipeableContainer;
