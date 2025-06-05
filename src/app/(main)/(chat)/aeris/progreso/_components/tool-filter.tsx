"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ToolFilterProps {
  searchValue: string;
  sortValue: "asc" | "desc";
  onSearchChange: (term: string) => void;
  onSortChange: (order: "asc" | "desc") => void;
}

export default function ToolFilter({
  searchValue,
  sortValue,
  onSearchChange,
  onSortChange,
}: ToolFilterProps) {
  return (
    <div className="dark:bg-accent/50 mb-6 flex flex-col justify-between gap-2 rounded-xl bg-slate-50 p-3 md:flex-row md:items-end md:gap-6">
      <div className="max-w-96 flex-1">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar en tus registros…"
            className="bg-background rounded-full pl-10 shadow-none"
          />
        </div>
      </div>

      <div className="w-40">
        <Select
          value={sortValue}
          onValueChange={(v) => onSortChange(v as "asc" | "desc")}
        >
          <SelectTrigger className="bg-background rounded-full shadow-none">
            <SelectValue placeholder="Más reciente" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Más reciente</SelectItem>
            <SelectItem value="asc">Más antiguo</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
