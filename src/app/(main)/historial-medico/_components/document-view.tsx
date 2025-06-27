"use client";

import {
  FileText,
  Calendar,
  Building,
  Tag,
  Stars,
  Edit,
  Trash,
  Clock,
  ClockFading,
} from "lucide-react";

import { DeleteButton } from "@/components/button-kit/delete-button";
import { EditButton } from "@/components/button-kit/edit-button";
import { SparklesButton } from "@/components/button-kit/sparkles-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { BetterTooltip } from "@/components/ui/tooltip";
import { MedicalHistory } from "@/db/querys/medical-history-querys";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUserProfile } from "@/hooks/use-user-profile";
import { cn, formatDate } from "@/utils";

import FileSlot from "./file-slot";
import InfoCard from "./info-card";
import {
  getFileTypeBgColor,
  getFileTypeColor,
  getTagColor,
} from "../_lib/utils";

interface DocumentViewProps {
  isOpen: boolean;
  onClose: () => void;
  currentItem: MedicalHistory | null;
  onEdit: (item: MedicalHistory) => void;
  onDelete: (item: MedicalHistory) => void;
  onAIClick: (item: MedicalHistory) => void;
  onViewFile: (fileData: { url?: string | null; name: string }) => void;
  onDownload: (fileData: { url?: string | null; name: string }) => void;
  onOpenPremiumModal: () => void;
}

const DocumentView = ({
  isOpen,
  onClose,
  currentItem,
  onEdit,
  onDelete,
  onAIClick,
  onViewFile,
  onDownload,
  onOpenPremiumModal,
}: DocumentViewProps) => {
  const { user } = useUserProfile();
  const isMobile = useIsMobile();
  const isPremium = user?.isPremium;

  if (!currentItem) return null;

  return (
    <Drawer
      open={isOpen}
      onOpenChange={onClose}
      direction={isMobile ? "bottom" : "right"}
      handleOnly={!isMobile}
    >
      <DrawerContent className="md:bg-background data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-screen data-[vaul-drawer-direction=right]:max-w-md data-[vaul-drawer-direction=right]:rounded-none data-[vaul-drawer-direction=right]:p-0 md:border-l">
        <DrawerHeader className="items-center md:flex-row md:gap-2 md:p-4">
          <div
            className={cn(
              "mask mask-squircle hidden size-11 shrink-0 place-content-center md:grid",
              getFileTypeBgColor(currentItem.type),
            )}
          >
            <FileText
              className={cn(
                "size-5 shrink-0",
                getFileTypeColor(currentItem.type),
              )}
            />
          </div>
          <div className="max-w-80 overflow-hidden">
            <DrawerTitle className="flex items-center gap-2 truncate md:max-w-full md:p-0 md:text-base md:leading-normal">
              <div className="truncate leading-normal">
                {currentItem.condition}
              </div>
            </DrawerTitle>
            <DrawerDescription
              className="text-muted-foreground sr-only md:not-sr-only"
              asChild
            >
              <div className="flex items-center gap-1">
                <Clock className="size-3.5" />
                <p>
                  Añadido el{" "}
                  {formatDate(currentItem.createdAt, "dd 'de' MMMM, yyyy")}
                </p>
              </div>
            </DrawerDescription>
          </div>
          <div className="hidden grid-cols-2 gap-1 md:grid">
            <BetterTooltip content="Editar">
              <DrawerClose asChild>
                <EditButton
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(currentItem)}
                  className="rounded-full"
                >
                  <span className="sr-only">Editar</span>
                </EditButton>
              </DrawerClose>
            </BetterTooltip>
            <BetterTooltip content="Eliminar">
              <DrawerClose asChild>
                <DeleteButton
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(currentItem)}
                  className="rounded-full text-red-500 hover:bg-red-500/10 hover:text-red-500 dark:hover:bg-red-500/15"
                >
                  <span className="sr-only">Eliminar</span>
                </DeleteButton>
              </DrawerClose>
            </BetterTooltip>
          </div>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-4 overflow-y-auto p-4">
            <FileSlot
              label="Archivo adjunto"
              currentItem={currentItem}
              onViewFile={onViewFile}
              onDownload={onDownload}
            />
            <InfoCard title="Descripción" icon={FileText}>
              {currentItem.description ?? "No hay descripción disponible."}
            </InfoCard>
            <InfoCard title="Emisor" icon={Building}>
              {currentItem.issuer ?? "Sin emisor especificado."}
            </InfoCard>
            <InfoCard title="Fecha del documento" icon={Calendar}>
              {formatDate(currentItem.documentDate!, "dd 'de' MMMM, yyyy")}
            </InfoCard>
            <InfoCard title="Etiquetas" icon={Tag}>
              {currentItem.tags.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {currentItem.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className={cn("font-normal text-white", getTagColor(tag))}
                    >
                      <Tag className="size-2.5!" /> {tag}
                    </Badge>
                  ))}
                </div>
              ) : (
                "No hay etiquetas asignadas."
              )}
            </InfoCard>
            <InfoCard title="Notas personales" icon={Edit}>
              {currentItem.notes ?? "Sin notas personales."}
            </InfoCard>
            <InfoCard title="Última modificación" icon={ClockFading}>
              {formatDate(
                currentItem.updatedAt ?? currentItem.createdAt,
                "dd 'de' MMMM, yyyy",
              )}
            </InfoCard>
            <InfoCard title="Creado el" icon={Calendar}>
              {formatDate(currentItem.createdAt, "dd 'de' MMMM, yyyy")}
            </InfoCard>
          </div>
        </div>
        <DrawerFooter className="md:gap-2">
          {isMobile ? (
            <>
              <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
                <DrawerClose asChild>
                  <Button
                    variant="mobile"
                    onClick={() => {
                      if (!isPremium) {
                        onOpenPremiumModal();
                        return;
                      }
                      onAIClick(currentItem);
                    }}
                    className="text-indigo-700 dark:text-indigo-300"
                  >
                    <Stars />
                    Analizar con IA
                  </Button>
                </DrawerClose>
                <Separator className="dark:bg-alternative/50 z-10 ml-6" />
                <DrawerClose asChild>
                  <Button variant="mobile" onClick={() => onEdit(currentItem)}>
                    <Edit />
                    Editar
                  </Button>
                </DrawerClose>
                <Separator className="dark:bg-alternative/50 z-10 ml-6" />
                <DrawerClose asChild>
                  <Button
                    variant="mobile"
                    className="text-red-500"
                    onClick={() => onDelete(currentItem)}
                  >
                    <Trash />
                    Eliminar
                  </Button>
                </DrawerClose>
              </div>
              <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
                <DrawerClose asChild>
                  <Button variant="mobile" className="justify-center">
                    Cerrar
                  </Button>
                </DrawerClose>
              </div>
            </>
          ) : (
            <>
              <DrawerClose asChild>
                <SparklesButton
                  onClick={() => {
                    if (!isPremium) {
                      onOpenPremiumModal();
                      return;
                    }
                    onAIClick(currentItem);
                  }}
                  className="rounded-full"
                >
                  Analizar con IA
                </SparklesButton>
              </DrawerClose>
              <DrawerClose asChild>
                <Button variant="outline" radius="full">
                  Cerrar
                </Button>
              </DrawerClose>
            </>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DocumentView;
