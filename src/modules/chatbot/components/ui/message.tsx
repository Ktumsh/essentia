"use client";

import { Attachment, ToolInvocation } from "ai";
import { motion } from "framer-motion";
import { ReactNode } from "react";

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


interface MessageProps {
  role: string;
  content: string | ReactNode;
  toolInvocations: Array<ToolInvocation> | undefined;
  attachments?: Array<Attachment>;
  profileData?: UserProfileData | null;
}

export const Message = ({
  role,
  content,
  toolInvocations,
  attachments,
  profileData,
}: MessageProps) => {
  const { profile_image, username } = profileData || {};
  return (
    <motion.div
      className={
        role === "assistant"
          ? "group relative flex items-start md:-ml-10"
          : "group relative flex items-start md:-mr-8 self-end flex-row-reverse"
      }
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-lg bg-white dark:bg-base-dark border border-gray-200 dark:border-white/10 shadow-md overflow-hidden">
        {role === "assistant" ? (
          <BotAvatar />
        ) : (
          <UserAvatar profileImage={profile_image} username={username} />
        )}
      </div>

      <div
        className={cn(
          role === "assistant"
            ? "group/message flex-1 ml-2 md:ml-4 sm:mr-6 space-y-2 overflow-hidden"
            : "ml-4 mr-2 space-y-2 max-w-[70%] rounded-ee-xl rounded-s-xl px-5 py-2.5 bg-white dark:bg-base-full-dark overflow-hidden",
          toolInvocations?.length && "!mr-0"
        )}
      >
        {content && typeof content === "string" && (
          <Markdown>{content}</Markdown>
        )}

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

        {attachments && (
          <div className="flex flex-row gap-2">
            {attachments.map((attachment) => (
              <PreviewAttachment key={attachment.url} attachment={attachment} />
            ))}
          </div>
        )}

        {role === "assistant" && !toolInvocations?.length && (
          <MessageActions content={content as string} />
        )}
      </div>
    </motion.div>
  );
};
