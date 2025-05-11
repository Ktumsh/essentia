import { useRef, type RefObject } from "react";
import { toast } from "sonner";

import type { UseChatHelpers } from "@ai-sdk/react";

export function useEnterSubmit(status: UseChatHelpers["status"]): {
  formRef: RefObject<HTMLFormElement | null>;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
} {
  const formRef = useRef<HTMLFormElement>(null);
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ): void => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      if (status !== "ready") {
        toast.error("Por favor, espera a que Nyra termine su respuesta 😊");
      } else {
        formRef.current?.requestSubmit();
      }
    }
  };
  return { formRef, onKeyDown: handleKeyDown };
}
