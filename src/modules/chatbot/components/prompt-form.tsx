"use client";

import Textarea from "react-textarea-autosize";
import { Button, Tooltip } from "@nextui-org/react";
import { FC, useRef } from "react";
import { tooltipStyles } from "@/styles/tooltip-styles";
import { NewIcon, StopIcon } from "@/modules/icons/action";
import { ArrowUpIcon } from "@/modules/icons/navigation";
import Link from "next/link";
import { ChatRequestOptions } from "ai";
import { toast } from "sonner";

interface PromptFormProps {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  isPremium: boolean | null;
  stop: () => void;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
}

const PromptForm: FC<PromptFormProps> = ({
  input,
  setInput,
  isLoading,
  isPremium,
  stop,
  handleSubmit,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  return (
    <form>
      <div className="relative flex flex-col grow max-h-60 w-full px-8 sm:px-12 bg-white dark:bg-transparent sm:dark:bg-base-dark-50 sm:border border-gray-200 dark:border-base-dark sm:rounded-md overflow-hidden">
        <Tooltip
          content="Nuevo chat"
          delay={800}
          closeDelay={0}
          classNames={{
            content: tooltipStyles.content,
          }}
        >
          <Button
            as={Link}
            href="/essentia-ai"
            isIconOnly
            isDisabled={!isPremium}
            size="sm"
            radius="full"
            variant="light"
            className="absolute left-0 sm:left-4 top-[13px] !size-9 text-base-color dark:text-base-color-dark border border-gray-200 dark:border-base-dark sm:dark:border-base-full-dark dark:data-[hover=true]:bg-base-dark sm:dark:data-[hover=true]:bg-base-full-dark"
          >
            <NewIcon className="size-4" />
          </Button>
        </Tooltip>
        <Textarea
          ref={textareaRef}
          tabIndex={0}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          rows={1}
          name="message"
          value={input}
          autoFocus
          disabled={!isPremium || false}
          placeholder="Escribe tu mensaje."
          onChange={handleInput}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();

              if (isLoading) {
                toast.error(
                  "¡Por favor espera a que el bot responda tu mensaje!"
                );
              } else {
                handleSubmit();
              }
            }
          }}
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none text-base-color dark:text-base-color-dark"
        />
        {isLoading ? (
          <Tooltip
            content="Detener"
            delay={800}
            closeDelay={0}
            classNames={{
              content: tooltipStyles.content,
            }}
          >
            <Button
              isIconOnly
              size="sm"
              radius="full"
              color="danger"
              className="absolute right-0 sm:right-4 top-[13px] !size-9 shadow-md disabled:opacity-60 disabled:pointer-events-none text-white dark:text-base-dark"
              onPress={stop}
            >
              <StopIcon className="size-4" />
            </Button>
          </Tooltip>
        ) : (
          <Tooltip
            content="Enviar mensaje"
            delay={800}
            closeDelay={0}
            classNames={{
              content: tooltipStyles.content,
            }}
          >
            <Button
              isIconOnly
              size="sm"
              radius="full"
              color="danger"
              className="absolute right-0 sm:right-4 top-[13px] !size-9 shadow-md disabled:opacity-60 disabled:pointer-events-none text-white dark:text-base-dark"
              isDisabled={input === "" || !isPremium}
              onPress={() => handleSubmit()}
            >
              <ArrowUpIcon className="size-4" />
            </Button>
          </Tooltip>
        )}
      </div>
    </form>
  );
};

export default PromptForm;
