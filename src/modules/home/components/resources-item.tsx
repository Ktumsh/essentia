"use client";

import { Button, Card } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import useWindowSize from "@/modules/core/hooks/use-window-size";
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
  const windowSize = useWindowSize();
  const [isMounted, setIsMounted] = useState(false);
  const { index, title, subtitle, img, href, children } = props;
  const { width } = windowSize;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const itemsSpan = () => {
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
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Card
      as={windowSize.width > 768 ? undefined : Link}
      href={windowSize.width > 768 ? undefined : href}
      isPressable={windowSize.width > 768 ? false : true}
      className={cn(
        itemsSpan(),
        "col-span-12 sm:col-span-6",
        "group relative flex flex-col",
        "text-foreground outline-none",
        "shadow-none md:shadow-md",
        "hover:shadow-lg",
        "border border-white dark:border-full-dark",
        "rounded-large transition-all md:rounded-xl md:hover:z-50",
        "h-32 duration-500 motion-reduce:transition-none sm:h-64",
      )}
    >
      <div className="absolute top-0 z-10 flex w-full shrink-0 flex-col items-start justify-start px-5 pt-3">
        <span className="text-tiny font-bold uppercase text-white/60 transition-opacity lg:group-hover:opacity-0">
          {subtitle}
        </span>
        <h3 className="text-2xl font-medium text-white transition-opacity sm:text-xl lg:group-hover:opacity-0 2xl:text-2xl">
          {title}
        </h3>
      </div>
      <Image
        priority
        quality={80}
        width={
          width > 768
            ? index === 0 || index === 4
              ? 321
              : index === 1 || index === 5
                ? 403
                : index === 2 || index === 3
                  ? 238
                  : 254
            : 343
        }
        height={width > 768 ? 254 : 256}
        src={img}
        alt={`Enlace al recurso de ${title}`}
        className="relative z-0 size-full rounded-large object-cover blur-0 brightness-95 !transition-all md:rounded-xl lg:group-hover:brightness-75 dark:lg:group-hover:blur-lg"
      />
      <div className="absolute inset-0 rounded-large bg-[linear-gradient(to_bottom,_rgba(0,_0,_0,_0.4)_0%,_rgba(0,_0,_0,_0)_80%)] md:rounded-xl md:bg-[linear-gradient(to_bottom,_rgba(0,_0,_0,_0.4)_0%,_rgba(0,_0,_0,_0)_40%)]"></div>
      <div className="absolute bottom-0 z-10 flex h-auto w-full items-center justify-end rounded-b-xl border-gray-100/50 bg-transparent p-3 text-inherit subpixel-antialiased transition-all duration-500 dark:border-full-dark/50 md:border-t-1 md:bg-white/30 md:backdrop-blur md:backdrop-saturate-150 md:dark:bg-full-dark/40 lg:group-hover:rounded-xl lg:group-hover:bg-white/50 lg:group-hover:pt-[211px] dark:lg:group-hover:bg-full-dark/40">
        {children}
        {width > 768 ? (
          <Button
            as={Link}
            href={href}
            aria-label="Ver"
            radius="full"
            variant="light"
            className="h-8 w-12 min-w-0 bg-light-gradient text-white shadow-medium !transition-all group-hover:w-20 data-[hover=true]:brightness-90 dark:bg-dark-gradient-v2"
          >
            <div className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-100">
              Ver
            </div>
            <div className="absolute right-3.5">
              <ArrowRightV2Icon className="size-5" />
            </div>
          </Button>
        ) : (
          <div className="relative inline-flex h-8 w-12 items-center justify-center overflow-hidden rounded-full bg-light-gradient text-sm font-normal text-white shadow-medium dark:bg-dark-gradient-v2">
            <div className="absolute right-3.5">
              <ArrowRightV2Icon className="size-5" />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ResourcesItem;
