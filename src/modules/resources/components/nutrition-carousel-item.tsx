"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";

import { StarIcon } from "@/modules/icons/common";
import { HeartIcon } from "@/modules/icons/miscellaneus";
import { cn } from "@/utils/common";

import NutritionModal from "./nutrition-modal";

type Item = {
  slug: string;
  title: string;
  image: string;
  body: string;
};

interface Props {
  item: Item;
  index: number;
}

const NutritionCarouselItem = ({ item, index }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLiked, setIsLiked] = useState(false);
  const [rating, setRating] = useState(0);

  const { slug, title, image } = item;

  const handleRating = (index: number) => {
    setRating(index + 1);
  };

  return (
    <>
      <div
        id={slug}
        data-id={slug}
        data-name={title}
        className="border-altern bg-altern-light group block h-96 w-full select-none text-clip rounded-md border px-3 py-2.5 text-main-h dark:border-dark dark:bg-dark/50 dark:text-main-dark"
      >
        <div className="bg-altern border-altern-accent h-full rounded border p-2.5 dark:border-accent-dark dark:bg-dark">
          <div className="relative overflow-hidden rounded">
            <Image
              priority={index < 3}
              loading={index > 2 ? "lazy" : "eager"}
              width={257}
              height={256}
              src={image}
              alt={title}
              className="animate-fade-in z-0 h-64 w-full object-cover [content-visibility:auto]"
            />
            <div className="absolute inset-0 z-10 p-4">
              <div className="flex h-full translate-y-full flex-col rounded bg-gray-100/80 transition-transform duration-300 will-change-transform group-hover:translate-y-0 dark:bg-gray-900/90">
                <div className="mx-auto flex h-full items-center justify-center">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="solid"
                    color="primary"
                    radius="full"
                    onPress={() => setIsLiked(!isLiked)}
                    className={cn(
                      isLiked && "!text-cerise-red-500",
                      "bg-transparent text-main-m data-[hover=true]:text-main data-[hover=true]:opacity-100 dark:text-white/40 dark:data-[hover=true]:text-white",
                    )}
                  >
                    <HeartIcon />
                  </Button>
                </div>
                <div className="mx-auto flex h-full items-center justify-center">
                  <Button
                    variant="ghost"
                    radius="none"
                    size="lg"
                    onPress={() => {
                      onOpen();
                      history.replaceState(null, "", `#${slug}`);
                    }}
                    className="border border-main font-spacemono font-medium uppercase text-main data-[hover=true]:!bg-main data-[hover=true]:text-white dark:border-white dark:text-white dark:data-[hover=true]:!bg-white dark:data-[hover=true]:text-main"
                  >
                    Ver receta
                  </Button>
                </div>
                <div className="mx-auto flex h-full items-center justify-center gap-3">
                  {[...Array(5)].map((_, index) => (
                    <Button
                      key={index}
                      isIconOnly
                      size="sm"
                      variant="solid"
                      color="primary"
                      radius="full"
                      onPress={() => handleRating(index)}
                      className={cn(
                        rating > index && "!text-yellow-300",
                        "bg-transparent text-main-m data-[hover=true]:text-main data-[hover=true]:opacity-100 dark:text-white/40 dark:data-[hover=true]:text-white",
                      )}
                    >
                      <StarIcon />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <footer className="bg-transparent px-0 py-3 text-small">
            <h3 className="text-start font-spacemono text-base uppercase text-[#4a381c] antialiased transition-colors group-hover:text-black dark:text-main-dark-h dark:group-hover:text-white">
              {title}
            </h3>
          </footer>
        </div>
      </div>
      <NutritionModal item={item} modal={{ isOpen, onOpen, onOpenChange }} />
    </>
  );
};

export default NutritionCarouselItem;
