"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { Card, CardHeader } from "@/components/ui/card";
import { MaincapResources } from "@/types/resource";
import { cn } from "@/utils/common";

import { getItemBackgroundColor } from "../lib/utils";

interface RecomendationsItemProps {
  item: MaincapResources;
  index: number;
}

const RecomendationsItem = (props: RecomendationsItemProps) => {
  const { id, link, title, description, image, icon: Icon } = props.item;
  const { index } = props;

  const imageWidth = useMemo(() => {
    if (index % 2 === 0) {
      return 661;
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
    } else if (index === 3 || index === 5) {
      return 249;
    } else {
      return 330;
    }
  }, [index]);

  return (
    <Card className="group min-h-52 select-none overflow-hidden rounded-xl border-none !bg-transparent shadow-none">
      {image && (
        <Image
          priority={index < 2}
          src={image}
          alt={title}
          width={imageWidth}
          height={imageHeight}
          className="absolute inset-0 z-[-1] aspect-auto w-full object-cover object-center brightness-75"
        />
      )}
      <div className="absolute inset-0 z-[-1] bg-gradient-to-t from-black/30 from-40% to-transparent backdrop-blur-sm transition duration-500 group-hover:backdrop-blur-0"></div>
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
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="prose-sm text-gray-300">{description}</p>
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
