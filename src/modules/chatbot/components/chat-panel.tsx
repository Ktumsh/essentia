"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import { Attachment, ChatRequestOptions, CreateMessage, Message } from "ai";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { INITIAL_CHAT_MESSAGES } from "@/consts/initial-chat-messages";
import ButtonToBottom from "@/modules/core/components/ui/buttons/button-to-bottom";
import { StarsIcon, WarningCircledIcon } from "@/modules/icons/common";
import { useWarningModal } from "@/modules/payment/hooks/use-warning-modal";
import { Session } from "@/types/session";
import { cn, shuffleArray } from "@/utils/common";

import PromptForm from "./prompt-form";
import { PreviewAttachment } from "./ui/preview-attachment";
import PaymentModal from "../../payment/components/payment-modal";
import WarningModal from "../../payment/components/warning-premium-modal";
import FooterText from "../components/ui/footer-text";

export interface ChatPanelProps {
  input: string;
  setInput: (value: string) => void;
  stop: () => void;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions,
  ) => void;
  attachments: Array<Attachment>;
  setAttachments: Dispatch<SetStateAction<Array<Attachment>>>;
  messages: Array<Message>;
  isLoading: boolean;
  isPremium: boolean | null;
  session: Session | undefined;
  scrollToBottom: () => void;
  isAtBottom: boolean;
}

const ChatPanel: FC<ChatPanelProps> = ({
  input,
  setInput,
  stop,
  append,
  handleSubmit,
  attachments,
  setAttachments,
  messages,
  isLoading,
  isPremium,
  session,
  scrollToBottom,
  isAtBottom,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isWarningModalOpen, handleOpenPaymentModal } =
    useWarningModal(isPremium);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  const isChat = pathname.startsWith("/essentia-ai/chat");

  const [isVisible, setIsVisible] = useState(true);

  const initialMessages = INITIAL_CHAT_MESSAGES;

  const [suggestedActions, setSuggestedActions] = useState(initialMessages);

  const [uploadQueue, setUploadQueue] = useState<Array<string>>([]);

  useEffect(() => {
    setSuggestedActions((prevMessages) => shuffleArray([...prevMessages]));
  }, []);

  const hasProcessedQueryRef = useRef(false);

  useEffect(() => {
    if (searchQuery && !hasProcessedQueryRef.current) {
      hasProcessedQueryRef.current = true;
      router.replace(pathname);
      append({
        role: "user",
        content: searchQuery,
      });
      handleSubmit();
    }
  }, [searchQuery, router, pathname, append, handleSubmit]);

  return (
    <>
      <div className="relative mx-auto flex w-full gap-2 md:max-w-3xl md:px-4">
        <ButtonToBottom
          isAtBottom={isAtBottom}
          scrollToBottom={scrollToBottom}
        />
        <div className="relative flex w-full flex-col">
          {messages.length === 0 &&
            attachments.length === 0 &&
            uploadQueue.length === 0 && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={!isPremium ? { opacity: 0 } : { opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 1, delay: 0.3 }}
                className="mb-4 flex grid-cols-2 gap-2 overflow-x-auto px-4 scrollbar-hide sm:grid sm:px-0"
              >
                {suggestedActions.slice(0, 4).map((suggestedAction, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.1 * index }}
                    key={index}
                    className="w-full"
                  >
                    <Button
                      radius="sm"
                      isDisabled={!isPremium}
                      fullWidth
                      startContent={
                        <suggestedAction.icon
                          className={cn("size-4", suggestedAction.iconColor)}
                        />
                      }
                      className={cn(
                        "h-auto min-w-60 flex-col items-start gap-0 border border-gray-200 bg-white p-4 text-start text-main hover:bg-gray-100 data-[disabled=true]:opacity-100 dark:border-dark dark:bg-full-dark dark:text-main-dark sm:min-w-0",
                      )}
                      onPress={async () => {
                        append({
                          role: "user",
                          content: suggestedAction.action,
                        });
                      }}
                    >
                      <div className="text-sm font-semibold">
                        {suggestedAction.heading}
                      </div>
                      <div className="text-wrap text-sm text-main-m dark:text-main-dark-m">
                        {suggestedAction.subheading}
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          <div className="relative border-t border-gray-200 bg-white px-4 py-2 pb-16 dark:border-dark dark:bg-full-dark sm:rounded-t-xl sm:border sm:py-4">
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
              {(attachments.length > 0 || uploadQueue.length > 0) && (
                <div className="flex flex-wrap gap-2">
                  {attachments.map((attachment, index) => (
                    <PreviewAttachment
                      key={attachment.url || index}
                      attachment={attachment}
                      onRemove={() => {
                        setAttachments((prevAttachments) =>
                          prevAttachments.filter((_, i) => i !== index),
                        );
                      }}
                    />
                  ))}

                  {uploadQueue.map((filename) => (
                    <PreviewAttachment
                      key={filename}
                      attachment={{
                        url: "",
                        name: filename,
                        contentType: "",
                      }}
                      isUploading={true}
                    />
                  ))}
                </div>
              )}
              <PromptForm
                isLoading={isLoading}
                handleSubmit={handleSubmit}
                stop={stop}
                input={input}
                setInput={setInput}
                attachments={attachments}
                setAttachments={setAttachments}
                uploadQueue={uploadQueue}
                setUploadQueue={setUploadQueue}
                isPremium={isPremium}
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
                className="absolute inset-3 flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white p-2 text-xs text-main shadow-lg dark:border-dark dark:bg-full-dark dark:text-main-dark md:gap-4 md:p-4 md:text-base"
              >
                <span className="inline-flex items-center gap-2">
                  <WarningCircledIcon className="size-5 text-main-m dark:text-main-dark-m" />
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
                        className="stars-icon size-5 focus:outline-none"
                      />
                    }
                    className="shrink-0 bg-light-gradient-v2 !transition before:absolute before:inset-[2px] before:z-[-1] before:rounded-md before:bg-white before:content-[''] data-[hover=true]:scale-105 data-[hover=true]:shadow-lg data-[hover=true]:saturate-200 dark:bg-dark-gradient-v2 before:dark:bg-full-dark"
                  >
                    <span className="bg-light-gradient-v2 bg-clip-text font-sans font-extrabold text-transparent dark:bg-dark-gradient-v2">
                      Hazte premium
                    </span>
                  </Button>
                ) : (
                  <Button
                    as={Link}
                    href="/login"
                    size="sm"
                    className="rounded-md bg-light-gradient-v2 px-5 text-sm text-white !duration-150 data-[hover=true]:text-white dark:bg-dark-gradient"
                  >
                    Iniciar sesión
                  </Button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* Modal de advertencia para Premium */}
      {!isPremium && session && isWarningModalOpen && !isChat && (
        <WarningModal isPremium={isPremium} isPaymentModalOpen={isOpen} />
      )}
      {/* Modal de Pago */}
      {!isPremium && session && (
        <PaymentModal isOpen={isOpen} onOpenChange={onOpenChange} />
      )}
    </>
  );
};

export default ChatPanel;
