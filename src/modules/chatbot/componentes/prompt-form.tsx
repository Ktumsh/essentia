import Textarea from "react-textarea-autosize";
import { Button, Tooltip } from "@nextui-org/react";
import { FC, useEffect, useRef } from "react";
import { useActions, useUIState } from "ai/rsc";
import { nanoid } from "nanoid";
import { tooltipStyles } from "@/styles/tooltip-styles";
import { useRouter } from "next/navigation";
import { useEnterSubmit } from "../hooks/use-enter-submit";
import { type AI } from "../chat/actions";
import { UserMessage } from "../stocks/message";
import { NewIcon } from "@/modules/icons/action";
import { ArrowUpIcon } from "@/modules/icons/navigation";
import Link from "next/link";

interface PromptFormProps {
  input: string;
  setInput: (value: string) => void;
}

const PromptForm: FC<PromptFormProps> = ({ input, setInput }) => {
  const router = useRouter();
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { submitUserMessage } = useActions();
  const [_, setMessages] = useUIState<typeof AI>();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={async (e: any) => {
        e.preventDefault();

        // Blur focus on mobile
        if (window.innerWidth < 600) {
          e.target["message"]?.blur();
        }

        const value = input.trim();
        setInput("");
        if (!value) return;

        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: nanoid(),
            display: <UserMessage>{value}</UserMessage>,
          },
        ]);

        const responseMessage = await submitUserMessage(value);
        setMessages((currentMessages) => [...currentMessages, responseMessage]);
      }}
    >
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
            size="sm"
            radius="full"
            variant="light"
            className="absolute left-0 sm:left-4 top-[13px] !size-9 text-base-color dark:text-base-color-dark border border-gray-200 dark:border-base-dark sm:dark:border-base-full-dark dark:data-[hover=true]:bg-base-dark sm:dark:data-[hover=true]:bg-base-full-dark"
          >
            <NewIcon className="size-4" />
          </Button>
        </Tooltip>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          rows={1}
          name="message"
          value={input}
          autoFocus
          placeholder="Escribe tu mensaje."
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm text-base-color dark:text-base-color-dark"
        />
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
            type="submit"
            size="sm"
            radius="full"
            color="danger"
            className="absolute right-0 sm:right-4 top-[13px] !size-9 shadow-md disabled:opacity-60 disabled:pointer-events-none text-white dark:text-base-dark"
            disabled={input === ""}
          >
            <ArrowUpIcon className="size-4" />
          </Button>
        </Tooltip>
      </div>
    </form>
  );
};

export default PromptForm;
