import { Fragment, useState } from "react";
import { Button, Card, CardBody, Chip, Divider } from "@nextui-org/react";
import { cn } from "@/utils/common";
import { motion } from "framer-motion";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { FAQ_FIRST_AID } from "@/consts/faq-firts-aid";
import { QuestionIcon } from "@/modules/icons/miscellaneus";
import TooltipCTN from "@/modules/core/components/ui/utils/tooltip-ctn";
import Link from "next/link";
import { HashIcon } from "@/modules/icons/common";

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
    <section className="flex flex-col w-full mt-5 text-base-color-h dark:text-base-color-dark">
      <div className="self-start px-3 mb-2">
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
            variant="flat"
            color="danger"
            startContent={<ExclamationTriangleIcon className="size-3 ml-2" />}
          >
            <h3>Primeros auxilios</h3>
          </Chip>
        </Button>
      </div>
      <div className="flex flex-col md:max-h-[945px] md:dark:max-h-[947px] px-3 md:px-0 space-y-2">
        {info.map((cardInfo, index) => (
          <Card
            isPressable
            disableRipple
            fullWidth
            key={index}
            onPress={() => toggleShow(index)}
            className="shadow-md min-h-[54px] bg-white dark:bg-base-full-dark border border-gray-200 dark:border-base-dark text-base-color-h dark:text-base-color-dark overflow-hidden data-[pressed=true]:scale-100"
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
                    className="border-black/10 dark:border-white/10 text-base-color-m dark:text-base-color-dark-m"
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
                <Divider className="bg-gray-200 dark:bg-base-dark my-3" />
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
                          variant="shadow"
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
                      <div className="ml-8 text-base-color-h dark:text-base-color-dark-h space-y-1.5">
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
