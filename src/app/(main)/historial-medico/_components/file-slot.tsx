"use client";

import Image from "next/image";
import { Document, Page } from "react-pdf";

import { DownloadButton } from "@/components/button-kit/download-button";
import { DrawerClose } from "@/components/ui/drawer";
import { BetterTooltip } from "@/components/ui/tooltip";
import { MedicalHistory } from "@/db/querys/medical-history-querys";
import { cn, formatFileSize, getFileContentType } from "@/utils";

interface FileSlotProps {
  label?: string;
  className?: string;
  currentItem: MedicalHistory | null;
  onViewFile?: (fileData: { url?: string | null; name: string }) => void;
  onDownload?: (fileData: { url?: string | null; name: string }) => void;
}

const FileSlot = ({
  label,
  className,
  currentItem,
  onViewFile,
  onDownload,
}: FileSlotProps) => {
  if (!currentItem || !currentItem.file) return null;

  const fileUrl = currentItem.file.url;
  const fileName = currentItem.file.name;
  const fileType = currentItem.file.contentType;
  const formattedFileType = getFileContentType(currentItem.file.contentType);

  const fileSize = formatFileSize(currentItem.file.size);

  const content = (
    <div
      aria-label="Ver vista previa del archivo"
      onClick={() => {
        onViewFile?.({
          url: fileUrl,
          name: fileName || "documento",
        });
      }}
      className={cn(
        "preview group/item bg-background md:bg-muted before:bg-popover md:before:bg-background relative flex h-48 w-full justify-center overflow-hidden rounded-md border contrast-110 transition before:absolute before:bottom-0 before:left-1/2 before:z-1 before:h-full before:w-full before:-translate-x-1/2 before:translate-y-1/2 before:mask-t-from-70% before:transition before:duration-200 hover:contrast-110 hover:before:translate-y-1/2 md:contrast-100 md:before:translate-y-full",
        onViewFile && "cursor-pointer",
      )}
    >
      {fileType?.includes("image") ? (
        <Image
          src={fileUrl}
          alt={fileName}
          width={300}
          height={192}
          className="h-full w-auto object-contain"
        />
      ) : fileType?.includes("pdf") ? (
        <Document
          file={fileUrl}
          loading={
            <div className="text-muted-foreground text-sm">
              Cargando vista previa...
            </div>
          }
          error={
            <div className="text-muted-foreground text-sm">
              No se pudo cargar vista previa
            </div>
          }
        >
          <Page
            pageNumber={1}
            width={300}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      ) : (
        <span className="text-muted-foreground text-sm">
          No se puede previsualizar este tipo de archivo
        </span>
      )}
      <div className="absolute inset-0 z-1 flex transition-opacity group-hover/item:opacity-100 md:opacity-0">
        <div className="mt-auto flex w-full items-center justify-between gap-2 px-3 py-2 transition group-hover/item:translate-y-0 md:translate-y-1">
          <div className="max-w-72 md:max-w-80">
            <p className="truncate text-sm leading-snug font-medium text-balance">
              {fileName}
            </p>
            <p className="text-muted-foreground text-xs">
              {formattedFileType} • {fileSize}
            </p>
          </div>
          {onDownload && (
            <BetterTooltip content="Descargar">
              <DownloadButton
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onDownload({
                    url: fileUrl,
                    name: fileName || "documento",
                  });
                }}
                className="border"
              >
                <span className="sr-only">Descargar</span>
              </DownloadButton>
            </BetterTooltip>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn("space-y-2", className)}>
      {label && <h4 className="mb-1 text-sm font-medium">{label}</h4>}
      {onViewFile ? <DrawerClose asChild>{content}</DrawerClose> : content}
    </div>
  );
};

export default FileSlot;
