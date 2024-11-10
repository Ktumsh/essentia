import { Card, CardBody, Chip, Divider } from "@nextui-org/react";
import { Fragment, useRef } from "react";

import { EMERGENCY_STEPS } from "@/consts/emergency-steps";
import { Chevron } from "@/modules/icons/navigation";

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
          <Card
            radius="sm"
            shadow="none"
            className="h-full min-w-[87%] max-w-lg snap-center border border-gray-200 bg-gray-100 text-main-h dark:border-dark dark:bg-dark/50 dark:text-white md:min-w-0"
          >
            <CardBody className="z-10">
              <div className="inline-flex w-full items-center justify-between">
                <h3 className="text-lg font-semibold md:text-xl">
                  {card.title}
                </h3>
              </div>
              <Divider className="my-3 bg-gray-300 dark:bg-accent-dark" />
              <ol className="flex flex-col space-y-4">
                {card.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="text-sm">
                    <Chip
                      size="sm"
                      color="danger"
                      classNames={{
                        base: [
                          "!size-6 min-w-0 max-w-full justify-center mr-2",
                          step.color,
                        ],
                        content: "flex justify-center text-white font-bold",
                      }}
                    >
                      {step.step}
                    </Chip>
                    <span className="mr-4 text-nowrap font-semibold">
                      {step.title}
                    </span>

                    <p className="ml-8 text-main-h dark:text-main-dark">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </CardBody>
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
