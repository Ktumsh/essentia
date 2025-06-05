import { Skeleton } from "@/components/ui/skeleton";

const DailyTipLoading = () => {
  return (
    <>
      {Array.from({ length: 1 }).map((_, index) => (
        <article
          key={index}
          className="bg-background relative overflow-hidden rounded-2xl md:h-52 md:rounded-xl"
        >
          <div className="flex items-center justify-between md:flex-col">
            <div className="flex h-20 min-w-[141px] items-center justify-center overflow-hidden py-1 md:h-24 md:w-full md:py-0">
              <Skeleton className="aspect-auto size-full rounded-none rounded-r-md object-cover object-center shadow-md md:rounded-none md:shadow-none" />
            </div>
            <div className="flex w-full flex-col content-center space-y-3 p-6">
              <Skeleton className="dark:bg-accent h-2 w-2/3 bg-slate-300 md:h-2.5" />
              <Skeleton className="dark:bg-accent h-2 w-full bg-slate-300 md:h-2.5" />
              <Skeleton className="dark:bg-accent h-2 w-1/2 bg-slate-300 md:h-2.5" />
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default DailyTipLoading;
