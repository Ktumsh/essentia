"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { ArrowLeftButton } from "@/components/button-kit/arrow-left-button";
import { Badge } from "@/components/kit/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import { GUIDE_THEME_COLORS, GUIDE_DATA } from "@/db/data/guide-data";
import { cn } from "@/lib/utils";

import DownloadGuideButton from "../../_components/download-guide-button";

const Guides = () => {
  const route = useRouter();

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
                route.push(`/herramientas/guias/${guide.id}`)
              }
              className="group/item text-foreground bg-muted hover:bg-accent flex flex-col border-0 p-2 transition-colors duration-300 select-none md:p-4"
            >
              <Badge
                className={cn(
                  "mb-4 h-6 px-2 py-0 font-normal",
                  theme.bg,
                  theme.text,
                )}
              >
                {guide.type}
              </Badge>
              <div className="h-96 overflow-hidden rounded-sm md:h-48">
                <Image
                  src={guide.thumbnail}
                  alt={`Imagen de la ${guide.title.toLowerCase()}`}
                  quality={100}
                  width={384}
                  height={192}
                  className="animate-fade-in h-96 w-full object-cover transition-transform duration-500 group-hover/item:scale-105 md:h-48"
                />
              </div>
              <CardHeader className="gap-2 p-0 pt-4">
                <CardTitle className="mt-1">{guide.title}</CardTitle>
                <CardDescription className="text-muted-foreground text-xs">
                  {guide.description}
                </CardDescription>
                <div className="flex flex-wrap items-center gap-2">
                  {guide.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xxs! bg-background text-muted-foreground rounded-full font-normal"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardFooter className="mt-auto justify-between p-0 pt-2">
                <ArrowLeftButton
                  variant="link"
                  onClick={() => route.push(`/herramientas/guias/${guide.id}`)}
                  className="text-foreground after:bg-primary hover:text-primary relative order-1 me-4 ml-0.5 flex-row-reverse p-0! after:absolute after:bottom-1.5 after:left-0 after:h-px after:w-0 after:transition-all after:content-[''] hover:no-underline hover:after:w-[calc(100%-24px)] md:order-none md:me-0 md:text-xs [&_svg]:rotate-180 md:[&_svg]:size-3.5!"
                >
                  Ver detalles
                </ArrowLeftButton>
                <DownloadGuideButton guide={guide} />
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default Guides;
