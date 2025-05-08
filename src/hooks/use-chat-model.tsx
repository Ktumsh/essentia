"use client";

import { createContext, useContext, useState, ReactNode } from "react";

import { DEFAULT_CHAT_MODEL } from "@/app/(main)/(chat)/_lib/models";

type ChatModelContextType = {
  model: string;
  setModel: (model: string) => void;
  isModelSet: boolean;
  setIsModelSet: (isModelSet: boolean) => void;
};

const ChatModelContext = createContext<ChatModelContextType | undefined>(
  undefined,
);

export const ChatModelProvider = ({ children }: { children: ReactNode }) => {
  const [model, setModel] = useState<string>(DEFAULT_CHAT_MODEL);
  const [isModelSet, setIsModelSet] = useState(false);

  return (
    <ChatModelContext.Provider
      value={{ model, setModel, isModelSet, setIsModelSet }}
    >
      {children}
    </ChatModelContext.Provider>
  );
};

export const useChatModel = (): ChatModelContextType => {
  const context = useContext(ChatModelContext);
  if (!context) {
    throw new Error("useChatModel must be used within a ChatModelProvider");
  }
  return context;
};
