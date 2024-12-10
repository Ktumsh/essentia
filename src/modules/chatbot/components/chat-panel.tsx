"use client";

import { Attachment, ChatRequestOptions, CreateMessage, Message } from "ai";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Session } from "next-auth";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { Button } from "@/components/ui/button";
import ButtonToBottom from "@/modules/core/components/ui/buttons/button-to-bottom";
import { StarsIcon, WarningCircledIcon } from "@/modules/icons/common";
import { useWarningModal } from "@/modules/payment/hooks/use-warning-modal";

import PromptForm from "./prompt-form";
import SuggestedActions from "./suggested-actions";
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
  session: Session | null;
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
  const [isOpen, setIsOpen] = useState(false);
  const { isWarningModalOpen, handleOpenPaymentModal } =
    useWarningModal(isPremium);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  const isChat = pathname.startsWith("/essentia-ai/chat");

  const [isVisible, setIsVisible] = useState(true);

  const [uploadQueue, setUploadQueue] = useState<Array<string>>([]);

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
          <SuggestedActions
            messages={messages}
            attachments={attachments}
            uploadQueue={uploadQueue}
            isPremium={isPremium}
            append={append}
          />
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
                    onClick={() => handleOpenPaymentModal(setIsOpen)}
                    className="inline-flex h-10 min-w-20 shrink-0 items-center justify-center gap-2 rounded-lg bg-light-gradient-v2 px-4 shadow-none !transition before:absolute before:inset-[2px] before:z-[-1] before:rounded-md before:bg-white before:content-[''] hover:scale-105 hover:shadow-lg hover:saturate-200 dark:bg-dark-gradient-v2 before:dark:bg-full-dark"
                  >
                    <StarsIcon
                      aria-hidden="true"
                      className="stars-icon !size-5 focus:outline-none"
                    />
                    <span className="bg-light-gradient-v2 bg-clip-text font-sans font-extrabold text-transparent dark:bg-dark-gradient-v2">
                      Hazte premium
                    </span>
                  </Button>
                ) : (
                  <Link
                    href="/login"
                    className="inline-flex h-8 min-w-10 items-center justify-center rounded-md bg-light-gradient-v2 px-5 text-sm text-white !duration-150 data-[hover=true]:text-white dark:bg-dark-gradient"
                  >
                    Iniciar sesión
                  </Link>
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
        <PaymentModal isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default ChatPanel;
