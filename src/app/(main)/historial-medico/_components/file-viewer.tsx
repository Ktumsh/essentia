"use client";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import {
  Download,
  ExternalLink,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { Button } from "@/components/kit/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/kit/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/kit/drawer";
import { Separator } from "@/components/kit/separator";
import { BetterTooltip } from "@/components/kit/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/utils";

interface FileViewerProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl?: string;
  fileName: string;
}

// Configuración del worker de PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function FileViewer({
  isOpen,
  onClose,
  fileUrl,
  fileName,
}: FileViewerProps) {
  const isMobile = useIsMobile();

  const [fileType, setFileType] = useState<"pdf" | "image" | "unknown">(
    "unknown",
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  // Para PDF
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (fileUrl) {
      const extension = fileUrl.split(".").pop()?.toLowerCase();
      if (extension === "pdf") {
        setFileType("pdf");
      } else if (
        ["jpg", "jpeg", "png", "gif", "webp"].includes(extension || "")
      ) {
        setFileType("image");
      } else {
        setFileType("unknown");
      }
    }
  }, [fileUrl]);

  const pdfOptions = useMemo(
    () => ({ cMapUrl: "cmaps/", cMapPacked: true }),
    [],
  );

  // Fullscreen
  const toggleFullscreen = () => {
    const element = document.documentElement;
    if (!isFullscreen) {
      element.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Zoom
  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));

  // Rotar
  const rotate = () => setRotation((prev) => (prev - 90) % 360);

  // Reset
  const resetView = () => {
    setZoom(1);
    setRotation(0);
  };

  const handleDownload = async () => {
    if (!fileUrl) return;
    try {
      const response = await fetch(fileUrl, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error descargando el archivo:", error);
    }
  };

  const openInNewTab = () => {
    window.open(fileUrl, "_blank");
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () =>
    setPageNumber((prev) => (prev > 1 ? prev - 1 : prev));
  const goToNextPage = () =>
    setPageNumber((prev) => (numPages && prev < numPages ? prev + 1 : prev));

  const viewerContent = (
    <div
      className="bg-accent flex-1 overflow-auto rounded-md p-6"
      style={{ textAlign: "center" }}
    >
      {fileType === "pdf" && fileUrl && (
        <div className="inline-block text-start">
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            options={pdfOptions}
            loading={<p>Cargando PDF...</p>}
          >
            <Page pageNumber={pageNumber} scale={zoom} rotate={rotation} />
          </Document>

          {numPages && numPages > 1 && (
            <div className="flex justify-center gap-2 p-2">
              <Button onClick={goToPrevPage}>Anterior</Button>
              <span>
                Página {pageNumber} de {numPages}
              </span>
              <Button onClick={goToNextPage}>Siguiente</Button>
            </div>
          )}
        </div>
      )}

      {fileType === "image" && fileUrl && (
        <div style={{ display: "inline-block" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fileUrl || "/placeholder.svg"}
            alt={fileName}
            style={{
              transform: `rotate(${rotation}deg) scale(${zoom})`,
              transition: "transform 0.2s ease",
              maxWidth: "none",
            }}
          />
        </div>
      )}

      {fileType === "unknown" && (
        <div className="flex h-full flex-col items-center justify-center p-4">
          <p className="mb-4 text-lg font-medium">
            No se puede previsualizar este tipo de archivo
          </p>
          <p className="text-muted-foreground mb-6 text-sm">
            Este tipo de archivo no se puede mostrar en el navegador. Puedes
            descargarlo para verlo en tu dispositivo.
          </p>
          <Button onClick={handleDownload}>Descargar archivo</Button>
        </div>
      )}
    </div>
  );

  return isMobile ? (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="flex h-[90dvh] flex-col">
        <DrawerHeader className="relative">
          <DrawerTitle>Vista de archivo</DrawerTitle>
          <div className="absolute top-1/2 left-4 inline-flex -translate-y-1/2 items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={rotate}
              className="size-7 [&_svg]:size-3.5!"
            >
              <RotateCcw />
            </Button>
          </div>
          <div className="absolute top-1/2 right-4 inline-flex -translate-y-1/2 items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={zoomIn}
              className="size-7 [&_svg]:size-3.5!"
            >
              <ZoomIn />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={zoomOut}
              className="size-7 [&_svg]:size-3.5!"
            >
              <ZoomOut />
            </Button>
          </div>
        </DrawerHeader>
        <DrawerDescription className="sr-only" asChild>
          <p>
            {fileType === "pdf" && <>Vista previa de PDF</>}
            {fileType === "image" && <>Vista previa de imagen</>}
            {fileType === "unknown" && <>Vista previa no disponible</>}
          </p>
        </DrawerDescription>
        <div className="h-full flex-1 overflow-y-auto p-4">{viewerContent}</div>
        <DrawerFooter>
          <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
            <Button variant="mobile" onClick={resetView}>
              <RotateCw />
              Restablecer vista
            </Button>
            <Separator className="dark:bg-alternative/50 z-10 ml-6" />
            <Button variant="mobile" onClick={openInNewTab}>
              <ExternalLink />
              Abrir en nueva pestaña
            </Button>
          </div>
          <Button variant="mobile-primary" onClick={handleDownload}>
            <Download />
            Descargar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          isFullscreen
            ? "m-0 h-screen max-h-none! w-screen max-w-none! rounded-none"
            : "h-full max-h-[80vh] sm:max-w-4xl",
        )}
      >
        <button aria-hidden className="sr-only"></button>
        <DialogHeader className="flex-row items-end justify-between gap-4">
          <DialogTitle className="truncate leading-6">{fileName}</DialogTitle>
          <DialogDescription className="sr-only" asChild>
            <p>
              {fileType === "pdf" && <>Vista previa de PDF</>}
              {fileType === "image" && <>Vista previa de imagen</>}
              {fileType === "unknown" && <>Vista previa no disponible</>}
            </p>
          </DialogDescription>
          <div className="mr-6 flex items-center gap-2">
            <BetterTooltip content="Acercar" side="bottom">
              <Button variant="outline" size="icon" onClick={zoomIn}>
                <ZoomIn />
              </Button>
            </BetterTooltip>
            <BetterTooltip content="Alejar" side="bottom">
              <Button variant="outline" size="icon" onClick={zoomOut}>
                <ZoomOut />
              </Button>
            </BetterTooltip>
            <BetterTooltip content="Rotar a la izquierda" side="bottom">
              <Button variant="outline" size="icon" onClick={rotate}>
                <RotateCcw />
              </Button>
            </BetterTooltip>
            <BetterTooltip
              content={
                isFullscreen
                  ? "Salir de pantalla completa"
                  : "Pantalla completa"
              }
              side="bottom"
            >
              <Button variant="outline" size="icon" onClick={toggleFullscreen}>
                {isFullscreen ? <Minimize /> : <Maximize />}
              </Button>
            </BetterTooltip>
          </div>
        </DialogHeader>
        {viewerContent}
        <DialogFooter className="mt-4 flex items-center justify-between">
          <Button radius="full" variant="outline" onClick={resetView}>
            Restablecer vista
          </Button>
          <div className="flex gap-2">
            <Button radius="full" variant="outline" onClick={openInNewTab}>
              <ExternalLink />
              Abrir en nueva pestaña
            </Button>
            <Button radius="full" onClick={handleDownload}>
              <Download />
              Descargar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
