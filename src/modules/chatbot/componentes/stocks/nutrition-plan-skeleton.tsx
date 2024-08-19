"use client";

import { Card, Skeleton } from "@nextui-org/react";

const NutritionPlanSkeleton = () => {
  return (
    <Card radius="md" className="space-y-5 p-8 bg-white dark:bg-base-full-dark">
      <Skeleton className="bg-gray-200 dark:bg-base-dark rounded-lg before:!duration-1000">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="w-1/4 bg-gray-200 dark:bg-base-dark rounded-lg before:!duration-1000">
        <div className="h-5 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="w-1/2 bg-gray-200 dark:bg-base-dark rounded-lg before:!duration-1000">
        <div className="h-4 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="w-1/5 bg-gray-200 dark:bg-base-dark rounded-lg before:!duration-1000">
        <div className="h-3 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="w-1/4 bg-gray-200 dark:bg-base-dark rounded-lg before:!duration-1000">
        <div className="h-5 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="w-1/2 bg-gray-200 dark:bg-base-dark rounded-lg before:!duration-1000">
        <div className="h-4 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="w-1/5 bg-gray-200 dark:bg-base-dark rounded-lg before:!duration-1000">
        <div className="h-3 rounded-lg bg-default-200"></div>
      </Skeleton>
    </Card>
  );
};

export default NutritionPlanSkeleton;
