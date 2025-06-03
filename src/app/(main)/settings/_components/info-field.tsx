import { ChevronRight, LucideProps } from "lucide-react";
import {
  createElement,
  Dispatch,
  ForwardRefExoticComponent,
  memo,
  RefAttributes,
  SetStateAction,
} from "react";

import { Button } from "@/components/kit/button";
import { cn } from "@/utils";

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
      className={cn({
        "border-border border-t": hasBorder,
      })}
    >
      {isButton ? (
        <Button
          variant="ghost"
          fullWidth
          radius="none"
          className={cn(
            "text-foreground h-auto min-h-11 justify-between px-6! py-3 md:px-4! md:py-2",
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
              <span className="leading-normal">{title}</span>
              {hasValue && (
                <p
                  className={cn(
                    "text-muted-foreground text-start leading-normal font-normal text-wrap",
                    {
                      "text-foreground": isDanger,
                    },
                  )}
                >
                  {value ? `${value}${suffix}` : "Sin información"}
                </p>
              )}
            </div>
          </div>
          <ChevronRight className="text-foreground/80 size-4 shrink-0" />
        </Button>
      ) : (
        <div
          className={cn(
            "text-foreground inline-flex h-auto min-h-11 w-full items-center justify-between px-6 py-3 text-sm font-medium md:px-4 md:py-2",
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
                <p className="text-muted-foreground font-normal">
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
