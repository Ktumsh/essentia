"use client";

import equal from "fast-deep-equal";
import { motion } from "motion/react";
import { memo, useEffect, useState } from "react";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { BetterTooltip } from "@/components/ui/tooltip";
import { Markdown } from "@/modules/core/components/ui/renderers/markdown";
import { useTasks } from "@/modules/core/hooks/use-task";
import { PencilEditIcon } from "@/modules/icons/action";
import { UserProfileData } from "@/types/session";
import { cn } from "@/utils/common";

import { BotAvatar, UserAvatar } from "./role-avatar";
import {
  ExerciseRoutineStock,
  HealthRiskStock,
  MoodTrackingStock,
  NutritionPlanStock,
} from "../tools";
import EditModal from "./edit-modal";
import { InitialLoading } from "./initial-loading";
import { MessageActions } from "./message-actions";
import { MessageEditor } from "./message-editor";
import { PreviewAttachment } from "./preview-attachment";
import TrackTaskStock from "../tools/track-task-stock";
import { Weather } from "../tools/weather";

import type { ChatVote } from "@/db/schema";
import type { ChatRequestOptions, Message } from "ai";

interface MessageProps {
  chatId: string;
  message: Message;
  vote: ChatVote | undefined;
  user?: UserProfileData | null;
  isReadonly?: boolean;
  isLoading: boolean;
  setMessages: (
    messages: Message[] | ((messages: Message[]) => Message[]),
  ) => void;
  reload: (
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
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

  const { id, role, content, toolInvocations, experimental_attachments } =
    message;
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
    <motion.div
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      data-role={role}
      className="group/message mx-auto w-full max-w-3xl px-4"
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

        <div className="flex w-full flex-col gap-2">
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

          {content && mode === "view" && (
            <div className="flex flex-row items-start gap-2">
              {userRole && !isReadonly && !isMobile && (
                <BetterTooltip content="Editar mensaje">
                  <Button
                    variant="ghost"
                    size="icon"
                    radius="full"
                    className="text-main opacity-0 hover:bg-white group-hover/message:opacity-100 dark:text-main-dark dark:hover:bg-full-dark"
                    onClick={() => {
                      setMode("edit");
                    }}
                  >
                    <PencilEditIcon strokeWidth={1.5} className="!size-5" />
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
                  "rounded-s-xl rounded-ee-xl bg-white px-2.5 py-1.5 duration-75 transition-transform-opacity active:scale-[0.97] active:opacity-80 active:duration-150 dark:bg-full-dark md:px-4 md:py-2.5 md:transition-none md:active:scale-100 md:active:opacity-100":
                    userRole,
                })}
              >
                <Markdown>{content as string}</Markdown>
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
                    ) : toolName === "recommendExercise" ? (
                      <ExerciseRoutineStock props={result.routine} />
                    ) : toolName === "healthRiskAssessment" ? (
                      <HealthRiskStock props={result.riskAssessment} />
                    ) : toolName === "nutritionalAdvice" ? (
                      <NutritionPlanStock props={result.plan} />
                    ) : toolName === "moodTracking" ? (
                      <MoodTrackingStock props={result.moodTracking} />
                    ) : toolName === "trackTask" ? (
                      <TrackTaskStock
                        props={taskProps}
                        isLoading={isTaskLoading}
                      />
                    ) : null}
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
                      <TrackTaskStock />
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
    </motion.div>
  );
};

export const PreviewMessage = memo(
  PurePreviewMessage,
  (prevProps, nextProps) => {
    if (prevProps.isLoading !== nextProps.isLoading) return false;
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

        <span className="text-main-m dark:text-main-dark-m">
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
