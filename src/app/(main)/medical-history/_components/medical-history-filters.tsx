"use client";

import { Search, Filter, Check, X } from "lucide-react";
import { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

import { SparklesButton } from "@/components/button-kit/sparkles-button";
import { Badge } from "@/components/kit/badge";
import { Button } from "@/components/kit/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/kit/command";
import { Input } from "@/components/kit/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/kit/popover";
import { ScrollArea } from "@/components/kit/scroll-area";
import { MedicalHistoryWithTags } from "@/db/querys/medical-history-querys";
import { cn } from "@/lib/utils";

import { getTagColor } from "../_lib/utils";

interface MedicalHistoryFiltersProps {
  medicalTags: { id: string; name: string }[];
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearFilters: () => void;
  getTagCount: (tag: string) => number;
  filteredHistory: MedicalHistoryWithTags[];
  onAIClick: (itemIds: string[]) => void;
}

const MedicalHistoryFilters = ({
  medicalTags,
  selectedTags,
  setSelectedTags,
  searchTerm,
  setSearchTerm,
  clearFilters,
  getTagCount,
  filteredHistory,
  onAIClick,
}: MedicalHistoryFiltersProps) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  const debouncedSetSearchTerm = useDebounceCallback(setSearchTerm, 150);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetSearchTerm(value);
  };

  const toggleTagFilter = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div className="dark:bg-accent/50 flex flex-col items-start gap-3 rounded-xl bg-slate-50 p-3 sm:flex-row">
      <div className="relative w-full shrink-0 sm:w-64">
        <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
        <Input
          placeholder="Buscar documentos..."
          className="bg-background h-9 rounded-full pl-8 text-sm shadow-none placeholder:text-sm"
          value={inputValue}
          onChange={handleChange}
        />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            radius="full"
            variant="outline"
            className="bg-background flex items-center gap-2"
          >
            <Filter className="h-4 w-4" /> Filtrar por etiquetas
            {selectedTags.length > 0 && (
              <Badge className="dark:bg-alternative/50 text-foreground/80 ml-1 size-5 px-1 text-[11px]">
                {selectedTags.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command className="bg-transparent">
            <CommandInput placeholder="Buscar etiqueta..." />
            <CommandList>
              <CommandEmpty>No se encontraron etiquetas.</CommandEmpty>
              <CommandGroup>
                <ScrollArea className="h-[200px]">
                  {medicalTags.map((tag) => (
                    <CommandItem
                      key={tag.id}
                      onSelect={() => toggleTagFilter(tag.name)}
                      className="cursor-pointer"
                    >
                      <div
                        className={cn(
                          "dark:border-alternative mr-2 flex size-4 shrink-0 items-center justify-center rounded-[6px] border border-slate-300 p-1",
                          selectedTags.includes(tag.name)
                            ? "bg-primary border-primary!"
                            : "opacity-50",
                        )}
                      >
                        {selectedTags.includes(tag.name) && (
                          <Check className="text-primary-foreground size-3" />
                        )}
                      </div>
                      <span>{tag.name}</span>
                      <span className="text-muted-foreground ml-auto text-xs">
                        {getTagCount(tag.name)}
                      </span>
                    </CommandItem>
                  ))}
                </ScrollArea>
              </CommandGroup>
            </CommandList>
            <div className="border-t">
              <Button
                variant="ghost"
                size="sm"
                radius="none"
                className="w-full justify-center"
                onClick={clearFilters}
              >
                Limpiar filtros
              </Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
      {/* Etiquetas seleccionadas */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className={cn("flex items-center gap-1", getTagColor(tag))}
            >
              {tag}
              <button
                onClick={() => toggleTagFilter(tag)}
                className="ml-1 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10"
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      {filteredHistory.length > 0 && selectedTags.length > 0 && (
        <SparklesButton
          onClick={() => onAIClick(filteredHistory.map((item) => item.id))}
          className="ml-auto"
        >
          Analizar selección
        </SparklesButton>
      )}
    </div>
  );
};

export default MedicalHistoryFilters;
