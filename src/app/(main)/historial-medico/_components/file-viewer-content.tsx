"use client";

import { AlertCircle, File, Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { Document, Page } from "react-pdf";

import { DownloadButton } from "@/components/button-kit/download-button";

interface FileViewerContentProps {
  error: string | null;
  fileType: string;
  fileUrl?: string | null;
  fileName: string;
  onDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void;
  pdfOptions: {
    cMapUrl: string;
    cMapPacked: boolean;
  };
  pageNumber: number;
  numPages: number | null;
  zoom: number;
  isMobile: boolean;
  handleDownload: () => void;
  setPageNumber: (page: number) => void;
  setPageInput: (input: string) => void;
  pageRefs: React.RefObject<Record<number, HTMLDivElement | null>>;
  onClose: () => void;
}

const FileViewerContent = ({
  error,
  fileType,
  fileUrl,
  fileName,
  onDocumentLoadSuccess,
  pdfOptions,
  pageNumber,
  numPages,
  zoom,
  isMobile,
  handleDownload,
  setPageNumber,
  setPageInput,
  pageRefs,
  onClose,
}: FileViewerContentProps) => {
  const visiblePagesRef = useRef<{ page: number; ratio: number }[]>([]);

  const handlePageIntersection = (page: number, ratio: number) => {
    visiblePagesRef.current = [
      ...visiblePagesRef.current.filter((p) => p.page !== page),
      { page, ratio },
    ];

    const visibleSortedByPosition = visiblePagesRef.current
      .filter((p) => p.ratio > 0.5)
      .map((p) => ({
        ...p,
        top:
          pageRefs.current[p.page]?.getBoundingClientRect().top ??
          Number.POSITIVE_INFINITY,
      }))
      .sort((a, b) => a.top - b.top);

    const topPage = visibleSortedByPosition[0];

    if (topPage && topPage.page !== pageNumber) {
      setPageNumber(topPage.page);
      setPageInput(topPage.page.toString());
    }
  };

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="max-w-md text-center">
          <AlertCircle className="text-muted-foreground mx-auto mb-4 size-12" />
          <h3 className="mb-2 text-base font-medium">
            No se pudo mostrar la vista previa
          </h3>
          <p className="text-muted-foreground mb-6">{error}</p>
          <DownloadButton onClick={handleDownload} size="sm" variant="outline">
            Descargar
          </DownloadButton>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="mb-6 flex min-h-full items-start justify-center p-4"
    >
      {fileType === "pdf" && fileUrl && (
        <div className="flex flex-col items-center shadow-lg">
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            options={pdfOptions}
            loading={
              <div className="flex min-h-dvh flex-col items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                  <Loader2 className="text-primary size-8 animate-spin" />
                  <div className="text-center">
                    <p className="text-lg font-medium">
                      Cargando vista previa...
                    </p>
                  </div>
                </div>
              </div>
            }
            error={
              <div className="p-16 text-center">
                <p className="text-destructive">Error al cargar el PDF</p>
              </div>
            }
          >
            {numPages &&
              Array.from({ length: numPages }, (_, i) => {
                const page = i + 1;

                return (
                  <ObservedPage
                    key={page}
                    pageNumber={page}
                    zoom={zoom}
                    width={isMobile ? 350 : 800}
                    onIntersectionChange={handlePageIntersection}
                    pageRefs={pageRefs}
                  />
                );
              })}
          </Document>
        </div>
      )}

      {fileType === "image" && fileUrl && (
        <Image
          src={fileUrl || "/placeholder.svg"}
          alt={fileName}
          width={800}
          height={600}
          className="max-w-none"
          style={{
            transform: `scale(${zoom / 100})`,
            transition: "transform 0.2s ease",
          }}
        />
      )}

      {fileType === "text" && fileUrl && (
        <div className="w-full max-w-5xl overflow-hidden rounded-md bg-white shadow-lg">
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`}
            title={fileName}
            className="h-[80vh] w-full"
          />
        </div>
      )}

      {fileType === "unknown" && (
        <div className="flex h-full flex-col items-center justify-center">
          <File className="text-muted-foreground mb-4 size-12" />
          <h3 className="mb-2 text-base font-medium">
            Vista previa no disponible
          </h3>
          <p className="text-muted-foreground mb-6">
            Este tipo de archivo no se puede mostrar en el navegador. Puedes
            descargarlo para verlo en tu dispositivo.
          </p>
          <DownloadButton onClick={handleDownload} size="sm" variant="outline">
            Descargar archivo
          </DownloadButton>
        </div>
      )}
    </div>
  );
};

export default FileViewerContent;

function ObservedPage({
  pageNumber,
  zoom,
  width,
  onIntersectionChange,
  pageRefs,
}: {
  pageNumber: number;
  zoom: number;
  width: number;
  onIntersectionChange: (page: number, ratio: number) => void;
  pageRefs: React.RefObject<Record<number, HTMLDivElement | null>>;
}) {
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ref = pageRef.current;
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        onIntersectionChange(pageNumber, entry.intersectionRatio);
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i / 20),
      },
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [onIntersectionChange, pageNumber]);

  useEffect(() => {
    pageRefs.current[pageNumber] = pageRef.current;
  }, [pageNumber, pageRefs]);

  return (
    <div ref={pageRef} className="mb-6">
      <Page
        pageNumber={pageNumber}
        scale={zoom / 100}
        width={width}
        className="shadow-sm"
      />
    </div>
  );
}
