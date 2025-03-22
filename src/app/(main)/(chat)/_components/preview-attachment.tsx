/* eslint-disable @next/next/no-img-element */
import { Attachment } from "ai";
import { Loader, X } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/kit/dialog";
import { BetterTooltip } from "@/components/kit/tooltip";

import {
  getContainerAttachmentClasses,
  getImageAttachmentClasses,
} from "../_lib/utils";

interface PreviewAttachmentProps {
  attachment: Attachment;
  isInUpload?: boolean;
  isUploading?: boolean;
  totalAttachments?: number;
  index?: number;
  onRemove?: () => Promise<void>;
}

export const PreviewAttachment = ({
  attachment,
  isInUpload = false,
  isUploading = false,
  totalAttachments = 1,
  index = 0,
  onRemove,
}: PreviewAttachmentProps) => {
  const { name, url, contentType } = attachment;

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
  );
  const imageClasses = getImageAttachmentClasses(
    totalAttachments,
    index,
    isInUpload,
  );

  return (
    <>
      <div className={containerClasses} onClick={() => setIsOpen(true)}>
        {contentType ? (
          contentType.startsWith("image") ? (
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
          ) : (
            <div className=""></div>
          )
        ) : (
          <div className=""></div>
        )}

        {isUploading && (
          <div className="text-muted-foreground absolute">
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
              className="dark:border-alternative bg-background absolute top-0.5 right-0.5 flex items-center justify-center overflow-visible rounded-full border border-slate-300 p-1 transition-opacity group-hover/preview:opacity-100 md:opacity-0"
            >
              <X className="text-foreground size-3" />
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
