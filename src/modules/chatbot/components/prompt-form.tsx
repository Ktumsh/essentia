"use client";

import { Attachment, ChatRequestOptions, Message } from "ai";
import equal from "fast-deep-equal";
import { ArrowUp, Paperclip } from "lucide-react";
import {
  ChangeEvent,
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useRef,
} from "react";
import { toast } from "sonner";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BetterTooltip } from "@/components/ui/tooltip";
import { StopIcon } from "@/modules/icons/action";

import { useAdjustHeight } from "../hooks/use-adjust-height";
import { sanitizeUIMessages } from "../lib/utils";

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
    chatRequestOptions?: ChatRequestOptions,
  ) => void;
  attachments: Array<Attachment>;
  setAttachments: Dispatch<SetStateAction<Array<Attachment>>>;
  setMessages: Dispatch<SetStateAction<Array<Message>>>;
  uploadQueue: string[];
  setUploadQueue: Dispatch<SetStateAction<string[]>>;
}

const PurePromptForm = ({
  input,
  setInput,
  isLoading,
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

  const { textareaRef, adjustHeight } = useAdjustHeight();

  const submitForm = useCallback(() => {
    handleSubmit(undefined, {
      experimental_attachments: attachments,
    });

    setAttachments([]);

    if (!isMobile) {
      textareaRef.current?.focus();
    }
  }, [attachments, handleSubmit, setAttachments, isMobile, textareaRef]);

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
          name: pathname,
          contentType: contentType,
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

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (isLoading) {
        toast.error("¡No puedes enviar más de un mensaje al mismo tiempo!");
      } else {
        submitForm();
      }
    }
  };

  return (
    <form>
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden border-gray-200 bg-white px-8 dark:border-dark dark:bg-transparent sm:rounded-md sm:border sm:px-12 sm:dark:bg-dark/50">
        <AttachmentsButton fileInputRef={fileInputRef} isLoading={isLoading} />

        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          ref={fileInputRef}
          multiple
          tabIndex={-1}
          onChange={handleFileChange}
          className="pointer-events-none fixed -left-4 -top-4 size-0.5 opacity-0"
        />

        <Textarea
          ref={textareaRef}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          rows={1}
          autoFocus
          placeholder="Escribe tu mensaje."
          disabled={!isPremium || false}
          value={input}
          onChange={handleInput}
          onKeyDown={(e) => handleOnKeyDown(e)}
          className="min-h-[60px] w-full resize-none border-none bg-transparent px-4 py-[1.3rem] text-[15px] text-main shadow-none focus-visible:ring-0 dark:text-main-dark md:text-base"
        />

        {isLoading ? (
          <StopButton stop={stop} setMessages={setMessages} />
        ) : (
          <SendButton
            input={input}
            submitForm={submitForm}
            uploadQueue={uploadQueue}
          />
        )}
      </div>
    </form>
  );
};

export const PromptForm = memo(PurePromptForm, (prevProps, nextProps) => {
  if (prevProps.input !== nextProps.input) return false;
  if (prevProps.isLoading !== nextProps.isLoading) return false;
  if (!equal(prevProps.attachments, nextProps.attachments)) return false;

  return true;
});

function PureAttachmentsButton({
  fileInputRef,
  isLoading,
}: {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  isLoading: boolean;
}) {
  return (
    <BetterTooltip content="Adjuntar archivo" hidden={isLoading}>
      <Button
        size="icon"
        radius="full"
        variant="ghost"
        disabled={isLoading}
        className="absolute left-0 top-[13px] !size-9 border border-gray-300 text-main dark:border-accent-dark dark:text-main-dark sm:left-4"
        onClick={() => fileInputRef.current?.click()}
      >
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
  setMessages: Dispatch<SetStateAction<Array<Message>>>;
}) {
  return (
    <Button
      type="submit"
      size="icon"
      radius="full"
      variant="destructive"
      className="absolute right-0 top-[13px] size-9 sm:right-4"
      onClick={(event) => {
        event.preventDefault();
        stop();
        setMessages((messages) => sanitizeUIMessages(messages));
      }}
    >
      <StopIcon className="size-4" />
    </Button>
  );
}

const StopButton = memo(PureStopButton);

function PureSendButton({
  submitForm,
  input,
  uploadQueue,
}: {
  submitForm: () => void;
  input: string;
  uploadQueue: Array<string>;
}) {
  return (
    <Button
      type="submit"
      size="icon"
      radius="full"
      variant="destructive"
      className="absolute right-0 top-[13px] size-9 sm:right-4"
      onClick={(event) => {
        event.preventDefault();
        submitForm();
      }}
      disabled={input.length === 0 || uploadQueue.length > 0}
    >
      <ArrowUp className="size-4" />
    </Button>
  );
}

const SendButton = memo(PureSendButton, (prevProps, nextProps) => {
  if (prevProps.uploadQueue.length !== nextProps.uploadQueue.length)
    return false;
  if (!prevProps.input !== !nextProps.input) return false;
  return true;
});
