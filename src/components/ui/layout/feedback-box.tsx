"use client";

import { CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { MessageButton } from "@/components/button-kit/message-button";
import { Button } from "@/components/kit/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/kit/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/kit/popover";
import { Textarea } from "@/components/kit/textarea";
import { BetterTooltip } from "@/components/kit/tooltip";
import { saveUserFeedback } from "@/db/querys/user-querys";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  cn,
  getClientIp,
  getDeviceInfo,
  getReadableContext,
} from "@/lib/utils";

type ReactionsType = {
  id: "love" | "happy" | "neutral" | "frustrated" | "angry";
  emoji: string;
  label: string;
}[];

const reactions: ReactionsType = [
  { id: "love", emoji: "😍", label: "Me encantó" },
  { id: "happy", emoji: "😊", label: "Me gustó" },
  { id: "neutral", emoji: "😐", label: "Indiferente" },
  { id: "frustrated", emoji: "😕", label: "Me confundí" },
  { id: "angry", emoji: "😡", label: "No me gustó" },
];

const MAX_CHARS = 300;

const FeedbackBox = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [feedback, setFeedback] = useState("");
  const [reaction, setReaction] = useState<
    "love" | "happy" | "neutral" | "frustrated" | "angry" | null
  >(null);
  const [submitted, setSubmitted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const [open, setOpen] = useState(false);

  const isMobile = useIsMobile();

  const handleSend = async () => {
    if (!feedback.trim() || !reaction) {
      setShowErrors(true);
      return;
    }

    const ip = await getClientIp();
    const device = getDeviceInfo();
    const context = getReadableContext(pathname);
    const userId = session?.user?.id ?? null;

    await saveUserFeedback({
      comment: feedback,
      reaction,
      context,
      device,
      ip,
      userId,
    });

    setSubmitted(true);
    setShowErrors(false);
    setTimeout(() => {
      setFeedback("");
      setReaction(null);
      setSubmitted(false);
    }, 3000);
  };

  const bothEmpty = !feedback.trim() && !reaction;

  const content = (
    <AnimatePresence mode="wait">
      {!submitted ? (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="space-y-1.5 p-3">
            <Textarea
              value={feedback}
              onChange={(e) => {
                setFeedback(e.target.value);
                setShowErrors(false);
              }}
              placeholder="Danos tu opinión..."
              maxLength={MAX_CHARS + 1}
              className="h-24 resize-none rounded-lg text-sm"
            />
            <div className="inline-flex w-full items-center justify-end">
              {showErrors && !feedback.trim() && (
                <p className="mr-auto text-xs text-green-500">
                  Por favor, escribenos algo 🙏
                </p>
              )}
              <div className="text-muted-foreground text-xxs text-right">
                {feedback.length}/{MAX_CHARS}
              </div>
            </div>
          </div>

          <div className="flex flex-col border-t px-3 pt-2 pb-3">
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2">
                {reactions.map((r) => (
                  <BetterTooltip key={r.id} content={r.label} side="bottom">
                    <button
                      onClick={() => {
                        setReaction(r.id);
                        setShowErrors(false);
                      }}
                      className={cn(
                        "text-lg transition-all",
                        reaction === r.id
                          ? "scale-110"
                          : "opacity-50 hover:opacity-100",
                      )}
                    >
                      {r.emoji}
                    </button>
                  </BetterTooltip>
                ))}
              </div>
              {!isMobile && (
                <Button
                  size="sm"
                  radius="full"
                  onClick={handleSend}
                  disabled={bothEmpty}
                >
                  Enviar
                </Button>
              )}
            </div>
            {showErrors && !reaction && (
              <p className="text-xs text-green-500">
                Por favor, danos tu reacción 🙏
              </p>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="flex flex-col items-center justify-center space-y-2 py-6 text-center"
        >
          <CheckCircle className="h-6 w-6 text-green-600" />
          <p className="text-sm font-medium">¡Comentario enviado!</p>
          <p className="text-muted-foreground text-xs">
            Gracias por tu ayuda 🫶
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <MessageButton
            variant="secondary"
            size="sm"
            className="[&_svg]:size-3.5!"
          >
            Dar feedback
          </MessageButton>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Feedback</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className="p-4">
            Danos tu opinión sobre la app, nos ayuda a mejorar ☺️
          </DrawerDescription>
          {content}
          <DrawerFooter>
            <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
              <DrawerClose asChild>
                <Button variant="mobile" className="justify-center">
                  Cerrar
                </Button>
              </DrawerClose>
            </div>
            <Button
              variant="mobile-primary"
              disabled={bothEmpty}
              onClick={handleSend}
            >
              Enviar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <MessageButton variant="ghost" size="sm">
          Feedback
        </MessageButton>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        {content}
      </PopoverContent>
    </Popover>
  );
};

export default FeedbackBox;
