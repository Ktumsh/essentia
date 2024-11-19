import { TriangleAlert } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SEXUALITY_EMERGENCY } from "@/consts/sexuality-emergency";
import { HashIcon } from "@/modules/icons/common";

const SexualityEmergencyCard = () => {
  return (
    <section className="mt-5 flex w-full flex-col text-main-h dark:text-main-dark">
      <div className="mb-2 self-start">
        <Link
          id="emergencias-de-salud-sexual"
          data-id="emergencias-de-salud-sexual"
          data-name="Emergencias de salud sexual"
          href="#emergencias-de-salud-sexual"
          className="group flex h-auto w-fit items-center p-0 text-xl font-semibold transition active:scale-100"
        >
          <Badge variant="primary" className="gap-1 py-1">
            <TriangleAlert className="size-3.5" />
            <h3>Emergencias de salud sexual</h3>
          </Badge>
          <HashIcon className="ml-1 size-5 opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
      </div>
      <div className="flex max-h-[700px] w-full">
        {SEXUALITY_EMERGENCY.map((cardInfo, index) => (
          <button
            key={index}
            className="relative box-border flex h-auto min-h-[74px] w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-gray-100 text-main outline-none transition-transform-background focus-visible:outline-offset-2 focus-visible:outline-focus data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 motion-reduce:transition-none dark:border-dark dark:bg-dark/50 dark:text-white md:min-h-[54px]"
          >
            <CardContent className="flex flex-col overflow-hidden p-3">
              <div className="inline-flex w-full items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Emergencias de Salud Sexual
                </h3>
              </div>
              <Separator className="my-3 bg-gray-200 dark:bg-dark" />
              <ol className="modal flex flex-col space-y-4 overflow-y-auto">
                {cardInfo.steps.map((step, stepIndex) => (
                  <li
                    key={stepIndex}
                    className="space-y-1.5 text-start text-sm"
                  >
                    <ul className="inline-flex">
                      <Badge
                        variant="primary"
                        className="mr-2 flex !size-6 min-w-0 max-w-full justify-center !bg-cyan-500 !text-white hover:!bg-cyan-500/80"
                      >
                        {step.step}
                      </Badge>
                      <li className="mr-2 text-nowrap text-base font-semibold">
                        {step.title}
                      </li>
                    </ul>
                    <ul className="ml-8 space-y-1.5 text-main-h dark:text-main-dark-h">
                      {step.description.map((desc, i) => (
                        <li key={i}>
                          {desc.type === "bold" ? (
                            <strong className="mr-2 text-main dark:text-white">
                              {desc.content}
                            </strong>
                          ) : (
                            desc.content
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </CardContent>
          </button>
        ))}
      </div>
    </section>
  );
};

export default SexualityEmergencyCard;
