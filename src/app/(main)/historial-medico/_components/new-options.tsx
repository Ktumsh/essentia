"use client";

import { FileText, Folder, Stars } from "lucide-react";

import { FileTextButton } from "@/components/button-kit/file-button";
import { FolderButton } from "@/components/button-kit/folder-button";
import { PlusButton } from "@/components/button-kit/plus-button";
import { SparklesButton } from "@/components/button-kit/sparkles-button";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { BetterTooltip } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <PlusButton size="sm" disabled={disabled}>
            Nuevo
          </PlusButton>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Nuevo</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className="sr-only">
            Selecciona una opción para crear un nuevo elemento.
          </DrawerDescription>
          <DrawerFooter>
            <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
              <DrawerClose asChild>
                <Button variant="mobile" onClick={onNewFolder}>
                  <Folder />
                  Nueva carpeta
                </Button>
              </DrawerClose>
              <Separator className="dark:bg-alternative/50 z-10 ml-6" />
              <DrawerClose asChild>
                <Button variant="mobile" onClick={onNewDocument}>
                  <FileText />
                  Crear documento
                </Button>
              </DrawerClose>
              <Separator className="dark:bg-alternative/50 z-10 ml-6" />
              <DrawerClose asChild>
                <Button
                  variant="mobile"
                  onClick={() => {
                    if (isPremium) {
                      onNewAIRecommendation();
                    } else {
                      openDialog("isPremiumModal");
                    }
                  }}
                  className="text-secondary"
                >
                  <Stars />
                  Recomendaciones IA
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

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
