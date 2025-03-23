"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Card, CardHeader } from "@/components/kit/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn, getResourceColor, getResourceDetails } from "@/lib/utils";

type ResoucesItemProps = {
  index: number;
  title: string;
  subtitle: string;
  href: string;
  quote: string;
};

const ResourcesItem = (props: ResoucesItemProps) => {
  const { index, title, subtitle, href, quote } = props;
  const isMobile = useIsMobile();

  const resourceDetails = getResourceDetails(title);

  if (!resourceDetails) return null;

  return (
    <>
      {!isMobile && (
        <Card className="hover:shadow-pretty dark:bg-accent/30 hidden min-h-52 min-w-64 rounded-xl bg-slate-50 transition will-change-transform hover:-translate-y-1 md:block">
          <CardHeader className="space-y-0 pb-0">
            <div
              className={cn(
                "flex size-10 items-center justify-center rounded-lg",
                getResourceColor(index, "background"),
              )}
            >
              <resourceDetails.activeIcon
                className={cn("size-5", getResourceColor(index, "text"))}
              />
            </div>
            <span className="text-xxs text-muted-foreground absolute top-6 right-6 font-bold tracking-wide uppercase">
              {subtitle}
            </span>
          </CardHeader>
          <div className="p-6 pt-3">
            <h3 className="text-foreground font-merriweather text-lg font-bold">
              {title}
            </h3>
            <p className="text-foreground/80 mt-1 text-sm leading-5">{quote}</p>
          </div>
          <Link
            href={href}
            aria-label={"Ir al recurso " + title}
            className="absolute inset-0"
          />
        </Card>
      )}
      <Link
        href={href}
        className={cn(
          getResourceColor(index, "gradient"),
          "relative aspect-auto h-44 min-w-36 flex-col items-center justify-center rounded-2xl bg-linear-to-br transition active:scale-[0.97] sm:h-64 md:hidden",
        )}
      >
        <div className="absolute top-0 z-10 flex w-full shrink-0 flex-col items-start justify-start px-4 pt-3 sm:px-5">
          <span className="text-xxs font-bold tracking-wide text-white/70 uppercase">
            {subtitle}
          </span>
          <h3 className="text-lg font-semibold text-white sm:text-xl">
            {title}
          </h3>
        </div>
        <div className="absolute inset-x-4 bottom-3 flex items-end justify-between text-white sm:inset-x-5 sm:bottom-5">
          <div>
            <resourceDetails.activeIcon className="size-7" />
          </div>
          <div className="bg-background inline-flex h-8 w-12 items-center justify-center rounded-full shadow-md">
            <div className="text-foreground text-sm font-normal">
              <ArrowRight className="size-5" />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ResourcesItem;
