"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "@/utils/common";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const overlayVariants = cva(
  "fixed inset-0 z-[101] bg-black/30 dark:bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  {
    variants: {
      isBlurred: {
        true: "backdrop-blur-md backdrop-saturate-150",
        false: "",
      },
    },
    defaultVariants: {
      isBlurred: false,
    },
  },
);

const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-[101] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  Omit<
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
      closeButton?: boolean;
      closeButtonClass?: string;
      isBlurred?: boolean;
      overlayClassName?: string;
      isSecondary?: boolean;
    },
    "ref"
  >
>(
  (
    {
      className,
      children,
      closeButton = true,
      closeButtonClass,
      isBlurred,
      overlayClassName,
      isSecondary,
      ...props
    },
    ref,
  ) => (
    <DialogPortal>
      <DialogOverlay
        className={cn(overlayVariants({ isBlurred }), overlayClassName)}
      />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-1/2 top-1/2 z-[102] flex w-full max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-hidden border border-transparent bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] dark:border-dark sm:rounded-lg md:max-h-[calc(100%_-_2rem)] xl:max-h-[calc(100%_-_7.5rem)]",
          className,
          isSecondary && "gap-0 p-0",
        )}
        {...props}
      >
        {children}
        {closeButton && (
          <DialogPrimitive.Close
            className={cn(
              "tap-highlight-transparent focus-visible:outline-focus absolute right-1 top-1 select-none appearance-none rounded-full p-2 text-main-h outline-none transition-colors duration-150 hover:bg-black/5 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-black/10 dark:text-white/80 dark:hover:bg-white/5 dark:active:bg-white/10",
              closeButtonClass,
            )}
          >
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  ),
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  isSecondary,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { isSecondary?: boolean }) => (
  <div
    className={cn(
      "flex flex-col text-center sm:text-left",
      className,
      isSecondary && "space-y-2 p-6 pb-0",
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  isSecondary,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { isSecondary?: boolean }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
      isSecondary &&
        "border-t border-gray-200 bg-gray-100 p-4 dark:border-dark dark:bg-dark/50 sm:justify-between",
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-main-m dark:text-main-dark-m", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
