"use client";

import {
  Calendar,
  Clock,
  ClockFading,
  FileText,
  FolderOpen,
  Palette,
  Shapes,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn, formatDate } from "@/utils";

import InfoCard from "../../_components/info-card";
import {
  folderColorClassMap,
  folderColorLabelMap,
  folderIconLabelMap,
  folderIconMap,
} from "../../_lib/utils";

import type { Folder } from "@/lib/types";

interface FolderViewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentItem: Folder | null;
}

const FolderViewDialog = ({
  isOpen,
  onOpenChange,
  currentItem,
}: FolderViewDialogProps) => {
  const isMobile = useIsMobile();

  if (!currentItem) return null;

  const Icon = folderIconMap[currentItem.icon ?? "folder"];
  const iconLabel = folderIconLabelMap[currentItem.icon ?? "folder"];
  const color = folderColorClassMap[currentItem.color ?? "gray"];
  const colorLabel = folderColorLabelMap[currentItem.color ?? "gray"];

  return (
    <Drawer
      open={isOpen}
      onOpenChange={onOpenChange}
      direction={isMobile ? "bottom" : "right"}
      repositionInputs={false}
      handleOnly={!isMobile}
    >
      <DrawerContent className="md:bg-background data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-screen data-[vaul-drawer-direction=right]:max-w-md data-[vaul-drawer-direction=right]:rounded-none data-[vaul-drawer-direction=right]:p-0 md:border-l">
        <DrawerHeader className="items-center md:flex-row md:items-start md:gap-2 md:p-4">
          <div
            className={cn(
              "mask mask-squircle hidden size-11 shrink-0 place-content-center md:grid",
              color.bg,
            )}
          >
            <Icon className={cn("size-5 shrink-0", color.text)} />
          </div>
          <div className="max-w-80 overflow-hidden">
            <DrawerTitle className="flex items-center gap-2 truncate md:max-w-full md:p-0 md:text-base md:leading-normal">
              <div className="truncate leading-normal">
                Carpeta &quot;{currentItem.name}&quot;
              </div>
            </DrawerTitle>
            <DrawerDescription
              className="text-muted-foreground sr-only md:not-sr-only"
              asChild
            >
              <div className="flex items-center gap-1">
                <Clock className="size-3.5" />
                <p>
                  Creada el{" "}
                  {formatDate(currentItem.createdAt, "dd 'de' MMMM, yyyy")}
                </p>
              </div>
            </DrawerDescription>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-4 p-4">
            <InfoCard title="Cantidad de documentos" icon={FolderOpen}>
              {currentItem.documentCount}{" "}
              {currentItem.documentCount === 1 ? "documento" : "documentos"}
            </InfoCard>

            <InfoCard title="Color" icon={Palette}>
              <Badge
                className={cn("font-normal text-white", color.bg, color.text)}
              >
                {colorLabel}
              </Badge>
            </InfoCard>

            <InfoCard title="Ícono" icon={Shapes}>
              <div className="flex items-center gap-2">
                <Icon className={cn("size-5", color.text)} />
                {iconLabel}
              </div>
            </InfoCard>

            <InfoCard title="Descripción" icon={FileText}>
              {currentItem.description || "No hay descripción disponible."}
            </InfoCard>

            <InfoCard title="Última modificación" icon={ClockFading}>
              {formatDate(
                currentItem.updatedAt ?? currentItem.createdAt,
                "dd 'de' MMMM, yyyy",
              )}
            </InfoCard>

            <InfoCard title="Creada el" icon={Calendar}>
              {formatDate(currentItem.createdAt, "dd 'de' MMMM, yyyy")}
            </InfoCard>
          </div>
        </div>

        <DrawerFooter className="md:gap-2">
          {isMobile ? (
            <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
              <DrawerClose asChild>
                <Button variant="mobile" className="justify-center">
                  Cerrar
                </Button>
              </DrawerClose>
            </div>
          ) : (
            <DrawerClose asChild>
              <Button variant="outline" radius="full">
                Cerrar
              </Button>
            </DrawerClose>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FolderViewDialog;
