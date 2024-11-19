"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { siteConfig } from "@/config/site";
import { cn } from "@/utils/common";

import { ArrowRightV2Icon } from "../../icons/navigation";

type ResoucesItemProps = {
  index: number;
  title: string;
  subtitle: string;
  img: string;
  href: string;
  children: React.ReactNode;
};

const ResourcesItem = (props: ResoucesItemProps) => {
  const { index, title, subtitle, img, href, children } = props;
  const isMobile = useIsMobile();

  const resources = siteConfig.asideMenuLinks;

  const resource = resources.find(
    (resource) =>
      resource.name.toLocaleLowerCase().normalize("NFD") ===
      title.toLocaleLowerCase().normalize("NFD"),
  );

  const itemSpan = useMemo(() => {
    switch (true) {
      case index === 0 || index === 4:
        return "md:col-span-4";

      case index === 1 || index === 5:
        return "md:col-span-5";

      case index === 2 || index === 3:
        return "md:col-span-3";
      default:
        return "";
    }
  }, [index]);

  const itemColor = useMemo(() => {
    switch (true) {
      case index === 0:
        return "from-emerald-600 to-emerald-500";

      case index === 1:
        return "from-sky-600 to-sky-500";

      case index === 2:
        return "from-yellow-600 to-yellow-500";

      case index === 3:
        return "from-fuchsia-600 to-fuchsia-500";

      case index === 4:
        return "from-rose-600 to-rose-500 ";

      default:
        return "from-cyan-600 to-cyan-500";
    }
  }, [index]);

  const imageWidth = useMemo(() => {
    switch (true) {
      case index === 0 || index === 4:
        return 363;

      case index === 1 || index === 5:
        return 457;

      case index === 2 || index === 3:
        return 270;

      default:
        return 254;
    }
  }, [index]);

  return (
    <>
      <Link
        href={href}
        className={cn(
          itemColor,
          "relative aspect-auto h-32 flex-col items-center justify-center rounded-2xl bg-gradient-to-br text-main transition active:scale-[0.97] dark:border-full-dark dark:text-main-dark sm:h-64 md:hidden",
        )}
      >
        <div className="absolute top-0 z-10 flex w-full shrink-0 flex-col items-start justify-start px-5 pt-3">
          <span className="text-xs font-bold uppercase text-white/60">
            {subtitle}
          </span>
          <h3 className="text-xl font-semibold text-white sm:text-xl">
            {title}
          </h3>
        </div>
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
          <div>
            {resource && <resource.activeIcon className="size-7 text-white" />}
          </div>
          <div className="inline-flex h-8 w-12 items-center justify-center rounded-full bg-white shadow-md dark:bg-full-dark">
            <div className="text-sm font-normal text-main dark:text-white">
              <ArrowRightV2Icon className="size-5" />
            </div>
          </div>
        </div>
      </Link>

      {!isMobile && (
        <Link
          href={href}
          className={cn(
            itemSpan,
            "group relative hidden h-64 flex-col overflow-hidden rounded-xl border border-white text-main transition-all duration-500 motion-reduce:transition-none dark:border-full-dark dark:text-main-dark md:flex",
          )}
        >
          <div className="absolute top-0 z-10 flex w-full shrink-0 flex-col items-start justify-start px-5 pt-3">
            <span className="text-xs font-bold uppercase text-white/60 transition-opacity group-hover:opacity-0">
              {subtitle}
            </span>
            <h3 className="font-medium text-white transition-opacity group-hover:opacity-0 sm:text-xl 2xl:text-2xl">
              {title}
            </h3>
          </div>
          <Image
            priority
            quality={80}
            width={imageWidth}
            height={254}
            src={img}
            alt={`Enlace al recurso de ${title}`}
            className="relative z-0 aspect-auto h-full object-cover blur-0 brightness-95 !transition-all md:rounded-xl lg:group-hover:brightness-75 dark:lg:group-hover:blur-lg"
          />
          <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(to_bottom,_rgba(0,_0,_0,_0.4)_0%,_rgba(0,_0,_0,_0)_80%)] md:rounded-xl md:bg-[linear-gradient(to_bottom,_rgba(0,_0,_0,_0.4)_0%,_rgba(0,_0,_0,_0)_40%)]"></div>
          <div className="absolute bottom-0 z-10 flex h-auto w-full items-center justify-end rounded-b-xl border-gray-100/50 bg-transparent p-3 text-inherit subpixel-antialiased transition-all duration-500 dark:border-full-dark/50 md:border-t-1 md:bg-white/30 md:backdrop-blur md:backdrop-saturate-150 md:dark:bg-full-dark/40 lg:group-hover:rounded-xl lg:group-hover:bg-white/50 lg:group-hover:pt-[211px] dark:lg:group-hover:bg-full-dark/40">
            {children}
            <div
              aria-label="Ver"
              className="relative inline-flex h-8 w-12 min-w-0 items-center justify-center rounded-full bg-light-gradient px-4 text-white shadow-md !transition-all group-hover:w-20 data-[hover=true]:brightness-90 dark:bg-dark-gradient-v2"
            >
              <div className="inline-flex whitespace-nowrap text-sm opacity-0 transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-100">
                Ver
              </div>
              <div className="absolute right-3.5">
                <ArrowRightV2Icon className="size-5" />
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default ResourcesItem;
