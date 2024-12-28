"use client";

import { useEffect, useState } from "react";

import { getChatById } from "@/db/querys/chat-querys";

const useChatName = (chatId: string | null) => {
  const [chatName, setChatName] = useState<string | null>(null);

  useEffect(() => {
    const fetchChatName = async () => {
      if (!chatId) {
        return setChatName(null);
      }
      try {
        const chat = await getChatById({ id: chatId });
        setChatName(chat.title);
      } catch {
        setChatName("Chat desconocido");
      }
    };

    if (chatId) {
      fetchChatName();
    }
  }, [chatId]);

  return chatName;
};

export default useChatName;
