"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Card, CardHeader } from "@/components/ui/card";
import { getResourceColor, getResourceDetails } from "@/modules/core/lib/utils";
import { cn } from "@/utils/common";

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
      {isMobile ? (
        <Link
          href={href}
          className={cn(
            getResourceColor(index, "gradient"),
            "text-main dark:border-full-dark dark:text-main-dark relative aspect-auto h-44 min-w-36 flex-col items-center justify-center rounded-2xl bg-linear-to-br transition active:scale-[0.97] sm:h-64 md:hidden",
          )}
        >
          <div className="absolute top-0 z-10 flex w-full shrink-0 flex-col items-start justify-start px-4 pt-3 sm:px-5">
            <span className="text-xxs font-bold tracking-wide text-white/60 uppercase">
              {subtitle}
            </span>
            <h3 className="text-lg font-semibold text-white sm:text-xl">
              {title}
            </h3>
          </div>
          <div className="absolute inset-x-4 bottom-3 flex items-end justify-between sm:inset-x-5 sm:bottom-5">
            <div>
              <resourceDetails.activeIcon className="size-7 text-white" />
            </div>
            <div className="dark:bg-full-dark inline-flex h-8 w-12 items-center justify-center rounded-full bg-white shadow-md">
              <div className="text-main text-sm font-normal dark:text-white">
                <ArrowRight className="size-5" />
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <Card className="hover:shadow-pretty hidden min-h-52 min-w-64 rounded-xl border-none shadow-none transition will-change-transform hover:-translate-y-1 md:block">
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
            <span className="text-xxs text-main-m dark:text-main-dark-m absolute top-6 right-6 font-bold tracking-wide uppercase">
              {subtitle}
            </span>
          </CardHeader>
          <div className="p-6 pt-3">
            <h3 className="text-main text-lg font-bold dark:text-white">
              {title}
            </h3>
            <p className="prose-sm text-main-m dark:text-main-dark-h">
              {quote}
            </p>
          </div>
          <Link
            href={href}
            aria-label={"Ir al recurso " + title}
            className="absolute inset-0"
          />
        </Card>
      )}
    </>
  );
};

export default ResourcesItem;
