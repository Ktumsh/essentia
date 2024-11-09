"use client";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Message } from "ai";
import Link from "next/link";

import { Separator } from "@/modules/core/components/ui/utils/separator";
import { Session, UserProfileData } from "@/types/session";

import { Message as PreviewMessage } from "../components/ui/message";

interface ChatList {
  id?: string;
  messages: Array<Message>;
  session?: Session;
  isShared: boolean;
  profileData?: UserProfileData | null;
}

const ChatList = ({
  id,
  messages,
  session,
  isShared,
  profileData,
}: ChatList) => {
  if (!messages.length) {
    return null;
  }
  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {!isShared && !session ? (
        <>
          <div className="group relative mb-4 flex items-start md:-ml-12">
            <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-dark">
              <ExclamationTriangleIcon className="text-main dark:text-main-dark" />
            </div>
            <div className="ml-2 flex-1 space-y-2 overflow-hidden md:ml-6">
              <p className="leading-normal text-main-m dark:text-main-dark-m">
                Por favor{" "}
                <Link href="/login" className="underline">
                  inicia sesión
                </Link>{" "}
                o{" "}
                <Link href="/signup" className="underline">
                  regístrate
                </Link>{" "}
                para usar esta característica!
              </p>
            </div>
          </div>
          <Separator className="my-4" />
        </>
      ) : null}
      {messages.map((message, index) => (
        <div key={message.id}>
          <PreviewMessage
            key={`${id}-${index}`}
            role={message.role}
            content={message.content}
            toolInvocations={message.toolInvocations}
            attachments={message.experimental_attachments}
            profileData={profileData}
          />
          {index < messages.length - 1 && messages[index + 1] && (
            <Separator className="my-4" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
