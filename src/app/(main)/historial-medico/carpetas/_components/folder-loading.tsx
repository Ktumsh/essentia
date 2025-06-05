"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const FolderLoading = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3 2xl:grid-cols-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card
          key={i}
          className="bg-muted animate-pulse overflow-hidden select-none"
        >
          <CardContent className="flex flex-col p-3">
            <div className="flex items-center gap-2">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="ms-auto size-6 rounded-full" />
            </div>
            <Skeleton className="mt-2 h-3.5 w-16 rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FolderLoading;
