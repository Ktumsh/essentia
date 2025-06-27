"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GUIDE_THEME_COLORS, GUIDE_DATA } from "@/db/data/guide-data";
import { capitalize, cn } from "@/utils";

import DownloadGuideButton from "../../_components/download-guide-button";

const Guides = () => {
  const router = useRouter();

  return (
    <section className="@container/guides flex flex-col items-center">
      <div className="grid w-full gap-12 md:gap-6 @xl/guides:grid-cols-2 @5xl/guides:grid-cols-3">
        {GUIDE_DATA.map((guide) => {
          const theme =
            GUIDE_THEME_COLORS[guide.id as keyof typeof GUIDE_THEME_COLORS] ||
            GUIDE_THEME_COLORS[1];
          return (
            <Card
              key={guide.id}
              onDoubleClick={() =>
                router.push(`/herramientas/guias/${guide.id}`)
              }
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  router.push(`/herramientas/guias/${guide.id}`);
                }
              }}
              aria-label={`Abrir guía: ${guide.title}`}
              className="group/card text-foreground ring-border hover:shadow-little-pretty relative flex flex-col border-0 ring-1 transition duration-300 select-none hover:-translate-y-1"
            >
              <div
                className={cn(
                  "absolute inset-x-0 top-0 z-1 h-1 opacity-0 transition-all duration-300 group-hover/card:opacity-100",
                  theme.accent,
                )}
              />
              <div className="absolute top-4 left-4 z-10">
                <Badge
                  className={cn(
                    "mb-4 h-6 px-2 py-0 font-normal backdrop-blur-md transition-shadow group-hover/card:shadow-sm",
                    theme.bg,
                    theme.text,
                  )}
                >
                  {guide.type}
                </Badge>
              </div>
              <div className="relative h-96 overflow-hidden md:h-48">
                <Image
                  src={guide.thumbnail}
                  alt={`Imagen de la ${guide.title.toLowerCase()}`}
                  quality={100}
                  width={384}
                  height={192}
                  className="animate-fade-in h-96 w-full object-cover transition-transform duration-500 group-hover/card:scale-110 md:h-48"
                />
                <div className="absolute inset-0 z-1 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity duration-300 group-hover/card:opacity-100 md:opacity-0" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <CardHeader className="gap-0 space-y-3 p-0">
                  <CardTitle className="text-base">{guide.title}</CardTitle>
                  <CardDescription className="text-muted-foreground line-clamp-2 text-sm">
                    {guide.description}
                  </CardDescription>
                  <div className="mt-1 mb-6 flex flex-wrap gap-2">
                    {guide.tags.slice(0, 3).map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-foreground/80 px-2 py-1 text-xs! font-normal"
                      >
                        {capitalize(tag)}
                      </Badge>
                    ))}
                    {guide.tags.length > 3 && (
                      <Badge
                        variant="secondary"
                        className="text-foreground/80 px-2 py-1 text-xs! font-normal"
                      >
                        +{guide.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardFooter className="mt-auto justify-between p-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      router.push(`/herramientas/guias/${guide.id}`)
                    }
                    className="group/btn bg-accent duration-300 group-hover/card:opacity-100 md:bg-transparent md:opacity-0"
                  >
                    Leer guía
                    <ArrowRight className="transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                  <DownloadGuideButton guide={guide} />
                </CardFooter>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default Guides;
