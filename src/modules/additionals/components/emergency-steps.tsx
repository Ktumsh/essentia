"use client";

import { Fragment, useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EMERGENCY_STEPS } from "@/consts/emergency-steps";
import { Chevron } from "@/modules/icons/navigation";
import { cn } from "@/utils/common";

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
      className="flex w-full max-w-6xl snap-x snap-mandatory items-center justify-between overflow-x-scroll scrollbar-hide md:mx-0"
    >
      {EMERGENCY_STEPS.map((card, index) => (
        <Fragment key={index}>
          <Card className="h-full min-w-[87%] max-w-lg snap-center bg-gray-50 text-main dark:bg-dark/30 dark:text-white md:min-w-0">
            <CardHeader isSecondary>
              <CardTitle className="text-base md:text-lg">
                {card.title}
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="z-10 flex flex-col p-3">
              <ol className="flex flex-col space-y-4">
                {card.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="text-sm">
                    <Badge
                      className={cn(
                        "mr-2 size-6 min-w-0 max-w-full justify-center !text-white",
                        step.color,
                      )}
                    >
                      {step.step}
                    </Badge>
                    <span className="mr-4 text-nowrap font-semibold">
                      {step.title}
                    </span>
                    <p className="ml-8 text-main-h dark:text-main-dark">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
          {index < EMERGENCY_STEPS.length - 1 && (
            <button
              onClick={scrollToEnd}
              className="motion-safe:animate-[pulse_4s_cubic-bezier(0.4,_0,_0.6,_1)_infinite] md:pointer-events-none"
            >
              <Chevron className="size-16 rotate-180 text-main-m dark:text-main-dark-m" />
            </button>
          )}
        </Fragment>
      ))}
    </section>
  );
};

export default EmergencySteps;
