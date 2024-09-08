import { Separator } from "@/modules/core/components/ui/utils/separator";
import { UIState } from "../chat/actions";
import { Session } from "@/types/session";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";

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
            <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
              <p className="text-base-color-m dark:text-base-color-dark-m leading-normal">
                Por favor{" "}
                <Link href="/login" className="underline">
                  inicia sesión
                </Link>{" "}
                o{" "}
                <Link href="/signup" className="underline">
                  regístrate
                </Link>{" "}
                para guardar y volver a visitar tu historial de chat!
              </p>
            </div>
          </div>
          <Separator className="my-4" />
        </>
      ) : null}
      {messages.map((message, index) => (
        <div key={message.id}>
          {message.display}
          {index < messages.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
