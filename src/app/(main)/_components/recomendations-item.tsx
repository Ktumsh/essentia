"use client";

import Image from "next/image";
import Link from "next/link";

import { Card, CardHeader } from "@/components/ui/card";
import { getItemBackgroundColor, cn } from "@/utils";

import type { MainHeroType } from "@/db/data/main-hero-data";

interface RecomendationsItemProps {
  item: MainHeroType;
  index: number;
}

const RecomendationsItem = (props: RecomendationsItemProps) => {
  const { id, link, title, description, image, icon: Icon } = props.item;
  const { index } = props;

  return (
    <Card className="group max-h-52 min-h-52 overflow-hidden rounded-2xl border-0 bg-transparent! select-none">
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          priority={index < 2}
          src={image}
          alt={title}
          width={index % 2 ? 435 : 661}
          height={372}
          className="aspect-auto h-auto w-full object-cover object-center brightness-75"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl bg-blue-950/30 transition duration-500 group-hover:backdrop-blur-xs"
      />
      <CardHeader className="relative pb-0">
        <div
          className={cn(
            "mask mask-squircle flex size-10 items-center justify-center",
            getItemBackgroundColor(id),
          )}
        >
          <Icon className="size-5 text-white" />
        </div>
      </CardHeader>
      <div className="relative p-6 pt-3">
        <h3 className="font-merriweather text-lg font-bold text-white">
          {title}
        </h3>
        <p className="text-sm leading-6 text-white/90">{description}</p>
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
