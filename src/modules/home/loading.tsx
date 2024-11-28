import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      {Array.from({ length: 1 }).map((_, index) => (
        <article
          key={index}
          className="relative overflow-hidden rounded-2xl bg-white dark:bg-full-dark md:h-52 md:rounded-xl"
        >
          <div className="flex items-center justify-between md:flex-col">
            <div className="flex size-full flex-col items-center justify-between overflow-hidden">
              <div className="flex h-24 w-full items-center justify-center overflow-hidden">
                <Skeleton className="size-full rounded-none" />
              </div>
              <div className="flex w-full flex-col content-center space-y-3 p-6">
                <Skeleton className="h-2.5 w-2/3 bg-gray-300 dark:bg-accent-dark" />
                <Skeleton className="h-2.5 w-full bg-gray-300 dark:bg-accent-dark" />
                <Skeleton className="h-2.5 w-1/2 bg-gray-300 dark:bg-accent-dark" />
              </div>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default Loading;
