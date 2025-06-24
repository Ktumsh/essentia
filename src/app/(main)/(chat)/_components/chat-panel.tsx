"use client";

import { UseChatHelpers } from "@ai-sdk/react";
import { Attachment, Message } from "ai";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Session } from "next-auth";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import useSWR from "swr";

import { LinkIcon } from "@/components/icons/action";
import { useChatContext } from "@/hooks/use-chat-context";
import { cn, fetcher } from "@/utils";

import AlertPanel from "./alert-panel";
import ButtonToBottom from "./button-to-bottom";
import ChatDisclaimer from "./chat-disclaimer";
import MessagesUsageBanner from "./messages-usage-banner";
import { PreviewAttachment } from "./preview-attachment";
import { PromptForm } from "./prompt-form";
import SuggestedActions from "./suggested-actions";
import { useScrollToBottom } from "../_hooks/use-scroll-to-bottom";
import { extractFilePath } from "../_lib/utils";

import type { UserProfileData } from "@/lib/types";

export interface ChatPanelProps {
  chatId: string;
  input: UseChatHelpers["input"];
  setInput: UseChatHelpers["setInput"];
  stop: () => void;
  append: UseChatHelpers["append"];
  handleSubmit: UseChatHelpers["handleSubmit"];
  attachments: Array<Attachment>;
  setAttachments: Dispatch<SetStateAction<Array<Attachment>>>;
  messages: Array<Message>;
  setMessages: UseChatHelpers["setMessages"];
  status: UseChatHelpers["status"];
  session: Session | null;
  isReadonly: boolean;
  user: UserProfileData | null;
}

const ChatPanel = (props: ChatPanelProps) => {
  const {
    chatId,
    input,
    setInput,
    stop,
    append,
    handleSubmit,
    attachments,
    setAttachments,
    messages,
    setMessages,
    status,
    session,
    isReadonly,
    user,
  } = props;

  const { data: remainingMessages } = useSWR<number | null>(
    user?.id ? "/api/remaining-messages" : null,
    fetcher,
  );

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");

  const [uploadQueue, setUploadQueue] = useState<Array<string>>([]);

  const hasProcessedQueryRef = useRef(false);

  const { setActiveChatId } = useChatContext();

  const { isPremium, username } = user || {};

  useEffect(() => {
    if (searchQuery && !hasProcessedQueryRef.current) {
      hasProcessedQueryRef.current = true;
      append({
        role: "user",
        content: searchQuery,
      });
      handleSubmit();

      window.history.replaceState({}, "", `/aeris/chat/${chatId}`);
      setActiveChatId(chatId);
    }
  }, [
    searchQuery,
    router,
    pathname,
    append,
    handleSubmit,
    setActiveChatId,
    chatId,
  ]);

  const { isAtBottom, scrollToBottom } = useScrollToBottom();

  useEffect(() => {
    if (status === "submitted") {
      scrollToBottom();
    }
  }, [status, scrollToBottom]);

  const [openPayment, setOpenPayment] = useState(false);
  const [upgradeToMoreMessages, setUpgradeToMoreMessages] = useState(false);

  const isChat = pathname.startsWith("/aeris/chat");

  return (
    <>
      <div className="relative z-1 mx-auto mt-auto flex w-full gap-2 px-2 pb-2 md:mt-0 md:mb-auto md:max-w-3xl md:px-4 md:pb-0">
        <ButtonToBottom
          isAtBottom={isAtBottom}
          scrollToBottom={scrollToBottom}
        />
        {!isReadonly ? (
          <div className="relative flex w-full flex-col-reverse md:flex-col">
            <div className="relative rounded-t-xl">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={
                  !isPremium
                    ? { opacity: 0, y: 150, scale: 0.9 }
                    : { opacity: 1, y: 0, scale: 1 }
                }
                transition={{ ease: "easeInOut", duration: 0.5, delay: 0.3 }}
                className={cn("space-y-4", { hidden: !isPremium })}
              >
                {isPremium && (
                  <>
                    {(attachments.length > 0 || uploadQueue.length > 0) && (
                      <div className="flex items-end gap-2 overflow-x-auto pt-3">
                        {attachments.map((attachment, index) => (
                          <PreviewAttachment
                            key={attachment.url}
                            attachment={attachment}
                            isInUpload
                            onRemove={async () => {
                              setAttachments((prevAttachments) =>
                                prevAttachments.filter((_, i) => i !== index),
                              );

                              if (attachment.url) {
                                const filePath = extractFilePath(
                                  attachment.url,
                                );
                                try {
                                  const res = await fetch(
                                    "/api/files/delete-ai",
                                    {
                                      method: "DELETE",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({ filePath }),
                                    },
                                  );
                                  if (!res.ok) {
                                    console.error(
                                      "Error al eliminar el blob",
                                      await res.json(),
                                    );
                                  }
                                } catch (error) {
                                  console.error(
                                    "Error al llamar al endpoint de eliminación",
                                    error,
                                  );
                                }
                              }
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
                            isInUpload
                            isUploading={true}
                          />
                        ))}
                      </div>
                    )}
                    {isChat ? (
                      <MessagesUsageBanner
                        remainingMessages={remainingMessages}
                        onOpenPayment={() => {
                          setOpenPayment(true);
                          setUpgradeToMoreMessages(true);
                        }}
                      />
                    ) : (
                      remainingMessages === 0 && (
                        <MessagesUsageBanner
                          remainingMessages={remainingMessages}
                          onOpenPayment={() => {
                            setOpenPayment(true);
                            setUpgradeToMoreMessages(true);
                          }}
                        />
                      )
                    )}
                    <PromptForm
                      chatId={chatId}
                      status={status}
                      handleSubmit={handleSubmit}
                      stop={stop}
                      input={input}
                      setInput={setInput}
                      attachments={attachments}
                      setAttachments={setAttachments}
                      setMessages={setMessages}
                      uploadQueue={uploadQueue}
                      setUploadQueue={setUploadQueue}
                      isPremium={isPremium || false}
                      hasMessages={messages.length > 0}
                      remainingMessages={remainingMessages}
                    />
                    <ChatDisclaimer />
                  </>
                )}
              </motion.div>
              <AlertPanel
                session={session}
                isPremium={isPremium || false}
                openPayment={openPayment}
                setOpenPayment={setOpenPayment}
                isUpgradeToMoreMessages={upgradeToMoreMessages}
              />
            </div>
            {messages.length === 0 &&
              attachments.length === 0 &&
              uploadQueue.length === 0 && (
                <SuggestedActions
                  isPremium={isPremium || false}
                  setInput={setInput}
                />
              )}
          </div>
        ) : (
          <div className="border-border bg-background relative mb-4 w-full border-t px-4 py-0 pb-16 sm:rounded-xl sm:border sm:py-4">
            <div className="inline-flex w-full items-center justify-center px-2 py-3">
              <p className="text-center text-sm text-balance md:text-base">
                Este chat está en modo lectura, le pertenece al usuario{" "}
                <Link
                  href={`/profiles/${username}`}
                  target="_blank"
                  rel="noopener"
                  className="text-primary inline-flex flex-1 justify-center gap-1 leading-4 font-semibold hover:underline"
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
