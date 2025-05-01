"use client";

import { usePathname } from "next/navigation";
import { useCallback } from "react";

import { DownloadButton } from "@/components/button-kit/download-button";
import { BetterTooltip } from "@/components/kit/tooltip";
import { EmergencySteps } from "@/consts/emergency-steps";
import { cn } from "@/lib/utils";

import GuidePdfDocument from "./guide-document";

import type { Guide } from "@/consts/guide-data";

interface DownloadGuideButtonProps {
  guide: Guide | EmergencySteps;
  full?: boolean;
  isHeader?: boolean;
  className?: string;
}

export default function DownloadGuideButton({
  guide,
  full,
  isHeader,
  className,
}: DownloadGuideButtonProps) {
  const pathname = usePathname();
  const isEmergencies = pathname.includes("/herramientas/emergencias");

  const handleDownload = useCallback(async () => {
    try {
      const { pdf } = await import("@react-pdf/renderer");

      const blob: Blob = await pdf(
        <GuidePdfDocument
          title={guide.title}
          description={guide.description}
          content={guide.content}
        />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${guide.title.toLowerCase().replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  }, [guide]);

  if (full) {
    return (
      <DownloadButton
        variant={isEmergencies ? "outline" : "default"}
        onClick={handleDownload}
        className={cn({ "rounded-full": isHeader }, className)}
      >
        {isEmergencies ? "Descargar guía completa" : "Descargar PDF"}
      </DownloadButton>
    );
  }

  return (
    <BetterTooltip content="Descargar">
      <DownloadButton
        size="icon"
        variant="ghost"
        onClick={handleDownload}
        className={cn("relative rounded-md", {
          "hover:bg-background size-7 rounded-sm group-hover/item:opacity-100 after:absolute after:-inset-2 after:content-[''] md:opacity-0 md:after:content-none md:[&_svg]:size-3.5!":
            !isHeader,
        })}
      >
        <span className="sr-only">Descargar PDF</span>
      </DownloadButton>
    </BetterTooltip>
  );
}
