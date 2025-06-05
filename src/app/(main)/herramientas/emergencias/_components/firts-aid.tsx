import { Circle, HeartPlus } from "lucide-react";
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
  FIRST_AID_DATA,
  FIRST_AID_DATA_COLORS,
} from "@/db/data/firts-aid-data";
import { cn } from "@/utils";

import SectionTitleWarning from "../../_components/section-title-warning";

const FirstAid = () => {
  return (
    <section className="mt-10 flex w-full flex-col">
      <SectionTitleWarning
        title="Primeros auxilios"
        hash="primeros-auxilios"
        color="text-amber-600 dark:text-amber-400"
        icon={
          <HeartPlus className="size-5 text-amber-600 dark:text-amber-400" />
        }
      />
      <Card className="rounded-tl-none border border-l-4 border-amber-200 border-l-amber-500! p-4 pt-0 md:p-6 dark:border-amber-900/50">
        <Accordion type="single" collapsible className="w-full">
          {FIRST_AID_DATA.map((item, index) => {
            const theme =
              FIRST_AID_DATA_COLORS[
                item.id as keyof typeof FIRST_AID_DATA_COLORS
              ] || FIRST_AID_DATA_COLORS[1];

            return (
              <AccordionItem
                key={index}
                value={String(item.id)}
                className="border-amber-200 dark:border-amber-900/50"
              >
                <AccordionTrigger className="text-foreground text-sm font-semibold md:text-base">
                  <div className="font-merriweather inline-flex items-center gap-4">
                    <Circle className={cn("size-1", theme.fill)} />
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
                            <div className="text-foreground mr-2 text-sm font-medium">
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
                            <div className="text-foreground mr-2 text-sm font-medium">
                              {step.title}
                            </div>
                          )}
                        </div>
                        {step.description.map((desc, i) => (
                          <div
                            key={i}
                            className="text-foreground/80 mb-1.5 ml-8 text-xs"
                          >
                            {desc.type === "bold" ? (
                              <p className="text-foreground my-0! mr-2">
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

export default FirstAid;
