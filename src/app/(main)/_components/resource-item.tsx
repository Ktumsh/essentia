"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Card, CardHeader } from "@/components/kit/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn, getRouteColor, getRouteDetails } from "@/lib/utils";

import type { ResourceDataType } from "@/consts/resources-data";

interface ResourceItemProps extends ResourceDataType {
  index: number;
}

const ResourceItem = (props: ResourceItemProps) => {
  const { index, title, subtitle, slug, quote } = props;
  const isMobile = useIsMobile();

  const resourceDetails = getRouteDetails(title);

  if (!resourceDetails) return null;

  return (
    <>
      {!isMobile && (
        <Card className="hover:shadow-pretty dark:bg-accent/50 hidden min-h-52 min-w-64 rounded-xl bg-slate-50 transition will-change-transform hover:-translate-y-1 md:block">
          <CardHeader className="space-y-0 pb-0">
            <div
              className={cn(
                "shadow-background flex size-10 items-center justify-center rounded-lg shadow-[0_0_0_1px]",
                getRouteColor(index, "background"),
              )}
            >
              <resourceDetails.activeIcon
                className={cn("size-5", getRouteColor(index, "text"))}
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
            href={slug}
            aria-label={"Ir al recurso " + title}
            className="absolute inset-0"
          />
        </Card>
      )}
      <Link
        href={slug}
        className={cn(
          getRouteColor(index, "gradient"),
          "relative flex aspect-auto min-h-36 min-w-36 flex-col items-center justify-center gap-2 rounded-2xl bg-linear-to-br/shorter transition first:rounded-tr-2xl! last:rounded-bl-2xl! odd:rounded-tr-sm odd:rounded-br-sm even:rounded-tl-sm even:rounded-bl-sm active:scale-[0.97] md:hidden [&:nth-child(2)]:rounded-tl-2xl [&:nth-child(5)]:rounded-br-2xl",
        )}
      >
        <div className="z-10 flex w-full flex-1 shrink-0 flex-col items-start justify-start px-4 pt-3 sm:px-5">
          <span className="text-xxs font-bold tracking-wide text-white/70 uppercase">
            {subtitle}
          </span>
          <h3 className="text-[17px] font-semibold text-white sm:text-xl">
            {title}
          </h3>
        </div>
        <div className="flex w-full items-end justify-between p-4 pt-0 text-white sm:p-5">
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

export default ResourceItem;
