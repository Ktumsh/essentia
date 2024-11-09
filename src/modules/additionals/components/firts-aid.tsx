import { Button, Card, CardBody, Chip, Divider } from "@nextui-org/react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { Fragment, useState } from "react";

import { FAQ_FIRST_AID } from "@/consts/faq-firts-aid";
import TooltipCTN from "@/modules/core/components/ui/utils/tooltip-ctn";
import { HashIcon } from "@/modules/icons/common";
import { QuestionIcon } from "@/modules/icons/miscellaneus";
import { cn } from "@/utils/common";

const FirstAid = () => {
  const info = FAQ_FIRST_AID;

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
        <Button
          as={Link}
          id="primeros-auxilios"
          data-id="primeros-auxilios"
          data-name="Primeros auxilios"
          href="#primeros-auxilios"
          disableRipple
          radius="none"
          variant="flat"
          endContent={
            <HashIcon className="ml-1 size-5 opacity-0 transition-opacity group-data-[hover=true]:opacity-100" />
          }
          className="h-auto w-fit gap-0 bg-transparent p-0 text-xl font-semibold data-[pressed=true]:scale-100 data-[hover=true]:opacity-80"
        >
          <Chip
            color="danger"
            startContent={<ExclamationTriangleIcon className="ml-2 size-3" />}
          >
            <h3>Primeros auxilios</h3>
          </Chip>
        </Button>
      </div>
      <div className="flex max-h-[1000px] flex-col space-y-2 md:max-h-[700px] md:px-0">
        {info.map((cardInfo, index) => (
          <Card
            key={index}
            isPressable
            disableRipple
            fullWidth
            radius="sm"
            shadow="none"
            onPress={() => toggleShow(index)}
            className="min-h-[74px] border border-gray-200 bg-gray-100 text-main-h data-[pressed=true]:scale-100 dark:border-dark dark:bg-dark/50 dark:text-white md:min-h-[54px]"
          >
            <CardBody className="z-10 overflow-hidden">
              <div className="inline-flex w-full items-center justify-between">
                <h3 className="text-lg font-semibold md:text-xl">
                  {cardInfo.title}
                </h3>
                <TooltipCTN
                  content={
                    openCard === index
                      ? "Toca para ocultar"
                      : "Toca para mostrar"
                  }
                >
                  <Chip
                    size="sm"
                    variant="bordered"
                    className="dark:border-accent-dark border border-gray-300 text-main-m dark:text-main-dark-h"
                  >
                    <QuestionIcon className="size-3" />
                  </Chip>
                </TooltipCTN>
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
                <Divider className="my-3 bg-gray-300 dark:bg-dark md:bg-gray-200" />
              </motion.div>
              <ol
                className={cn(
                  "custom-scroll h-0 flex-wrap space-y-4 overflow-y-auto opacity-0 transition-all hover:scrollbar-default md:scrollbar-hide",
                  openCard === index &&
                    "h-[1000px] opacity-100 [interpolate-size:allow-keywords]",
                )}
              >
                {cardInfo.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="space-y-1.5 text-sm">
                    <ul className="flex">
                      <Chip
                        size="sm"
                        color="danger"
                        classNames={{
                          base: "shrink-0 !size-6 min-w-0 max-w-full justify-center mr-2",
                          content: "flex justify-center text-white font-bold",
                        }}
                      >
                        {step.step}
                      </Chip>
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
                          <strong className="mr-2">{desc.content}</strong>
                        ) : (
                          desc.content
                        )}
                      </p>
                    ))}
                  </li>
                ))}
              </ol>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FirstAid;
