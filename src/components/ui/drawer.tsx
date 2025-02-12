"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/utils/common";

const DrawerContext = React.createContext<{
  direction?: "top" | "bottom" | "left" | "right";
}>({});

const Drawer = ({
  shouldScaleBackground = false,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerContext.Provider value={{ direction: props.direction }}>
    <DrawerPrimitive.Root
      shouldScaleBackground={shouldScaleBackground}
      {...props}
    />
  </DrawerContext.Provider>
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-70 bg-black/80", className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { direction } = React.useContext(DrawerContext);

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        style={
          { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
        }
        className={cn(
          "dark:bg-muted-dark fixed z-70 flex flex-col bg-white",
          (!direction || direction === "bottom") &&
            "inset-x-0 bottom-0 mx-2 mt-24 h-fit max-h-[calc(100%-56px-2rem)] rounded-t-3xl",
          direction === "right" &&
            "top-2 right-2 bottom-2 w-screen max-w-72 overflow-hidden rounded-2xl p-6",
          className,
        )}
        {...props}
      >
        {(!direction || direction === "bottom") && (
          <div className="dark:bg-accent-dark/50 mx-auto mt-1.5 h-1 w-10 shrink-0 rounded-full bg-gray-200" />
        )}
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
});
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <header
    className={cn(
      "dark:border-dark mx-4 gap-1.5 border-b border-gray-200 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <footer
    className={cn("mt-auto flex flex-col gap-4 p-4", className)}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "py-2.5 text-center text-sm leading-none font-semibold tracking-tight",
      className,
    )}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-main dark:text-main-dark text-sm", className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
