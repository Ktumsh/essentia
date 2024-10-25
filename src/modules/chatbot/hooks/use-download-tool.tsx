import { toPng } from "html-to-image";
import { useRef, useCallback } from "react";

export function useDownloadTool(fileName: string = "tool.png") {
  const ref = useRef<HTMLDivElement>(null);

  const downloadImage = useCallback(() => {
    const node = ref.current;
    if (node) {
      toPng(node)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = fileName;
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error("Error al descargar la imagen:", error);
        });
    }
  }, [fileName]);

  return { ref, downloadImage };
}
