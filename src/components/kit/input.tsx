import { ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

import { cn } from "@/utils";

import { Button } from "./button";

function Input({
  className,
  type,
  isAuth,
  isPassword,
  ...props
}: React.ComponentProps<"input"> & { isAuth?: boolean; isPassword?: boolean }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground file:bg-accent flex h-10 w-full min-w-0 rounded-full border bg-transparent px-3 py-1 text-sm transition-[color,box-shadow] outline-none file:mt-1 file:mr-4 file:inline-flex file:h-6 file:cursor-pointer file:rounded-sm file:border-0 file:px-2 file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:h-9 md:file:mt-px",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        isAuth &&
          "dark:bg-accent/50! bg-accent! dark:border-alternative/50 h-11! rounded-lg!",
        isPassword && "pr-10",
        className,
      )}
      {...props}
    />
  );
}

export { Input };

export interface NumberInputProps
  extends Omit<NumericFormatProps, "value" | "onValueChange"> {
  stepper?: number;
  thousandSeparator?: string;
  placeholder?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  value?: number | null;
  suffix?: string;
  prefix?: string;
  onValueChange?: (value: number | undefined) => void;
  fixedDecimalScale?: boolean;
  decimalScale?: number;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      stepper,
      thousandSeparator,
      placeholder,
      defaultValue,
      min = -Infinity,
      max = Infinity,
      onValueChange,
      fixedDecimalScale = false,
      decimalScale = 0,
      suffix,
      prefix,
      value: controlledValue,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = React.useState<number | null | undefined>(
      controlledValue ?? defaultValue,
    );

    const handleIncrement = React.useCallback(() => {
      setValue((prev) =>
        prev === undefined
          ? (stepper ?? 1)
          : Math.min(prev! + (stepper ?? 1), max),
      );
    }, [stepper, max]);

    const handleDecrement = React.useCallback(() => {
      setValue((prev) =>
        prev === undefined
          ? -(stepper ?? 1)
          : Math.max(prev! - (stepper ?? 1), min),
      );
    }, [stepper, min]);

    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (
          document.activeElement ===
          (ref as React.RefObject<HTMLInputElement>).current
        ) {
          if (e.key === "ArrowUp") {
            handleIncrement();
          } else if (e.key === "ArrowDown") {
            handleDecrement();
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [handleIncrement, handleDecrement, ref]);

    React.useEffect(() => {
      if (controlledValue !== undefined) {
        setValue(controlledValue);
      }
    }, [controlledValue]);

    const handleChange = (values: {
      value: string;
      floatValue: number | undefined;
    }) => {
      const newValue =
        values.floatValue === undefined ? undefined : values.floatValue;
      setValue(newValue);
      if (onValueChange) {
        onValueChange(newValue);
      }
    };

    const handleBlur = () => {
      if (value !== undefined) {
        if (value! < min) {
          setValue(min);
          (ref as React.RefObject<HTMLInputElement>).current!.value =
            String(min);
        } else if (value! > max) {
          setValue(max);
          (ref as React.RefObject<HTMLInputElement>).current!.value =
            String(max);
        }
      }
    };

    return (
      <div className="flex items-center">
        <NumericFormat
          value={value}
          onValueChange={handleChange}
          thousandSeparator={thousandSeparator}
          decimalScale={decimalScale}
          fixedDecimalScale={fixedDecimalScale}
          allowNegative={min < 0}
          valueIsNumericString
          onBlur={handleBlur}
          max={max}
          min={min}
          suffix={suffix}
          prefix={prefix}
          customInput={Input}
          placeholder={placeholder}
          className="relative [appearance:textfield] rounded-r-none! [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          getInputRef={ref}
          {...props}
        />

        <div className="flex h-12 flex-col rounded-r-xl border border-l-0 md:h-9 md:rounded-r-md">
          <Button
            variant="ghost"
            aria-label="Incrementar valor"
            className="h-auto! flex-1 rounded-l-none rounded-br-none border-b p-0 px-2 focus-visible:relative"
            onClick={handleIncrement}
            disabled={value === max}
          >
            <ChevronUp className="size-3.5!" />
          </Button>
          <Button
            variant="ghost"
            aria-label="Disminuir valor"
            className="h-auto! flex-1 rounded-l-none rounded-tr-none p-0 px-2 focus-visible:relative"
            onClick={handleDecrement}
            disabled={value === min}
          >
            <ChevronDown className="size-3.5!" />
          </Button>
        </div>
      </div>
    );
  },
);

NumberInput.displayName = "NumberInput";
