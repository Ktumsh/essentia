"use client";

import TooltipCTN from "@/modules/core/components/ui/utils/tooltip-ctn";
import { useCopyToClipboard } from "@/modules/core/hooks/use-copy-to-clipboard";
import useWindowSize from "@/modules/core/hooks/use-window-size";
import { BugIcon, CopyIcon } from "@/modules/icons/action";
import { CheckIcon } from "@/modules/icons/common";
import { tooltipStyles } from "@/styles/tooltip-styles";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

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
        <div className="flex p-1 opacity-0 group-hover/message:opacity-100 transition-opacity border border-black/10 dark:border-white/10 w-fit rounded-xl overflow-hidden">
          <TooltipCTN content="Reportar un error" delay={0}>
            <Button
              as={Link}
              href="https://github.com/Ktumsh/essentia/issues/new"
              target="_blank"
              variant="light"
              size="sm"
              isIconOnly
              className="rounded-lg min-w-0 !size-7 data-[hover=true]:bg-black/10 data-[hover=true]:dark:bg-white/10 text-base-color-h dark:text-base-color-dark-h"
            >
              <BugIcon className="size-5" />
              <span className="sr-only">Reportar un error</span>
            </Button>
          </TooltipCTN>
          {content && (
            <TooltipCTN content="Copiar" delay={0}>
              <Button
                size="sm"
                isIconOnly
                variant="light"
                className="rounded-lg min-w-0 !size-7 data-[hover=true]:bg-black/10 data-[hover=true]:dark:bg-white/10 text-base-color-h dark:text-base-color-dark-h"
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
        <div className="relative flex p-1 border border-black/10 dark:border-white/10 w-fit rounded-xl overflow-hidden">
          <Popover
            classNames={{
              base: tooltipStyles.arrow,
              content: [tooltipStyles.content, "p-0"],
            }}
          >
            <PopoverTrigger>
              <Button
                variant="light"
                size="sm"
                isIconOnly
                className="min-w-0 !size-7 text-base-color-m dark:text-base-color-dark-m"
              >
                <BugIcon className="size-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Button
                as={Link}
                href="https://github.com/Ktumsh/essentia/issues/new"
                target="_blank"
                variant="light"
                size="sm"
                className="text-base-color dark:text-base-color-dark"
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
                  size="sm"
                  variant="light"
                  isIconOnly
                  className="min-w-0 !size-7 text-base-color-m dark:text-base-color-dark-m"
                >
                  {isCopied ? (
                    <CheckIcon className="size-4" />
                  ) : (
                    <CopyIcon className="size-4" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Button
                  size="sm"
                  variant="light"
                  onPress={() => {
                    onCopy();
                    setIsOpen(false);
                  }}
                  className="text-base-color dark:text-base-color-dark"
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
