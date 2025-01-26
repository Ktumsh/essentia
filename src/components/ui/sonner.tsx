"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

import { useIsMobile } from "../hooks/use-mobile";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  const isMobile = useIsMobile();

  return (
    <Sonner
      position={isMobile ? "top-center" : "bottom-right"}
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-main group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-dark dark:group-[.toaster]:text-white dark:group-[.toaster]:border-accent-dark",
          description:
            "group-[.toast]:text-main-h dark:group-[.toast]:text-main-dark",
          actionButton:
            "group-[.toast]:bg-danger! group-[.toast]:text-white! dark:group-[.toast]:bg-cerise-red-600! dark:group-[.toast]:text-white! h-auto! py-1! px-2! text-xs! rounded-sm!",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-500 dark:group-[.toast]:bg-gray-800 dark:group-[.toast]:text-gray-400",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
