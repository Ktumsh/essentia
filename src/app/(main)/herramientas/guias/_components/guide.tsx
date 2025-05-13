"use client";

import { BookOpen, Clock, HelpCircle } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

import { ArrowLeftButton } from "@/components/button-kit/arrow-left-button";
import { ShareButton } from "@/components/button-kit/share-button";
import { Badge } from "@/components/kit/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/kit/tabs";
import { BetterTooltip } from "@/components/kit/tooltip";
import { GUIDE_THEME_COLORS, Guide as GuideType } from "@/db/data/guide-data";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import GuideContent from "./guide-content";
import GuideFaqs from "./guide-faqs";
import DownloadGuideButton from "../../_components/download-guide-button";

interface GuideProps {
  guide: GuideType;
}

export default function Guide({ guide }: GuideProps) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();
  const fullUrl = "https://www.essentia.plus" + pathname;

  const handleShare = useCallback(async () => {
    const shareData = {
      title: guide.title,
      text: guide.description,
      url: fullUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(fullUrl);
        toast.success("Enlace de la guía copiado al portapapeles");
      }
    } catch (error) {
      console.error("Error al compartir:", error);
      toast.error("No se pudo compartir la guía 😔");
    }
  }, [guide.title, guide.description, fullUrl]);

  const tabs = [
    {
      value: "content",
      label: "Contenido",
      icon: <BookOpen className="size-3.5" />,
    },
    {
      value: "faq",
      label: "Preguntas frecuentes",
      icon: <HelpCircle className="size-3.5" />,
    },
  ];

  const theme =
    GUIDE_THEME_COLORS[guide.id as keyof typeof GUIDE_THEME_COLORS] ||
    GUIDE_THEME_COLORS[1];

  const readingTime = Math.ceil(guide.content.split(/\s+/).length / 180);

  return (
    <>
      <ArrowLeftButton
        variant="ghost"
        size="sm"
        className="mb-4 -translate-x-3 rounded-full"
        onClick={() => router.push("/herramientas/guias")}
      >
        Volver a guías
      </ArrowLeftButton>

      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row">
        <div className={cn("border-l-4 pl-3", theme.borderAccent)}>
          <h1 className="font-merriweather text-2xl font-semibold">
            {guide.title}
          </h1>
          <div className="text-muted-foreground mt-3 flex flex-col gap-2 text-sm">
            <div className="inline-flex items-center gap-1">
              <Clock className="size-4" />
              <span>Tiempo de lectura - {readingTime} minutos</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {guide.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xxs! text-foreground/80 rounded-full font-normal"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        {!isMobile && (
          <div className="flex gap-4">
            <BetterTooltip content="Compartir">
              <ShareButton
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="rounded-md"
              >
                <span className="sr-only">
                  Compartir {guide.title} en redes sociales
                </span>
              </ShareButton>
            </BetterTooltip>
            <DownloadGuideButton guide={guide} full={isMobile} isHeader />
          </div>
        )}
      </div>

      <Tabs defaultValue="content" className="mb-8">
        <TabsList className="w-full rounded-full md:w-fit">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex flex-1 items-center justify-center rounded-full px-3"
            >
              {tab.icon}
              <span className="leading-normal">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="content" className="mt-4">
          <GuideContent guide={guide} theme={theme} />
        </TabsContent>

        <TabsContent value="faq" className="mt-4">
          <GuideFaqs guide={guide} theme={theme} />
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex items-center justify-between gap-4 border-t pt-4 md:justify-end">
        <ShareButton
          variant="secondary"
          onClick={handleShare}
          className="rounded-full md:rounded-md"
        >
          Compartir
        </ShareButton>
        <DownloadGuideButton guide={guide} full isHeader={isMobile} />
      </div>
    </>
  );
}
