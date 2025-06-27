"use client";

import { FileText, MoreVerticalIcon } from "lucide-react";

import { ChevronButton } from "@/components/button-kit/chevron-button";
import { DeleteButton } from "@/components/button-kit/delete-button";
import { DownloadButton } from "@/components/button-kit/download-button";
import { EditButton } from "@/components/button-kit/edit-button";
import { EyeButton } from "@/components/button-kit/eye-button";
import { InfoButton } from "@/components/button-kit/info-button";
import { SparklesButton } from "@/components/button-kit/sparkles-button";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BetterTooltip } from "@/components/ui/tooltip";
import { useUserProfile } from "@/hooks/use-user-profile";
import { cn, formatDate, formatFileSize } from "@/utils";

import { useMedicalDialogs } from "../_hooks/use-medical-dialogs";
import { getFileTypeColor } from "../_lib/utils";

import type { MedicalHistory } from "@/db/querys/medical-history-querys";

interface DocumentRowProps {
  doc: MedicalHistory;
  onView: (item: MedicalHistory) => void;
  onAIClick: (item: MedicalHistory) => void;
  onViewFile: (fileData: { url?: string | null; name: string }) => void;
  onDownload: (fileData: { url?: string | null; name: string }) => void;
  onEdit: (item: MedicalHistory) => void;
  onDelete: (item: MedicalHistory) => void;
  selected: boolean;
  onToggleSelect: () => void;
}

const DocumentRow = ({
  doc,
  onView,
  onAIClick,
  onViewFile,
  onDownload,
  onEdit,
  onDelete,
  selected,
  onToggleSelect,
}: DocumentRowProps) => {
  const { user } = useUserProfile();
  const isPremium = user?.isPremium || false;
  const { openDialog } = useMedicalDialogs();

  return (
    <ContextMenu modal={false}>
      <ContextMenuTrigger asChild>
        <tr
          onDoubleClick={(e) => {
            e.stopPropagation();
            onViewFile({
              url: doc.file?.url,
              name: doc.file?.name || "archivo",
            });
          }}
          className="group/row hover:bg-accent border-t text-sm"
        >
          <td className="px-4 py-3">
            <div className="flex items-center">
              <Checkbox
                checked={selected}
                onCheckedChange={onToggleSelect}
                className="border-alternative shadow-none"
              />
            </div>
          </td>
          <td className="max-w-72 px-4 py-3 md:max-w-sm">
            <div className="flex items-center gap-3">
              <div className="bg-background rounded-xl p-2">
                <FileText
                  className={cn("size-4", getFileTypeColor(doc.type))}
                />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-foreground truncate font-medium">
                  {doc.condition}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {doc.description}
                </span>
              </div>
            </div>
          </td>
          <td className="text-muted-foreground group-hover/row:text-foreground px-4 py-3">
            {doc.file ? formatFileSize(doc.file.size) : "Sin archivo"}
          </td>
          <td className="text-muted-foreground group-hover/row:text-foreground px-4 py-3 text-nowrap">
            {formatDate(doc.createdAt, "dd MMM yyyy")}
          </td>
          <td className="text-muted-foreground group-hover/row:text-foreground truncate px-4 py-3">
            {doc.issuer}
          </td>
          <td className="flex justify-end gap-2 px-4 py-3 text-right">
            <BetterTooltip content="Ver información">
              <ChevronButton
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onView(doc);
                }}
                className="hover:bg-background size-8 group-hover/row:opacity-100 md:opacity-0"
              >
                <span className="sr-only">Ver información</span>
              </ChevronButton>
            </BetterTooltip>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-background size-8"
                >
                  <MoreVerticalIcon />
                  <span className="sr-only">Más opciones</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <SparklesButton
                      onClick={() => {
                        if (isPremium) {
                          onAIClick(doc);
                        } else {
                          openDialog("isPremiumModal");
                        }
                      }}
                      className="h-auto w-full justify-start border-0 bg-transparent px-2! font-normal hover:bg-fuchsia-100! dark:bg-transparent dark:hover:bg-fuchsia-950!"
                    >
                      Analizar con IA
                    </SparklesButton>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {doc.file && (
                    <DropdownMenuItem asChild>
                      <EyeButton
                        variant="ghost"
                        onClick={() =>
                          onViewFile({
                            url: doc.file?.url,
                            name: doc.file?.name || "archivo",
                          })
                        }
                        className="h-auto w-full justify-start px-2! font-normal"
                      >
                        Vista previa
                      </EyeButton>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <InfoButton
                      variant="ghost"
                      onClick={() => onView(doc)}
                      className="h-auto w-full justify-start px-2! font-normal"
                    >
                      Ver información
                    </InfoButton>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <DownloadButton
                      variant="ghost"
                      onClick={() => {
                        onDownload({
                          url: doc.file?.url,
                          name: doc.file?.name || "archivo",
                        });
                      }}
                      className="h-auto w-full justify-start px-2! font-normal"
                    >
                      Descargar
                    </DownloadButton>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <EditButton
                      variant="ghost"
                      onClick={() => onEdit(doc)}
                      className="h-auto w-full justify-start px-2! font-normal"
                    >
                      Editar
                    </EditButton>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" asChild>
                  <DeleteButton
                    variant="ghost"
                    onClick={() => onDelete(doc)}
                    className="h-auto w-full justify-start px-2! font-normal"
                  >
                    Eliminar
                  </DeleteButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </td>
        </tr>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem asChild>
            <SparklesButton
              onClick={() => {
                if (isPremium) {
                  onAIClick(doc);
                } else {
                  openDialog("isPremiumModal");
                }
              }}
              className="h-auto w-full justify-start border-0 bg-transparent px-2! font-normal hover:bg-fuchsia-100! dark:bg-transparent dark:hover:bg-fuchsia-950!"
            >
              Analizar con IA
            </SparklesButton>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem asChild>
            <EyeButton
              variant="ghost"
              onClick={() =>
                onViewFile({
                  url: doc.file?.url,
                  name: doc.file?.name || "archivo",
                })
              }
              className="h-auto w-full justify-start px-2! font-normal"
            >
              Vista previa
            </EyeButton>
          </ContextMenuItem>
          <ContextMenuItem asChild>
            <InfoButton
              variant="ghost"
              onClick={() => onView(doc)}
              className="h-auto w-full justify-start px-2! font-normal"
            >
              Ver información
            </InfoButton>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem asChild>
            <DownloadButton
              variant="ghost"
              onClick={() => {
                onDownload({
                  url: doc.file?.url,
                  name: doc.file?.name || "archivo",
                });
              }}
              className="h-auto w-full justify-start px-2! font-normal"
            >
              Descargar
            </DownloadButton>
          </ContextMenuItem>
          <ContextMenuItem asChild>
            <EditButton
              variant="ghost"
              onClick={() => onEdit(doc)}
              className="h-auto w-full justify-start px-2! font-normal"
            >
              Editar
            </EditButton>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive" asChild>
          <DeleteButton
            variant="ghost"
            onClick={() => onDelete(doc)}
            className="h-auto w-full justify-start px-2! font-normal"
          >
            Eliminar
          </DeleteButton>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default DocumentRow;
