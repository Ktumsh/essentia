"use client";
import { Message } from "ai";
import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { BetterTooltip } from "@/components/ui/tooltip";
import { useCopyToClipboard } from "@/modules/core/hooks/use-copy-to-clipboard";

interface MessageActionsProps {
  message: Message;
  isLoading: boolean;
}

const MessageActions = ({ message, isLoading }: MessageActionsProps) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  if (isLoading) return null;
  if (message.role === "user") return null;
  if (message.toolInvocations && message.toolInvocations.length > 0)
    return null;

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(message.content as string);
    toast.success("Texto copiado");
  };

  return (
    <div className="flex flex-row gap-2">
      <BetterTooltip content="Copiar texto">
        <Button
          variant="outline"
          onClick={() => onCopy()}
          className="h-fit border-black/10 !bg-transparent px-2 py-1 text-main-m dark:border-white/10 dark:text-main-dark-m"
        >
          <Copy />
          <span className="sr-only">Reportar un error</span>
        </Button>
      </BetterTooltip>
    </div>
  );
};

export default MessageActions;
