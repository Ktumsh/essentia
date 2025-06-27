"use client";

import { Tag, CheckCircle2 } from "lucide-react";

import { cn } from "@/utils";

import { getTagColor } from "../../_lib/utils";

import type { MedicalHistory } from "@/db/querys/medical-history-querys";

interface CategorySelectorProps {
  documents: Array<MedicalHistory>;
  selectedCategories: string[];
  onCategorySelectorToggle: (category: string) => void;
  allCategories: Record<string, number>;
}

const CategorySelector = ({
  documents,
  selectedCategories,
  onCategorySelectorToggle,
  allCategories,
}: CategorySelectorProps) => {
  const categories = Object.keys(allCategories).sort();

  return (
    <div className="space-y-4">
      <div className="space-y-2 text-center">
        <h2 className="text-lg font-semibold">Selecciona las categorías</h2>
        <p className="text-muted-foreground text-sm">
          Elige las especialidades médicas que quieres incluir en el análisis
        </p>
      </div>

      <div className="space-y-3">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          const documentCount = allCategories[category];
          const bg = getTagColor(category);

          return (
            <button
              key={category}
              onClick={() => onCategorySelectorToggle(category)}
              className={cn(
                "border-alternative/80 bg-background/50 relative w-full rounded-xl border-2 p-4 text-left backdrop-blur-md transition hover:shadow-md",
                isSelected &&
                  "border-green-300 bg-green-50 shadow-md dark:border-green-700 dark:bg-green-950/20",
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "mask mask-squircle grid size-10 place-content-center",
                    bg,
                  )}
                >
                  <Tag className="h-5 w-5 text-white" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{category}</h3>
                    {isSelected && (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {documentCount} documento{documentCount !== 1 ? "s" : ""}
                  </p>
                </div>

                {isSelected && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {selectedCategories.length > 0 && (
        <div className="bg-background rounded-xl p-4">
          <p className="flex justify-between gap-2 text-xs">
            <span>
              <strong>{selectedCategories.length}</strong> categoría
              {selectedCategories.length !== 1 ? "s" : ""} seleccionada
              {selectedCategories.length !== 1 ? "s" : ""}
            </span>
            <span>
              <strong>
                {
                  documents.filter((doc) =>
                    doc.tags.some((tag) => selectedCategories.includes(tag)),
                  ).length
                }
              </strong>{" "}
              documentos incluidos
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
