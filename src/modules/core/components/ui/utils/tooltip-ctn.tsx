import * as _nextui_org_aria_utils from "@nextui-org/aria-utils";
import { ReactNode } from "react";
import { Tooltip } from "@nextui-org/react";
import { tooltipStyles } from "@/styles/tooltip-styles";
import { cn } from "@/utils/common";

interface TooltipProps {
  content: string | null | undefined;
  delay?: number;
  closeDelay?: number;
  showArrow?: boolean;
  placement?: _nextui_org_aria_utils.OverlayPlacement;
  children: ReactNode;
  baseClass?: string;
  contentClass?: string;
}

const TooltipCTN: React.FC<TooltipProps> = ({
  content,
  delay = 800,
  closeDelay = 0,
  showArrow = false,
  placement,
  children,
  baseClass,
  contentClass,
  ...props
}) => {
  return (
    <Tooltip
      content={content}
      delay={delay}
      closeDelay={closeDelay}
      showArrow={showArrow}
      placement={placement}
      classNames={{
        base: cn(tooltipStyles.arrow, baseClass),
        content: cn(tooltipStyles.content, contentClass),
      }}
      {...props}
    >
      {children}
    </Tooltip>
  );
};

export default TooltipCTN;
