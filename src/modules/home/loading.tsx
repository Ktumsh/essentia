import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      {Array.from({ length: 1 }).map((_, index) => (
        <article
          key={index}
          className="relative h-44 overflow-hidden rounded-xl border border-white bg-white/50 bg-bento-gradient shadow-md backdrop-blur backdrop-saturate-150 dark:border-full-dark dark:bg-transparent dark:bg-none dark:backdrop-saturate-100 md:mb-5 md:size-full md:max-h-[190px]"
        >
          <div className="relative flex h-full flex-col overflow-hidden">
            <div className="flex size-full flex-col items-center justify-between overflow-hidden">
              <div className="absolute inset-0 z-0 h-44 w-full rounded-xl bg-gray-200 object-cover [mask-image:linear-gradient(to_top,_rgba(0,_0,_0,_1)_0%,_transparent_100%)] dark:bg-dark md:h-[190px] md:w-[270px]" />
              <div className="z-10 flex w-full flex-col content-center space-y-2.5 p-5">
                <Skeleton className="h-3 w-2/3 bg-gray-300 dark:bg-accent-dark" />
                <Skeleton className="h-3 w-full bg-gray-300 dark:bg-accent-dark" />
                <Skeleton className="h-3 w-1/2 bg-gray-300 dark:bg-accent-dark" />
              </div>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default Loading;
