"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const StorageLimitLoading = () => {
  return (
    <Card className="bg-primary/5 mt-3">
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="bg-alternative/50 size-5 rounded-full" />
            <Skeleton className="bg-alternative/50 h-5 w-32 rounded" />
          </div>
          <Skeleton className="bg-alternative/50 h-5 w-10 rounded-full" />
        </div>

        <div className="flex justify-between text-sm">
          <Skeleton className="bg-alternative/50 h-3 w-32 rounded" />
          <Skeleton className="bg-alternative/50 h-3 w-20 rounded" />
        </div>

        <Skeleton className="bg-alternative/50 h-2 w-full rounded-full" />

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Skeleton className="bg-alternative/50 size-5 rounded-full" />
            <Skeleton className="bg-alternative/50 h-5 w-36 rounded" />
          </div>
          <Skeleton className="bg-alternative/50 h-5 w-10 rounded-full" />
        </div>

        <div className="flex justify-between text-sm">
          <Skeleton className="bg-alternative/50 h-3 w-32 rounded" />
          <Skeleton className="bg-alternative/50 h-3 w-20 rounded" />
        </div>

        <Skeleton className="bg-alternative/50 h-2 w-full rounded-full" />
      </CardContent>
    </Card>
  );
};

export default StorageLimitLoading;
