"use client";

import { ChevronRight } from "lucide-react";
import { Fragment, useRef } from "react";

import { Badge } from "@/components/kit/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import {
  EMERGENCY_STEPS_DATA,
  EMERGENCY_STEPS_DATA_COLORS,
} from "@/db/data/emergency-steps-data";
import { cn } from "@/utils";

import DownloadGuideButton from "../../_components/download-guide-button";

const EmergencySteps = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const scrollToEnd = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollTo({
        left: sectionRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="no-scrollbar flex w-full max-w-6xl snap-x snap-mandatory items-center justify-between overflow-x-scroll md:mx-0"
    >
      {EMERGENCY_STEPS_DATA.map((step, index) => {
        const theme =
          EMERGENCY_STEPS_DATA_COLORS[
            step.id as keyof typeof EMERGENCY_STEPS_DATA_COLORS
          ] || EMERGENCY_STEPS_DATA_COLORS[1];

        return (
          <Fragment key={index}>
            <Card
              className={cn(
                "h-full max-w-lg min-w-[87%] snap-center border border-l-4 md:min-w-0",
                theme.border,
                theme.borderAccent,
              )}
            >
              <CardHeader isSecondary className="px-4 py-3">
                <CardTitle className={cn("text-base md:text-lg", theme.text)}>
                  {step.title}
                </CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  {step.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="z-10 flex flex-col p-4 pt-0">
                <ol className="flex flex-col space-y-3">
                  {step.steps.map((s, idx) => (
                    <li key={idx}>
                      <Badge
                        className={cn(
                          "mr-2 size-6 max-w-full min-w-0 justify-center",
                          theme.bg,
                          theme.text,
                        )}
                      >
                        {s.step}
                      </Badge>
                      <span className="mr-4 text-xs font-semibold text-nowrap md:text-sm">
                        {s.title}
                      </span>
                      <p className="text-foreground/80 ml-8 text-xs md:text-sm">
                        {s.description}
                      </p>
                    </li>
                  ))}
                </ol>
              </CardContent>
              <CardFooter
                className={cn("border-t p-4", theme.bg, theme.border)}
              >
                <DownloadGuideButton
                  guide={step}
                  full
                  className={cn(
                    "w-full rounded-full hover:opacity-100 md:rounded-md",
                    theme.bgMuted,
                    theme.border,
                  )}
                />
              </CardFooter>
            </Card>
            {index < EMERGENCY_STEPS_DATA.length - 1 && (
              <button
                onClick={scrollToEnd}
                className="motion-safe:animate-[pulse_4s_cubic-bezier(0.4,_0,_0.6,_1)_infinite] md:pointer-events-none"
              >
                <ChevronRight className="text-muted-foreground size-16" />
              </button>
            )}
          </Fragment>
        );
      })}
    </section>
  );
};

export default EmergencySteps;
