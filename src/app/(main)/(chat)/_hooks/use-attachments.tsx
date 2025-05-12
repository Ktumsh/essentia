import { useMemo } from "react";

import type { Attachment } from "ai";

export function useAttachments(experimental_attachments?: Attachment[]) {
  return useMemo(() => {
    const list = experimental_attachments ?? [];
    return list.reduce(
      (acc, a) => {
        if (a.contentType?.startsWith("application"))
          acc.fileAttachments.push(a);
        else acc.imageAttachments.push(a);
        return acc;
      },
      {
        imageAttachments: [] as Attachment[],
        fileAttachments: [] as Attachment[],
      },
    );
  }, [experimental_attachments]);
}
