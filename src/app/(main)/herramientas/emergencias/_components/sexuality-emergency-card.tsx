import { Circle, VenusAndMars } from "lucide-react";
import { Fragment } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  SEXUALITY_EMERGENCY_DATA,
  SEXUALITY_EMERGENCY_DATA_COLORS,
} from "@/db/data/sexuality-emergency-data";
import { cn } from "@/utils";

import SectionTitleWarning from "../../_components/section-title-warning";

const SexualityEmergencyCard = () => {
  return (
    <section className="mt-10 flex w-full flex-col">
      <SectionTitleWarning
        title="Emergencias de salud sexual"
        hash="emergencias-de-salud-sexual"
        color="text-rose-600 dark:text-rose-400"
        icon={
          <VenusAndMars className="size-5 text-rose-600 dark:text-rose-400" />
        }
      />
      <Card className="rounded-tl-none border border-l-4 border-rose-200 border-l-rose-500! p-4 pt-0 md:p-6 dark:border-rose-900/50">
        <Accordion
          defaultValue={String(SEXUALITY_EMERGENCY_DATA[0].id)}
          type="single"
          collapsible
          className="w-full"
        >
          {SEXUALITY_EMERGENCY_DATA.map((item, index) => {
            const theme =
              SEXUALITY_EMERGENCY_DATA_COLORS[
                item.id as keyof typeof SEXUALITY_EMERGENCY_DATA_COLORS
              ] || SEXUALITY_EMERGENCY_DATA_COLORS[1];

            return (
              <AccordionItem key={index} value={String(item.id)}>
                <AccordionTrigger className="text-foreground text-sm font-semibold md:text-base">
                  <div className="font-merriweather inline-flex items-center gap-4">
                    <Circle className="size-1 **:fill-rose-600 dark:**:fill-rose-400" />
                    {item.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent asChild>
                  <ul className="prose space-y-4!">
                    {item.steps.map((step, idx) => (
                      <li key={idx} className="space-y-0">
                        <div className="flex items-center pl-0">
                          <Badge
                            className={cn(
                              "mr-2 size-6 max-w-full min-w-0 justify-center",
                              theme.bg,
                              theme.text,
                            )}
                          >
                            {step.step}
                          </Badge>
                          {Array.isArray(step.title) ? (
                            <div className="text-foreground mr-2 text-sm font-medium md:text-base">
                              {step.title.map((part, i) =>
                                part.type === "text" ? (
                                  <Fragment key={i}>{part.content}</Fragment>
                                ) : (
                                  <span
                                    key={i}
                                    className={cn(
                                      "text-red-600 dark:text-red-400",
                                    )}
                                  >
                                    {part.content}
                                  </span>
                                ),
                              )}
                            </div>
                          ) : (
                            <div className="text-foreground mr-2 mb-2 text-sm font-semibold md:text-base">
                              {step.title}
                            </div>
                          )}
                        </div>
                        {step.description.map((desc, i) => (
                          <div
                            key={i}
                            className="text-foreground/80 mb-1.5 ml-8 text-xs md:text-sm"
                          >
                            {desc.type === "bold" ? (
                              <p className="text-foreground my-0! mr-2 font-medium">
                                {desc.content}
                              </p>
                            ) : (
                              desc.content
                            )}
                          </div>
                        ))}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Card>
    </section>
  );
};

export default SexualityEmergencyCard;
