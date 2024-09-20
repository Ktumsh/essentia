"use client";

import { FC, useEffect, useState } from "react";

import type { AI } from "../chat/actions";

import { useActions, useUIState } from "ai/rsc";

import { nanoid } from "nanoid";
import { Button, Modal, useDisclosure } from "@nextui-org/react";

import PromptForm from "./prompt-form";
import FooterText from "./footer-text";
import ButtonToBottom from "@/modules/core/components/ui/buttons/button-to-bottom";
import { UserMessage } from "./stocks/message";
import { cn, shuffleArray } from "@/utils/common";
import {
  AcademicIcon,
  BrainIcon,
  FruitIcon,
  HeartbeatIcon,
  ItineraryIcon,
  LightbulbIcon,
} from "@/modules/icons/miscellaneus";
import { Session, UserProfileData } from "@/types/session";
import Link from "next/link";
import { StarsIcon, WarningCircledIcon } from "@/modules/icons/common";
import { motion } from "framer-motion";
import WarningModal from "../../payment/components/warning-premium-modal";
import PaymentModal from "../../payment/components/payment-modal";

export interface ChatPanelProps {
  input: string;
  setInput: (value: string) => void;
  isAtBottom: boolean;
  scrollToBottom: () => void;
  profileData: UserProfileData | null;
  isPremium: boolean | null;
  session: Session | undefined;
}

