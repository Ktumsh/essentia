"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  const isMobile = useIsMobile();

  return (
    <Sonner
      richColors
      theme={theme as ToasterProps["theme"]}
      position={isMobile ? "top-center" : "bottom-right"}
      className="toaster group"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "p-4 w-[356px] border flex items-center text-sm gap-1.5 rounded-md toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border dark:group-[.toaster]:bg-accent dark:group-[.toaster]:border-alternative group-[.toaster]:shadow-lg",
          title: "font-medium [line-height:1.7]",
          description:
            "group-[.toaster]:text-muted-foreground [line-height:1.4]",
          actionButton:
            "flex items-center px-2 h-6 text-[12px] font-medium shrink-0 group-[.toaster]:bg-primary group-[.toaster]:text-primary-foreground font-medium rounded-sm ml-auto",
          cancelButton:
            "flex items-center px-2 h-6 text-[12px] font-medium shrink-0 group-[.toaster]:bg-muted group-[.toaster]:text-muted-foreground font-medium ml-auto",

          icon: "size-4 flex relative justify-start items-center shrink-0 ml-[-3px] mr-1 [&_svg]:ml-[-1px] [&_svg]:size-5 [&_svg]:shrink-0",
          closeButton:
            "flex items-center justify-center size-5 absolute top-0 left-0 z-1 transition! bg-background! border border-border! dark:border-alternative! rounded-full hover:scale-[1.1] text-muted-foreground! hover:text-foreground! translate-[-35%]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
