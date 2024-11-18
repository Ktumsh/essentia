import { cn } from "@/utils/common";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-100 dark:bg-dark",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
