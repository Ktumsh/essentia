"use client";

import { UseChatHelpers } from "@ai-sdk/react";
import equal from "fast-deep-equal";
import { ArrowUp, Paperclip } from "lucide-react";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";

import { Button } from "@/components/kit/button";
import { Textarea } from "@/components/kit/textarea";
import { BetterTooltip } from "@/components/kit/tooltip";
import { StopIcon } from "@/components/ui/icons/action";
import { useChatContext } from "@/hooks/use-chat-context";
import { useIsMobile } from "@/hooks/use-mobile";

import { useAdjustHeight } from "../_hooks/use-adjust-height";
import { useEnterSubmit } from "../_hooks/use-enter-submit";

import type { Attachment } from "ai";

interface PromptFormProps {
  chatId: string;
  input: UseChatHelpers["input"];
  setInput: UseChatHelpers["setInput"];
  status: UseChatHelpers["status"];
  isPremium: boolean | null;
  stop: UseChatHelpers["stop"];
  handleSubmit: UseChatHelpers["handleSubmit"];
  attachments: Array<Attachment>;
  setAttachments: Dispatch<SetStateAction<Array<Attachment>>>;
  setMessages: UseChatHelpers["setMessages"];
  uploadQueue: string[];
  setUploadQueue: Dispatch<SetStateAction<string[]>>;
}

const PurePromptForm = ({
  chatId,
  input,
  setInput,
  status,
  isPremium,
  stop,
  handleSubmit,
  attachments,
  setAttachments,
  setMessages,
  uploadQueue,
  setUploadQueue,
}: PromptFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isMobile = useIsMobile();

  const { setActiveChatId } = useChatContext();

  const { textareaRef, adjustHeight } = useAdjustHeight();

  const { formRef, onKeyDown } = useEnterSubmit();

  const [localStorageInput, setLocalStorageInput] = useLocalStorage(
    "input",
    "",
  );

  useEffect(() => {
    if (textareaRef.current) {
      const domValue = textareaRef.current.value;
      const finalValue = domValue || localStorageInput || "";
      setInput(finalValue);
      adjustHeight();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLocalStorageInput(input);
  }, [input, setLocalStorageInput]);

  useEffect(() => {
    adjustHeight();
  }, [input, adjustHeight]);

  const submitForm = useCallback(
    (e: FormEvent) => {
      window.history.replaceState({}, "", `/essentia-ai/chat/${chatId}`);
      setActiveChatId(chatId);

      if (e?.preventDefault) {
        e.preventDefault();
      }

      handleSubmit(undefined, {
        experimental_attachments: attachments,
      });

      setAttachments([]);
      setInput("");
      setLocalStorageInput("");

      if (!isMobile) {
        textareaRef.current?.focus();
      }
    },
    [
      chatId,
      attachments,
      handleSubmit,
      setActiveChatId,
      setAttachments,
      setLocalStorageInput,
      setInput,
      isMobile,
      textareaRef,
    ],
  );

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`/api/files/upload-ai`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const { url, pathname, contentType } = data;

        return {
          url,
          name: pathname.split("/").pop(),
          contentType: contentType,
          size: file.size,
        };
      } else {
        const { error } = await response.json();
        toast.error(error);
      }
    } catch {
      toast.error("Error al cargar el archivo, por favor intenta nuevamente!");
    }
  };

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);

      setUploadQueue(files.map((file) => file.name));

      try {
        if (files.length > 9) {
          toast.error("No puedes cargar más de 9 archivos a la vez!");
          return;
        }
        const uploadPromises = files.map((file) => uploadFile(file));
        const uploadedAttachments = await Promise.all(uploadPromises);
        const successfullyUploadedAttachments = uploadedAttachments.filter(
          (attachment) => attachment !== undefined,
        );

        setAttachments((currentAttachments) => [
          ...currentAttachments,
          ...successfullyUploadedAttachments,
        ]);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        console.error("Error al cargar los archivos!", error);
      } finally {
        setUploadQueue([]);
      }
    },
    [setAttachments, setUploadQueue],
  );

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  return (
    <form ref={formRef} onSubmit={submitForm}>
      <div className="border-border dark:border-alternative bg-accent relative z-10 flex max-h-60 w-full grow flex-col overflow-hidden md:overflow-visible md:rounded-xl md:border">
        <AttachmentsButton fileInputRef={fileInputRef} status={status} />

        <input
          type="file"
          aria-label="Adjuntar archivos"
          accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
          ref={fileInputRef}
          multiple
          tabIndex={-1}
          onChange={handleFileChange}
          className="pointer-events-none fixed -top-4 -left-4 size-0.5 opacity-0"
        />

        <Textarea
          ref={textareaRef}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          rows={2}
          autoFocus
          placeholder="Escribe tu mensaje."
          disabled={!isPremium || false}
          value={input}
          onChange={handleInput}
          onKeyDown={onKeyDown}
          className="text-foreground w-full resize-none rounded-none border-none bg-transparent px-16 pt-5 text-[15px] shadow-none md:min-h-[98px] md:rounded-xl md:px-3 md:py-3 md:pb-12 md:text-base"
        />

        {status === "submitted" ? (
          <StopButton stop={stop} setMessages={setMessages} />
        ) : (
          <SendButton
            input={input}
            handleSubmit={handleSubmit}
            uploadQueue={uploadQueue}
            isPremium={isPremium}
          />
        )}
      </div>
    </form>
  );
};

