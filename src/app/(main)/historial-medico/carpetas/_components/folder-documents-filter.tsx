import { Search } from "lucide-react";
import { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

import { Input } from "@/components/kit/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/kit/select";

import type { MedicalFileType } from "@/db/querys/medical-history-querys";

interface FolderDocumentFiltersProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  category: MedicalFileType | "all";
  setCategory: (v: MedicalFileType | "all") => void;
}

const FolderDocumentFilters = ({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
}: FolderDocumentFiltersProps) => {
  const [localInput, setLocalInput] = useState(searchTerm);
  const debouncedSetSearchTerm = useDebounceCallback(setSearchTerm, 150);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalInput(value);
    debouncedSetSearchTerm(value);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-48">
        <Search className="text-muted-foreground absolute top-2.5 left-2.5 size-4" />
        <Input
          value={localInput}
          onChange={handleChange}
          placeholder="Buscar en esta carpeta..."
          className="bg-background h-9 rounded-full pl-8 text-sm"
        />
      </div>
      <Select value={category} onValueChange={(v) => setCategory(v as any)}>
        <SelectTrigger className="bg-background w-56 rounded-full">
          <SelectValue placeholder="Tipo de documento" />
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
    </div>
  );
};

export default FolderDocumentFilters;
