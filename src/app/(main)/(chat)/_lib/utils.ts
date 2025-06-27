import {
  parseISO,
  format,
  isToday,
  isYesterday,
  subWeeks,
  subMonths,
} from "date-fns";
import { es } from "date-fns/locale";

import { cn } from "@/utils";

import { ChatSDKError, type ErrorCode } from "./errors";

import type {
  HealthRisk,
  MoodTrack,
  NutritionalPlan,
  Routine,
} from "./tool-schemas";
import type { Chat, ChatMessage } from "@/db/schema";
import type {
  Attachment,
  CoreAssistantMessage,
  CoreToolMessage,
  UIMessage,
} from "ai";

export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getFormattedDate(date: string | null): string {
  const aiDate = date ? parseISO(date) : null;

  if (!aiDate || aiDate < new Date("2024-01-01")) {
    return format(new Date(), "d 'de' MMM',' yyyy", { locale: es });
  } else {
    return format(aiDate, "d 'de' MMMM 'de' yyyy", { locale: es });
  }
}

export async function fetchWithErrorHandlers(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  try {
    const response = await fetch(input, init);

    if (!response.ok) {
      const { code, cause } = await response.json();
      throw new ChatSDKError(code as ErrorCode, cause);
    }

    return response;
  } catch (error: unknown) {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      throw new ChatSDKError("offline:chat");
    }

    throw error;
  }
}

const PAGE_SIZE = 20;

type GroupedChats = {
  today: Chat[];
  yesterday: Chat[];
  lastWeek: Chat[];
  lastMonth: Chat[];
  older: Chat[];
};

export interface ChatHistory {
  chats: Array<Chat>;
  hasMore: boolean;
}

export function groupChatsByDate(chats: Chat[]): GroupedChats {
  const now = new Date();
  const oneWeekAgo = subWeeks(now, 1);
  const oneMonthAgo = subMonths(now, 1);

  return chats.reduce(
    (groups, chat) => {
      const chatDate = new Date(chat.createdAt);

      if (isToday(chatDate)) {
        groups.today.push(chat);
      } else if (isYesterday(chatDate)) {
        groups.yesterday.push(chat);
      } else if (chatDate > oneWeekAgo) {
        groups.lastWeek.push(chat);
      } else if (chatDate > oneMonthAgo) {
        groups.lastMonth.push(chat);
      } else {
        groups.older.push(chat);
      }

      return groups;
    },
    {
      today: [],
      yesterday: [],
      lastWeek: [],
      lastMonth: [],
      older: [],
    } as GroupedChats,
  );
}

export function getChatHistoryPaginationKey(
  pageIndex: number,
  previousPageData: ChatHistory,
) {
  if (previousPageData && previousPageData.hasMore === false) {
    return null;
  }

  if (pageIndex === 0) return `/api/history?limit=${PAGE_SIZE}`;

  const firstChatFromPage = previousPageData.chats.at(-1);

  if (!firstChatFromPage) return null;

  return `/api/history?ending_before=${firstChatFromPage.id}&limit=${PAGE_SIZE}`;
}

type ResponseMessageWithoutId = CoreToolMessage | CoreAssistantMessage;
type ResponseMessage = ResponseMessageWithoutId & { id: string };

export function sanitizeResponseMessages({
  messages,
  reasoning,
}: {
  messages: Array<ResponseMessage>;
  reasoning: string | undefined;
}) {
  const toolResultIds: Array<string> = [];

  for (const message of messages) {
    if (message.role === "tool") {
      for (const content of message.content) {
        if (content.type === "tool-result") {
          toolResultIds.push(content.toolCallId);
        }
      }
    }
  }

  const messagesBySanitizedContent = messages.map((message) => {
    if (message.role !== "assistant") return message;

    if (typeof message.content === "string") return message;

    const sanitizedContent = message.content.filter((content) =>
      content.type === "tool-call"
        ? toolResultIds.includes(content.toolCallId)
        : content.type === "text"
          ? content.text.length > 0
          : true,
    );

    if (reasoning) {
      // @ts-expect-error: reasoning message parts in sdk is wip
      sanitizedContent.push({ type: "reasoning", reasoning });
    }

    return {
      ...message,
      content: sanitizedContent,
    };
  });

  return messagesBySanitizedContent.filter(
    (message) => message.content.length > 0,
  );
}

