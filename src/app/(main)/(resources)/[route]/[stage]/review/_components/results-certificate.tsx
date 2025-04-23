/* eslint-disable @next/next/no-img-element */
"use client";

import * as htmlToImage from "html-to-image";
import { motion } from "motion/react";
import Image from "next/image";
import { useMemo, useRef } from "react";
import { useReactToPrint } from "react-to-print";

import { DownloadButton } from "@/components/button-kit/download-button";
import { PrinterButton } from "@/components/button-kit/print-button";
import { Button } from "@/components/kit/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/kit/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/kit/drawer";
import { Separator } from "@/components/kit/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUserProfile } from "@/hooks/use-user-profile";
import { formatDate } from "@/utils/format";

interface ResultCertificateProps {
  reviewTitle: string;
  reviewEndDate: string;
  score: number;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ResultCertificate = ({
  reviewTitle,
  reviewEndDate,
  score,
  open,
  setOpen,
}: ResultCertificateProps) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const { user } = useUserProfile();
  const isMobile = useIsMobile();
  const userName = `${user?.firstName} ${user?.lastName}`;

  const scoreText = useMemo(() => {
    if (score === 100) return "Con una puntuación perfecta del ";
    if (score >= 60) return "Con una puntuación aprobatoria del ";
    return "";
  }, [score]);

  const handlePrint = useReactToPrint({
    contentRef: certificateRef,
    documentTitle: `Certificado de Finalización de ${reviewTitle}`,
    pageStyle: `
      @media print {
        body { margin: 0; font-family: Arial, sans-serif; }
        .certificate { page-break-after: avoid; }
      }
    `,
  });

  const handleDownloadImage = async () => {
    if (!certificateRef.current) return;

    const now = new Date();
    const certificateName = `certificado-${reviewTitle.toLowerCase().replace(/\s+/g, "-")}-${formatDate(now, "dd-MM-yyyy")}.png`;
    try {
      const dataUrl = await htmlToImage.toPng(certificateRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = certificateName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error generando imagen:", err);
    }
  };

  const onPrintClick = () => {
    handlePrint();
  };

  const certificateContent = (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="w-full overflow-hidden p-6"
    >
      <div
        ref={certificateRef}
        className="certificate mx-auto max-w-3xl rounded-lg border-8 border-double border-purple-200 bg-white p-8 text-slate-950 shadow-lg"
      >
        <div className="flex flex-col text-center">
          <div className="mb-4 flex justify-center">
            <Image
              src={
                score === 100
                  ? "/certificate/gold-certificate-seal.png"
                  : "/certificate/certificate-seal.png"
              }
              alt="Sello de certificado"
              width={80}
              height={80}
              crossOrigin="anonymous"
              className="size-16 rounded-full md:size-20"
            />
          </div>
          <h2 className="mb-2 font-serif text-2xl font-bold">
            Certificado de Finalización
          </h2>
          <p className="mb-6 text-base md:text-lg">
            Este certificado se otorga a
          </p>
          <p className="mb-4 font-serif text-lg font-bold md:mb-6 md:text-xl">
            {userName}
          </p>
          <p className="mb-4 text-base md:text-lg">
            Por completar exitosamente
          </p>
          <p className="mb-4 font-serif text-lg font-bold md:mb-6 md:text-xl">
            &quot;{reviewTitle}&quot;
          </p>
          <p className="mb-8 text-base md:text-lg">
            {scoreText} {score}%
          </p>
          <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="overflow-hidden rounded-sm">
                <img
                  src="/essentia_x72.png"
                  alt="Logo de Essentia"
                  crossOrigin="anonymous"
                  className="size-9"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-start text-base leading-normal font-semibold">
                  Essentia
                </p>
                <p className="text-sm">Tu bienestar, nuestra prioridad</p>
              </div>
            </div>
            <div className="flex flex-col md:items-end">
              <p className="text-base font-semibold">Fecha de emisión</p>
              <p className="text-sm">{reviewEndDate}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Certificado de Finalización</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto">{certificateContent}</div>
          <DrawerFooter>
            <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
              <DownloadButton variant="mobile" onClick={handleDownloadImage}>
                Descargar
              </DownloadButton>
              <Separator className="dark:bg-alternative/50 z-10 ml-6" />
              <PrinterButton variant="mobile" onClick={onPrintClick}>
                Imprimir
              </PrinterButton>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent isSecondary className="max-w-3xl!">
        <DialogHeader className="sr-only">
          <DialogTitle>Certificado de Finalización</DialogTitle>
          <DialogDescription>
            Este certificado se otorga a {userName} por completar exitosamente
            la evaluación &quot;{reviewTitle}&quot; con una puntuación de{" "}
            {score}
            %.
          </DialogDescription>
        </DialogHeader>

        {certificateContent}

        <DialogFooter className="flex gap-2" isSecondary>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="rounded-full"
          >
            Cerrar
          </Button>
          <PrinterButton
            variant="outline"
            onClick={onPrintClick}
            className="rounded-full"
          >
            Imprimir
          </PrinterButton>
          <DownloadButton
            onClick={handleDownloadImage}
            className="rounded-full"
          >
            Descargar
          </DownloadButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResultCertificate;
