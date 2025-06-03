"use client";

import equal from "fast-deep-equal";
import { usePathname } from "next/navigation";
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

import { Textarea } from "@/components/kit/textarea";
import { useChatContext } from "@/hooks/use-chat-context";
import { useChatModel } from "@/hooks/use-chat-model";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/utils";

import {
  AttachmentsButton,
  MessageCount,
  SendButton,
  StopButton,
  ThinkingButton,
} from "./prompt-actions";
import { useAdjustHeight } from "../_hooks/use-adjust-height";
import { useEnterSubmit } from "../_hooks/use-enter-submit";

import type { UseChatHelpers } from "@ai-sdk/react";
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
  hasMessages: boolean;
  remainingMessages?: number | null;
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
  hasMessages,
  remainingMessages = null,
}: PromptFormProps) => {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const isChatPage = pathname.startsWith("/aeris/chat/");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { setActiveChatId } = useChatContext();
  const { textareaRef, adjustHeight } = useAdjustHeight();
  const { formRef, onKeyDown } = useEnterSubmit(status);
  const [localStorageInput, setLocalStorageInput] = useLocalStorage(
    "input",
    "",
  );

  const { setModel, isModelSet, setIsModelSet } = useChatModel();

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
    if (isChatPage) return;
    const timer = setTimeout(() => {
      textareaRef.current?.focus();
    }, 1500);

    return () => clearTimeout(timer);
  }, [textareaRef, isChatPage]);

  useEffect(() => {
    setLocalStorageInput(input);
  }, [input, setLocalStorageInput]);

  useEffect(() => {
    adjustHeight();
  }, [input, adjustHeight]);

  const submitForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (!input.trim()) {
        return;
      }

      if (remainingMessages !== null && remainingMessages === 0) {
        toast.info("¡Ups! Ya usaste todos tus mensajes de hoy", {
          description: "Puedes actualizar tu plan para continuar chateando 😊",
        });
        return;
      }
      window.history.replaceState({}, "", `/aeris/chat/${chatId}`);
      setActiveChatId(chatId);

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
      input,
      chatId,
      attachments,
      handleSubmit,
      setActiveChatId,
      setAttachments,
      setLocalStorageInput,
      setInput,
      isMobile,
      textareaRef,
      remainingMessages,
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

  const hasRemainingMessages =
    remainingMessages === null ? true : remainingMessages > 0;

  return (
    <form ref={formRef} onSubmit={submitForm} className="relative z-1 mb-2">
      <div className="bg-accent ai-prompt relative flex max-h-60 w-full grow flex-col rounded-xl after:rounded-[21px]">
        <Textarea
          ref={textareaRef}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          rows={2}
          placeholder="Escribe tu mensaje."
          disabled={!isPremium || false}
          value={input}
          onChange={handleInput}
          onKeyDown={onKeyDown}
          className={cn(
            "text-foreground min-h-10 w-full resize-none rounded-xl border-none bg-transparent px-4 pt-3 pb-0 text-sm shadow-none focus-visible:ring-0 disabled:cursor-default md:min-h-20 md:text-[14px]",
            { "min-h-10!": hasMessages },
          )}
        />
        <div className="pointer-events-none inline-flex w-full items-center justify-between gap-2 p-3">
          <div className="inline-flex items-center gap-1">
            <AttachmentsButton
              fileInputRef={fileInputRef}
              status={status}
              isPremium={isPremium}
              hasRemainingMessages={hasRemainingMessages}
            />
            <ThinkingButton
              status={status}
              isPremium={isPremium}
              setModel={setModel}
              isModelSet={isModelSet}
              setIsModelSet={setIsModelSet}
              hasRemainingMessages={hasRemainingMessages}
            />
          </div>
          {remainingMessages !== null && (
            <MessageCount
              remainingMessages={remainingMessages}
              isMobile={isMobile}
            />
          )}
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
          {status === "submitted" ? (
            <StopButton stop={stop} setMessages={setMessages} />
          ) : (
            <SendButton
              input={input}
              uploadQueue={uploadQueue}
              isPremium={isPremium}
              status={status}
              hasRemainingMessages={hasRemainingMessages}
              isMobile={isMobile}
            />
          )}
        </div>
      </div>
    </form>
  );
};

export const PromptForm = memo(PurePromptForm, (prevProps, nextProps) => {
  if (prevProps.input !== nextProps.input) return false;
  if (prevProps.status !== nextProps.status) return false;
  if (!equal(prevProps.attachments, nextProps.attachments)) return false;
  if (prevProps.remainingMessages !== nextProps.remainingMessages) return false;

  return true;
});
