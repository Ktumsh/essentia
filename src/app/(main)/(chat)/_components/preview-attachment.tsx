import { Attachment } from "ai";
import { X } from "lucide-react";

import { BetterTooltip } from "@/components/kit/tooltip";

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
      <div className="dark:bg-dark relative flex size-16 flex-col items-center justify-center rounded-md bg-slate-100">
        {contentType ? (
          contentType.startsWith("image") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={url}
              src={url}
              alt={name ?? "Una imagen adjunta"}
              className="animate-fade-in aspect-square size-full rounded-md object-cover"
            />
          ) : (
            <div className=""></div>
          )
        ) : (
          <div className=""></div>
        )}

        {isUploading && (
          <div className="text-main-m dark:text-main-dark-m absolute">
            {spinner}
          </div>
        )}

        {!isUploading && !!onRemove && (
          <BetterTooltip content="Quitar archivo">
            <button
              onClick={onRemove}
              className="dark:border-accent-dark dark:bg-full-dark absolute top-0.5 right-0.5 flex items-center justify-center overflow-visible rounded-full border border-slate-300 bg-white p-1 transition-opacity group-hover/preview:opacity-100 md:opacity-0"
            >
              <X className="text-main size-3 dark:text-white" />
            </button>
          </BetterTooltip>
        )}
      </div>
    </div>
  );
};
