"use client";

import { TriangleAlert } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Fragment, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BetterTooltip } from "@/components/ui/tooltip";
import { FIRST_AID } from "@/consts/firts-aid";
import { HashIcon } from "@/modules/icons/common";
import { QuestionIcon } from "@/modules/icons/miscellaneus";
import { cn } from "@/utils/common";

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
    <section className="mt-5 flex w-full flex-col text-main-h dark:text-main-dark">
      <div className="mb-2 self-start">
        <Link
          id="primeros-auxilios"
          data-id="primeros-auxilios"
          data-name="Primeros auxilios"
          href="#primeros-auxilios"
          className="group flex h-auto w-fit items-center p-0 text-xl font-semibold transition active:scale-100"
        >
          <Badge variant="primary" className="gap-1 py-1">
            <TriangleAlert strokeWidth={1.5} className="size-3.5" />
            <h3>Primeros auxilios</h3>
          </Badge>
          <HashIcon className="ml-1 size-5 opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
      </div>
      <div className="flex max-h-[1000px] flex-col space-y-2 md:max-h-[700px] md:px-0">
        {info.map((cardInfo, index) => (
          <Card
            key={index}
            onClick={() => toggleShow(index)}
            className="flex h-auto min-h-[74px] cursor-pointer flex-col bg-gray-50 text-main dark:bg-dark/30 dark:text-white md:min-h-[54px]"
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
                <Badge className="cursor-help border border-gray-300 py-1 text-main-m dark:border-accent-dark dark:text-main-dark-h">
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
              <ScrollArea className="flex flex-col p-3 pr-5">
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
                          className="flex size-6 items-center justify-center !bg-cyan-600 font-bold !text-white hover:!bg-cyan-600/80"
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
                          className="ml-8 space-y-1.5 text-main-h dark:text-main-dark"
                        >
                          {desc.type === "bold" ? (
                            <strong className="mr-2 font-semibold text-main dark:text-white">
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
