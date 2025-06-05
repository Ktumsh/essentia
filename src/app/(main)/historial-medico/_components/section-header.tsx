"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { DeleteButton } from "@/components/button-kit/delete-button";
import { FolderInputButton } from "@/components/button-kit/folder-input-button";
import { Button } from "@/components/ui/button";
import { BetterTooltip } from "@/components/ui/tooltip";
import { cn } from "@/utils";

interface SelectionHeaderProps {
  activeTab: "documents" | "recommendations";
  isDocumentSelected: boolean;
  isRecommendationSelected: boolean;
  documentCount: number;
  recommendationCount: number;
  onClearDocuments: () => void;
  onClearRecommendations: () => void;
  onDeleteDocuments: () => void;
  onDeleteRecommendations: () => void;
  onMoveDocuments: () => void;
}

const SelectionHeader = ({
  activeTab,
  isDocumentSelected,
  isRecommendationSelected,
  documentCount,
  recommendationCount,
  onClearDocuments,
  onClearRecommendations,
  onDeleteDocuments,
  onDeleteRecommendations,
  onMoveDocuments,
}: SelectionHeaderProps) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {activeTab === "documents" && isDocumentSelected ? (
        <motion.div
          key="documents-selected"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "bg-muted mt-6 flex h-9 items-center gap-2 rounded-full px-1",
          )}
        >
          <BetterTooltip content="Deseleccionar todo">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClearDocuments}
              className="hover:bg-alternative bg-alternative/50 size-7"
            >
              <X className="size-3.5!" />
            </Button>
          </BetterTooltip>
          <h3 className="text-base font-medium">
            {documentCount} documentos seleccionados
          </h3>
          <BetterTooltip content="Eliminar selección">
            <DeleteButton
              variant="ghost"
              size="icon"
              onClick={onDeleteDocuments}
              className="size-7 text-red-500! hover:bg-red-50 dark:hover:bg-red-950"
            >
              <span className="sr-only">Eliminar selección</span>
            </DeleteButton>
          </BetterTooltip>
          <BetterTooltip content="Mover">
            <FolderInputButton
              variant="ghost"
              size="icon"
              className="size-7"
              onClick={onMoveDocuments}
            >
              <span className="sr-only">Mover</span>
            </FolderInputButton>
          </BetterTooltip>
        </motion.div>
      ) : activeTab === "recommendations" && isRecommendationSelected ? (
        <motion.div
          key="recommendations-selected"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "bg-muted mt-6 flex h-9 items-center gap-2 rounded-full px-1",
          )}
        >
          <BetterTooltip content="Deseleccionar todo">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClearRecommendations}
              className="hover:bg-alternative bg-alternative/50 size-7"
            >
              <X className="size-3.5!" />
            </Button>
          </BetterTooltip>
          <h3 className="text-base font-medium">
            {recommendationCount} recomendaciones seleccionadas
          </h3>
          <BetterTooltip content="Eliminar selección">
            <DeleteButton
              variant="ghost"
              size="icon"
              onClick={onDeleteRecommendations}
              className="size-7 text-red-500! hover:bg-red-50 dark:hover:bg-red-950 [&_svg]:size-3.5!"
            >
              <span className="sr-only">Eliminar selección</span>
            </DeleteButton>
          </BetterTooltip>
        </motion.div>
      ) : (
        <motion.div
          key="normal"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="mt-6 flex h-9 items-center gap-2"
        >
          <h3 className="text-base font-medium">
            {activeTab === "documents"
              ? "Mis documentos"
              : "Mis Recomendaciones"}
          </h3>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SelectionHeader;
