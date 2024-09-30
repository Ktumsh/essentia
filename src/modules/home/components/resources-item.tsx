"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowRightV2Icon } from "../../icons/navigation";
import { cn } from "@/utils/common";
import { Button, Card } from "@nextui-org/react";
import useWindowSize from "@/modules/core/hooks/use-window-size";

type ResoucesItemProps = {
  wrapperClass: string;
  title: string;
  subtitle: string;
  img: string;
  href: string;
  children: React.ReactNode;
};

const ResourcesItem = (props: ResoucesItemProps) => {
  const windowSize = useWindowSize();
  return (
    <Card
      as={windowSize.width > 768 ? undefined : Link}
      href={windowSize.width > 768 ? undefined : props.href}
      isPressable={windowSize.width > 768 ? false : true}
      className={cn(
        props.wrapperClass,
        "group flex flex-col relative",
        "text-foreground outline-none",
        "shadow-none md:shadow-md",
        "hover:shadow-lg",
        "border border-white dark:border-base-full-dark",
        "rounded-large md:rounded-xl transition-all md:hover:z-50",
        "motion-reduce:transition-none h-32 sm:h-64 duration-500"
      )}
    >
      <div className="flex flex-col items-start justify-start absolute w-full shrink-0 top-1 px-5 pt-3 z-10">
        <span className="text-tiny text-white/60 uppercase font-bold lg:group-hover:opacity-0 transition-opacity">
          {props.subtitle}
        </span>
        <h4 className="text-white font-medium text-2xl sm:text-xl 2xl:text-2xl lg:group-hover:opacity-0 transition-opacity">
          {props.title}
        </h4>
      </div>
      <Image
        priority
        quality={90}
        width={600}
        height={400}
        src={props.img}
        alt={`Enlace al recurso de ${props.title}`}
        className="relative size-full object-cover rounded-large md:rounded-xl brightness-95 z-0 lg:group-hover:brightness-75 blur-0 !transition-all dark:lg:group-hover:blur-lg"
      />
      <div className="absolute inset-0 rounded-large md:rounded-xl bg-[linear-gradient(to_bottom,_rgba(0,_0,_0,_0.4)_0%,_rgba(0,_0,_0,_0)_80%)] md:bg-[linear-gradient(to_bottom,_rgba(0,_0,_0,_0.4)_0%,_rgba(0,_0,_0,_0)_40%)]"></div>
      <div className="flex items-center justify-end absolute bottom-0 h-auto w-full p-3 text-inherit subpixel-antialiased rounded-b-xl bg-transparent md:bg-white/30 md:dark:bg-base-full-dark-40 md:border-t-1 border-gray-100/50 dark:border-base-full-dark-50 md:backdrop-blur md:backdrop-saturate-150 lg:group-hover:pt-[211px] lg:group-hover:bg-white/50 dark:lg:group-hover:bg-base-full-dark-40 lg:group-hover:rounded-xl transition-all duration-500 z-10">
        {props.children}
        {windowSize.width > 768 ? (
          <Button
            as={Link}
            href={props.href}
            radius="full"
            variant="light"
            className="h-8 w-12 min-w-0 text-white bg-light-gradient dark:bg-dark-gradient-v2 shadow-medium !transition-all data-[hover=true]:brightness-90 group-hover:w-20"
          >
            <div className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-100">
              Ver
            </div>
            <div className="absolute right-3.5">
              <ArrowRightV2Icon className="size-5" />
            </div>
          </Button>
        ) : (
          <div className="relative inline-flex h-8 w-12 items-center justify-center overflow-hidden rounded-full text-sm font-normal text-white bg-light-gradient dark:bg-dark-gradient-v2 shadow-medium">
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
