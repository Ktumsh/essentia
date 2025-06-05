"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils";

interface DocumentLoadingProps {
  viewMode?: "grid" | "list";
}

const DocumentLoading = ({ viewMode = "grid" }: DocumentLoadingProps) => {
  if (viewMode === "list") {
    return (
      <div className="bg-muted relative w-full overflow-auto rounded-xl">
        <table className="text-muted-foreground w-full min-w-3xl text-xs">
          <thead>
            <tr className="text-muted-foreground">
              <th className="px-4 py-3 text-left font-medium">
                <div className="flex items-center">
                  <Skeleton className="size-4 rounded" />
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium">Nombre</th>
              <th className="px-4 py-3 text-left font-medium">Tamaño</th>
              <th className="px-4 py-3 text-left font-medium">Añadido el</th>
              <th className="px-4 py-3 text-left font-medium">Doctor</th>
              <th className="px-4 py-3 text-right font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <tr key={i} className="group/row animate-pulse border-t text-sm">
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <Skeleton className="size-4 rounded" />
                  </div>
                </td>

                <td className="flex items-center gap-3 px-4 py-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="flex flex-col gap-1 overflow-hidden">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </td>

                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-16" />
                </td>

                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-20" />
                </td>

                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-24" />
                </td>

                <td className="flex justify-end gap-2 px-4 py-3">
                  <Skeleton className="h-6 w-6 rounded-md" />
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
          className="group/item bg-muted flex animate-pulse flex-col overflow-hidden"
        >
          {/* Header */}
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="mb-2 flex items-start justify-between">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <Skeleton className="h-5 w-3/4 rounded" />
          </CardHeader>

          {/* Content */}
          <CardContent className="flex flex-1 flex-col px-4 pb-2">
            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* Issuer placeholder */}
              <Skeleton className="h-4 w-24 rounded" />
              {/* Date placeholder */}
              <Skeleton className="h-4 w-20 rounded" />
            </div>
            {/* Tags placeholder */}
            <div className="mt-2 flex flex-wrap gap-1">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-8 rounded-full" />
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter className="mt-auto flex justify-between px-4 py-2">
            {/* Created at placeholder */}
            <Skeleton className="h-3 w-24 rounded" />
            {/* Chevron button placeholder */}
            <Skeleton className="h-6 w-6 rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default DocumentLoading;
