"use client";

import { UseChatHelpers } from "@ai-sdk/react";
import equal from "fast-deep-equal";
import { motion } from "motion/react";
import { memo, useEffect, useState } from "react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";

import { Markdown } from "@/components/markdown";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTasks } from "@/hooks/use-task";
import { cn } from "@/lib/utils";
import { UserProfileData } from "@/types/auth";

import EditModal from "./edit-modal";
import { InitialLoading } from "./initial-loading";
import { MessageActions } from "./message-actions";
import { MessageEditor } from "./message-editor";
import { MessageReasoning } from "./message-reasoning";
import { PreviewAttachment } from "./preview-attachment";
import { BotAvatar, UserAvatar } from "./role-avatar";
import {
  HealthRiskStock,
  MoodTrackStock,
  NutritionPlanStock,
  RoutineStock,
  TaskStock,
} from "./tools";
import { deleteTrailingMessages } from "../actions";
import { Weather } from "./tools/weather";

import type { ChatVote } from "@/db/schema";
import type { UIMessage } from "ai";

interface MessageProps {
  chatId: string;
  message: UIMessage;
  vote: ChatVote | undefined;
  user?: UserProfileData | null;
  isReadonly?: boolean;
  isLoading: boolean;
  setMessages: UseChatHelpers["setMessages"];
  reload: UseChatHelpers["reload"];
}

