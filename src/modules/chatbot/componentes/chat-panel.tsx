"use client";

import { FC, useEffect, useState } from "react";

import type { AI } from "../chat/actions";

import { useActions, useUIState } from "ai/rsc";

import { nanoid } from "nanoid";
import { Button, useDisclosure } from "@nextui-org/react";

import PromptForm from "./prompt-form";
import FooterText from "./footer-text";
import ButtonToBottom from "@/modules/core/components/ui/buttons/button-to-bottom";
import { UserMessage } from "./stocks/message";
import { cn, shuffleArray } from "@/utils/common";
import { Session, UserProfileData } from "@/types/session";
import Link from "next/link";
import { StarsIcon, WarningCircledIcon } from "@/modules/icons/common";
import { motion } from "framer-motion";
import WarningModal from "../../payment/components/warning-premium-modal";
import PaymentModal from "../../payment/components/payment-modal";
import { useWarningModal } from "@/modules/payment/hooks/use-warning-modal";
import { INITIAL_CHAT_MESSAGES } from "@/consts/initial-chat-messages";

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
  const { isWarningModalOpen, handleOpenPaymentModal } =
    useWarningModal(isPremium);
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();

  const [isVisible, setIsVisible] = useState(true);

  const initialMessages = INITIAL_CHAT_MESSAGES;

  const [exampleMessages, setExampleMessages] = useState(initialMessages);

  useEffect(() => {
    setExampleMessages((prevMessages) => shuffleArray([...prevMessages]));
  }, []);

  return (
    <>
      <div className="w-full fixed inset-x-0 bottom-14 md:bottom-0 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px] transition-[padding] z-10 pointer-events-none">
        <ButtonToBottom
          isAtBottom={isAtBottom}
          scrollToBottom={scrollToBottom}
        />
        <div className="relative mx-auto max-w-2xl sm:px-4 pointer-events-auto">
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
                    "flex-col min-w-60 sm:min-w-0 h-auto gap-0 p-4 items-start text-start bg-white dark:bg-base-full-dark hover:bg-gray-100 border border-gray-200 dark:border-base-dark text-base-color dark:text-base-color-dark data-[disabled=true]:opacity-100"
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
          <div className="relative md:-ml-1 border-t bg-white dark:bg-base-full-dark px-4 py-2 shadow-lg sm:rounded-t-xl sm:border sm:py-4 border-gray-200 dark:border-base-dark">
            <motion.div
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={
                !isPremium
                  ? { opacity: 0, y: 150, scale: 0.9 }
                  : { opacity: 1, y: 0, scale: 1 }
              }
              transition={
                !isPremium
                  ? { ease: "easeInOut", duration: 0.5, delay: 0.3 }
                  : { ease: "easeInOut", duration: 1, delay: 0.3 }
              }
              className="space-y-4"
            >
              <PromptForm
                profileData={profileData}
                input={input}
                setInput={setInput}
              />
              <FooterText className="hidden md:block" />
            </motion.div>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, y: 150, scale: 0.9 }}
                animate={
                  !isPremium
                    ? { opacity: 1, y: -30, scale: 1 }
                    : { opacity: 0, y: 150, scale: 0.9 }
                }
                onAnimationComplete={() => {
                  if (isPremium) {
                    setIsVisible(false);
                  }
                }}
                transition={
                  !isPremium
                    ? { ease: "easeInOut", duration: 1, delay: 0.3 }
                    : { ease: "easeInOut", duration: 0.5, delay: 0.3 }
                }
                className="absolute inset-3 flex items-center justify-center gap-2 md:gap-4 p-2 md:p-4 rounded-xl shadow-lg bg-white dark:bg-base-full-dark border border-gray-200 dark:border-base-dark text-xs md:text-base text-base-color dark:text-base-color-dark"
              >
                <span className="inline-flex items-center gap-2">
                  <WarningCircledIcon className="size-5 text-base-color-m dark:text-base-color-dark-m" />
                  {session ? (
                    <>Actualiza tu plan para poder usar Essentia AI</>
                  ) : (
                    <>Inicia sesión para acceder a Essentia AI</>
                  )}
                </span>
                {session ? (
                  <Button
                    radius="sm"
                    onPress={() => handleOpenPaymentModal(onOpen)}
                    startContent={
                      <StarsIcon
                        aria-hidden="true"
                        className="size-5 stars-icon focus:outline-none"
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
                    size="sm"
                    className="rounded-md text-sm px-5 bg-light-gradient-v2 dark:bg-dark-gradient text-white data-[hover=true]:text-white !duration-150"
                  >
                    Iniciar sesión
                  </Button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* Warning Premium Modal */}
      {!isPremium && session && isWarningModalOpen && (
        <WarningModal isPremium={isPremium} isPaymentModalOpen={isOpen} />
      )}
      {/* Payment Modal */}
      {!isPremium && session && (
        <PaymentModal isOpen={isOpen} onOpenChange={onOpenChange} />
      )}
    </>
  );
};

export default ChatPanel;
