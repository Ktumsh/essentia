"use client";

import { X, FolderPlusIcon, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

import { DeleteButton } from "@/components/button-kit/delete-button";
import { Button } from "@/components/ui/button";
import { BetterTooltip } from "@/components/ui/tooltip";
import { cn } from "@/utils";

type HeaderVariant = "folders" | "documents";

interface FolderSectionHeaderProps {
  count: number;
  onClear: () => void;
  onDelete?: () => void;
  variant: HeaderVariant;
  onNewFolder?: () => void;
  folderName?: string | null;
  className?: string;
}

const FolderSectionHeader = ({
  count,
  onClear,
  onDelete,
  variant,
  onNewFolder,
  folderName,
  className,
}: FolderSectionHeaderProps) => {
  const isSelected = count > 0;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={isSelected ? "selected" : "normal"}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "mt-6 flex h-9 items-center gap-2 rounded-full",
          isSelected && "bg-muted px-1",
          className,
        )}
      >
        {isSelected ? (
          <>
            <BetterTooltip content="Deseleccionar todo">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClear}
                className="hover:bg-alternative bg-alternative/50 size-7"
              >
                <X className="size-3.5!" />
              </Button>
            </BetterTooltip>
            <h3 className="text-base font-medium">
              {count}{" "}
              {variant === "documents"
                ? "documentos seleccionados"
                : "carpetas seleccionadas"}
            </h3>
            {onDelete && (
              <BetterTooltip content="Eliminar selección">
                <DeleteButton
                  variant="ghost"
                  size="icon"
                  onClick={onDelete}
                  className="size-7 text-red-500! hover:bg-red-50 dark:hover:bg-red-950 [&_svg]:size-3.5!"
                >
                  <span className="sr-only">Eliminar selección</span>
                </DeleteButton>
              </BetterTooltip>
            )}
          </>
        ) : variant === "folders" ? (
          <>
            <BetterTooltip content="Nueva carpeta">
              <Button
                variant="ghost"
                size="icon"
                onClick={onNewFolder}
                className="size-8 border"
              >
                <FolderPlusIcon />
                <span className="sr-only">Nueva carpeta</span>
              </Button>
            </BetterTooltip>
            <h3 className="text-base font-medium">Carpetas</h3>
          </>
        ) : variant === "documents" && folderName ? (
          <>
            <BetterTooltip content="Nueva carpeta">
              <Button
                variant="ghost"
                size="icon"
                onClick={onNewFolder}
                className="size-8 border"
              >
                <FolderPlusIcon />
                <span className="sr-only">Nueva carpeta</span>
              </Button>
            </BetterTooltip>
            <Link href="/historial-medico">
              <h3 className="text-muted-foreground hover:text-foreground text-base font-medium transition-colors">
                Carpetas
              </h3>
            </Link>
            <ChevronRight className="text-muted-foreground size-3.5" />
            <span className="text-base font-medium">{folderName}</span>
          </>
        ) : null}
      </motion.div>
    </AnimatePresence>
  );
};

export default FolderSectionHeader;