const PurePreviewMessage = ({
  chatId,
  message,
  vote,
  user,
  isReadonly,
  isLoading,
  setMessages,
  reload,
}: MessageProps) => {
  const isMobile = useIsMobile();

  const { id, role, parts, experimental_attachments } = message;

  const { profileImage, username } = user || {};

  const userRole = role === "user";

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [, copyToClipboard] = useCopyToClipboard();

  const { tasks, setTasks, isLoading: isTaskLoading } = useTasks();

  useEffect(() => {
    const toolInvocations = parts
      .filter((part) => part.type === "tool-invocation")
      .map((part) => part.toolInvocation);

    toolInvocations.forEach((toolInvocation) => {
      if (
        toolInvocation.state === "result" &&
        toolInvocation.toolName === "trackTask" &&
        toolInvocation.result?.task
      ) {
        setTasks((currentTasks) => {
          if (!currentTasks) return [];
          return currentTasks.map((t) =>
            t.id === toolInvocation.result.task.id
              ? toolInvocation.result.task
              : t,
          );
        });
      }
    });
  }, [setTasks, parts]);

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

  const imageAttachments = experimental_attachments?.filter(
    (attachment) => !attachment.contentType?.startsWith("application"),
  );
  const fileAttachments = experimental_attachments?.filter((attachment) =>
    attachment.contentType?.startsWith("application"),
  );

  const handleCopyMessage = async () => {
    const textFromParts = message.parts
      ?.filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("\n")
      .trim();

    if (!textFromParts) {
      toast.error("¡No hay texto que copiar!");
      return;
    }

    await copyToClipboard(textFromParts);
    toast.success("¡Texto copiado!");
  };

  const handleRetryResponse = async () => {
    await deleteTrailingMessages({
      id: message.id,
    });
    reload();
  };

  return (
    <motion.article
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      data-role={role}
      className="group/message mx-auto w-full max-w-3xl px-4"
    >
      <div
        className={cn(
          "relative flex w-full gap-4 group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-[75%]",
          {
            "w-full group-data-[role=user]/message:max-w-full": mode === "edit",
            "group-data-[role=user]/message:w-fit": mode !== "edit",
          },
        )}
      >
        {role === "assistant" && <BotAvatar />}

        {userRole && !isMobile && (
          <UserAvatar profileImage={profileImage} username={username} />
        )}

        <div className="flex w-full flex-col gap-2">
          {experimental_attachments && experimental_attachments.length > 0 && (
            <>
              {imageAttachments && imageAttachments.length > 0 && (
                <div
                  data-testid="message-attachments-images"
                  className={cn("flex flex-row justify-end gap-2 self-end", {
                    "max-w-52 flex-wrap": imageAttachments.length > 3,
                  })}
                >
                  {imageAttachments.map((attachment, index) => (
                    <PreviewAttachment
                      key={attachment.url}
                      attachment={attachment}
                      totalAttachments={imageAttachments.length}
                      isFile={false}
                      index={index}
                    />
                  ))}
                </div>
              )}
              {fileAttachments && fileAttachments.length > 0 && (
                <div
                  data-testid="message-attachments-files"
                  className="flex w-full max-w-60 flex-row justify-end gap-2 self-end"
                >
                  {fileAttachments.map((attachment, index) => (
                    <PreviewAttachment
                      key={attachment.url}
                      attachment={attachment}
                      totalAttachments={fileAttachments.length}
                      isFile={true}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {parts?.map((part, index) => {
            const { type } = part;
            const key = `message-${id}-part-${index}`;

            if (type === "reasoning") {
              return (
                <MessageReasoning
                  key={key}
                  isLoading={isLoading}
                  reasoning={part.reasoning}
                />
              );
            }

            if (type === "text") {
              if (mode === "view") {
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
                          "prose-sm md:prose md:text-[14px]!",
                          userRole && "text-white!",
                        )}
                      >
                        {part.text}
                      </Markdown>
                    </div>
                  </div>
                );
              }
            }

            if (mode === "edit") {
              return (
                <div
                  key={key}
                  className="flex w-full flex-row items-start gap-2 self-end group-data-[role=user]/message:max-w-[75%]"
                >
                  <div className="hidden size-8 shrink-0 md:block" />
                  <MessageEditor
                    key={id}
                    message={message}
                    setMode={setMode}
                    setMessages={setMessages}
                    reload={reload}
                  />
                </div>
              );
            }

            if (type === "tool-invocation") {
              const { toolInvocation } = part;
              const { toolName, toolCallId, state } = toolInvocation;

              if (state === "call") {
                return (
                  <div
                    key={toolCallId}
                    className={cn({
                      skeleton: ["getWeather", "trackTask"].includes(toolName),
                    })}
                  >
                    {toolName === "getWeather" ? (
                      <Weather />
                    ) : toolName === "trackTask" ? (
                      <TaskStock />
                    ) : (
                      <InitialLoading />
                    )}
                  </div>
                );
              }

              if (state === "result") {
                const { result } = toolInvocation;

                const taskProps = tasks.find((t) => t.id === result.id);

                return (
                  <div key={toolCallId}>
                    {toolName === "getWeather" ? (
                      <Weather weatherAtLocation={result} />
                    ) : toolName === "createRoutine" ? (
                      <RoutineStock {...result.routine} />
                    ) : toolName === "createHealthRisk" ? (
                      <HealthRiskStock {...result.healthRisk} />
                    ) : toolName === "createNutritionalPlan" ? (
                      <NutritionPlanStock {...result.nutritionalPlan} />
                    ) : toolName === "createMoodTrack" ? (
                      <MoodTrackStock {...result.moodTrack} />
                    ) : toolName === "createTrackTask" ? (
                      <TaskStock task={taskProps} isLoading={isTaskLoading} />
                    ) : (
                      <pre>{JSON.stringify(result, null, 2)}</pre>
                    )}
                  </div>
                );
              }
            }
          })}

          {!isReadonly && (
            <MessageActions
              key={`action-${id}`}
              chatId={chatId}
              message={message}
              vote={vote}
              isLoading={isLoading}
              isReadonly={isReadonly}
              isEditing={mode === "edit"}
              onEdit={() => {
                setMode("edit");
              }}
              onCopy={handleCopyMessage}
              onRetry={handleRetryResponse}
            />
          )}

          <EditModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onEdit={() => setMode("edit")}
            onCopy={handleCopyMessage}
          />
        </div>
      </div>
    </motion.article>
  );
};

export const PreviewMessage = memo(
  PurePreviewMessage,
  (prevProps, nextProps) => {
    if (prevProps.isLoading !== nextProps.isLoading) return false;
    if (prevProps.message.id !== nextProps.message.id) return false;
    if (!equal(prevProps.message.parts, nextProps.message.parts)) return false;
    if (!equal(prevProps.vote, nextProps.vote)) return false;
    return true;
  },
);

export const ThinkingMessage = () => {
  const role = "assistant";

  const shimmerVariants = {
    initial: {
      opacity: 0.5,
    },
    animate: {
      opacity: 1,
    },
  };

  return (
    <motion.div
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
      data-role={role}
      className="group/message relative mx-auto flex w-full max-w-3xl items-start px-4"
    >
      <div
        className={cn(
          "flex w-full gap-4 rounded-xl group-data-[role=user]/message:ml-auto group-data-[role=user]/message:w-fit group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:px-3 group-data-[role=user]/message:py-2",
          {
            "group-data-[role=user]/message:bg-muted": true,
          },
        )}
      >
        <BotAvatar />
        <span className="text-muted-foreground text-sm md:text-base">
          {"Mmm...".split("").map((character, index) => (
            <motion.span
              key={index}
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              transition={{
                duration: 1,
                ease: "easeInOut",
                delay: index * 0.15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              {character === " " ? "\u00A0" : character}
            </motion.span>
          ))}
        </span>
      </div>
    </motion.div>
  );
};
