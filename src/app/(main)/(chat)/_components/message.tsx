"use client";

import { UseChatHelpers } from "@ai-sdk/react";
import equal from "fast-deep-equal";
import { PencilLine } from "lucide-react";
import { motion } from "motion/react";
import { memo, useEffect, useState } from "react";

import { Button } from "@/components/kit/button";
import { BetterTooltip } from "@/components/kit/tooltip";
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
import { Weather } from "./tools/weather";

import type { ChatVote } from "@/db/schema";
import type { Message } from "ai";

interface MessageProps {
  chatId: string;
  message: Message;
  vote: ChatVote | undefined;
  user?: UserProfileData | null;
  isReadonly?: boolean;
  isLoading: boolean;
  setMessages: UseChatHelpers["setMessages"];
  reload: UseChatHelpers["reload"];
  isLastNonUser?: boolean;
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
  isLastNonUser,
}: MessageProps) => {
  const isMobile = useIsMobile();

  const {
    id,
    role,
    content,
    toolInvocations,
    reasoning,
    experimental_attachments,
  } = message;

  const { profileImage, username } = user || {};

  const userRole = role === "user";

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"view" | "edit">("view");

  const { tasks, setTasks, isLoading: isTaskLoading } = useTasks();

  useEffect(() => {
    if (!toolInvocations) return;

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
  }, [setTasks, toolInvocations]);

  if (
    role === "assistant" &&
    toolInvocations &&
    toolInvocations.some(
      (invocation) =>
        invocation.state === "result" && invocation.result?.error !== undefined,
    )
  ) {
    return null;
  }

  return (
    <motion.article
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      data-role={role}
      className={cn("group/message mx-auto w-full max-w-3xl px-4", {
        "min-h-[calc(100dvh-312px)] md:min-h-[calc(100dvh-348px)]":
          isLastNonUser,
      })}
    >
      <div
        className={cn(
          "flex w-full gap-4 group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-[75%]",
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

        <div className="flex w-full flex-col gap-4">
          {experimental_attachments && (
            <div className="flex flex-row gap-2">
              {experimental_attachments.map((attachment) => (
                <PreviewAttachment
                  key={attachment.url}
                  attachment={attachment}
                />
              ))}
            </div>
          )}

          {reasoning && (
            <MessageReasoning isLoading={isLoading} reasoning={reasoning} />
          )}

          {(message.content || reasoning) && mode === "view" && (
            <div className="flex flex-row items-start gap-2">
              {userRole && !isReadonly && !isMobile && (
                <BetterTooltip content="Editar mensaje">
                  <Button
                    variant="ghost"
                    size="icon"
                    radius="full"
                    className="text-foreground/80 hover:bg-accent hover:text-foreground shrink-0 opacity-0 group-hover/message:opacity-100"
                    onClick={() => {
                      setMode("edit");
                    }}
                  >
                    <PencilLine />
                  </Button>
                </BetterTooltip>
              )}

              <div
                role={isMobile && userRole ? "button" : undefined}
                aria-label={
                  isMobile && userRole
                    ? "Presionar y editar mensaje"
                    : undefined
                }
                onClick={() => isMobile && userRole && setIsOpen(true)}
                className={cn("flex flex-col gap-4", {
                  "transition-transform-opacity rounded-s-xl rounded-ee-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-2.5 py-1.5 duration-75 active:scale-[0.97] active:opacity-80 active:duration-150 md:px-4 md:py-2.5 md:transition-none md:active:scale-100 md:active:opacity-100":
                    userRole,
                })}
              >
                <Markdown
                  className={cn(
                    "prose-sm md:prose md:text-base!",
                    userRole && "text-white!",
                  )}
                >
                  {content as string}
                </Markdown>
              </div>
            </div>
          )}

          {content && mode === "edit" && (
            <div className="flex flex-row items-start gap-2">
              <div className="hidden size-8 shrink-0 md:block" />
              <MessageEditor
                key={id}
                message={message}
                setMode={setMode}
                setMessages={setMessages}
                reload={reload}
              />
            </div>
          )}

          <EditModal isOpen={isOpen} setIsOpen={setIsOpen} setMode={setMode} />

          {toolInvocations &&
            toolInvocations.map((toolInvocation) => {
              const { toolName, toolCallId, state } = toolInvocation;

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
              } else {
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
            })}
          {!isReadonly && (
            <MessageActions
              key={`action-${id}`}
              chatId={chatId}
              message={message}
              vote={vote}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </motion.article>
  );
};

export const PreviewMessage = memo(
  PurePreviewMessage,
  (prevProps, nextProps) => {
    if (prevProps.isLoading !== nextProps.isLoading) return false;
    if (prevProps.message.reasoning !== nextProps.message.reasoning)
      return false;
    if (prevProps.message.content !== nextProps.message.content) return false;
    if (
      !equal(
        prevProps.message.toolInvocations,
        nextProps.message.toolInvocations,
      )
    )
      return false;
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
          {"Pensando".split("").map((character, index) => (
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
