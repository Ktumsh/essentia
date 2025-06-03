"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/kit/card";
import { Skeleton } from "@/components/kit/skeleton";
import { cn } from "@/utils";

interface RecommendationLoadingProps {
  viewMode?: "grid" | "list";
}

const RecommendationLoading = ({
  viewMode = "grid",
}: RecommendationLoadingProps) => {
  if (viewMode === "list") {
    return (
      <div className="bg-muted relative w-full overflow-auto rounded-xl">
        <table className="text-muted-foreground w-full min-w-3xl text-xs">
          <thead>
            <tr className="text-muted-foreground">
              <th className="px-4 py-3">
                <div className="flex items-center">
                  <Skeleton className="h-4 w-4 rounded" />
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium">Título</th>
              <th className="px-4 py-3 text-left font-medium">Prioridad</th>
              <th className="px-4 py-3 text-left font-medium">Guardado el</th>
              <th className="px-4 py-3 text-left font-medium">Etiquetas</th>
              <th className="px-4 py-3 text-right font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <tr key={i} className="group/row animate-pulse border-t text-sm">
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-4 rounded" />
                </td>
                <td className="flex items-center gap-3 px-4 py-3">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <div className="flex flex-col gap-1 overflow-hidden">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-5 w-16 rounded-full" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-8 rounded-full" />
                  </div>
                </td>
                <td className="flex justify-end gap-2 px-4 py-3">
                  <Skeleton className="h-6 w-6 rounded-md" />
                  <Skeleton className="h-6 w-6 rounded-md" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

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
          className="group/item bg-muted flex animate-pulse flex-col overflow-hidden select-none"
        >
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="mb-2 flex items-start justify-between">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <Skeleton className="h-6 w-3/4 rounded" />
          </CardHeader>

          <CardContent className="flex flex-1 flex-col px-4 pb-2">
            <Skeleton className="mb-2 h-4 w-32 rounded" />
            <Skeleton className="mb-2 h-4 w-24 rounded" />
            <div className="flex gap-1">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between px-4 pt-2 pb-4">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-6 w-6 rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default RecommendationLoading;
