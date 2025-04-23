"use client";

import { UseChatHelpers } from "@ai-sdk/react";
import equal from "fast-deep-equal";
import { AnimatePresence, motion } from "motion/react";
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

import { ArrowRightButton } from "@/components/button-kit/arrow-right-button";
import { AttachButton } from "@/components/button-kit/attach-button";
import { StopButton as StopButtonKit } from "@/components/button-kit/stop-button";
import { Textarea } from "@/components/kit/textarea";
import { BetterTooltip } from "@/components/kit/tooltip";
import { useChatContext } from "@/hooks/use-chat-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

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
  hasMessages: boolean;
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
    const timer = setTimeout(() => {
      textareaRef.current?.focus();
    }, 1500);

    return () => clearTimeout(timer);
  }, [textareaRef]);

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
      <div className="bg-accent ai-prompt relative flex max-h-60 w-full grow flex-col rounded-[15px] after:rounded-xl">
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
            "text-foreground min-h-10 w-full resize-none rounded-xl border-none bg-transparent px-4 pt-3 pb-0 text-sm shadow-none focus-visible:ring-0 md:min-h-20 md:text-[14px]",
            { "min-h-10!": hasMessages },
          )}
        />
        <div className="pointer-events-none inline-flex w-full items-center justify-between gap-2 p-3">
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
          {status === "submitted" || status !== "ready" ? (
            <StopButton stop={stop} setMessages={setMessages} />
          ) : (
            <SendButton
              input={input}
              uploadQueue={uploadQueue}
              isPremium={isPremium}
              status={status}
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
    <BetterTooltip content="Añadir archivo" hidden={status !== "ready"}>
      <AttachButton
        size="icon"
        variant="ghost"
        disabled={status !== "ready"}
        className="hover:bg-background bg-background pointer-events-auto size-8 rounded-sm md:size-7 md:bg-transparent [&_svg]:size-3.5!"
        onClick={(e) => {
          e.preventDefault();
          fileInputRef.current?.click();
        }}
      >
        <span className="sr-only">Añadir archivo</span>
      </AttachButton>
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
    <StopButtonKit
      variant="gradient"
      size="icon"
      onClick={(event) => {
        event.preventDefault();
        stop();
        setMessages((messages) => messages);
      }}
      className="pointer-events-auto size-8 rounded-full"
    >
      <span className="sr-only">Detener generación de mensajes</span>
    </StopButtonKit>
  );
}

const StopButton = memo(PureStopButton);

const MotionArrowRightButton = motion.create(ArrowRightButton);

function PureSendButton({
  input,
  uploadQueue,
  isPremium,
  status,
}: {
  input: string;
  uploadQueue: Array<string>;
  isPremium: boolean | null;
  status: UseChatHelpers["status"];
}) {
  const isMobile = useIsMobile();
  const disabled =
    input.length === 0 ||
    uploadQueue.length > 0 ||
    !isPremium ||
    status !== "ready";

  return (
    <MotionArrowRightButton
      type="submit"
      layout
      variant="gradient"
      size="sm"
      disabled={disabled}
      transition={{ layout: { duration: 0.25, ease: "easeInOut" } }}
      className={cn(
        "pointer-events-auto flex-row-reverse overflow-hidden rounded-full disabled:opacity-50 [&_svg]:size-3.5! md:[&_svg]:size-4!",
        input.length > 0
          ? "size-8 md:h-8 md:w-40"
          : "size-8 px-0 md:h-8 md:w-8",
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {input.length > 0 && !isMobile && (
          <motion.span
            key="text"
            layout
            initial={{ opacity: 0, x: 4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ duration: 0.2 }}
            className="whitespace-nowrap"
          >
            Activa la magia
          </motion.span>
        )}
      </AnimatePresence>
    </MotionArrowRightButton>
  );
}

const SendButton = memo(PureSendButton);
