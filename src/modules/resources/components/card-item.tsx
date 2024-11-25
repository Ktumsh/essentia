"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

import { EyeIcon } from "@/modules/icons/status";
import { ResourceCard } from "@/types/resource";

const CardModal = dynamic(() => import("./card-modal"), { ssr: false });

type Video = {
  videoTitle: string;
  videoLink: string;
  videoChannel?: string;
};

interface CardItemProps {
  type: "article" | "routine";
  item: ResourceCard & Video;
}

const CardItem = ({ item, type }: CardItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { slug, title, category, image, videoTitle, videoLink, videoChannel } =
    item;

  const video = {
    videoTitle,
    videoLink,
    videoChannel,
  };

  const modal = {
    isOpen,
    setIsOpen,
  };

  return (
    <>
      <li id={slug} data-id={slug} className="group relative flex h-44 md:h-52">
        <div className="pointer-events-none block size-full">
          <div className="size-full">
            <div className="relative mx-auto size-full overflow-hidden rounded-2xl md:rounded-lg">
              <div
                aria-hidden="true"
                className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 to-transparent md:to-70%"
              />
              <div
                aria-hidden="true"
                className="absolute bottom-3 right-0 z-10 hidden flex-col !items-start opacity-0 transition-all group-hover:px-5 group-hover:opacity-100 md:flex"
              >
                <EyeIcon className="size-6 text-white/60 drop-shadow-md transition group-hover:text-white" />
              </div>
              <Image
                width={296}
                height={208}
                alt={title}
                src={image}
                className="aspect-auto size-full object-cover transition-transform duration-1000 motion-safe:group-hover:scale-105"
              />
            </div>
            <div className="absolute top-0 z-10 flex w-full shrink-0 flex-col items-start justify-start px-4 pt-3 sm:px-5">
              <span className="text-xxs font-bold uppercase text-white/60 sm:text-xs">
                {category}
              </span>
              <h2 className="font-semibold text-white md:text-xl">{title}</h2>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setIsOpen(true);
            history.replaceState(null, "", `#${slug}`);
          }}
          className="absolute inset-0"
        />
      </li>
      <CardModal
        props={{
          type,
          card: item,
          video,
          modal,
        }}
      />
    </>
  );
};

export default CardItem;
