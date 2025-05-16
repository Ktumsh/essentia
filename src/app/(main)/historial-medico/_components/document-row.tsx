"use client";

import { FileText, MoreVerticalIcon } from "lucide-react";

import { ChevronButton } from "@/components/button-kit/chevron-button";
import { DeleteButton } from "@/components/button-kit/delete-button";
import { DownloadButton } from "@/components/button-kit/download-button";
import { EditButton } from "@/components/button-kit/edit-button";
import { EyeButton } from "@/components/button-kit/eye-button";
import { SparklesButton } from "@/components/button-kit/sparkles-button";
import { Button } from "@/components/kit/button";
import { Checkbox } from "@/components/kit/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/kit/dropdown-menu";
import { BetterTooltip } from "@/components/kit/tooltip";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/format";

import { getFileTypeColor } from "../_lib/utils";

import type { MedicalHistoryWithTags } from "@/db/querys/medical-history-querys";

interface DocumentRowProps {
  doc: MedicalHistoryWithTags;
  onView: (item: MedicalHistoryWithTags) => void;
  onAIClick: (item: MedicalHistoryWithTags) => void;
  onViewFile: (fileData: { url?: string | null; name: string }) => void;
  onDownload: (fileData: { url?: string | null; name: string }) => void;
  onEdit: (item: MedicalHistoryWithTags) => void;
  onDelete: (item: MedicalHistoryWithTags) => void;
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
  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    if (size < 1024 * 1024 * 1024)
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };
  return (
    <div className="group/row border-border/40 hover:bg-muted/20 grid grid-cols-20 items-center gap-4 border-t px-4 py-3">
      <div className="col-span-1 flex items-center">
        <Checkbox
          checked={selected}
          onCheckedChange={onToggleSelect}
          className="rounded-md"
        />
      </div>
      <div className="col-span-8 flex items-center gap-3">
        <div className="bg-background rounded-xl p-2">
          <FileText className={cn("size-4", getFileTypeColor(doc.type))} />
        </div>
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate text-base font-medium">
            {doc.condition}
          </span>
        </div>
      </div>
      <div className="text-muted-foreground col-span-2 text-sm">
        {doc.file ? formatFileSize(doc.file.size) : "Sin archivo"}
      </div>
      <div className="text-muted-foreground col-span-3 text-sm">
        {formatDate(doc.createdAt, "dd MMM yyyy")}
      </div>
      <div className="text-muted-foreground col-span-4 truncate text-sm">
        {doc.issuer}
      </div>
      <div className="col-span-2 flex justify-end gap-2">
        <BetterTooltip content="Ver detalles">
          <ChevronButton
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onView(doc);
            }}
            className="hover:bg-background size-8 group-hover/row:opacity-100 md:opacity-0"
          >
            <span className="sr-only">Ver detalles</span>
          </ChevronButton>
        </BetterTooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreVerticalIcon />
              <span className="sr-only">Más opciones</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <SparklesButton
                  onClick={() => onAIClick(doc)}
                  className="h-auto w-full justify-start border-0 bg-transparent hover:bg-indigo-50 dark:bg-transparent dark:hover:bg-indigo-950"
                >
                  Analizar con IA
                </SparklesButton>
              </DropdownMenuItem>
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
                    className="h-auto w-full justify-start"
                  >
                    Ver documento
                  </EyeButton>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <DownloadButton
                  variant="ghost"
                  onClick={() => {
                    onDownload({
                      url: doc.file?.url,
                      name: doc.file?.name || "archivo",
                    });
                  }}
                  className="h-auto w-full justify-start"
                >
                  Descargar
                </DownloadButton>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <EditButton
                  variant="ghost"
                  onClick={() => onEdit(doc)}
                  className="h-auto w-full justify-start"
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
                className="h-auto w-full justify-start"
              >
                Eliminar
              </DeleteButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DocumentRow;
