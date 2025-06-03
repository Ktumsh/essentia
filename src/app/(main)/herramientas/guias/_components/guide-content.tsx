import { AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";
import Image from "next/image";

import { Markdown } from "@/components/markdown";
import { cn } from "@/utils";

import type { Guide, GuideThemeColors } from "@/db/data/guide-data";

interface GuideContentProps {
  guide: Guide;
  theme: GuideThemeColors;
}

const GuideContent = ({ guide, theme }: GuideContentProps) => {
  return (
    <article className="@container/guide-content">
      <h2
        className={cn(
          "font-merriweather mb-2 text-lg font-semibold",
          theme.text,
        )}
      >
        Puntos clave
      </h2>
      <div
        className={cn(
          "mb-6 rounded-xl rounded-tl-none border-l-4 p-4",
          theme.bg,
          theme.borderAccent,
        )}
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {guide.keyPoints?.map((point, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex size-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium text-white",
                  theme.accent,
                )}
              >
                {index + 1}
              </div>
              <p className="text-sm">{point}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-4">
        <Markdown className="prose-sm md:prose! md:text-base!">
          {guide.content}
        </Markdown>
        <section className="relative -order-1 h-72 overflow-hidden rounded-t-xl">
          <div className="absolute inset-0 z-0 flex items-center mask-b-from-70%">
            <Image
              priority
              src={guide.thumbnail}
              alt={`Imagen de la ${guide.title.toLowerCase()}`}
              width={1536}
              height={1024}
              className="animate-fade-in size-full object-cover object-center brightness-[0.85]"
            />
          </div>
        </section>
      </div>
      <div className={cn("mt-8 rounded-xl p-4", theme.bg)}>
        <div className="mb-3 flex items-center">
          <Lightbulb className={`${theme.text} mr-2 h-5 w-5`} />
          <h3 className={cn("font-merriweather font-semibold", theme.text)}>
            Consejos rápidos
          </h3>
        </div>
        <ul className="space-y-2">
          {guide.quickTips.map((tip, index) => (
            <li key={index} className="flex items-start">
              {index === guide.quickTips.length - 1 ? (
                <AlertTriangle
                  className={cn(
                    "mt-0.5 mr-2 h-4 w-4 flex-shrink-0",
                    theme.text,
                  )}
                />
              ) : (
                <CheckCircle2
                  className={cn(
                    "mt-0.5 mr-2 h-4 w-4 flex-shrink-0",
                    theme.text,
                  )}
                />
              )}
              <span className="text-sm">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default GuideContent;
