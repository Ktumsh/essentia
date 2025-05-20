"use client";

import { FileTextButton } from "@/components/button-kit/file-button";
import { FolderButton } from "@/components/button-kit/folder-button";
import { PlusButton } from "@/components/button-kit/plus-button";
import { SparklesButton } from "@/components/button-kit/sparkles-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/kit/dropdown-menu";
import { BetterTooltip } from "@/components/kit/tooltip";

import { useMedicalDialogs } from "../_hooks/use-medical-dialogs";

interface NewOptionsProps {
  isPremium?: boolean | null;
  disabled: boolean;
  expanded?: boolean;
  onNewFolder: () => void;
  onNewDocument: () => void;
  onNewAIRecommendation: () => void;
}

const NewOptions = ({
  isPremium = false,
  disabled,
  expanded = false,
  onNewFolder,
  onNewDocument,
  onNewAIRecommendation,
}: NewOptionsProps) => {
  const { openDialog } = useMedicalDialogs();

  return (
    <DropdownMenu>
      {expanded ? (
        <DropdownMenuTrigger asChild>
          <PlusButton size="sm" disabled={disabled}>
            Nuevo
          </PlusButton>
        </DropdownMenuTrigger>
      ) : (
        <BetterTooltip content="Nuevo">
          <DropdownMenuTrigger asChild>
            <PlusButton
              size="icon"
              variant="outline"
              disabled={disabled}
              className="bg-background"
            >
              <span className="sr-only">Nuevo</span>
            </PlusButton>
          </DropdownMenuTrigger>
        </BetterTooltip>
      )}

      <DropdownMenuContent align={expanded ? "end" : "start"}>
        <DropdownMenuItem asChild>
          <FolderButton
            variant="ghost"
            className="h-auto w-full justify-start font-normal"
            onClick={onNewFolder}
          >
            Nueva Carpeta
          </FolderButton>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <FileTextButton
            variant="ghost"
            className="h-auto w-full justify-start font-normal"
            onClick={onNewDocument}
          >
            Crear Documento
          </FileTextButton>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <SparklesButton
            className="h-auto w-full justify-start border-0 bg-transparent font-normal hover:bg-fuchsia-100! dark:bg-transparent dark:hover:bg-fuchsia-950!"
            onClick={() => {
              if (isPremium) {
                onNewAIRecommendation();
              } else {
                openDialog("isPremiumModal");
              }
            }}
          >
            Recomendaciones IA
          </SparklesButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NewOptions;