export function convertToUIMessages(
  messages: Array<ChatMessage>,
): Array<UIMessage> {
  return messages.map((message) => {
    const typedParts = message.parts as UIMessage["parts"];
    return {
      id: message.id,
      parts: typedParts,
      role: message.role as UIMessage["role"],
      // Note: content will soon be deprecated in @ai-sdk/react
      content: typedParts[0]?.type === "text" ? typedParts[0].text : "",
      createdAt: message.createdAt,
      experimental_attachments:
        (message.attachments as Array<Attachment>) ?? [],
    };
  });
}

export function getMostRecentUserMessage(messages: Array<UIMessage>) {
  const userMessages = messages.filter((message) => message.role === "user");
  return userMessages.at(-1);
}

export function getTrailingMessageId({
  messages,
}: {
  messages: Array<ResponseMessage>;
}): string | null {
  const trailingMessage = messages.at(-1);

  if (!trailingMessage) return null;

  return trailingMessage.id;
}

export const extractFilePath = (url: string): string => {
  try {
    const { pathname } = new URL(url);
    return pathname.startsWith("/") ? pathname.slice(1) : pathname;
  } catch {
    return url;
  }
};

export const getContainerAttachmentClasses = (
  total: number,
  index: number,
  isInUpload: boolean,
  isFile: boolean,
) => {
  const classes = [
    "group/preview",
    "relative",
    "bg-background",
    "flex",
    "cursor-pointer",
    "flex-col",
    "items-center",
    "justify-center",
    "gap-2",
    "rounded-xl",
    "rounded-br-xs",
  ];

  if (isInUpload) {
    classes.push("rounded-lg");
  } else {
    if (total === 1) {
      classes.push("max-h-96", "max-w-64");
    }
    if (total > 1) {
      classes.push("size-24", "sm:size-32");
      if (index === 0) classes.push("rounded-r-md");
      else classes.push("rounded-md");
      if (index === total - 1) classes.push("rounded-tr-xl", "rounded-br-xs");
    }
    if (total > 3) {
      classes.push("size-16!");
      if (index === 0) classes.push("rounded-r-sm", "rounded-bl-sm");
      else classes.push("rounded-sm");
      if (index === total - 1) classes.push("rounded-tr-sm", "rounded-br-xs");
      if (index === 2) classes.push("rounded-tr-xl");
      if (index === total - 3) classes.push("rounded-bl-xl");
    }
    if (isFile) {
      classes.push("rounded-xl", "h-14!", "w-full!", "border", "min-w-60");
      return cn(...classes);
    }
    if (total === 4) {
      classes.push("size-24!");
      if (index === 1) classes.push("rounded-tr-xl", "rounded-bl-sm");
      if (index === 2) classes.push("rounded-tr-sm", "rounded-bl-xl");
    }
  }
  return cn(...classes);
};

export const getImageAttachmentClasses = (
  total: number,
  index: number,
  isInUpload: boolean,
) => {
  const classes = [
    "animate-fade-in",
    "size-full",
    "rounded-xl",
    "rounded-br-xs",
  ];
  if (isInUpload) {
    classes.push("object-cover", "rounded-lg");
  } else {
    classes.push("object-contain");
    if (total > 1) {
      classes.push("size-24", "object-cover", "sm:size-32");
      if (index === 0) classes.push("rounded-r-md");
      else classes.push("rounded-md");
      if (index === total - 1) classes.push("rounded-tr-xl", "rounded-br-xs");
    }
    if (total > 3) {
      classes.push("size-16!");
      if (index === 0) classes.push("rounded-r-sm", "rounded-bl-sm");
      else classes.push("rounded-sm");
      if (index === total - 1) classes.push("rounded-tr-sm", "rounded-br-xs");
      if (index === 2) classes.push("rounded-tr-xl");
      if (index === total - 3) classes.push("rounded-bl-xl");
    }
    if (total === 4) {
      classes.push("size-24!");
      if (index === 1) classes.push("rounded-tr-xl", "rounded-bl-sm");
      if (index === 2) classes.push("rounded-tr-sm", "rounded-bl-xl");
    }
  }
  return cn(...classes);
};

