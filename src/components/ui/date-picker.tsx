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
import { cn } from "@/utils";

interface DatePickerProps {
  startYear: number;
  endYear: number;
  selected: Date;
  onSelect: (date: Date) => void;
  className?: string;
  disablePortal?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  startYear,
  endYear,
  selected,
  onSelect,
  className,
  disablePortal = false,
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
      <div className="grid min-h-14 grid-cols-3 gap-4">
        <Select onValueChange={handleDayChange}>
          <SelectTrigger
            className={cn(
              "h-auto focus:ring-0 focus:ring-offset-0 focus:outline-0",
              className,
            )}
          >
            <SelectValue
              placeholder={
                <div className="flex flex-col items-start">
                  <span className="text-muted-foreground text-[0.65rem] font-semibold uppercase">
                    Día
                  </span>
                  <span className="text-foreground font-normal">
                    {selected.getDate() || "-"}
                  </span>
                </div>
              }
            />
          </SelectTrigger>
          <SelectContent disablePortal={disablePortal}>
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
              "h-auto focus:ring-0 focus:ring-offset-0 focus:outline-0",
              className,
            )}
          >
            <SelectValue
              placeholder={
                <div className="flex flex-col items-start">
                  <span className="text-muted-foreground text-[0.65rem] font-semibold uppercase">
                    Mes
                  </span>
                  <span className="text-foreground font-normal">
                    {meses[selected.getMonth()] || "-"}
                  </span>
                </div>
              }
            />
          </SelectTrigger>
          <SelectContent disablePortal={disablePortal}>
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
              "h-auto focus:ring-0 focus:ring-offset-0 focus:outline-0",
              className,
            )}
          >
            <SelectValue
              placeholder={
                <div className="flex flex-col items-start">
                  <span className="text-muted-foreground text-[0.65rem] font-semibold uppercase">
                    Año
                  </span>
                  <span className="text-foreground font-normal">
                    {selected.getFullYear() || "-"}
                  </span>
                </div>
              }
            />
          </SelectTrigger>
          <SelectContent disablePortal={disablePortal}>
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
