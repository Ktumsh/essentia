import { ChevronRight, LucideProps } from "lucide-react";
import {
  createElement,
  Dispatch,
  ForwardRefExoticComponent,
  memo,
  RefAttributes,
  SetStateAction,
} from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/common";

interface InfoFieldProps {
  title: string;
  value?: any;
  hasValue?: boolean;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  suffix?: string;
  isButton?: boolean;
  hasBorder?: boolean;
  isDanger?: boolean;
  className?: string;
  buttonAction?: () => void | Dispatch<SetStateAction<boolean>>;
}

const InfoField = ({
  title,
  value,
  hasValue = true,
  icon,
  suffix = "",
  isButton = false,
  hasBorder = false,
  isDanger = false,
  className,
  buttonAction,
}: InfoFieldProps) => {
  return (
    <li
      className={cn({ "border-t border-gray-200 dark:border-dark": hasBorder })}
    >
      {isButton ? (
        <Button
          variant="ghost"
          fullWidth
          radius="none"
          className={cn(
            "h-auto min-h-11 justify-between px-6 py-3 text-main-h hover:text-main dark:text-main-dark dark:hover:text-white md:px-4 md:py-2",
            {
              "bg-red-50 text-red-500! hover:bg-red-50 hover:text-red-500 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-950":
                isDanger,
            },
            className,
          )}
          onClick={buttonAction}
        >
          <div className="flex items-center gap-4">
            {icon && createElement(icon, { className: "size-4 shrink-0" })}
            <div className="flex flex-col items-start">
              <span>{title}</span>
              {hasValue && (
                <p className="text-wrap text-start font-normal text-main-m dark:text-main-dark-m">
                  {value ? `${value}${suffix}` : "Sin información"}
                </p>
              )}
            </div>
          </div>
          <ChevronRight className="size-4 shrink-0 text-main-h dark:text-main-dark-h" />
        </Button>
      ) : (
        <div
          className={cn(
            "inline-flex h-auto min-h-11 w-full items-center justify-between px-6 py-3 text-sm font-medium text-main-h dark:text-main-dark md:px-4 md:py-2",
            {
              "bg-red-50 text-red-500! hover:bg-red-50 hover:text-red-500 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-950":
                isDanger,
            },
            className,
          )}
        >
          <div className="flex items-center gap-4">
            {icon && createElement(icon, { className: "size-4 shrink-0" })}
            <div className="flex flex-col items-start">
              <span>{title}</span>
              {hasValue && (
                <p className="font-normal text-main-m dark:text-main-dark-m">
                  {value ? `${value} ${suffix}` : "Sin información"}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default memo(InfoField, (prevProps, nextProps) => {
  if (prevProps.value !== nextProps.value) return false;

  return true;
});
