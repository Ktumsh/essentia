"use client";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  MoreHorizontal,
  Minus,
  Plus,
} from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";
import { pdfjs } from "react-pdf";

import { DownloadButton } from "@/components/button-kit/download-button";
import { PrinterButton } from "@/components/button-kit/print-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { BetterTooltip } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/utils";

import FileViewerContent from "./file-viewer-content";
import {
  getFileBackgroundColor,
  getFileIcon,
  getFileType,
  getToggleZoomIcon,
} from "../_lib/utils";

interface FileViewerProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl?: string;
  fileName: string;
}

type FileType = "pdf" | "image" | "text" | "unknown";

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

  const [fileType, setFileType] = useState<FileType>("unknown");
  const [error, setError] = useState<string | null>(null);

  const [zoom, setZoom] = useState(100);
  const previousZoom = useRef<number | null>(null);

  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageInput, setPageInput] = useState("1");

  const pageRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const scrollToPage = (page: number) => {
    const pageElement = pageRefs.current[page];
    if (pageElement) {
      pageElement.scrollIntoView({ behavior: "instant", block: "start" });
      setPageNumber(page);
      setPageInput(page.toString());
    }
  };

  useEffect(() => {
    if (!fileUrl || !isOpen) return;
    setError(null);
    const type = getFileType(fileName);
    setFileType(type);
  }, [fileUrl, fileName, isOpen]);

  const pdfOptions = useMemo(
    () => ({ cMapUrl: "cmaps/", cMapPacked: true }),
    [],
  );

  const zoomIn = () => setZoom((prev) => Math.min(prev + 10, 170));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 10, 50));

  const toggleZoom = () => {
    if (zoom === 100 && previousZoom.current !== null) {
      setZoom(previousZoom.current);
      previousZoom.current = null;
    } else {
      previousZoom.current = zoom;
      setZoom(100);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setPageInput("1");
  };

  const goToPrevPage = () => {
    if (pageNumber > 1) {
      scrollToPage(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (numPages && pageNumber < numPages) {
      scrollToPage(pageNumber + 1);
    }
  };

  const handlePageInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const pageNum = Number.parseInt(pageInput);
      if (pageNum >= 1 && numPages && pageNum <= numPages) {
        scrollToPage(pageNum);
      } else {
        setPageInput(pageNumber.toString());
      }
    }
  };

  const handlePageInputChange = (value: string) => {
    setPageInput(value);
    const pageNum = Number.parseInt(value);
    if (pageNum >= 1 && numPages && pageNum <= numPages) {
      setPageNumber(pageNum);
    }
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
    if (fileUrl) window.open(fileUrl, "_blank");
  };

  const getDescription = () => {
    switch (fileType) {
      case "pdf":
        return "de PDF";
      case "image":
        return "de imagen";
      case "text":
        return "de texto";
      case "unknown":
        return "no disponible";
      default:
        return "de archivo";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        isBlurred
        closeButton={false}
        className="m-0 h-screen max-h-none! w-screen max-w-none! gap-0 overflow-y-auto rounded-none border-0 bg-transparent p-0"
      >
        <DialogHeader isSecondary className="flex-row justify-between">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex size-8 items-center justify-center rounded-sm",
                getFileBackgroundColor(fileType),
              )}
            >
              {getFileIcon(fileType)}
            </div>
            <DialogDescription className="sr-only">
              Vista previa {getDescription()}
            </DialogDescription>
            <DialogTitle className="font-poppins truncate text-base font-medium text-white">
              {fileName}
            </DialogTitle>
          </div>
          <div className="flex items-center space-x-1">
            <BetterTooltip content="Descargar">
              <DownloadButton
                variant="ghost"
                size="icon"
                onClick={handleDownload}
                className="text-white"
              >
                <span className="sr-only">Descargar</span>
              </DownloadButton>
            </BetterTooltip>
            <BetterTooltip content="Imprimir">
              <PrinterButton
                variant="ghost"
                size="icon"
                onClick={() => window.print()}
                className="text-white"
              >
                <span className="sr-only">Imprimir</span>
              </PrinterButton>
            </BetterTooltip>
            <DropdownMenu modal={false}>
              <BetterTooltip content="Más acciones">
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
              </BetterTooltip>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={openInNewTab}>
                  <ExternalLink className="size-4" />
                  Abrir en nueva pestaña
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={toggleZoom}>
                  {getToggleZoomIcon(zoom, previousZoom)}
                  Alternar zoom
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <BetterTooltip content="Cerrar">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white"
              >
                <X />
                <span className="sr-only">Cerrar vista previa</span>
              </Button>
            </BetterTooltip>
          </div>
        </DialogHeader>
        <Toolbar
          fileType={fileType}
          numPages={numPages || 0}
          pageNumber={pageNumber}
          pageInput={pageInput}
          goToPrevPage={goToPrevPage}
          goToNextPage={goToNextPage}
          handlePageInputChange={handlePageInputChange}
          handlePageInputKeyDown={handlePageInputKeyDown}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          zoom={zoom}
          toggleZoom={toggleZoom}
          previousZoom={previousZoom}
        />
        <div className="flex-1 overflow-auto">
          <FileViewerContent
            error={error}
            fileType={fileType}
            fileUrl={fileUrl}
            fileName={fileName}
            onDocumentLoadSuccess={onDocumentLoadSuccess}
            pdfOptions={pdfOptions}
            pageNumber={pageNumber}
            numPages={numPages}
            zoom={zoom}
            isMobile={isMobile}
            handleDownload={handleDownload}
            setPageNumber={setPageNumber}
            setPageInput={setPageInput}
            pageRefs={pageRefs}
            onClose={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Toolbar({
  fileType,
  numPages,
  pageNumber,
  pageInput,
  goToPrevPage,
  goToNextPage,
  handlePageInputChange,
  handlePageInputKeyDown,
  zoomIn,
  zoomOut,
  zoom,
  toggleZoom,
  previousZoom,
}: {
  fileType: string;
  numPages: number;
  pageNumber: number;
  pageInput: string;
  goToPrevPage: () => void;
  goToNextPage: () => void;
  handlePageInputChange: (value: string) => void;
  handlePageInputKeyDown: (e: React.KeyboardEvent) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  zoom: number;
  toggleZoom: () => void;
  previousZoom: React.RefObject<number | null>;
}) {
  return (
    <div className="fixed inset-x-0 bottom-4 z-10 flex justify-center">
      <div className="flex items-center gap-1 rounded-full bg-black/60 p-1 shadow-sm backdrop-blur-md">
        {fileType === "pdf" && numPages && (
          <>
            <BetterTooltip content="Página anterior">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
                className="text-white"
              >
                <ChevronLeft />
              </Button>
            </BetterTooltip>
            <div className="flex items-center gap-2 text-sm text-white">
              <span>Página</span>
              <Input
                value={pageInput}
                onChange={(e) => handlePageInputChange(e.target.value)}
                onKeyDown={handlePageInputKeyDown}
                className="h-5! w-9 rounded border-0 bg-black/60 px-1 py-0 text-center text-xs"
              />
              <span>/</span>
              <span>{numPages}</span>
            </div>
            <BetterTooltip content="Página siguiente">
              <Button
                variant="ghost"
                size="icon"
                disabled={pageNumber >= numPages}
                onClick={goToNextPage}
                className="text-white"
              >
                <ChevronRight />
              </Button>
            </BetterTooltip>
            <Separator orientation="vertical" className="h-6! opacity-30" />
          </>
        )}
        <BetterTooltip content="Alejar">
          <Button
            variant="ghost"
            size="icon"
            disabled={zoom <= 50}
            onClick={zoomOut}
            className="text-white"
          >
            <Minus />
          </Button>
        </BetterTooltip>
        <BetterTooltip
          content={
            previousZoom.current
              ? "Ajustar al ancho anterior"
              : "Reestablecer el zoom"
          }
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleZoom}
            className="text-white"
          >
            {getToggleZoomIcon(zoom, previousZoom)}
          </Button>
        </BetterTooltip>
        <BetterTooltip content="Acercar">
          <Button
            variant="ghost"
            size="icon"
            disabled={zoom >= 170}
            onClick={zoomIn}
            className="text-white"
          >
            <Plus />
          </Button>
        </BetterTooltip>
      </div>
    </div>
  );
}
