import { motion } from "framer-motion";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import { Fragment, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
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
            <TriangleAlert className="size-3.5" />
            <h3>Primeros auxilios</h3>
          </Badge>
          <HashIcon className="ml-1 size-5 opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
      </div>
      <div className="flex max-h-[1000px] flex-col space-y-2 md:max-h-[700px] md:px-0">
        {info.map((cardInfo, index) => (
          <button
            key={index}
            onClick={() => toggleShow(index)}
            className="relative box-border flex h-auto min-h-[74px] w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-gray-100 text-main outline-none transition-transform-background focus-visible:outline-offset-2 focus-visible:outline-focus data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 motion-reduce:transition-none dark:border-dark dark:bg-dark/50 dark:text-white md:min-h-[54px]"
          >
            <CardContent className="flex flex-col overflow-hidden p-3">
              <div className="inline-flex w-full items-center justify-between">
                <h3 className="text-start text-lg font-semibold">
                  {cardInfo.title}
                </h3>
                <BetterTooltip
                  content={
                    openCard === index
                      ? "Toca para ocultar"
                      : "Toca para mostrar"
                  }
                >
                  <Badge className="border border-gray-300 py-1 text-main-m dark:border-accent-dark dark:text-main-dark-h">
                    <QuestionIcon className="size-3" />
                  </Badge>
                </BetterTooltip>
              </div>
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
              >
                <Separator className="my-3 bg-gray-200 dark:bg-dark" />
              </motion.div>
              <ol
                className={cn(
                  "modal h-0 flex-wrap space-y-4 overflow-y-auto opacity-0 transition-all",
                  openCard === index &&
                    "h-[1000px] opacity-100 [interpolate-size:allow-keywords]",
                )}
              >
                {cardInfo.steps.map((step, stepIndex) => (
                  <li
                    key={stepIndex}
                    className="space-y-1.5 text-start text-sm"
                  >
                    <ul className="flex">
                      <Badge
                        variant="primary"
                        className="mr-2 flex size-6 items-center justify-center font-bold text-white"
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
                                  part.highlightClass || "",
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
                          <strong className="mr-2 text-main dark:text-white">
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
            </CardContent>
          </button>
        ))}
      </div>
    </section>
  );
};

export default FirstAid;
