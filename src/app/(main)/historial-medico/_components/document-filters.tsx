import { Check, ChevronDown, Search, TagIcon } from "lucide-react";

import { Badge } from "@/components/kit/badge";
import { Button } from "@/components/kit/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/kit/command";
import { Input } from "@/components/kit/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/kit/popover";
import { ScrollArea } from "@/components/kit/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/kit/select";
import { cn } from "@/lib/utils";

import type { MedicalFileType } from "@/db/querys/medical-history-querys";

interface DocumentFiltersProps {
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedTags: string[];
  onToggleTagFilter: (tag: string) => void;
  clearFilters: () => void;
  documentTypeFilter: "updated" | "recent" | "old";
  setDocumentTypeFilter: (value: "updated" | "recent" | "old") => void;
  documentCategoryFilter: MedicalFileType | "all";
  setDocumentCategoryFilter: (value: MedicalFileType | "all") => void;
  medicalTags: { id: string; name: string }[];
  getTagCount: (tag: string) => number;
}

const DocumentFilters = ({
  inputValue,
  onChange,
  selectedTags,
  onToggleTagFilter,
  clearFilters,
  documentTypeFilter,
  setDocumentTypeFilter,
  documentCategoryFilter,
  setDocumentCategoryFilter,
  medicalTags,
  getTagCount,
}: DocumentFiltersProps) => {
  return (
    <>
      <div className="relative mr-auto w-56">
        <Search className="text-muted-foreground absolute top-2.5 left-2.5 size-4" />
        <Input
          placeholder="Buscar documentos..."
          className="bg-background h-9 rounded-full pl-8 text-sm shadow-none placeholder:text-sm"
          value={inputValue}
          onChange={onChange}
        />
      </div>
      <span className="text-muted-foreground text-sm">Ordenar</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            radius="full"
            variant="outline"
            className="bg-background flex items-center gap-2 font-normal"
          >
            <TagIcon className="size-3.5" /> Por etiquetas
            {selectedTags.length > 0 && (
              <Badge className="dark:bg-alternative/50 text-foreground/80 text-xxs size-4">
                {selectedTags.length}
              </Badge>
            )}
            <ChevronDown className="text-muted-foreground opacity-50" />
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
                      onSelect={() => onToggleTagFilter(tag.name)}
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
                className="w-full justify-center font-normal"
                onClick={clearFilters}
              >
                Limpiar filtros
              </Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
      <Select
        value={documentTypeFilter}
        onValueChange={(value) => setDocumentTypeFilter(value as any)}
      >
        <SelectTrigger className="bg-background w-40 rounded-full">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="updated">Más actualizados</SelectItem>
          <SelectItem value="recent">Más nuevos</SelectItem>
          <SelectItem value="old">Más antiguos</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={documentCategoryFilter}
        onValueChange={(value) => setDocumentCategoryFilter(value as any)}
      >
        <SelectTrigger className="bg-background w-40 rounded-full">
          <SelectValue placeholder="Filtrar por tipo de documento" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los tipos</SelectItem>
          <SelectItem value="Examen">Examen</SelectItem>
          <SelectItem value="Receta">Receta</SelectItem>
          <SelectItem value="Informe">Informe</SelectItem>
          <SelectItem value="Diagnóstico">Diagnóstico</SelectItem>
          <SelectItem value="Imagenología">Imagenología</SelectItem>
          <SelectItem value="Certificado">Certificado</SelectItem>
          <SelectItem value="Epicrisis">Epicrisis</SelectItem>
          <SelectItem value="Consentimiento">Consentimiento</SelectItem>
          <SelectItem value="Otro">Otro</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default DocumentFilters;
