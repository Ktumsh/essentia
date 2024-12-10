import { TriangleAlert } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
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
            <TriangleAlert strokeWidth={1.5} className="size-3.5" />
            <h3>Emergencias de salud sexual</h3>
          </Badge>
          <HashIcon className="ml-1 size-5 opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
      </div>
      <div className="flex max-h-[700px] w-full">
        {SEXUALITY_EMERGENCY.map((cardInfo, index) => (
          <Card
            key={index}
            className="flex h-auto cursor-pointer flex-col bg-gray-50 text-main dark:bg-dark/30 dark:text-white"
          >
            <CardHeader isSecondary>
              <CardTitle className="text-base md:text-lg">
                Emergencias de Salud Sexual
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-col overflow-hidden p-0">
              <ScrollArea className="p-3 pr-5">
                <ol className="space-y-4">
                  {cardInfo.steps.map((step, stepIndex) => (
                    <li
                      key={stepIndex}
                      className="prose-sm space-y-1.5 text-start"
                    >
                      <ul className="inline-flex pl-0">
                        <Badge
                          variant="primary"
                          className="mr-2 flex !size-6 min-w-0 max-w-full justify-center !bg-pink-600 !text-white hover:!bg-pink-600/80"
                        >
                          {step.step}
                        </Badge>
                        <li className="mr-2 text-nowrap text-sm font-semibold md:text-base">
                          {step.title}
                        </li>
                      </ul>
                      <ul className="ml-8 space-y-1.5 text-main-h dark:text-main-dark-h">
                        {step.description.map((desc, i) => (
                          <li key={i}>
                            {desc.type === "bold" ? (
                              <strong className="mr-2 font-semibold">
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
              </ScrollArea>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default SexualityEmergencyCard;
