import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RecommendationFiltersProps {
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  priorityFilter: string;
  setPriorityFilter: Dispatch<
    SetStateAction<"all" | "high" | "medium" | "low">
  >;
}

const RecommendationFilters = ({
  inputValue,
  onChange,
  priorityFilter,
  setPriorityFilter,
}: RecommendationFiltersProps) => {
  return (
    <>
      <div className="relative mr-auto w-56">
        <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
        <Input
          placeholder="Buscar recomendaciones..."
          className="bg-background h-9 rounded-full pl-8 text-sm shadow-none placeholder:text-sm"
          value={inputValue}
          onChange={onChange}
        />
      </div>
      <span className="text-muted-foreground text-sm">Ordenar</span>
      <Select
        value={priorityFilter}
        onValueChange={(value) => setPriorityFilter(value as any)}
      >
        <SelectTrigger className="bg-background w-48 rounded-full">
          <SelectValue placeholder="Filtrar por prioridad" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las prioridades</SelectItem>
          <SelectItem
            value="high"
            className="font-medium text-red-600 dark:text-red-500"
          >
            Prioridad alta
          </SelectItem>
          <SelectItem
            value="medium"
            className="font-medium text-amber-600 dark:text-amber-500"
          >
            Prioridad media
          </SelectItem>
          <SelectItem
            value="low"
            className="font-medium text-green-600 dark:text-green-500"
          >
            Prioridad baja
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default RecommendationFilters;
