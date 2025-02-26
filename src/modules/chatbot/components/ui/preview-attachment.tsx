import { Attachment } from "ai";
import { X } from "lucide-react";

import { BetterTooltip } from "@/components/ui/tooltip";

import { spinner } from "./spinner";

interface PreviewAttachmentProps {
  attachment: Attachment;
  isUploading?: boolean;
  onRemove?: () => void;
}

export const PreviewAttachment = ({
  attachment,
  isUploading = false,
  onRemove,
}: PreviewAttachmentProps) => {
  const { name, url, contentType } = attachment;

  return (
    <div className="group/preview flex max-w-16 flex-col gap-2">
      <div className="relative flex size-16 flex-col items-center justify-center rounded-md bg-gray-100 dark:bg-dark">
        {contentType ? (
          contentType.startsWith("image") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={url}
              src={url}
              alt={name ?? "Una imagen adjunta"}
              className="aspect-square size-full animate-fade-in rounded-md object-cover"
            />
          ) : (
            <div className=""></div>
          )
        ) : (
          <div className=""></div>
        )}

        {isUploading && (
          <div className="absolute text-main-m dark:text-main-dark-m">
            {spinner}
          </div>
        )}

        {!isUploading && !!onRemove && (
          <BetterTooltip content="Quitar archivo">
            <button
              onClick={onRemove}
              className="absolute right-0.5 top-0.5 flex items-center justify-center overflow-visible rounded-full border border-gray-300 bg-white p-1 transition-opacity group-hover/preview:opacity-100 dark:border-accent-dark dark:bg-full-dark md:opacity-0"
            >
              <X className="size-3 text-main dark:text-white" />
            </button>
          </BetterTooltip>
        )}
      </div>
    </div>
  );
};
