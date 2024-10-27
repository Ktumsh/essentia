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
    <section className="flex flex-col w-full mt-5 text-main-h dark:text-main-dark">
      <div className="self-start mb-2">
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
            <HashIcon className="size-5 ml-1 opacity-0 group-data-[hover=true]:opacity-100 transition-opacity" />
          }
          className="gap-0 text-xl w-fit p-0 bg-transparent h-auto data-[hover=true]:opacity-80 font-semibold data-[pressed=true]:scale-100"
        >
          <Chip
            color="danger"
            startContent={<ExclamationTriangleIcon className="size-3 ml-2" />}
          >
            <h3>Primeros auxilios</h3>
          </Chip>
        </Button>
      </div>
      <div className="flex flex-col md:max-h-[945px] md:dark:max-h-[947px] md:px-0 space-y-2">
        {info.map((cardInfo, index) => (
          <Card
            key={index}
            isPressable
            disableRipple
            fullWidth
            radius="sm"
            onPress={() => toggleShow(index)}
            className="shadow-none md:shadow-md min-h-[54px] bg-gray-100 md:bg-white dark:bg-dark/50 md:dark:bg-full-dark border border-gray-300 md:border-gray-200 dark:border-dark md:dark:border-dark text-main-h dark:text-main-dark overflow-hidden data-[pressed=true]:scale-100"
          >
            <CardBody className="z-10 overflow-hidden">
              <div className="inline-flex items-center justify-between w-full">
                <h3 className="text-lg md:text-xl font-semibold">
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
                    className="border border-gray-300 md:border-gray-200 dark:border-dark text-main-m dark:text-main-dark-m"
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
                transition={
                  window.innerWidth > 768 ? { duration: 0.3 } : { duration: 0 }
                }
              >
                <Divider className="bg-gray-300 md:bg-gray-200 dark:bg-dark my-3" />
              </motion.div>
              <div
                className={cn(
                  "h-0 opacity-0 transition-all duration-0 md:duration-300",
                  openCard === index &&
                    "h-auto md:h-[688px] dark:h-auto md:dark:h-[682px] opacity-100"
                )}
              >
                <ol className="flex flex-col space-y-4">
                  {cardInfo.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="text-sm space-y-1.5">
                      <ul className="inline-flex">
                        <Chip
                          size="sm"
                          color="danger"
                          classNames={{
                            base: "!size-6 min-w-0 max-w-full justify-center mr-2 bg-gradient-to-br",
                            content:
                              "flex justify-center drop-shadow shadow-black text-white font-bold",
                          }}
                        >
                          {step.step}
                        </Chip>
                        {Array.isArray(step.title) ? (
                          <li className="text-sm md:text-base font-semibold mr-2 text-nowrap">
                            {step.title.map((part, i) =>
                              part.type === "text" ? (
                                <Fragment key={i}>{part.content}</Fragment>
                              ) : (
                                <strong
                                  key={i}
                                  className={cn(
                                    part.highlightClass || "",
                                    "font-semibold"
                                  )}
                                >
                                  {part.content}
                                </strong>
                              )
                            )}
                          </li>
                        ) : (
                          <li className="text-sm md:text-base font-semibold mr-2 text-nowrap">
                            {step.title}
                          </li>
                        )}
                      </ul>
                      <div className="ml-8 text-main-h dark:text-main-dark-h space-y-1.5">
                        {step.description.map((desc, i) => (
                          <p key={i}>
                            {desc.type === "bold" ? (
                              <strong className="mr-2 text-nowrap">
                                {desc.content}
                              </strong>
                            ) : (
                              desc.content
                            )}
                          </p>
                        ))}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FirstAid;