export const PromptForm = memo(PurePromptForm, (prevProps, nextProps) => {
  if (prevProps.input !== nextProps.input) return false;
  if (prevProps.status !== nextProps.status) return false;
  if (!equal(prevProps.attachments, nextProps.attachments)) return false;

  return true;
});

function PureAttachmentsButton({
  fileInputRef,
  status,
}: {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  status: UseChatHelpers["status"];
}) {
  return (
    <BetterTooltip content="Adjuntar archivo" hidden={status !== "ready"}>
      <Button
        size="icon"
        radius="full"
        variant="ghost"
        disabled={status !== "ready"}
        className="text-foreground dark:border-alternative absolute top-4 left-4 size-9! border border-slate-300 md:top-auto md:bottom-2 md:left-2"
        onClick={(e) => {
          e.preventDefault();
          fileInputRef.current?.click();
        }}
      >
        <span className="sr-only">Adjuntar archivo</span>
        <Paperclip className="size-4" />
      </Button>
    </BetterTooltip>
  );
}

const AttachmentsButton = memo(PureAttachmentsButton);

function PureStopButton({
  stop,
  setMessages,
}: {
  stop: () => void;
  setMessages: UseChatHelpers["setMessages"];
}) {
  return (
    <Button
      size="icon"
      radius="full"
      className="absolute top-4 right-4 size-9 md:top-auto md:right-2 md:bottom-2"
      onClick={(event) => {
        event.preventDefault();
        stop();
        setMessages((messages) => messages);
      }}
    >
      <span className="sr-only">Detener generación de mensajes</span>
      <StopIcon className="size-4" />
    </Button>
  );
}

const StopButton = memo(PureStopButton);

function PureSendButton({
  handleSubmit,
  input,
  uploadQueue,
  isPremium,
}: {
  handleSubmit: () => void;
  input: string;
  uploadQueue: Array<string>;
  isPremium: boolean | null;
}) {
  return (
    <Button
      size="icon"
      radius="full"
      className="absolute top-4 right-4 size-9 md:top-auto md:right-2 md:bottom-2"
      onClick={handleSubmit}
      disabled={input.length === 0 || uploadQueue.length > 0 || !isPremium}
    >
      <span className="sr-only">Enviar mensaje</span>
      <ArrowUp className="size-4" />
    </Button>
  );
}

const SendButton = memo(PureSendButton);
