"use client";

import equal from "fast-deep-equal";
import { AnimatePresence, motion } from "motion/react";
import { lazy, memo, Suspense, useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import { useCopyToClipboard } from "usehooks-ts";

import { Markdown } from "@/components/markdown";
import { decrementUserChatUsage } from "@/db/querys/chat-querys";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/utils";

import { MessageActions } from "./message-actions";
import { MessageEditor } from "./message-editor";
import { PreviewAttachment } from "./preview-attachment";
import ReasoningMessage from "./reasoning-message";
import ToolMessage from "./tool-message";
import {
  HealthRiskStock,
  MoodTrackStock,
  NutritionPlanStock,
  RoutineStock,
  TaskStock,
} from "./tools";
import { deleteTrailingMessages } from "../actions";
import { Weather } from "./tools/weather";
import { useAttachments } from "../_hooks/use-attachments";
import { useTrackTasks } from "../_hooks/use-track-task";

import type { ChatVote } from "@/db/schema";
import type { UserProfileData } from "@/lib/types";
import type { UseChatHelpers } from "@ai-sdk/react";
import type { UIMessage } from "ai";

const BotAvatar = lazy(() =>
  import("./role-avatar").then((m) => ({ default: m.BotAvatar })),
);
const UserAvatar = lazy(() =>
  import("./role-avatar").then((m) => ({ default: m.UserAvatar })),
);
const EditModal = lazy(() => import("./edit-modal"));

interface MessageProps {
  chatId: string;
  message: UIMessage;
  setMessages: UseChatHelpers["setMessages"];
  vote: ChatVote | undefined;
  isLoading: boolean;
  reload: UseChatHelpers["reload"];
  isReadonly?: boolean;
  requiresScrollPadding: boolean;
  user?: UserProfileData | null;
}

const PurePreviewMessage = ({
  chatId,
  message,
  setMessages,
  vote,
  isLoading,
  reload,
  isReadonly,
  requiresScrollPadding,
  user,
}: MessageProps) => {
  const isMobile = useIsMobile();

  const { id, role, parts, experimental_attachments } = message;

  const { profileImage, username, id: userId } = user || {};

  const userRole = role === "user";

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [, copyToClipboard] = useCopyToClipboard();

  const { imageAttachments, fileAttachments } = useAttachments(
    experimental_attachments,
  );

  useTrackTasks({ parts });

  const textFromParts = useMemo(
    () =>
      parts
        .filter((p) => p.type === "text")
        .map((p) => p.text)
        .join("\n")
        .trim(),
    [parts],
  );

  const handleCopyMessage = useCallback(async () => {
    if (!textFromParts) {
      toast.error("¡No hay texto que copiar!");
      return;
    }
    await copyToClipboard(textFromParts);
    toast.success("¡Texto copiado!");
  }, [textFromParts, copyToClipboard]);

  const handleRetryResponse = useCallback(async () => {
    try {
      await deleteTrailingMessages({ id: message.id });
      if (userId) {
        await decrementUserChatUsage(userId);
        mutate("/api/remaining-messages");
      }
      reload();
    } catch {
      toast.error("¡No se pudo reintentar la respuesta! 😓");
    }
  }, [message.id, userId, reload]);

  if (
    role === "assistant" &&
    parts.some(
      (part) =>
        part.type === "tool-invocation" &&
        part.toolInvocation.state === "result" &&
        part.toolInvocation.result?.error !== undefined,
    )
  ) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.article
        data-testid={`message-${role}`}
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        data-role={role}
        className="group/message mx-auto w-full max-w-3xl px-4"
      >
        <div
          className={cn(
            "relative flex w-full gap-4 group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-[75%]",
            {
              "w-full group-data-[role=user]/message:max-w-full":
                mode === "edit",
              "group-data-[role=user]/message:w-fit": mode !== "edit",
            },
          )}
        >
          {role === "assistant" && <BotAvatar />}
          {userRole && !isMobile && (
            <UserAvatar profileImage={profileImage} username={username} />
          )}
          <div
            className={cn("flex w-full flex-col gap-4", {
              "min-h-96": role === "assistant" && requiresScrollPadding,
            })}
          >
            {(imageAttachments.length > 0 || fileAttachments.length > 0) && (
              <>
                {imageAttachments.length > 0 && (
                  <div
                    data-testid="message-attachments"
                    className={cn("flex flex-row justify-end gap-2 self-end", {
                      "max-w-52 flex-wrap": imageAttachments.length > 3,
                    })}
                  >
                    {imageAttachments.map((att, idx) => (
                      <PreviewAttachment
                        key={att.url}
                        attachment={att}
                        totalAttachments={imageAttachments.length}
                        isFile={false}
                        index={idx}
                      />
                    ))}
                  </div>
                )}
                {fileAttachments.length > 0 && (
                  <div
                    data-testid="message-attachments"
                    className="flex w-full max-w-60 flex-row justify-end gap-2 self-end"
                  >
                    {fileAttachments.map((att, idx) => (
                      <PreviewAttachment
                        key={att.url}
                        attachment={att}
                        totalAttachments={fileAttachments.length}
                        isFile
                        index={idx}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
            {parts.map((part, i) => {
              const { type } = part;
              const key = `msg-${id}-part-${i}`;

              if (type === "reasoning") {
                return (
                  <ReasoningMessage
                    key={key}
                    isLoading={isLoading}
                    reasoning={part.reasoning}
                  />
                );
              }

              if (type === "text" && mode === "view") {
                return (
                  <div
                    key={key}
                    className={cn("flex items-center gap-2", {
                      "items-start justify-end": userRole,
                    })}
                  >
                    <div
                      data-testid="message-content"
                      role={isMobile && userRole ? "button" : undefined}
                      aria-label={
                        isMobile && userRole
                          ? "Presionar y editar mensaje"
                          : undefined
                      }
                      onClick={() => isMobile && userRole && setIsOpen(true)}
                      className={cn("flex flex-col gap-4", {
                        "transition-transform-opacity rounded-xl rounded-tr-xs bg-linear-to-r/shorter from-indigo-500 to-indigo-600 px-3 py-1.5 duration-75 active:scale-[0.97] active:opacity-80 active:duration-150 md:px-4 md:py-2.5 md:transition-none md:active:scale-100 md:active:opacity-100":
                          userRole,
                      })}
                    >
                      <Markdown
                        className={cn(
                          "prose-sm md:prose text-foreground! max-w-full! md:text-[14px]!",
                          userRole && "text-white!",
                        )}
                      >
                        {part.text}
                      </Markdown>
                    </div>
                  </div>
                );
              }

              if (mode === "edit") {
                return (
                  <div
                    key={key}
                    className="flex w-full items-start gap-2 self-end group-data-[role=user]/message:max-w-[75%]"
                  >
                    <div className="hidden size-8 shrink-0 md:block" />
                    <MessageEditor
                      message={message}
                      setMode={setMode}
                      setMessages={setMessages}
                      reload={reload}
                    />
                  </div>
                );
              }

              if (part.type === "tool-invocation") {
                const { toolInvocation } = part;
                const { toolName, toolCallId, state } = toolInvocation;

                if (state === "call") {
                  return (
                    <div
                      key={toolCallId}
                      className={cn({
                        skeleton: ["getWeather", "trackTask"].includes(
                          toolName,
                        ),
                      })}
                    >
                      {toolName === "getWeather" ? (
                        <Weather />
                      ) : toolName === "trackTask" ? (
                        <TaskStock />
                      ) : (
                        <ToolMessage toolName={toolName} />
                      )}
                    </div>
                  );
                }

                if (state === "result") {
                  const { result } = toolInvocation;

                  return (
                    <div key={toolCallId}>
                      {toolName === "getWeather" && (
                        <Weather weatherAtLocation={result} />
                      )}
                      {toolName === "createRoutine" && (
                        <RoutineStock routine={result.routine} />
                      )}
                      {toolName === "createHealthRisk" && (
                        <HealthRiskStock healthRisk={result.healthRisk} />
                      )}
                      {toolName === "createNutritionalPlan" && (
                        <NutritionPlanStock
                          nutritionalPlan={result.nutritionalPlan}
                        />
                      )}
                      {toolName === "createMoodTrack" && (
                        <MoodTrackStock moodTrack={result.moodTrack} />
                      )}
                      {toolName === "createTrackTask" && (
                        <TaskStock task={result.task} isLoading={false} />
                      )}
                    </div>
                  );
                }
              }

              return null;
            })}

            {!isReadonly && (
              <MessageActions
                chatId={chatId}
                message={message}
                vote={vote}
                isLoading={isLoading}
                isReadonly={isReadonly}
                isEditing={mode === "edit"}
                onEdit={() => setMode("edit")}
                onCopy={handleCopyMessage}
                onRetry={handleRetryResponse}
              />
            )}

            <Suspense fallback={null}>
              <EditModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onEdit={() => setMode("edit")}
                onCopy={handleCopyMessage}
              />
            </Suspense>
          </div>
        </div>
      </motion.article>
    </AnimatePresence>
  );
};

export const PreviewMessage = memo(
  PurePreviewMessage,
  (prevProps, nextProps) => {
    if (prevProps.isLoading !== nextProps.isLoading) return false;
    if (prevProps.message.id !== nextProps.message.id) return false;
    if (prevProps.requiresScrollPadding !== nextProps.requiresScrollPadding)
      return false;
    if (!equal(prevProps.message.parts, nextProps.message.parts)) return false;
    if (!equal(prevProps.vote, nextProps.vote)) return false;

    return true;
  },
);