export const getRiskColorByPercentage = (percentage: number) => {
  if (percentage < 18.5) return "text-blue-500";
  if (percentage < 24.9) return "text-green-500";
  if (percentage < 29.9) return "text-yellow-500";
  if (percentage < 34.9) return "text-orange-500";
  if (percentage < 39.9) return "text-red-500";
  return "text-red-700";
};

export const getRiskBgColor = (level: string) => {
  switch (level.toLowerCase()) {
    case "bajo":
      return "bg-green-500";
    case "moderado":
      return "bg-yellow-500";
    case "alto":
      return "bg-orange-500";
    case "muy alto":
      return "bg-red-500";
    default:
      return "bg-blue-500";
  }
};

export const getRiskColor = (level: string) => {
  switch (level.toLowerCase()) {
    case "bajo":
      return "text-green-500";
    case "moderado":
      return "text-amber-500";
    case "alto":
      return "text-orange-500";
    case "muy alto":
      return "text-red-500";
    default:
      return "text-blue-500";
  }
};

export const getRiskLevelBgColor = (level: string) => {
  switch (level.toLowerCase()) {
    case "bajo":
      return "bg-green-500";
    case "moderado":
      return "bg-amber-500";
    case "alto":
      return "bg-orange-500";
    case "muy alto":
      return "bg-red-500";
    default:
      return "bg-blue-500";
  }
};

export const getRiskLevelBgColorOpacity = (level: string) => {
  switch (level.toLowerCase()) {
    case "bajo":
      return "bg-green-500/20";
    case "moderado":
      return "bg-amber-500/20";
    case "alto":
      return "bg-orange-500/20";
    case "muy alto":
      return "bg-red-500/20";
    default:
      return "bg-blue-500/20";
  }
};

export const getRiskLevelBadgeColor = (level: string) => {
  switch (level.toLowerCase()) {
    case "bajo":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "moderado":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
    case "alto":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
    case "muy alto":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
  }
};

export const getActivityColor = (index: number) => {
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-teal-500",
    "bg-indigo-500",
  ];
  return colors[index % colors.length];
};

export const getActivityTextColor = (index: number) => {
  const colors = [
    "text-blue-500",
    "text-purple-500",
    "text-green-500",
    "text-amber-500",
    "text-rose-500",
    "text-teal-500",
    "text-indigo-500",
  ];
  return colors[index % colors.length];
};

export const getEmojiForRemaining = (count: number): string => {
  if (count >= 8) return "😊";
  if (count >= 5) return "🫡";
  if (count >= 3) return "😶";
  if (count >= 1) return "😰";
  return "😔";
};

export type ResultType = {
  routine?: Routine;
  healthRisk?: HealthRisk;
  nutritionalPlan?: NutritionalPlan;
  moodTrack?: MoodTrack;
};

export function getResultTitle(toolName: string, result: ResultType): string {
  switch (toolName) {
    case "createRoutine":
      return result.routine?.title ?? result.routine?.goal ?? "";
    case "createHealthRisk":
      return (
        result.healthRisk?.generalRiskLevel ?? "Evaluación de Riesgos de Salud"
      );
    case "createNutritionalPlan":
      return result.nutritionalPlan?.title ?? "Plan Alimenticio Personalizado";
    case "createMoodTrack":
      return result.moodTrack?.title ?? "Actividades de Bienestar";
    default:
      return "";
  }
}
