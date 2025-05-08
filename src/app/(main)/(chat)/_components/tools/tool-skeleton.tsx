"use client";

import { Card, CardContent, CardHeader } from "@/components/kit/card";
import { Skeleton } from "@/components/kit/skeleton";

const ToolSkeleton = () => {
  return (
    <Card className="w-full max-w-lg space-y-5 overflow-hidden rounded-3xl border">
      <CardHeader className="p-0">
        <Skeleton className="h-52 rounded-none" />
      </CardHeader>
      <CardContent className="min-h-96 space-y-5">
        <Skeleton className="h-5 w-1/4 rounded-lg" />
        <Skeleton className="h-4 w-1/2 rounded-lg" />
        <Skeleton className="h-3 w-1/5 rounded-lg" />
        <Skeleton className="h-5 w-1/4 rounded-lg" />
        <Skeleton className="h-4 w-1/2 rounded-lg" />
        <Skeleton className="h-3 w-1/5 rounded-lg" />
      </CardContent>
    </Card>
  );
};

export default ToolSkeleton;
