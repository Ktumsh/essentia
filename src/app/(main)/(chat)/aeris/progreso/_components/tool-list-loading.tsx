"use client";

import { Card, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ToolListLoading = () => {
  return (
    <section className="@container/list w-full">
      <div className="grid grid-cols-1 justify-center gap-6 @3xl/list:grid-cols-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Card key={idx} className="rounded-3xl border">
            <div className="space-y-4 p-4">
              <Skeleton className="h-6 w-3/4 rounded-md" />
              <Skeleton className="h-4 w-1/2 rounded-md" />
            </div>
            <CardFooter className="justify-between p-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-20 rounded-md" />
              </div>
              <Skeleton className="h-4 w-24 rounded-md" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ToolListLoading;
