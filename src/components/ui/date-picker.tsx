"use client";
import { isFuture, set } from "date-fns";
import { useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/utils/common";

interface DatePickerProps {
  startYear: number;
  endYear: number;
  selected: Date;
  onSelect: (date: Date) => void;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  startYear,
  endYear,
  selected,
  onSelect,
  className,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleDayChange = (day: string) => {
    const newDate = set(selected, { date: parseInt(day) });

    if (isFuture(newDate)) {
      setError("La fecha seleccionada no puede ser futura.");
    } else {
      setError(null);
      onSelect(newDate);
    }
  };

  const handleMonthChange = (month: string) => {
    const newMonthIndex = meses.indexOf(month);
    const newDate = set(selected, { month: newMonthIndex });

    if (isFuture(newDate)) {
      setError("La fecha seleccionada no puede ser futura.");
    } else {
      setError(null);
      onSelect(newDate);
    }
  };

  const handleYearChange = (year: string) => {
    const newDate = set(selected, { year: parseInt(year) });

    if (isFuture(newDate)) {
      setError("La fecha seleccionada no puede ser futura.");
    } else {
      setError(null);
      onSelect(newDate);
    }
  };

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return (
    <div className="w-full space-y-2">
      <div className="grid min-h-14 grid-cols-3 gap-4 dark:text-white">
        <Select onValueChange={handleDayChange}>
          <SelectTrigger
            className={cn(
              "h-auto border-gray-200 shadow-sm focus:outline-0 focus:ring-0 focus:ring-offset-0 dark:border-dark",
              className,
            )}
          >
            <SelectValue
              placeholder={
                <div className="flex flex-col items-start">
                  <span className="text-[0.65rem] font-semibold uppercase text-main-m dark:text-main-dark-m">
                    Día
                  </span>
                  <span className="font-normal dark:text-white">
                    {selected.getDate() || "-"}
                  </span>
                </div>
              }
            />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-48">
              {Array.from({ length: 31 }, (_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {i + 1}
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>

        <Select onValueChange={handleMonthChange}>
          <SelectTrigger
            className={cn(
              "h-auto border-gray-200 shadow-sm focus:outline-0 focus:ring-0 focus:ring-offset-0 dark:border-dark",
              className,
            )}
          >
            <SelectValue
              placeholder={
                <div className="flex flex-col items-start">
                  <span className="text-[0.65rem] font-semibold uppercase text-main-m dark:text-main-dark-m">
                    Mes
                  </span>
                  <span className="font-normal dark:text-white">
                    {meses[selected.getMonth()] || "-"}
                  </span>
                </div>
              }
            />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-48">
              {meses.map((mes, index) => (
                <SelectItem key={index} value={mes}>
                  {mes}
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>

        <Select onValueChange={handleYearChange}>
          <SelectTrigger
            className={cn(
              "h-auto border-gray-200 shadow-sm focus:outline-0 focus:ring-0 focus:ring-offset-0 dark:border-dark",
              className,
            )}
          >
            <SelectValue
              placeholder={
                <div className="flex flex-col items-start">
                  <span className="text-[0.65rem] font-semibold uppercase text-main-m dark:text-main-dark-m">
                    Año
                  </span>
                  <span className="font-normal dark:text-white">
                    {selected.getFullYear() || "-"}
                  </span>
                </div>
              }
            />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-48">
              {Array.from({ length: endYear - startYear + 1 }, (_, i) => (
                <SelectItem
                  key={i + startYear}
                  value={(endYear - i).toString()}
                >
                  {endYear - i}
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
      </div>
      {error && (
        <div className="text-[0.8rem] font-medium text-red-500">{error}</div>
      )}
    </div>
  );
};

export default DatePicker;