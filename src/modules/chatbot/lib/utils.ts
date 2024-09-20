import { Chat } from "@/types/chat";
import {
  parseISO,
  format,
  isToday,
  isYesterday,
  isWithinInterval,
  subDays,
} from "date-fns";
import { es } from "date-fns/locale";

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
