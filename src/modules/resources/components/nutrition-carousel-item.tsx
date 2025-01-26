"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
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
}

const NutritionCarouselItem = ({ item }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
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
        className="group block h-96 w-full select-none text-clip rounded-md border border-altern bg-altern-light px-3 py-2.5 text-main-h dark:border-dark dark:bg-dark/50 dark:text-main-dark"
      >
        <div className="h-full rounded border border-altern-accent bg-altern p-2.5 dark:border-accent-dark dark:bg-dark">
          <div className="relative overflow-hidden rounded">
            <Image
              width={540}
              height={312}
              src={image}
              alt={title}
              className="z-0 aspect-auto h-64 w-full animate-fade-in object-cover [content-visibility:auto] md:w-auto"
            />
            <div className="absolute inset-0 z-10 p-4">
              <div className="flex h-full translate-y-full flex-col rounded bg-gray-100/80 transition-transform duration-300 will-change-transform group-hover:translate-y-0 dark:bg-gray-900/90">
                <div className="mx-auto flex h-full items-center justify-center">
                  <Button
                    size="icon"
                    radius="full"
                    variant="ghost"
                    onClick={() => setIsLiked(!isLiked)}
                    className={cn(
                      isLiked && "!text-cerise-red-500",
                      "bg-transparent text-main-m hover:!bg-transparent hover:text-main hover:opacity-100 active:scale-95 dark:text-white/40 dark:hover:text-white",
                    )}
                  >
                    <HeartIcon className="!size-6" />
                  </Button>
                </div>
                <div className="mx-auto flex h-full items-center justify-center">
                  <Button
                    variant="ghost"
                    radius="none"
                    size="lg"
                    onClick={() => {
                      setIsOpen(true);
                      history.replaceState(null, "", `#${slug}`);
                    }}
                    className="rounded-sm border border-main font-spacemono font-semibold uppercase text-main will-change-transform hover:!bg-main hover:text-white dark:border-main-dark dark:text-white dark:hover:!bg-white dark:hover:text-main"
                  >
                    Ver receta
                  </Button>
                </div>
                <div className="mx-auto flex h-full items-center justify-center">
                  {[...Array(5)].map((_, index) => (
                    <Button
                      key={index}
                      size="icon"
                      variant="ghost"
                      radius="full"
                      onClick={() => handleRating(index)}
                      className={cn(
                        rating > index && "!text-yellow-500",
                        "bg-transparent text-main-m hover:!bg-transparent hover:text-main hover:opacity-100 active:scale-95 dark:text-white/40 dark:hover:text-white",
                      )}
                    >
                      <StarIcon className="!size-5" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <footer className="bg-transparent px-0 py-3">
            <h3 className="text-start font-spacemono uppercase text-[#4a381c] antialiased transition-colors group-hover:text-black dark:text-main-dark-h dark:group-hover:text-white">
              {title}
            </h3>
          </footer>
        </div>
      </div>
      <NutritionModal item={item} modal={{ isOpen, setIsOpen }} />
    </>
  );
};

export default NutritionCarouselItem;
