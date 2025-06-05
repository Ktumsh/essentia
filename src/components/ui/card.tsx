import * as React from "react";

import { cn } from "@/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground relative overflow-hidden rounded-xl",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({
  className,
  isSecondary,
  ...props
}: React.ComponentProps<"div"> & { isSecondary?: boolean }) {
  return (
    <header
      data-slot="card-header"
      className={cn(
        "flex flex-col gap-1.5 p-6",
        className,
        isSecondary && "flex-1 p-4",
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-base leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-foreground/80 text-sm", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  );
}

function CardFooter({
  className,
  isSecondary,
  ...props
}: React.ComponentProps<"div"> & { isSecondary?: boolean }) {
  return (
    <footer
      data-slot="card-footer"
      className={cn(
        "flex items-center p-6 pt-0",
        className,
        isSecondary && "bg-accent border-t p-4 md:justify-between",
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
