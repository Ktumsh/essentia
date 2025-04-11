"use client";

import { motion } from "motion/react";
import { Fragment, useState } from "react";

import { Badge } from "@/components/kit/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import { ScrollArea } from "@/components/kit/scroll-area";
import { Separator } from "@/components/kit/separator";
import { BetterTooltip } from "@/components/kit/tooltip";
import { QuestionIcon } from "@/components/ui/icons/miscellaneus";
import { FIRST_AID } from "@/consts/firts-aid";
import { cn } from "@/lib/utils";

import SectionTitleWarning from "./section-title-warning";

const FirstAid = () => {
  const info = FIRST_AID;

  const [openCard, setOpenCard] = useState<number | null>(0);

  const toggleShow = (index: number) => {
    setOpenCard((prevIndex) => {
      if (prevIndex === index) {
        if (index === 0 && info.length > 1) return 1;
        if (index === 1 && info.length > 1) return 0;
        if (index === 2 && info.length > 1) return 3;
        if (index === 3 && info.length > 1) return 2;
        if (index === 4 && info.length > 1) return 5;
        if (index === 5 && info.length > 1) return 4;
        return null;
      }
      return index;
    });
  };

  return (
    <section className="text-foreground/80 mt-5 flex w-full flex-col">
      <SectionTitleWarning title="Primeros auxilios" hash="primeros-auxilios" />
      <div className="flex max-h-[1000px] flex-col space-y-2 md:max-h-[700px] md:px-0">
        {info.map((cardInfo, index) => (
          <Card
            key={index}
            onClick={() => toggleShow(index)}
            className="text-foreground dark:bg-accent/30 flex h-auto min-h-[74px] cursor-pointer flex-col bg-slate-50 md:min-h-[54px]"
          >
            <CardHeader
              isSecondary
              className="inline-flex w-full flex-row items-center justify-between"
            >
              <CardTitle className="text-base md:text-lg">
                {cardInfo.title}
              </CardTitle>
              <BetterTooltip
                content={
                  openCard === index ? "Toca para ocultar" : "Toca para mostrar"
                }
              >
                <Badge className="text-muted-foreground dark:border-alternative cursor-help border border-slate-300 py-1">
                  <QuestionIcon className="size-3" />
                </Badge>
              </BetterTooltip>
            </CardHeader>
            <motion.div
              initial={false}
              animate={openCard === index ? "open" : "closed"}
              variants={{
                open: { opacity: 1, display: "block" },
                closed: {
                  opacity: 0,
                  transitionEnd: {
                    display: "none",
                  },
                },
              }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              <Separator />
            </motion.div>
            <CardContent className="flex flex-col overflow-hidden p-0">
              <ScrollArea className="flex flex-col overflow-y-auto p-3 pr-5">
                <ol
                  className={cn(
                    "space-y-4 opacity-0 transition-all [interpolate-size:allow-keywords]",
                    openCard === index ? "opacity-100" : "h-0",
                  )}
                >
                  {cardInfo.steps.map((step, stepIndex) => (
                    <li
                      key={stepIndex}
                      className="prose-sm space-y-1.5 text-start"
                    >
                      <ul className="flex items-center pl-0">
                        <Badge
                          variant="primary"
                          className="flex size-6 items-center justify-center bg-cyan-600! font-bold text-white! hover:bg-cyan-600/80!"
                        >
                          {step.step}
                        </Badge>
                        {Array.isArray(step.title) ? (
                          <li className="mr-2 text-sm font-semibold md:text-base">
                            {step.title.map((part, i) =>
                              part.type === "text" ? (
                                <Fragment key={i}>{part.content}</Fragment>
                              ) : (
                                <strong
                                  key={i}
                                  className={cn(
                                    part.highlightClass,
                                    "font-semibold",
                                  )}
                                >
                                  {part.content}
                                </strong>
                              ),
                            )}
                          </li>
                        ) : (
                          <li className="mr-2 text-sm font-semibold md:text-base">
                            {step.title}
                          </li>
                        )}
                      </ul>
                      {step.description.map((desc, i) => (
                        <p
                          key={i}
                          className="text-foreground/80 ml-8 space-y-1.5"
                        >
                          {desc.type === "bold" ? (
                            <strong className="text-foreground mr-2 font-semibold">
                              {desc.content}
                            </strong>
                          ) : (
                            desc.content
                          )}
                        </p>
                      ))}
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

export default FirstAid;
