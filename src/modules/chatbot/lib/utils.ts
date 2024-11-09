import { CoreMessage, CoreToolMessage, Message, ToolInvocation } from "ai";
import {
  parseISO,
  format,
  isToday,
  isYesterday,
  isWithinInterval,
  subDays,
} from "date-fns";
import { es } from "date-fns/locale";
import { nanoid } from "nanoid";

import { Chat } from "@/types/chat";

export function getFormattedDate(date: string | null): string {
  const aiDate = date ? parseISO(date) : null;

  if (!aiDate || aiDate < new Date("2024-01-01")) {
    return format(new Date(), "d 'de' MMM',' yyyy", { locale: es });
  } else {
    return format(aiDate, "d 'de' MMMM 'de' yyyy", { locale: es });
  }
}

export function groupChatsByDate(chats: Chat[] | undefined) {
  const todayChats: Chat[] = [];
  const yesterdayChats: Chat[] = [];
  const last7DaysChats: Chat[] = [];
  const last30DaysChats: Chat[] = [];
  const olderChats: { [key: string]: Chat[] } = {};

  chats?.forEach((chat) => {
    const createdAt = new Date(chat.created_at);

    if (isToday(createdAt)) {
      todayChats.push(chat);
    } else if (isYesterday(createdAt)) {
      yesterdayChats.push(chat);
    } else if (
      isWithinInterval(createdAt, {
        start: subDays(new Date(), 7),
        end: new Date(),
      })
    ) {
      last7DaysChats.push(chat);
    } else if (
      isWithinInterval(createdAt, {
        start: subDays(new Date(), 30),
        end: new Date(),
      })
    ) {
      last30DaysChats.push(chat);
    } else {
      const monthYear = format(createdAt, "MMMM yyyy");
      if (!olderChats[monthYear]) {
        olderChats[monthYear] = [];
      }
      olderChats[monthYear].push(chat);
    }
  });

  return {
    todayChats,
    yesterdayChats,
    last7DaysChats,
    last30DaysChats,
    olderChats,
  };
}

function addToolMessageToChat({
  toolMessage,
  messages,
}: {
  toolMessage: CoreToolMessage;
  messages: Array<Message>;
}): Array<Message> {
  return messages.map((message) => {
    if (message.toolInvocations) {
      return {
        ...message,
        toolInvocations: message.toolInvocations.map((toolInvocation) => {
          const toolResult = toolMessage.content?.find(
            (tool) => tool.toolCallId === toolInvocation.toolCallId,
          );

          if (toolResult) {
            return {
              ...toolInvocation,
              state: "result",
              result: toolResult.result,
            };
          }

          return toolInvocation;
        }),
      };
    }

    return message;
  });
}

export function convertToUIMessages(
  messages: Array<CoreMessage>,
): Array<Message> {
  return messages.reduce((chatMessages: Array<Message>, message) => {
    if (message.role === "tool") {
      return addToolMessageToChat({
        toolMessage: message as CoreToolMessage,
        messages: chatMessages,
      });
    }

    let textContent = "";
    const toolInvocations: Array<ToolInvocation> = [];

    if (typeof message.content === "string") {
      textContent = message.content;
    } else if (Array.isArray(message.content)) {
      message.content.forEach((content) => {
        if (content.type === "text") {
          textContent += content.text;
        } else if (content.type === "tool-call") {
          toolInvocations.push({
            state: "call",
            toolCallId: content.toolCallId,
            toolName: content.toolName,
            args: content.args,
          });
        }
      });
    }

    chatMessages.push({
      id: nanoid(),
      role: message.role,
      content: textContent,
      toolInvocations,
    });

    return chatMessages;
  }, []);
}
