/* eslint-disable @next/next/no-img-element */
import { Attachment } from "ai";
import { FileText, Loader, X } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { BetterTooltip } from "@/components/ui/tooltip";
import { cn, formatFileSize } from "@/utils";

import {
  getContainerAttachmentClasses,
  getImageAttachmentClasses,
} from "../_lib/utils";

interface PreviewAttachmentProps {
  attachment: Attachment & { size?: number };
  isInUpload?: boolean;
  isUploading?: boolean;
  totalAttachments?: number;
  isFile?: boolean;
  index?: number;
  onRemove?: () => Promise<void>;
}

export const PreviewAttachment = ({
  attachment,
  isInUpload = false,
  isUploading = false,
  totalAttachments = 1,
  isFile = false,
  index = 0,
  onRemove,
}: PreviewAttachmentProps) => {
  const { name, url, contentType, size } = attachment;

  const [isOpen, setIsOpen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<string>("auto");

  useEffect(() => {
    if (contentType?.startsWith("image") && url) {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setAspectRatio(`${img.naturalWidth} / ${img.naturalHeight}`);
      };
    }
  }, [url, contentType]);

  const containerClasses = getContainerAttachmentClasses(
    totalAttachments,
    index,
    isInUpload,
    isFile,
  );
  const imageClasses = getImageAttachmentClasses(
    totalAttachments,
    index,
    isInUpload,
  );

  return (
    <>
      <div
        data-testid="attachment-preview"
        className={cn(containerClasses, {
          "size-14 min-w-14":
            (isInUpload && contentType?.startsWith("image")) || isUploading,
          border: isUploading,
          "cursor-default": contentType?.startsWith("application"),
        })}
        onClick={() => {
          if (contentType?.startsWith("image")) setIsOpen(true);
        }}
      >
        {contentType ? (
          contentType.startsWith("image") ? (
            <>
              {isInUpload ? (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <img
                      key={url}
                      src={url}
                      alt="Una imagen adjunta"
                      style={{
                        aspectRatio:
                          !totalAttachments && !isInUpload
                            ? aspectRatio
                            : "auto",
                      }}
                      className={imageClasses}
                    />
                  </HoverCardTrigger>
                  <HoverCardContent className="overflow-hidden p-0 text-nowrap whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      <img
                        key={url}
                        src={url}
                        alt="Una imagen adjunta"
                        style={{
                          aspectRatio:
                            !totalAttachments && !isInUpload
                              ? aspectRatio
                              : "auto",
                        }}
                      />
                    </div>
                    <div className="grid flex-1 gap-1 p-2 text-xs">
                      <span className="truncate font-medium">{name}</span>
                      <span className="text-muted-foreground">
                        {formatFileSize(size!)}
                      </span>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ) : (
                <img
                  key={url}
                  src={url}
                  alt="Una imagen adjunta"
                  style={{
                    aspectRatio:
                      !totalAttachments && !isInUpload ? aspectRatio : "auto",
                  }}
                  className={imageClasses}
                />
              )}
            </>
          ) : contentType.startsWith("application") ? (
            <div
              className={cn(
                "border-border inline-flex h-14 max-w-60 min-w-60 shrink-0 items-center justify-center gap-2 rounded-lg border p-2 pr-3 font-medium text-nowrap whitespace-nowrap",
                {
                  "w-full min-w-0 border-0": !isInUpload,
                },
              )}
            >
              <div className="text-muted-foreground bg-primary/50 flex size-10 shrink-0 -translate-x-px items-center justify-center overflow-hidden rounded-md">
                <FileText className="size-6 text-white" />
              </div>
              <div className="grid flex-1 gap-1 py-0.5 text-xs leading-none">
                <span className="text-foreground truncate">{name}</span>
                <span className="text-muted-foreground">
                  {formatFileSize(size!)}
                </span>
              </div>
            </div>
          ) : (
            <div className=""></div>
          )
        ) : (
          <div className=""></div>
        )}

        {isUploading && (
          <div
            data-testid="input-attachment-loader"
            className="text-muted-foreground absolute"
          >
            <Loader className="size-4 animate-spin" />
          </div>
        )}

        {!isUploading && !!onRemove && (
          <BetterTooltip content="Quitar archivo">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="dark:border-alternative bg-background absolute -top-1 -right-1 flex size-4 items-center justify-center overflow-visible rounded-full border border-slate-300 opacity-0 transition-opacity group-hover/preview:opacity-100"
            >
              <X className="text-foreground size-2.5" />
            </button>
          </BetterTooltip>
        )}
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          isBlurred
          closeButtonClass="absolute top-4 right-4"
          onClick={() => setIsOpen(false)}
          className="min-h-dvh min-w-dvw items-center justify-center rounded-none border-0 bg-transparent p-0 shadow-none ring-0"
        >
          <DialogTitle className="sr-only">
            Previsualización de archivo
          </DialogTitle>
          <DialogDescription className="sr-only">
            Nombre del archivo: {name}
          </DialogDescription>
          <div
            className="relative max-h-[85vh] max-w-[90vw]"
            style={{ aspectRatio: aspectRatio || "auto" }}
          >
            <img
              src={url}
              alt="Una imagen adjunta"
              className="size-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
