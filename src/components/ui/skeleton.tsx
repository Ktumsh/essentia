import { cn } from "@/utils/common";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 dark:bg-dark",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
