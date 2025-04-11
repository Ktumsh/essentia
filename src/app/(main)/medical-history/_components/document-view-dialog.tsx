"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Eye, EyeOff, FileText, Calendar, Building, Tag } from "lucide-react";

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
import { MedicalHistoryWithTags } from "@/db/querys/medical-history-querys";
import { useUserProfile } from "@/hooks/use-user-profile";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/format";

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
  onOpenPremiumModal,
}: DocumentViewDialogProps) => {
  const { user } = useUserProfile();

  const isPremium = user?.isPremium;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent isSecondary className="sm:max-w-xl">
        <button aria-hidden className="sr-only" />
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
            <div className="grid gap-4 p-4 md:p-6">
              {currentItem.description && (
                <div className="space-y-1 text-sm">
                  <div className="inline-flex items-start gap-1">
                    <h4 className="mb-1 font-medium">Descripción</h4>
                  </div>
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
                    <div className="space-y-1 rounded-md border p-4">
                      <div className="flex items-center gap-1">
                        <p className="truncate">{currentItem.issuer}</p>
                      </div>
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
                      <div className="flex items-center gap-1">
                        <p className="truncate">
                          {formatDate(
                            currentItem.documentDate,
                            "dd 'de' MMMM, yyyy",
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {currentItem.notes && (
                <div className="space-y-1 text-sm">
                  <div className="inline-flex items-start gap-1">
                    <h4 className="font-medium">Notas personales</h4>
                  </div>
                  <div className="space-y-1 rounded-md border p-4">
                    <p>{currentItem.notes}</p>
                  </div>
                </div>
              )}
              {currentItem.tags && currentItem.tags.length > 0 && (
                <div>
                  <h4 className="mb-1 text-sm font-medium">Etiquetas</h4>
                  <div className="flex flex-wrap gap-1">
                    {currentItem.tags.map((tag) => (
                      <Badge key={tag} className={getTagColor(tag)}>
                        <Tag className="mr-1 h-3 w-3" /> {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <FileSlot
                label="Archivo"
                currentItem={currentItem}
                onViewFile={onViewFile}
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
                  Añadido el{" "}
                  {format(new Date(currentItem.createdAt), "dd MMM yyyy", {
                    locale: es,
                  })}
                </div>
              </div>
            </div>
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
