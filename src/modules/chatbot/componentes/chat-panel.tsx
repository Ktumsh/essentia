import { FC } from "react";

import type { AI } from "../chat/actions";

import { useActions, useAIState, useUIState } from "ai/rsc";

import { nanoid } from "nanoid";
import { Button, Tooltip, useDisclosure } from "@nextui-org/react";
import { tooltipStyles } from "@/styles/tooltip-styles";
import ChatShareModal from "./chat-share-modal";
import { shareChat } from "@/app/(main)/essentia-ai/actions";
import PromptForm from "./prompt-form";
import FooterText from "./footer-text";
import ButtonToBottom from "@/modules/core/components/ui/button-to-bottom";
import { UserMessage } from "../stocks/message";
import { ShareIcon } from "@/modules/icons/action";
import { cn } from "@/utils/common";

export interface ChatPanelProps {
  id?: string;
  title?: string;
  input: string;
  setInput: (value: string) => void;
  isAtBottom: boolean;
  scrollToBottom: () => void;
}

const ChatPanel: FC<ChatPanelProps> = ({
  id,
  title,
  input,
  setInput,
  isAtBottom,
  scrollToBottom,
}) => {
  const [aiState] = useAIState();
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const exampleMessages = [
    {
      heading: "Consejos para",
      subheading: "mejorar el bienestar emocional",
      message: `¿Cómo mejorar mi bienestar emocional?`,
    },
    {
      heading: "Ejercicios para",
      subheading: "mejorar el bienestar fisico",
      message: "¿Qué ejercicios debo hacer diariamente?",
    },
    {
      heading: "Consejos para",
      subheading: "una dieta saludable",
      message: `¿Qué consejos me darías para una dieta saludable?`,
    },
    {
      heading: "Cómo mejorar",
      subheading: `la calidad sueño?`,
      message: `¿Cómo puedo mejorar la calidad del sueño?`,
    },
  ];

  return (
    <div className="w-full fixed inset-x-0 bottom-14 md:bottom-0 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px] transition-[padding]">
      <ButtonToBottom isAtBottom={isAtBottom} scrollToBottom={scrollToBottom} />
      <div className="mx-auto max-w-2xl sm:px-4">
        <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
          {messages.length === 0 &&
            exampleMessages.map((example, index) => (
              <Button
                key={index}
                className={cn(
                  "flex-col h-auto gap-0 p-4 items-start text-start cursor-pointer rounded-lg bg-white dark:bg-base-full-dark hover:bg-gray-100 border border-gray-200 dark:border-base-dark text-base-color dark:text-base-color-dark"
                )}
                onClick={async () => {
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    {
                      id: nanoid(),
                      display: <UserMessage>{example.message}</UserMessage>,
                    },
                  ]);

                  const responseMessage = await submitUserMessage(
                    example.message
                  );

                  setMessages((currentMessages) => [
                    ...currentMessages,
                    responseMessage,
                  ]);
                }}
              >
                <div className="text-sm font-semibold">{example.heading}</div>
                <div className="text-sm text-base-color-m dark:text-base-color-dark-m text-wrap">
                  {example.subheading}
                </div>
              </Button>
            ))}
        </div>
        {messages?.length >= 2 ? (
          <div className="flex h-12 items-center justify-center">
            <div className="flex space-x-2">
              {id && title ? (
                <>
                  <Tooltip
                    content="Compartir chat"
                    delay={800}
                    closeDelay={0}
                    classNames={{
                      content: tooltipStyles.content,
                    }}
                  >
                    <Button
                      variant="light"
                      disableRipple
                      radius="sm"
                      className="min-w-fit group flex items-center justify-center size-7 p-0 my-auto mr-2 dark:hover:text-white data-[hover=true]:bg-white dark:data-[hover=true]:bg-base-dark absolute inset-y-0 right-0 gap-1.5 opacity-0 group-hover:opacity-100 group-[.selected]:opacity-100 group-[.active]:opacity-100 transition-opacity duration-150"
                      aria-haspopup="menu"
                      endContent={<ShareIcon className="size-4" />}
                      onPress={onOpen}
                    ></Button>
                  </Tooltip>
                  <ChatShareModal
                    open={isOpen}
                    onOpenChange={onOpenChange}
                    onCopy={() => onOpen()}
                    shareChat={shareChat}
                    chat={{
                      id,
                      title,
                      messages: aiState.messages,
                    }}
                  />
                </>
              ) : null}
            </div>
          </div>
        ) : null}
        <div className="space-y-4 border-t bg-white dark:bg-base-full-dark px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4 border-gray-200 dark:border-base-dark">
          <PromptForm input={input} setInput={setInput} />
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
