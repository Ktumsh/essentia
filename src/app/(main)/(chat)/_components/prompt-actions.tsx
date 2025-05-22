import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { CircleHelp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { memo } from "react";

import { ArrowRightButton } from "@/components/button-kit/arrow-right-button";
import { AttachButton } from "@/components/button-kit/attach-button";
import { LightbulbButton } from "@/components/button-kit/light-bulb-button";
import { StopButton as StopButtonKit } from "@/components/button-kit/stop-button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/kit/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/kit/popover";
import { Progress } from "@/components/kit/progress";
import { BetterTooltip } from "@/components/kit/tooltip";
import { cn } from "@/lib/utils";

import { CHAT_MODELS } from "../_lib/models";
import { getEmojiForRemaining } from "../_lib/utils";

import type { UseChatHelpers } from "@ai-sdk/react";

function PureAttachmentsButton({
  fileInputRef,
  status,
  isPremium,
  hasRemainingMessages,
}: {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  status: UseChatHelpers["status"];
  isPremium: boolean | null;
  hasRemainingMessages: boolean;
}) {
  const disabled = !isPremium || status !== "ready" || !hasRemainingMessages;

  return (
    <BetterTooltip content="Añadir archivo" hidden={status !== "ready"}>
      <AttachButton
        size="icon"
        variant="ghost"
        disabled={disabled}
        className="hover:bg-background bg-background pointer-events-auto md:bg-transparent"
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

function PureThinkingButton({
  status,
  isPremium,
  setModel,
  isModelSet,
  setIsModelSet,
  hasRemainingMessages,
}: {
  status: UseChatHelpers["status"];
  isPremium: boolean | null;
  setModel: (model: string) => void;
  isModelSet: boolean;
  setIsModelSet: (isModelSet: boolean) => void;
  hasRemainingMessages: boolean;
}) {
  const disabled = !isPremium || status !== "ready" || !hasRemainingMessages;
  const reasonerId = CHAT_MODELS[1].id;
  const defaultId = CHAT_MODELS[0].id;
  const isActive = isModelSet;

  const handleSetModel = () => {
    const next = !isModelSet;
    setIsModelSet(next);
    setModel(next ? reasonerId : defaultId);
  };

  return (
    <BetterTooltip
      content={isActive ? "Desactivar razonamiento" : "Activar razonamiento"}
      hidden={status !== "ready"}
    >
      <LightbulbButton
        size="sm"
        variant="ghost"
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          handleSetModel();
        }}
        className={cn(
          "bg-background hover:bg-background pointer-events-auto h-8 gap-1 px-2! text-xs md:size-8 md:p-0!",
          {
            "bg-linear-to-r/shorter from-indigo-500 to-indigo-600 text-white hover:text-white":
              isActive,
          },
          {
            "md:bg-transparent": !isActive,
          },
        )}
      >
        <span className="md:sr-only">Razonar</span>
      </LightbulbButton>
    </BetterTooltip>
  );
}

const ThinkingButton = memo(PureThinkingButton);

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
  hasRemainingMessages,
  isMobile,
}: {
  input: string;
  uploadQueue: Array<string>;
  isPremium: boolean | null;
  status: UseChatHelpers["status"];
  hasRemainingMessages: boolean;
  isMobile: boolean;
}) {
  const disabled =
    input.length === 0 ||
    uploadQueue.length > 0 ||
    !isPremium ||
    status !== "ready" ||
    !hasRemainingMessages;

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

function PureMessageCount({
  remainingMessages,
  isMobile,
}: {
  remainingMessages: number;
  isMobile: boolean;
}) {
  const percentage = Math.floor((remainingMessages / 15) * 100);

  if (isMobile) {
    return (
      <Popover>
        <PopoverTrigger className="text-muted-foreground pointer-events-auto flex items-center self-end text-xs font-medium">
          Límite de uso:<span className="mx-1 text-pink-500">Activo</span>
          <CircleHelp className="inline size-3" />
        </PopoverTrigger>
        <PopoverContent
          side="top"
          className="w-56 rounded-lg border-pink-300 bg-linear-to-br/shorter from-indigo-100 to-pink-100 p-2 dark:border-pink-800 dark:from-indigo-950 dark:to-pink-950"
        >
          <div className="grid gap-2 text-xs">
            <div className="flex items-center justify-between gap-1">
              <span>Mensajes restantes</span>
              <span className="text-foreground/60">
                {remainingMessages}/15{" "}
                <span className="text-foreground">
                  {getEmojiForRemaining(remainingMessages)}
                </span>
              </span>
            </div>
            <Progress
              value={percentage}
              indicatorColor="bg-pink-500 rounded-full"
              className="bg-background h-1.5"
            />
            <span className="text-foreground/60">
              Se reinicia mañana a las 00:00
            </span>
          </div>
          <PopoverPrimitive.Arrow className="fill-pink-300 dark:fill-pink-900" />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <div className="text-muted-foreground flex items-center self-end text-xs font-medium">
      Límite de uso:<span className="mx-1 text-pink-500">Activo</span>
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger className="afte:content-[''] pointer-events-auto relative after:absolute after:-inset-1">
          <CircleHelp className="size-3" />
        </HoverCardTrigger>
        <HoverCardContent
          side="top"
          className="w-56 rounded-lg border-pink-300 bg-linear-to-br/shorter from-indigo-100 to-pink-100 p-2 dark:border-pink-800 dark:from-indigo-950 dark:to-pink-950"
        >
          <div className="grid gap-2 text-xs">
            <div className="flex items-center justify-between gap-1">
              <span>Mensajes restantes</span>
              <span className="text-foreground/60">
                {remainingMessages}/15{" "}
                <span className="text-foreground">
                  {getEmojiForRemaining(remainingMessages)}
                </span>
              </span>
            </div>
            <Progress
              value={percentage}
              indicatorColor="bg-pink-500 rounded-full"
              className="bg-background h-1.5"
            />
            <span className="text-foreground/60">
              Se reinicia mañana a las 00:00
            </span>
          </div>
          <HoverCardPrimitive.Arrow className="fill-pink-300 dark:fill-pink-900" />
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

const MessageCount = memo(PureMessageCount, (prevProps, nextProps) => {
  if (prevProps.remainingMessages !== nextProps.remainingMessages) return false;
  return true;
});

export {
  AttachmentsButton,
  ThinkingButton,
  StopButton,
  SendButton,
  MessageCount,
};
