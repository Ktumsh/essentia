"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ToolSkeleton = () => {
  return (
    <Card className="space-y-5 rounded-xl p-2 md:p-6">
      <Skeleton className="rounded-lg bg-gray-200 before:!duration-1000 dark:bg-dark">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="w-1/4 rounded-lg bg-gray-200 before:!duration-1000 dark:bg-dark">
        <div className="h-5 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="w-1/2 rounded-lg bg-gray-200 before:!duration-1000 dark:bg-dark">
        <div className="h-4 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="w-1/5 rounded-lg bg-gray-200 before:!duration-1000 dark:bg-dark">
        <div className="h-3 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="w-1/4 rounded-lg bg-gray-200 before:!duration-1000 dark:bg-dark">
        <div className="h-5 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="w-1/2 rounded-lg bg-gray-200 before:!duration-1000 dark:bg-dark">
        <div className="h-4 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="w-1/5 rounded-lg bg-gray-200 before:!duration-1000 dark:bg-dark">
        <div className="h-3 rounded-lg bg-default-200"></div>
      </Skeleton>
    </Card>
  );
};

export default ToolSkeleton;
