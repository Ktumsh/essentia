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

import ButtonToBottom from "@/modules/core/components/ui/buttons/button-to-bottom";
import { LinkIcon } from "@/modules/icons/action";
import { UserProfileData } from "@/types/session";

import AlertPanel from "./alert-panel";
import { PromptForm } from "./prompt-form";
import SuggestedActions from "./suggested-actions";
import { PreviewAttachment } from "./ui/preview-attachment";

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
  setMessages: Dispatch<SetStateAction<Array<Message>>>;
  isLoading: boolean;
  session: Session | null;
  scrollToBottom: () => void;
  isAtBottom: boolean;
  isReadonly: boolean;
  user: UserProfileData | null;
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
  setMessages,
  isLoading,
  session,
  scrollToBottom,
  isAtBottom,
  isReadonly,
  user,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  const isChat = pathname.startsWith("/essentia-ai/chat");

  const [uploadQueue, setUploadQueue] = useState<Array<string>>([]);

  const hasProcessedQueryRef = useRef(false);

  const { isPremium = false, username } = user || {};

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
        {!isReadonly ? (
          <div className="relative flex w-full flex-col">
            <SuggestedActions
              messages={messages}
              attachments={attachments}
              uploadQueue={uploadQueue}
              isPremium={isPremium}
              append={append}
            />
            <div className="relative border-t border-gray-200 bg-white px-4 py-0 pb-16 dark:border-dark dark:bg-full-dark md:rounded-t-xl md:border md:py-4">
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
                className="space-y-4 md:pb-6"
              >
                {(attachments.length > 0 || uploadQueue.length > 0) && (
                  <div className="mt-3 flex flex-wrap items-end gap-2 overflow-x-auto md:mt-0">
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
                  setMessages={setMessages}
                  uploadQueue={uploadQueue}
                  setUploadQueue={setUploadQueue}
                  isPremium={isPremium}
                />
              </motion.div>
              <AlertPanel
                session={session}
                isPremium={isPremium}
                isChat={isChat}
              />
            </div>
          </div>
        ) : (
          <div className="relative w-full border-t border-gray-200 bg-white px-4 py-0 pb-16 dark:border-dark dark:bg-full-dark sm:rounded-t-xl sm:border sm:py-4">
            <div className="inline-flex w-full items-center justify-center px-2 py-3">
              <p className="text-balance text-center text-sm md:text-base">
                Este chat está en modo lectura, le pertenece al usuario{" "}
                <Link
                  href={`/profiles/${username}`}
                  className="inline-flex flex-1 justify-center gap-1 font-semibold leading-4 hover:underline"
                >
                  @{username}
                  <LinkIcon />
                </Link>
                .
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatPanel;
