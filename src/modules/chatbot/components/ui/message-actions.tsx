"use client";

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import TooltipCTN from "@/modules/core/components/ui/utils/tooltip-ctn";
import { useCopyToClipboard } from "@/modules/core/hooks/use-copy-to-clipboard";
import useWindowSize from "@/modules/core/hooks/use-window-size";
import { BugIcon, CopyIcon } from "@/modules/icons/action";
import { CheckIcon } from "@/modules/icons/common";
import { tooltipStyles } from "@/styles/tooltip-styles";

const MessageActions = ({ content }: { content?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });
  const windowSize = useWindowSize();

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(content || "");
    toast.success("Texto copiado");
  };
  return (
    <>
      {windowSize.width > 768 ? (
        <div className="flex w-fit overflow-hidden rounded-xl border border-black/10 p-1 opacity-0 transition-opacity group-hover/message:opacity-100 dark:border-white/10">
          <TooltipCTN content="Reportar un error" delay={0}>
            <Button
              aria-label="Reportar un error"
              as={Link}
              href="https://github.com/Ktumsh/essentia/issues/new"
              target="_blank"
              variant="light"
              size="sm"
              isIconOnly
              className="!size-7 min-w-0 rounded-lg text-main-h data-[hover=true]:bg-black/10 dark:text-main-dark-h data-[hover=true]:dark:bg-white/10"
            >
              <BugIcon className="size-5" />
              <span className="sr-only">Reportar un error</span>
            </Button>
          </TooltipCTN>
          {content && (
            <TooltipCTN content="Copiar" delay={0}>
              <Button
                aria-label="Copiar texto"
                size="sm"
                isIconOnly
                variant="light"
                className="!size-7 min-w-0 rounded-lg text-main-h data-[hover=true]:bg-black/10 dark:text-main-dark-h data-[hover=true]:dark:bg-white/10"
                onPress={onCopy}
              >
                {isCopied ? (
                  <CheckIcon className="size-4" />
                ) : (
                  <CopyIcon className="size-4" />
                )}
                <span className="sr-only">Copiar texto</span>
              </Button>
            </TooltipCTN>
          )}
        </div>
      ) : (
        <div className="relative flex w-fit overflow-hidden rounded-xl border border-black/10 p-1 dark:border-white/10">
          <Popover
            classNames={{
              base: tooltipStyles.arrow,
              content: [tooltipStyles.content, "p-0"],
            }}
          >
            <PopoverTrigger>
              <Button
                aria-label="Reportar un error"
                variant="light"
                size="sm"
                isIconOnly
                className="!size-7 min-w-0 text-main-m dark:text-main-dark-m"
              >
                <span className="sr-only">Reportar un error</span>
                <BugIcon className="size-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Button
                aria-label="Reportar un error"
                as={Link}
                href="https://github.com/Ktumsh/essentia/issues/new"
                target="_blank"
                variant="light"
                size="sm"
                className="text-main dark:text-main-dark"
              >
                Reportar un error
              </Button>
            </PopoverContent>
          </Popover>
          {content && (
            <Popover
              isOpen={isOpen}
              onOpenChange={(open) => setIsOpen(open)}
              classNames={{
                base: tooltipStyles.arrow,
                content: [tooltipStyles.content, "p-0"],
              }}
            >
              <PopoverTrigger>
                <Button
                  aria-label="Copiar texto"
                  size="sm"
                  variant="light"
                  isIconOnly
                  className="!size-7 min-w-0 text-main-m dark:text-main-dark-m"
                >
                  {isCopied ? (
                    <CheckIcon className="size-4" />
                  ) : (
                    <CopyIcon className="size-4" />
                  )}
                  <span className="sr-only">Copiar texto</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Button
                  aria-label="Copiar texto"
                  size="sm"
                  variant="light"
                  onPress={() => {
                    onCopy();
                    setIsOpen(false);
                  }}
                  className="text-main dark:text-main-dark"
                >
                  Copiar texto
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      )}
    </>
  );
};

export default MessageActions;
