"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

const HeaderStockLoading = () => {
  return (
    <div className="relative">
      <Skeleton className="h-48 w-full" />
      <div className="absolute bottom-0 left-0 w-full p-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-8 w-32 rounded" />
        </div>
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-20 rounded" />
          <div className="flex gap-3">
            <Skeleton className="h-4 w-12 rounded" />
            <Skeleton className="h-4 w-12 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

const TabsStockLoading = ({ tabs }: { tabs: number }) => {
  return (
    <div className="flex h-14 gap-4 px-6">
      {[...Array(tabs)].map((_, idx) => (
        <Skeleton key={idx} className="mt-auto mb-1 h-7 w-24 rounded-md" />
      ))}
    </div>
  );
};

const FooterStockLoading = () => {
  return (
    <div className="px-6 py-4 text-center">
      <Skeleton className="mx-auto h-4 w-40 rounded" />
    </div>
  );
};

const MoodTrackStockLoading = () => {
  return (
    <Card className="bg-background mb-8 w-full max-w-lg overflow-hidden rounded-3xl border">
      <HeaderStockLoading />

      <TabsStockLoading tabs={2} />

      <ScrollArea className="h-[400px]">
        <div className="space-y-4 p-3 md:p-6">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3 rounded" />
                <Skeleton className="h-3 w-1/2 rounded" />
              </div>
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          ))}
        </div>
      </ScrollArea>

      <FooterStockLoading />
    </Card>
  );
};

const RoutineStockLoading = () => {
  return (
    <Card className="bg-background mb-8 w-full max-w-lg overflow-hidden rounded-3xl border">
      <HeaderStockLoading />

      <TabsStockLoading tabs={3} />

      <ScrollArea className="h-[400px]">
        <div className="mt-6 space-y-4 p-6">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-5 w-32 rounded" />
              </div>
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-5/6 rounded" />
            </div>
          ))}
        </div>
      </ScrollArea>

      <FooterStockLoading />
    </Card>
  );
};

const NutritionalPlanStockLoading = () => {
  return (
    <Card className="bg-background mb-8 w-full max-w-lg overflow-hidden rounded-3xl border">
      <HeaderStockLoading />

      <TabsStockLoading tabs={3} />

      <ScrollArea className="h-[400px]">
        <div className="space-y-5 p-3 md:p-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40 rounded" />
            <Skeleton className="h-5 w-24 rounded" />
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-3 w-full rounded" />
            ))}
          </div>

          <div className="space-y-2">
            <Skeleton className="h-6 w-32 rounded" />
            <div className="grid grid-cols-3 gap-2">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="space-y-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-16 rounded" />
                  <Skeleton className="h-3 w-10 rounded" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-6 w-32 rounded" />
            {[...Array(3)].map((_, k) => (
              <Skeleton key={k} className="h-4 w-5/6 rounded" />
            ))}
          </div>
        </div>
      </ScrollArea>

      <FooterStockLoading />
    </Card>
  );
};

const HealthRiskStockLoading = () => {
  return (
    <Card className="bg-background mb-8 w-full max-w-lg overflow-hidden rounded-3xl border">
      <HeaderStockLoading />

      <TabsStockLoading tabs={3} />

      <ScrollArea className="h-[400px]">
        <div className="space-y-5 p-3 md:p-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-64 rounded" />
            <Skeleton className="h-5 w-24 rounded" />
            <Skeleton className="h-3 w-full rounded" />
          </div>
          <div className="space-y-3">
            {[...Array(5)].map((_, idx) => (
              <div key={idx} className="space-y-1">
                <Skeleton className="h-4 w-48 rounded" />
                <Skeleton className="h-3 w-full rounded" />
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-64 rounded" />
            <Skeleton className="h-5 w-24 rounded" />
            <Skeleton className="h-3 w-full rounded" />
          </div>
        </div>
      </ScrollArea>

      <FooterStockLoading />
    </Card>
  );
};

const TaskStockLoading = () => {
  return (
    <Card className="skeleton skeleton-bg flex w-fit max-w-80 min-w-72 items-center justify-between rounded-xl pr-3">
      <CardHeader className="px-5 py-4">
        <CardTitle className="skeleton-text text-sm">
          Recordar beber agua
        </CardTitle>
        <CardDescription className="skeleton-div">
          Diariamente a las 08:00
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export {
  MoodTrackStockLoading,
  RoutineStockLoading,
  NutritionalPlanStockLoading,
  HealthRiskStockLoading,
  TaskStockLoading,
};
