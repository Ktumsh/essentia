"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

import { VisibilityType } from "@/modules/chatbot/components/visibility-selector";

interface ChatContextProps {
  isReadonly: boolean;
  selectedVisibilityType: VisibilityType;
  setChatData: (data: {
    isReadonly: boolean;
    selectedVisibilityType: VisibilityType;
  }) => void;
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const [isReadonly, setIsReadonly] = useState(false);
  const [selectedVisibilityType, setSelectedVisibilityType] =
    useState<VisibilityType>("private");

  const setChatData = (data: {
    isReadonly: boolean;
    selectedVisibilityType: VisibilityType;
  }) => {
    setIsReadonly(data.isReadonly);
    setSelectedVisibilityType(data.selectedVisibilityType);
  };

  return (
    <ChatContext.Provider
      value={{
        isReadonly,
        selectedVisibilityType,
        setChatData,
        activeChatId,
        setActiveChatId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
