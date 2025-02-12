"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

import { cn } from "@/utils/common";

import { Button } from "./button";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { isAuth?: boolean }
>(({ className, type, isAuth, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "file:text-main placeholder:text-main-m focus-visible:ring-danger dark:border-accent-dark/50 dark:md:border-dark dark:file:text-main-dark dark:placeholder:text-main-dark-m dark:focus-visible:ring-danger flex h-12 w-full rounded-xl border border-gray-200 bg-transparent! px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:h-9 md:rounded-md",
        isAuth &&
          "dark:bg-full-dark dark:md:bg-dark/50 h-11 rounded-lg border-none bg-white shadow-none md:border md:bg-gray-100",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

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

        <div className="dark:border-accent-dark/50 dark:md:border-dark flex h-12 flex-col rounded-r-xl border border-l-0 border-gray-200 shadow-xs md:h-9 md:rounded-r-md">
          <Button
            variant="ghost"
            aria-label="Increase value"
            className="dark:border-accent-dark/50 dark:md:border-dark h-full rounded-l-none rounded-br-none border-b border-gray-200 p-0 px-2 focus-visible:relative"
            onClick={handleIncrement}
            disabled={value === max}
          >
            <ChevronUp size={15} />
          </Button>
          <Button
            variant="ghost"
            aria-label="Decrease value"
            className="h-full rounded-l-none rounded-tr-none p-0 px-2 focus-visible:relative"
            onClick={handleDecrement}
            disabled={value === min}
          >
            <ChevronDown size={15} />
          </Button>
        </div>
      </div>
    );
  },
);

NumberInput.displayName = "NumberInput";

export { Input };
