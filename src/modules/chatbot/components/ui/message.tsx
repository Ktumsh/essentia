"use client";

import { Message, ToolInvocation } from "ai";
import { motion } from "framer-motion";

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
  message: Message;
  toolInvocations: Array<ToolInvocation> | undefined;
  profileData?: UserProfileData | null;
  isLoading: boolean;
}

const PreviewMessage = ({ message, profileData, isLoading }: MessageProps) => {
  const { id, role, content, toolInvocations, experimental_attachments } =
    message;
  const { profile_image, username } = profileData || {};
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
        <UserAvatar profileImage={profile_image} username={username} />
      )}

      <div
        className={cn(
          role === "assistant"
            ? "group/message ml-2 flex-1 space-y-2 overflow-hidden sm:mr-6 md:ml-4"
            : "ml-4 mr-2 max-w-[70%] space-y-2 overflow-hidden rounded-s-xl rounded-ee-xl bg-white px-5 py-2.5 dark:bg-full-dark",
          toolInvocations?.length && "!mr-0",
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

        {experimental_attachments && (
          <div className="flex flex-row gap-2">
            {experimental_attachments.map((attachment) => (
              <PreviewAttachment key={attachment.url} attachment={attachment} />
            ))}
          </div>
        )}

        <MessageActions
          key={`action-${id}`}
          message={message}
          isLoading={isLoading}
        />
      </div>
    </motion.div>
  );
};

export default PreviewMessage;
