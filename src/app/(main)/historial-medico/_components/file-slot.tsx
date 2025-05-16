import { FileText } from "lucide-react";

import { DownloadButton } from "@/components/button-kit/download-button";
import { EyeButton } from "@/components/button-kit/eye-button";
import { BetterTooltip } from "@/components/kit/tooltip";
import { MedicalHistoryWithTags } from "@/db/querys/medical-history-querys";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/format";

import { getFileTypeColor } from "../_lib/utils";

interface FileSlotProps {
  label?: string;
  className?: string;
  currentItem: MedicalHistoryWithTags | null;
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

  return (
    <div className={cn("space-y-2", className)}>
      {label && <h4 className="mb-1 text-sm font-medium">{label}</h4>}
      <div className="bg-accent relative rounded-lg p-3">
        <div className="grid grid-cols-[auto_1fr] gap-2 pr-24">
          <FileText
            className={cn("size-5", getFileTypeColor(currentItem.type))}
          />
          <div className="truncate">
            <p className="truncate text-sm font-medium">
              {currentItem.file.name}
            </p>
            <p className="text-muted-foreground text-xs">
              Subido el{" "}
              {formatDate(new Date(currentItem.createdAt), "dd MMM yyyy")}
            </p>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 m-4 flex items-center gap-2">
          {onViewFile && (
            <BetterTooltip content="Ver documento" side="top">
              <EyeButton
                variant="outline"
                size="icon"
                onClick={() => {
                  onViewFile({
                    url: currentItem.file?.url,
                    name: currentItem.file?.name || "documento",
                  });
                }}
                className="bg-background size-8 hover:opacity-100 [&_svg]:size-3.5!"
              >
                <span className="sr-only">Ver</span>
              </EyeButton>
            </BetterTooltip>
          )}
          {onDownload && (
            <BetterTooltip content="Descargar documento" side="top">
              <DownloadButton
                variant="outline"
                size="icon"
                onClick={() => {
                  onDownload({
                    url: currentItem.file?.url,
                    name: currentItem.file?.name || "documento",
                  });
                }}
                className="bg-background size-8 hover:opacity-100 [&_svg]:size-3.5!"
              >
                <span className="sr-only">Descargar</span>
              </DownloadButton>
            </BetterTooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileSlot;
