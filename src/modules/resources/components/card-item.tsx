"use client";

import { useDisclosure } from "@nextui-org/react";
import dynamic from "next/dynamic";
import Image from "next/image";

import { EyeIcon } from "@/modules/icons/status";
import { ModalSize } from "@/types/common";
import { ResourceCard } from "@/types/resource";
import { formatTitle } from "@/utils/format";

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    id,
    title,
    category,
    image,
    body,
    videoTitle,
    videoLink,
    videoChannel,
  } = item;

  const formatedTitle = formatTitle(title);

  const card = {
    id,
    title,
    category,
    image,
    body,
  };

  const video = {
    videoTitle,
    videoLink,
    videoChannel,
  };

  const modal = {
    isOpen,
    onOpen,
    onOpenChange,
    modalSize: "3xl" as ModalSize,
  };

  return (
    <>
      <li
        id={formatedTitle}
        data-id={formatedTitle}
        className="group relative flex h-32 md:h-52"
      >
        <div className="pointer-events-none block size-full">
          <div className="size-full">
            <div className="relative mx-auto size-full overflow-hidden rounded-lg">
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
                width={328}
                height={208}
                alt={title}
                src={image}
                className="size-full object-cover transition-transform duration-1000 motion-safe:group-hover:scale-105"
              />
            </div>
            <div className="absolute left-0 top-0 z-10 px-5 pt-3">
              <span className="text-tiny font-bold uppercase text-white/60">
                {category}
              </span>
              <h2 className="text-lg font-semibold text-white md:text-xl">
                {title}
              </h2>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            onOpen();
            history.replaceState(null, "", `#${formatedTitle}`);
          }}
          className="absolute inset-0"
        />
      </li>
      <CardModal
        props={{
          type,
          card,
          video,
          modal,
        }}
      />
    </>
  );
};

export default CardItem;
