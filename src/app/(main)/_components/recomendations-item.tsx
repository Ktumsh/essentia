"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { Card, CardHeader } from "@/components/kit/card";
import { cn, getItemBackgroundColor } from "@/lib/utils";
import { MaincapResources } from "@/types/resource";

interface RecomendationsItemProps {
  item: MaincapResources;
  index: number;
}

const RecomendationsItem = (props: RecomendationsItemProps) => {
  const { id, link, title, description, image, icon: Icon } = props.item;
  const { index } = props;

  const imageWidth = useMemo(() => {
    if (index % 2 === 0 && index !== 3) {
      return 661;
    } else if (index === 3) {
      return 640;
    } else {
      return 435;
    }
  }, [index]);

  const imageHeight = useMemo(() => {
    if (index === 0) {
      return 372;
    } else if (index === 1) {
      return 290;
    } else if (index === 2) {
      return 317;
    } else if (index === 3) {
      return 360;
    } else if (index === 5) {
      return 249;
    } else {
      return 330;
    }
  }, [index]);

  return (
    <Card className="group max-h-52 min-h-52 overflow-hidden rounded-2xl border-none bg-transparent! select-none">
      {image && (
        <Image
          priority={index < 2}
          src={image}
          alt={title}
          width={imageWidth}
          height={imageHeight}
          className="absolute inset-0 z-[-1] aspect-auto h-full w-full object-cover object-center brightness-75 xl:h-auto"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 z-[-1] bg-linear-to-t from-black/30 from-40% to-transparent transition duration-500 group-hover:backdrop-blur-xs"
      />
      <CardHeader className="pb-0">
        <div
          className={cn(
            "flex size-10 items-center justify-center rounded-lg",
            getItemBackgroundColor(id),
          )}
        >
          <Icon className="size-5 text-white" />
        </div>
      </CardHeader>
      <div className="p-6 pt-3">
        <h3 className="font-merriweather text-lg font-bold text-white">
          {title}
        </h3>
        <p className="text-sm leading-6 text-white/80">{description}</p>
      </div>
      <Link
        href={link}
        aria-label="Ir al recurso"
        className="absolute inset-0"
      />
    </Card>
  );
};

export default RecomendationsItem;
