"use client";

import { ChevronRight } from "lucide-react";
import { Fragment, useRef } from "react";

import { Badge } from "@/components/kit/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import { Separator } from "@/components/kit/separator";
import { EMERGENCY_STEPS } from "@/consts/emergency-steps";
import { cn } from "@/lib/utils";

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
      {EMERGENCY_STEPS.map((card, index) => (
        <Fragment key={index}>
          <Card className="dark:bg-accent/30 h-full max-w-lg min-w-[87%] snap-center bg-slate-50 md:min-w-0">
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
                        "mr-2 size-6 max-w-full min-w-0 justify-center text-white!",
                        step.color,
                      )}
                    >
                      {step.step}
                    </Badge>
                    <span className="mr-4 font-semibold text-nowrap">
                      {step.title}
                    </span>
                    <p className="text-foreground/80 ml-8">
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
              <ChevronRight className="text-muted-foreground size-16" />
            </button>
          )}
        </Fragment>
      ))}
    </section>
  );
};

export default EmergencySteps;
