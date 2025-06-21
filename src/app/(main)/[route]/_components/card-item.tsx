"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { memo, useState } from "react";

import { EyeIcon } from "@/components/icons/status";

import type { ExcerciseVideoType } from "@/db/data/exercise-video-data";
import type { ArticleType } from "@/lib/types";

const CardModal = dynamic(() => import("./card-modal"), { ssr: false });

interface CardItemProps {
  type: "article" | "routine";
  item: ArticleType & ExcerciseVideoType;
}

const CardItem = ({ item, type }: CardItemProps) => {
  const [open, setOpen] = useState(false);
  const { slug, title, category, image } = item;
  return (
    <>
      <li
        id={slug}
        data-id={slug}
        className="group relative flex h-44 select-none md:h-52"
      >
        <div className="pointer-events-none block size-full">
          <div className="size-full">
            <div className="relative mx-auto size-full overflow-hidden rounded-2xl">
              <div
                aria-hidden="true"
                className="absolute inset-0 z-10 bg-linear-to-b from-black/70 to-transparent md:to-80%"
              />
              <div
                aria-hidden="true"
                className="absolute right-0 bottom-3 z-10 hidden flex-col items-start! text-white opacity-0 transition-all duration-500 group-hover:px-5 group-hover:opacity-100 md:flex"
              >
                <EyeIcon className="size-6 drop-shadow-md" />
              </div>
              <Image
                width={296}
                height={208}
                alt={title}
                src={image}
                className="aspect-auto size-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
              />
            </div>
            <div className="absolute top-0 z-10 flex w-full shrink-0 flex-col items-start justify-start px-4 pt-3 sm:px-5">
              <span className="text-xxs font-bold tracking-wide text-white/60 uppercase">
                {category}
              </span>
              <h2 className="font-merriweather text-base font-semibold text-white md:text-xl">
                {title}
              </h2>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setOpen(true);
            history.replaceState(null, "", `#${slug}`);
          }}
          className="absolute inset-0"
        />
      </li>
      <CardModal item={item} type={type} open={open} setOpen={setOpen} />
    </>
  );
};

export default memo(CardItem);
