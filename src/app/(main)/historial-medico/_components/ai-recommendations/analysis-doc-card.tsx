"use client";

import { User, CheckCircle2, Circle, Tag } from "lucide-react";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { BetterTooltip } from "@/components/ui/tooltip";
import { cn } from "@/utils";

import { categoryColors, groupDocumentsByCategory } from "../../_lib/utils";

import type { MedicalHistory } from "@/db/querys/medical-history-querys";

interface AnalysisDocCardProps {
  documents: Array<MedicalHistory>;
  selectedDocuments: string[];
  onDocumentToggle: (documentId: string) => void;
  onCategoryToggle: (documentIds: string[]) => void;
}

const AnalysisDocCard = ({
  documents,
  selectedDocuments,
  onDocumentToggle,
  onCategoryToggle,
}: AnalysisDocCardProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const documentsByCategory = groupDocumentsByCategory(documents);
  const categories = Object.keys(documentsByCategory).sort();

  const getCategorySelectionState = (categoryDocs: MedicalHistory[]) => {
    const selectedCount = categoryDocs.filter((doc) =>
      selectedDocuments.includes(doc.id),
    ).length;
    const totalCount = categoryDocs.length;

    if (selectedCount === 0) return "none";
    if (selectedCount === totalCount) return "all";
    return "partial";
  };

  const handleCategorySelection = (categoryDocs: MedicalHistory[]) => {
    const documentIds = categoryDocs.map((doc) => doc.id);
    onCategoryToggle(documentIds);
  };

  const getCategoryIcon = (selectionState: string) => {
    switch (selectionState) {
      case "all":
        return <CheckCircle2 className="size-5 text-green-500" />;
      default:
        return <Circle className="text-alternative size-5" />;
    }
  };

  return (
    <>
      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={setOpenItems}
        className="space-y-4"
      >
        {categories.map((category) => {
          const categoryDocs = documentsByCategory[category];
          const selectionState = getCategorySelectionState(categoryDocs);
          const selectedCount = categoryDocs.filter((doc) =>
            selectedDocuments.includes(doc.id),
          ).length;
          const bgTag = categoryColors[category as keyof typeof categoryColors];

          return (
            <AccordionItem
              key={category}
              value={category}
              className={cn(
                "ring-alternative/80 bg-background/50 relative w-full rounded-xl text-left ring-2 backdrop-blur-md transition hover:shadow-md",
                selectionState === "all"
                  ? "bg-green-50 shadow-md ring-green-300 dark:bg-green-950/20 dark:ring-green-700"
                  : selectionState === "partial" && "ring-primary/60 shadow-md",
              )}
            >
              <div className="relative p-4">
                <AccordionTrigger className="p-0 hover:no-underline">
                  <div className="flex w-full items-center gap-4">
                    <div
                      className={cn(
                        "mask mask-squircle grid size-10 place-content-center",
                        bgTag,
                      )}
                    >
                      <Tag className="size-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <h3 className="font-semibold">{category}</h3>
                        <BetterTooltip
                          content={
                            selectionState === "all"
                              ? "Deseleccionar todo"
                              : "Seleccionar todo"
                          }
                        >
                          <div
                            role="button"
                            aria-label={
                              selectionState === "all"
                                ? "Deseleccionar todo"
                                : "Seleccionar todo"
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCategorySelection(categoryDocs);
                            }}
                            className="transition-transform hover:scale-105"
                          >
                            {getCategoryIcon(selectionState)}
                          </div>
                        </BetterTooltip>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {selectedCount} de {categoryDocs.length} documento
                        {categoryDocs.length !== 1 ? "s" : ""} seleccionado
                        {selectedCount !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
              </div>

              <AccordionContent className="space-y-3 p-4 pt-0">
                <div className="mb-3 flex items-center gap-2">
                  <div className="via-alternative h-px flex-1 bg-gradient-to-r from-transparent to-transparent" />
                  <span className="text-muted-foreground px-2 text-xs font-medium">
                    Documentos individuales ({categoryDocs.length})
                  </span>
                  <div className="via-alternative h-px flex-1 bg-gradient-to-r from-transparent to-transparent" />
                </div>

                {categoryDocs.map((document, index) => {
                  const isSelected = selectedDocuments.includes(document.id);

                  return (
                    <div
                      key={document.id}
                      className={cn(
                        "group border-alternative/80 bg-background/50 hover:bg-muted relative w-full rounded-lg border text-left backdrop-blur-md transition",
                        isSelected && "border-primary/60",
                      )}
                      onClick={() => onDocumentToggle(document.id)}
                    >
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <Checkbox
                              checked={isSelected}
                              onChange={() => onDocumentToggle(document.id)}
                              className="border-alternative"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <h4 className="truncate leading-tight font-medium">
                                {document.condition}
                              </h4>
                              <div className="bg-accent text-muted-foreground shrink-0 rounded-lg px-2 py-1 text-xs font-medium">
                                #{index + 1}
                              </div>
                            </div>

                            <div className="text-muted-foreground mb-2 flex items-center gap-1 text-xs">
                              <User className="h-3 w-3" />
                              {document.issuer}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      {selectedDocuments.length > 0 && (
        <div className="bg-background rounded-xl p-4">
          <div className="flex items-start gap-4">
            <div className="bg-premium flex size-8 items-center justify-center rounded-full">
              <CheckCircle2 className="size-4 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="mb-2 font-semibold">Resumen de selección</h4>
              <div className="grid gap-1 text-xs">
                <div>
                  <span className="text-muted-foreground">
                    {selectedDocuments.length} documento
                    {selectedDocuments.length !== 1 ? "s" : ""} seleccionado
                    {selectedDocuments.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">
                    {
                      categories.filter(
                        (cat) =>
                          getCategorySelectionState(
                            documentsByCategory[cat],
                          ) !== "none",
                      ).length
                    }{" "}
                    categoría{categories.length !== 1 ? "s" : ""} afectada
                    {categories.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Category breakdown */}
              <div className="mt-3 space-y-1">
                {categories
                  .filter(
                    (cat) =>
                      getCategorySelectionState(documentsByCategory[cat]) !==
                      "none",
                  )
                  .map((category) => {
                    const categoryDocs = documentsByCategory[category];
                    const selectedCount = categoryDocs.filter((doc) =>
                      selectedDocuments.includes(doc.id),
                    ).length;
                    const selectionState =
                      getCategorySelectionState(categoryDocs);

                    return (
                      <div
                        key={category}
                        className="flex items-center justify-between text-xs"
                      >
                        <span
                          className={cn(
                            "text-primary",
                            selectionState === "all" &&
                              "text-green-600 dark:text-green-400",
                          )}
                        >
                          {category}
                        </span>
                        <span
                          className={cn(
                            "text-primary font-medium",
                            selectionState === "all" &&
                              "text-green-600 dark:text-green-400",
                          )}
                        >
                          {selectedCount}/{categoryDocs.length}
                          {selectionState === "all" ? " ✓" : " ●"}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnalysisDocCard;
