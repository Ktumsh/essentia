"use client";

import {
  Eye,
  EyeOff,
  FileText,
  Calendar,
  Building,
  Tag,
  Stars,
  Edit,
  Trash,
} from "lucide-react";

import { DeleteButton } from "@/components/button-kit/delete-button";
import { EditButton } from "@/components/button-kit/edit-button";
import { SparklesButton } from "@/components/button-kit/sparkles-button";
import { Badge } from "@/components/kit/badge";
import { Button } from "@/components/kit/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/kit/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/kit/drawer";
import { Separator } from "@/components/kit/separator";
import { MedicalHistoryWithTags } from "@/db/querys/medical-history-querys";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUserProfile } from "@/hooks/use-user-profile";
import { cn , formatDate } from "@/utils";


import FileSlot from "./file-slot";
import { getFileTypeColor, getTagColor } from "../_lib/utils";

interface DocumentViewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentItem: MedicalHistoryWithTags | null;
  onEdit: (item: MedicalHistoryWithTags) => void;
  onDelete: (item: MedicalHistoryWithTags) => void;
  onAIClick: (item: MedicalHistoryWithTags) => void;
  onViewFile: (fileData: { url?: string | null; name: string }) => void;
  onDownload: (fileData: { url?: string | null; name: string }) => void;
  onOpenPremiumModal: () => void;
}

const DocumentViewDialog = ({
  isOpen,
  onClose,
  currentItem,
  onEdit,
  onDelete,
  onAIClick,
  onViewFile,
  onDownload,
  onOpenPremiumModal,
}: DocumentViewDialogProps) => {
  const { user } = useUserProfile();
  const isMobile = useIsMobile();
  const isPremium = user?.isPremium;

  const content = currentItem && (
    <div className="grid gap-4 overflow-y-auto p-4 md:p-6">
      {currentItem.description && (
        <div className="space-y-1 text-sm">
          <h4 className="mb-1 font-medium">Descripción</h4>
          <div className="space-y-1 rounded-md border p-4">
            <p>{currentItem.description}</p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        {currentItem.issuer && (
          <div className="space-y-1 text-sm">
            <div className="inline-flex items-start gap-1">
              <Building className="text-muted-foreground size-4" />
              <h4 className="font-medium">Emisor</h4>
            </div>
            <div className="rounded-md border p-4">
              <p className="truncate">{currentItem.issuer}</p>
            </div>
          </div>
        )}
        {currentItem.documentDate && (
          <div className="space-y-1 text-sm">
            <div className="inline-flex items-start gap-1">
              <Calendar className="text-muted-foreground size-4" />
              <h4 className="font-medium">Fecha del documento</h4>
            </div>
            <div className="rounded-md border p-4">
              <p className="truncate">
                {formatDate(currentItem.documentDate, "dd 'de' MMMM, yyyy")}
              </p>
            </div>
          </div>
        )}
      </div>
      {currentItem.notes && (
        <div className="space-y-1 text-sm">
          <h4 className="font-medium">Notas personales</h4>
          <div className="space-y-1 rounded-md border p-4">
            <p>{currentItem.notes}</p>
          </div>
        </div>
      )}
      {currentItem.tags?.length > 0 && (
        <div>
          <h4 className="mb-1 text-sm font-medium">Etiquetas</h4>
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
        </div>
      )}
      <FileSlot
        label="Archivo"
        currentItem={currentItem}
        onViewFile={onViewFile}
        onDownload={onDownload}
      />
      <div className="text-muted-foreground flex items-center justify-between text-sm">
        <div className="inline-flex items-center gap-4">
          Visibilidad:
          {currentItem.visibility === "private" ? (
            <span className="inline-flex items-center gap-1">
              <EyeOff className="size-3" /> Privado
            </span>
          ) : (
            <span className="inline-flex items-center gap-1">
              <Eye className="size-3" /> Compartido
            </span>
          )}
        </div>
        <div>
          Añadido el {formatDate(currentItem.createdAt, "dd 'de' MMMM, yyyy")}
        </div>
      </div>
    </div>
  );

  return isMobile ? (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        {currentItem && (
          <>
            <DrawerHeader className="items-center">
              <DrawerTitle className="flex max-w-80 items-center gap-2">
                <FileText
                  className={cn(
                    "size-4 shrink-0",
                    getFileTypeColor(currentItem.type),
                  )}
                />
                <span className="truncate">{currentItem.condition}</span>
              </DrawerTitle>
            </DrawerHeader>
            <DrawerDescription className="sr-only">
              {currentItem.description}
            </DrawerDescription>
            <div className="flex-1 overflow-y-auto">{content}</div>
            <DrawerFooter>
              <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
                <Button
                  variant="mobile"
                  onClick={() => {
                    if (!isPremium) {
                      onOpenPremiumModal();
                      return;
                    }
                    onClose();
                    onAIClick(currentItem);
                  }}
                  className="text-indigo-700 dark:text-indigo-300"
                >
                  <Stars />
                  Analizar con IA
                </Button>
                <Separator className="dark:bg-alternative/50 z-10 ml-6" />
                <Button
                  variant="mobile"
                  onClick={() => {
                    onClose();
                    onEdit(currentItem);
                  }}
                >
                  <Edit />
                  Editar
                </Button>
                <Separator className="dark:bg-alternative/50 z-10 ml-6" />
                <Button
                  variant="mobile"
                  className="text-red-500 hover:bg-red-50 hover:text-red-700"
                  onClick={() => {
                    onClose();
                    onDelete(currentItem);
                  }}
                >
                  <Trash />
                  Eliminar
                </Button>
              </div>
              <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
                <Button
                  variant="mobile"
                  onClick={onClose}
                  className="justify-center"
                >
                  Cerrar
                </Button>
              </div>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent isSecondary className="sm:max-w-xl">
        {currentItem && (
          <>
            <DialogHeader isSecondary>
              <div className="flex items-center gap-2">
                <FileText
                  className={cn("size-6", getFileTypeColor(currentItem.type))}
                />
                <Badge variant="outline">{currentItem.type}</Badge>
              </div>
              <DialogTitle className="mb-0!">
                {currentItem.condition}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {currentItem.description}
              </DialogDescription>
            </DialogHeader>
            {content}
            <DialogFooter isSecondary>
              <SparklesButton
                onClick={() => {
                  if (!isPremium) {
                    onOpenPremiumModal();
                    return;
                  }
                  onClose();
                  onAIClick(currentItem);
                }}
                className="rounded-full"
              >
                Analizar con IA
              </SparklesButton>
              <Button variant="outline" radius="full" onClick={onClose}>
                Cerrar
              </Button>
              <EditButton
                variant="outline"
                onClick={() => {
                  onClose();
                  onEdit(currentItem);
                }}
                className="rounded-full"
              >
                Editar
              </EditButton>
              <DeleteButton
                variant="ghost"
                onClick={() => {
                  onClose();
                  onDelete(currentItem);
                }}
                className="rounded-full border text-red-500 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
              >
                Eliminar
              </DeleteButton>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewDialog;