const ChatPanel: FC<ChatPanelProps> = ({
  input,
  setInput,
  isAtBottom,
  scrollToBottom,
  profileData,
  isPremium,
  session,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();

  const initialMessages = [
    {
      heading: "Consejos para",
      subheading: "mejorar el bienestar emocional",
      message: `Recomiéndame actividades para mi bienestar emocional`,
      icon: BrainIcon,
      iconColor: "text-fuchsia-500",
    },
    {
      heading: "Rutinas diarias para",
      subheading: "fortalecer el bienestar físico",
      message:
        "Crea una rutina diaria de ejercicios de acuerdo a mis necesidades",
      icon: ItineraryIcon,
      iconColor: "text-lime-500",
    },
    {
      heading: "Aprende sobre",
      subheading: "educación sexual segura",
      message: `¿Qué recursos confiables existen para aprender sobre salud y educación sexual?`,
      icon: AcademicIcon,
      iconColor: "text-sky-300",
    },
    {
      heading: "Mejora tu",
      subheading: `calidad de sueño`,
      message: `¿Qué técnicas efectivas puedo usar para mejorar mi calidad de sueño?`,
      icon: LightbulbIcon,
      iconColor: "text-yellow-500",
    },
    {
      heading: "Crea un plan",
      subheading: "nutricional personalizado",
      message: `Crea un plan nutricional de acuerdo a mis necesidades`,
      icon: FruitIcon,
      iconColor: "text-red-500",
    },
    {
      heading: "Evalua tus",
      subheading: "riesgos de salud",
      message: `Evalua mis riesgos de salud y recomiéndame actividades para prevenirlos`,
      icon: HeartbeatIcon,
      iconColor: "text-blue-500",
    },
  ];

  const [exampleMessages, setExampleMessages] = useState(initialMessages);

  useEffect(() => {
    setExampleMessages((prevMessages) => shuffleArray([...prevMessages]));
  }, []);

  return (
    <div className="w-full fixed inset-x-0 bottom-14 md:bottom-0 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px] transition-[padding] z-10 pointer-events-none">
      <ButtonToBottom isAtBottom={isAtBottom} scrollToBottom={scrollToBottom} />
      <div className="mx-auto max-w-2xl sm:px-4 pointer-events-auto">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={!isPremium ? { opacity: 0 } : { opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 1, delay: 0.3 }}
            className="mb-4 flex sm:grid grid-cols-2 gap-2 px-4 sm:px-0 overflow-x-auto scrollbar-hide"
          >
            {exampleMessages.slice(0, 4).map((example, index) => (
              <Button
                key={index}
                radius="sm"
                isDisabled={!isPremium}
                startContent={
                  <example.icon className={cn("size-4", example.iconColor)} />
                }
                className={cn(
                  "flex-col min-w-60 sm:min-w-0 h-auto gap-0 p-4 items-start text-start bg-white dark:bg-base-full-dark hover:bg-gray-100 border border-gray-200 dark:border-base-dark text-base-color dark:text-base-color-dark"
                )}
                onClick={async () => {
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    {
                      id: nanoid(),
                      display: (
                        <UserMessage profileData={profileData}>
                          {example.message}
                        </UserMessage>
                      ),
                    },
                  ]);

                  const responseMessage = await submitUserMessage(
                    example.message
                  );

                  setMessages((currentMessages) => [
                    ...currentMessages,
                    responseMessage,
                  ]);
                }}
              >
                <div className="text-sm font-semibold">{example.heading}</div>
                <div className="text-sm text-base-color-m dark:text-base-color-dark-m text-wrap">
                  {example.subheading}
                </div>
              </Button>
            ))}
          </motion.div>
        )}
        <div className="relative md:-ml-1 space-y-4 border-t bg-white dark:bg-base-full-dark px-4 py-2 shadow-lg sm:rounded-t-xl sm:border sm:py-4 border-gray-200 dark:border-base-dark">
          <PromptForm
            profileData={profileData}
            input={input}
            setInput={setInput}
          />
          <FooterText className="hidden md:block" />
          {!isPremium && (
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ease: "easeInOut", duration: 0.5, delay: 0.3 }}
              className="absolute inset-3 flex items-center justify-center gap-2 md:gap-4 !mt-0 p-2 md:p-4 rounded-lg shadow-medium backdrop-blur backdrop-saturate-150 text-xs md:text-base text-base-color dark:text-base-color-dark"
            >
              <span className="inline-flex items-center gap-2">
                <WarningCircledIcon className="size-5 text-base-color-m dark:text-base-color-dark-m" />
                {session ? (
                  <>Actualiza tu plan para poder usar Essentia AI</>
                ) : (
                  <>Inicia sesión para acceder a EssentiaAI</>
                )}
              </span>
              {session ? (
                <Button
                  radius="sm"
                  onPress={onOpen}
                  startContent={
                    <StarsIcon
                      aria-hidden="true"
                      className="size-5 starts-icon focus:outline-none"
                    />
                  }
                  className="shrink-0 bg-light-gradient-v2 dark:bg-dark-gradient-v2 data-[hover=true]:saturate-200 data-[hover=true]:scale-105 data-[hover=true]:shadow-lg !transition before:bg-white before:dark:bg-base-full-dark before:content-[''] before:absolute before:inset-[2px] before:rounded-md before:z-[-1]"
                >
                  <span className="text-transparent bg-clip-text bg-light-gradient-v2 dark:bg-dark-gradient-v2 font-sans font-extrabold">
                    Hazte premium
                  </span>
                </Button>
              ) : (
                <Button
                  as={Link}
                  href="/login"
                  variant="ghost"
                  color="danger"
                  className="rounded-md text-base-color dark:text-base-color-dark text-xs md:text-base"
                >
                  Iniciar sesión
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </div>
      {!isPremium && <WarningModal isPremium={isPremium} />}
      <Modal
        size="lg"
        radius="sm"
        placement="center"
        classNames={{
          backdrop: "z-[101] bg-black/80",
          wrapper: "z-[102] pointer-events-auto",
          base: "bg-white dark:bg-base-full-dark min-h-[326px] md:min-h-[375px]",
          closeButton:
            "hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors duration-150",
        }}
        isOpen={isOpen}
        onClose={onOpenChange}
      >
        <PaymentModal onOpenChange={onOpenChange} />
      </Modal>
    </div>
  );
};

export default ChatPanel;
