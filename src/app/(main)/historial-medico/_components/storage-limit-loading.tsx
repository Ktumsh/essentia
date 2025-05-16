"use client";

import { Card, CardContent } from "@/components/kit/card";
import { Skeleton } from "@/components/kit/skeleton";
import { cn } from "@/lib/utils";

const StorageLimitLoading = ({ className }: { className?: string }) => {
  return (
    <Card className={cn("bg-primary/5 mt-3", className)}>
      <CardContent className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>

        <div className="flex justify-between text-sm">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>

        <Skeleton className="dark:from-accent dark:to-alternative h-1.5 w-full rounded-full" />

        <Skeleton className="mt-3 flex items-start gap-2 rounded-md p-2">
          <div className="h-4 w-4 rounded-full" />
          <div className="flex flex-col gap-1">
            <div className="h-4 w-64" />
            <div className="h-3 w-48" />
          </div>
        </Skeleton>
      </CardContent>
    </Card>
  );
};

export default StorageLimitLoading;
