"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import NutritionModal from "./nutrition-modal";

import type { ArticleType } from "@/lib/types";

const NutritionCarouselItem = (props: ArticleType) => {
  const [isOpen, setIsOpen] = useState(false);

  const { slug, title, image } = props;

  return (
    <>
      <div
        id={slug}
        data-id={slug}
        data-name={title}
        className="group border-border bg-accent dark:bg-popover text-foreground/80 block h-96 w-full rounded-xl border px-3 py-2.5 text-clip select-none"
      >
        <div className="border-border bg-background h-full rounded-lg border p-2.5">
          <div className="relative overflow-hidden rounded-sm">
            <Image
              width={540}
              height={312}
              src={image}
              alt={title}
              className="animate-fade-in z-0 aspect-auto h-64 w-full object-cover [content-visibility:auto] md:w-auto"
            />
            <div className="absolute top-0 left-0 z-10 flex w-full justify-center p-4 md:inset-0 md:block">
              <div className="bg-background/80 flex flex-col rounded-full px-2 transition-transform duration-300 will-change-transform group-hover:translate-y-0 md:h-full md:translate-y-full md:rounded-sm md:px-0">
                {/* <div className="mx-auto hidden h-full items-center justify-center md:flex">
                  <Button
                    size="icon"
                    radius="full"
                    variant="ghost"
                    onClick={() => setIsLiked(!isLiked)}
                    className={cn(
                      isLiked && "text-red-500!",
                      "text-foreground/80 hover:text-foreground bg-transparent hover:bg-transparent! hover:opacity-100 active:scale-95",
                    )}
                  >
                    <HeartIcon className="size-6!" />
                  </Button>
                </div> */}
                <div className="mx-auto hidden h-full items-center justify-center md:flex">
                  <Button
                    variant="ghost"
                    radius="full"
                    size="lg"
                    onClick={() => {
                      setIsOpen(true);
                      history.replaceState(null, "", `#${slug}`);
                    }}
                    className="border-primary hover:bg-primary border-2 font-semibold uppercase hover:text-white"
                  >
                    Ver receta
                  </Button>
                </div>
                {/* <div className="mx-auto flex h-full items-center justify-center">
                  {[...Array(5)].map((_, index) => (
                    <Button
                      key={index}
                      size="icon"
                      variant="ghost"
                      radius="full"
                      onClick={() => handleRating(index)}
                      className={cn(
                        rating > index &&
                          "text-yellow-500! [&>svg]:fill-yellow-500!",
                        "text-foreground/80 hover:text-foreground [&>svg]:fill-foreground/80 bg-transparent hover:bg-transparent! hover:opacity-100 active:scale-95",
                      )}
                    >
                      <StarIcon className="size-5!" />
                    </Button>
                  ))}
                </div> */}
              </div>
            </div>
            {/* <div className="absolute bottom-0 left-0 z-10 p-4 md:hidden">
              <div className="bg-background/80 rounded-full">
                <div className="mx-auto flex h-full items-center justify-center">
                  <Button
                    size="icon"
                    radius="full"
                    variant="ghost"
                    onClick={() => setIsLiked(!isLiked)}
                    className={cn(
                      isLiked && "text-red-500!",
                      "text-foreground/80 hover:text-foreground bg-transparent hover:bg-transparent! hover:opacity-100 active:scale-95",
                    )}
                  >
                    <HeartIcon className="size-6!" />
                  </Button>
                </div>
              </div>
            </div> */}
            <div className="absolute right-0 bottom-0 z-10 p-4 md:hidden">
              <div className="mx-auto flex h-full items-center justify-center">
                <Button
                  radius="full"
                  onClick={() => {
                    setIsOpen(true);
                    history.replaceState(null, "", `#${slug}`);
                  }}
                >
                  Ver receta
                </Button>
              </div>
            </div>
          </div>
          <footer className="bg-transparent px-0 py-3">
            <h3 className="font-space-mono text-foreground/80 group-hover:text-foreground text-start antialiased transition-colors">
              {title}
            </h3>
          </footer>
        </div>
      </div>
      <NutritionModal item={props} modal={{ isOpen, setIsOpen }} />
    </>
  );
};

export default NutritionCarouselItem;
