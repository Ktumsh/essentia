"use client";

import { Message } from "ai";
import equal from "fast-deep-equal";
import { motion } from "framer-motion";
import { memo } from "react";

import { Markdown } from "@/modules/core/components/ui/renderers/markdown";
import { UserProfileData } from "@/types/session";
import { cn } from "@/utils/common";

import { BotAvatar, UserAvatar } from "./role-avatar";
import {
  ExerciseRoutineStock,
  HealthRiskStock,
  MoodTrackingStock,
  NutritionPlanStock,
} from "../tools";
import { InitialLoading } from "./initial-loading";
import MessageActions from "./message-actions";
import { PreviewAttachment } from "./preview-attachment";
import { Routine } from "../tools/excercise-routine-stock";
import { RiskAssessment } from "../tools/health-risk-stock";
import { MoodTracking } from "../tools/mood-tracking-stock";
import { Plan } from "../tools/nutrition-plan-stock";

import type { ChatVote } from "@/db/schema";

interface MessageProps {
  chatId: string;
  message: Message;
  vote: ChatVote | undefined;
  user?: UserProfileData | null;
  isReadonly?: boolean;
  isLoading: boolean;
}

const PurePreviewMessage = ({
  chatId,
  message,
  vote,
  user,
  isReadonly,
  isLoading,
}: MessageProps) => {
  const { id, role, content, toolInvocations, experimental_attachments } =
    message;
  const { profileImage, username } = user || {};
  return (
    <motion.div
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      data-role={role}
      className={cn(
        "mx-auto w-full max-w-3xl px-4",
        role === "assistant"
          ? "group relative flex items-start"
          : "group relative flex flex-row-reverse items-start self-end",
      )}
    >
      {role === "assistant" ? (
        <BotAvatar />
      ) : (
        <UserAvatar profileImage={profileImage} username={username} />
      )}

      <div
        className={cn(
          role === "assistant"
            ? "group/message ml-2 flex-1 space-y-2 overflow-hidden sm:mr-6 md:ml-4"
            : "ml-4 mr-2 max-w-[72%] space-y-2 overflow-hidden rounded-s-xl rounded-ee-xl bg-white px-2.5 py-1.5 dark:bg-full-dark md:px-4 md:py-2.5",
          toolInvocations?.length && "!mr-0",
        )}
      >
        {experimental_attachments && (
          <div className="flex flex-row gap-2">
            {experimental_attachments.map((attachment) => (
              <PreviewAttachment key={attachment.url} attachment={attachment} />
            ))}
          </div>
        )}

        <Markdown prose="prose-sm text-[15px] md:prose">
          {content as string}
        </Markdown>

        {toolInvocations &&
          toolInvocations.map((toolInvocation) => {
            const { toolName, toolCallId, state } = toolInvocation;

            if (state === "result") {
              const { result } = toolInvocation;

              return (
                <div key={toolCallId}>
                  {toolName === "recommendExercise" ? (
                    <ExerciseRoutineStock props={result.routine as Routine} />
                  ) : toolName === "healthRiskAssessment" ? (
                    <HealthRiskStock
                      props={result.riskAssessment as RiskAssessment}
                    />
                  ) : toolName === "nutritionalAdvice" ? (
                    <NutritionPlanStock props={result.plan as Plan} />
                  ) : toolName === "moodTracking" ? (
                    <MoodTrackingStock
                      props={result.moodTracking as MoodTracking}
                    />
                  ) : null}
                </div>
              );
            } else {
              return <InitialLoading key={toolCallId} />;
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
    </motion.div>
  );
};

export const PreviewMessage = memo(
  PurePreviewMessage,
  (prevProps, nextProps) => {
    if (prevProps.isLoading !== nextProps.isLoading) return false;
    if (prevProps.isLoading && nextProps.isLoading) return false;
    if (prevProps.message.content && nextProps.message.content) return false;
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
