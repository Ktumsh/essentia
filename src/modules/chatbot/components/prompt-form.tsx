"use client";

import { Button, Tooltip } from "@nextui-org/react";
import { Attachment, ChatRequestOptions } from "ai";
import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useCallback,
  useRef,
} from "react";
import Textarea from "react-textarea-autosize";
import { toast } from "sonner";

import { StopIcon } from "@/modules/icons/action";
import { PaperclipIcon } from "@/modules/icons/common";
import { ArrowUpIcon } from "@/modules/icons/navigation";
import { tooltipStyles } from "@/styles/tooltip-styles";

import { useEnterSubmit } from "../hooks/use-enter-submit";

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
  attachments: Array<Attachment>;
  setAttachments: Dispatch<SetStateAction<Array<Attachment>>>;
  uploadQueue: string[];
  setUploadQueue: Dispatch<SetStateAction<string[]>>;
}

const PromptForm: FC<PromptFormProps> = ({
  input,
  setInput,
  isLoading,
  isPremium,
  stop,
  handleSubmit,
  attachments,
  setAttachments,
  uploadQueue,
  setUploadQueue,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { formRef, onKeyDown } = useEnterSubmit();

  const submitForm = useCallback(
    (event: FormEvent) => {
      if (event?.preventDefault) {
        event.preventDefault();
      }

      handleSubmit(undefined, {
        experimental_attachments: attachments,
      });

      setAttachments([]);
    },
    [attachments, handleSubmit, setAttachments]
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
          (attachment) => attachment !== undefined
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
    [setAttachments, setUploadQueue]
  );

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  return (
    <form ref={formRef} onSubmit={submitForm}>
      <div className="relative flex flex-col grow max-h-60 w-full px-8 sm:px-12 bg-white dark:bg-transparent sm:dark:bg-dark/50 sm:border border-gray-200 dark:border-dark sm:rounded-md overflow-hidden">
        <Tooltip
          content="Adjuntar imagen"
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
            variant="light"
            isDisabled={isLoading}
            onPress={() => fileInputRef.current?.click()}
            className="absolute left-0 sm:left-4 top-[13px] !size-9 text-main dark:text-main-dark border border-gray-300 dark:border-[#123a6f] sm:dark:border-[] dark:data-[hover=true]:bg-dark sm:dark:data-[hover=true]:bg-full-dark"
          >
            <PaperclipIcon className="size-3.5" />
          </Button>
        </Tooltip>

        <input
          type="file"
          className="fixed -top-4 -left-4 size-0.5 opacity-0 pointer-events-none"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          ref={fileInputRef}
          multiple
          onChange={handleFileChange}
          tabIndex={-1}
        />

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
          onKeyDown={onKeyDown}
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none text-main dark:text-main-dark"
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
              onPress={stop}
              className="absolute right-0 sm:right-4 top-[13px] !size-9 disabled:opacity-60 disabled:pointer-events-none text-white dark:text-main-dark"
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
              isDisabled={
                input.length === 0 || uploadQueue.length > 0 || !isPremium
              }
              onPress={() => handleSubmit()}
              className="absolute right-0 sm:right-4 top-[13px] !size-9 disabled:opacity-60 disabled:pointer-events-none text-white dark:text-main-dark"
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
