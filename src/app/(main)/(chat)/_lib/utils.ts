import {
  parseISO,
  format,
  isToday,
  isYesterday,
  subWeeks,
  subMonths,
} from "date-fns";
import { es } from "date-fns/locale";

import { cn } from "@/lib/utils";

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

type GroupedChats = {
  today: Chat[];
  yesterday: Chat[];
  lastWeek: Chat[];
  lastMonth: Chat[];
  older: Chat[];
};

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
    classes.push("rounded-lg", "size-16");
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
  }
  return cn(...classes);
};
