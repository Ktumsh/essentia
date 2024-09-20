"use client";

import Link from "next/link";
import { Separator } from "@/modules/core/components/ui/utils/separator";
import { UIState } from "../chat/actions";
import { Session } from "@/types/session";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { SpinnerMessage } from "./stocks/message";
import { InitialLoading } from "./stocks/initial-loading";

export interface ChatList {
  messages: UIState;
  session?: Session;
  isShared: boolean;
}

const ChatList = ({ messages, session, isShared }: ChatList) => {
  if (!messages.length) {
    return null;
  }
  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {!isShared && !session ? (
        <>
          <div className="group relative mb-4 flex items-start md:-ml-12">
            <div className="bg-white dark:bg-base-dark flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border border-gray-200 dark:border-white/10 shadow-sm">
              <ExclamationTriangleIcon className="text-base-color dark:text-base-color-dark" />
            </div>
            <div className="ml-2 md:ml-6 flex-1 space-y-2 overflow-hidden">
              <p className="text-base-color-m dark:text-base-color-dark-m leading-normal">
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
        <motion.div
          key={message.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          {message.display}
          {index < messages.length - 1 && messages[index + 1].display && (
            <Separator className="my-4" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ChatList;
