"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/kit/card";
import { Skeleton } from "@/components/kit/skeleton";
import { cn } from "@/lib/utils";

interface MedicalHistoryLoadingProps {
  viewMode?: "grid" | "list";
}

const MedicalHistoryLoading = ({
  viewMode = "grid",
}: MedicalHistoryLoadingProps) => {
  return (
    <div
      className={cn(
        "grid gap-3",
        viewMode === "grid"
          ? "@xl/list:grid-cols-2 @5xl/list:grid-cols-3"
          : "grid-cols-1",
      )}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <Card
          key={i}
          className={cn(
            "overflow-hidden shadow-xs",
            viewMode === "grid"
              ? "flex flex-col border-t-2"
              : "flex flex-row items-stretch border-l-2",
          )}
        >
          {viewMode === "grid" ? (
            <>
              <CardHeader className="space-y-2 px-4 pt-4 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-full" />
              </CardHeader>

              <CardContent className="flex flex-1 flex-col space-y-2 px-4 pb-2">
                <div className="grid grid-cols-2 gap-2">
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <div className="mt-2 flex gap-1">
                  <Skeleton className="h-5 w-14 rounded-full" />
                  <Skeleton className="h-5 w-14 rounded-full" />
                  <Skeleton className="h-5 w-8 rounded-full" />
                </div>
              </CardContent>

              <CardFooter className="flex justify-between px-4 py-2">
                <Skeleton className="h-3 w-16" />
                <div className="flex gap-1">
                  <Skeleton className="h-6 w-6 rounded-md" />
                  <Skeleton className="h-6 w-6 rounded-md" />
                  <Skeleton className="h-6 w-6 rounded-md" />
                </div>
              </CardFooter>
            </>
          ) : (
            <div className="flex flex-1 flex-col">
              <CardHeader className="space-y-2 px-4 pt-4 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-5 w-3/4" />
              </CardHeader>

              <CardContent className="flex flex-col px-4 pb-2">
                <div className="flex gap-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-5 w-14 rounded-full" />
                  <Skeleton className="h-5 w-14 rounded-full" />
                </div>
              </CardContent>

              <CardFooter className="flex justify-between px-4 pb-2">
                <Skeleton className="h-3 w-16" />
                <div className="flex gap-1">
                  <Skeleton className="h-6 w-6 rounded-md" />
                  <Skeleton className="h-6 w-6 rounded-md" />
                  <Skeleton className="h-6 w-6 rounded-md" />
                </div>
              </CardFooter>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default MedicalHistoryLoading;
