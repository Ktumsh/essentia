"use client";

import { ReactNode } from "react";

import { useProfileMessage } from "@/hooks/use-profile-message";
import { cn } from "@/utils";

interface PageWrapperProps {
  children: ReactNode;
  classNameContainer?: string;
  className?: string;
}

const PageWrapper = ({
  children,
  classNameContainer,
  className,
}: PageWrapperProps) => {
  const { isDismissed } = useProfileMessage();

  return (
    <div
      className={cn(
        "text-foreground mx-auto max-w-7xl pb-16 md:min-h-[calc(100dvh-88px)] md:pb-0",
        {
          "md:min-h-[calc(100dvh-124px)]": !isDismissed,
        },
        classNameContainer,
      )}
    >
      <div className={cn("px-6 pb-6", className)}>{children}</div>
    </div>
  );
};

export default PageWrapper;
