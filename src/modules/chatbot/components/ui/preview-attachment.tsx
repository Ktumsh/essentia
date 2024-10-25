import { Attachment } from "ai";

import { CloseIcon } from "@/modules/icons/common";

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
    <div className="group/preview flex flex-col gap-2 max-w-16">
      <div className="size-16 bg-gray-100 dark:bg-base-dark rounded-md relative flex flex-col items-center justify-center">
        {contentType ? (
          contentType.startsWith("image") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={url}
              src={url}
              alt={name ?? "An image attachment"}
              className="rounded-md size-full object-cover aspect-square animate-opacity"
            />
          ) : (
            <div className=""></div>
          )
        ) : (
          <div className=""></div>
        )}

        {isUploading && (
          <div className="absolute text-base-color-m dark:text-base-color-dark-m">
            {spinner}
          </div>
        )}

        {!isUploading && !!onRemove && (
          <button
            onClick={onRemove}
            className="absolute -top-1.5 -right-1.5 bg-white dark:bg-base-full-dark border border-gray-300 dark:border-[#123a6f] rounded-full p-1 flex items-center justify-center md:opacity-0 group-hover/preview:opacity-100 transition-opacity"
          >
            <CloseIcon className="size-3 text-base-color dark:text-white" />
          </button>
        )}
      </div>
    </div>
  );
};
