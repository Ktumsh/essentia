"use client";

import { isAfter } from "date-fns";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useState } from "react";

import { BadgeAlert } from "@/components/kit/badge-alert";
import { Button } from "@/components/kit/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/kit/carousel";
import { useProfileMessage } from "@/hooks/use-profile-message";
import { useTrial } from "@/hooks/use-trial";
import { cn } from "@/lib/utils";
import { UserProfileData } from "@/types/auth";

import { LinkIcon } from "../icons/action";
import PaymentModal from "../payment/payment-modal";

interface ProfileMessageProps {
  user: UserProfileData | null;
  session: Session | null;
}

const ProfileMessage = ({ user, session }: ProfileMessageProps) => {
  const router = useRouter();
  const { isDismissed, dismiss } = useProfileMessage();

  const { isTrialActive, isTrialUsed } = useTrial();

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const items = [];

  const isProfileIncomplete =
    !user?.bio ||
    !user?.location ||
    !user?.height ||
    !user?.weight ||
    !user?.genre;

  const isPremium = user?.isPremium;

  if (!session) return null;

  if (isProfileIncomplete) {
    items.push({
      title:
        "Completa tu perfil para disfrutar de una experiencia personalizada y mejorada 🚀",
      path: "/profile",
      text: "Completar perfil",
    });
  }

  if (!isTrialUsed && !isPremium) {
    items.push({
      title: "Disfruta Essentia al máximo con 7 días de prueba Premium 💫",
      action: () => {
        setIsPaymentModalOpen(true);
      },
      text: "Iniciar prueba",
    });
  } else if (!isPremium) {
    items.push({
      title:
        "Desbloquea todas las funciones premium y potencia tu experiencia al máximo ✨",
      action: () => {
        setIsPaymentModalOpen(true);
      },
      text: "Hacerme premium",
    });
  }

  if (items.length === 0 || isDismissed) return null;

  if (isTrialActive && user?.trial.expiresAt) {
    const expiresAt = new Date(user.trial.expiresAt);
    const now = new Date();

    if (isAfter(expiresAt, now)) {
      const daysLeft = Math.ceil(
        (expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
      );

      items.push({
        title:
          daysLeft === 1
            ? "Te queda 1 día de tu prueba gratuita ⏳"
            : `Te quedan ${daysLeft} días de tu prueba gratuita ⏳`,
      });
    }
  }

  return (
    <>
      <div className="text-foreground relative inline-flex justify-center shadow-sm">
        <Carousel
          opts={{ loop: true, watchDrag: false, duration: 40 }}
          plugins={[
            Autoplay({
              delay: 10000,
            }),
            Fade(),
          ]}
          className="w-full"
        >
          <CarouselContent className="ml-0 md:h-9">
            {items.map((item, index) => {
              const isFirstItem = index === 0;
              return (
                <CarouselItem
                  key={index}
                  className={cn(
                    "pl-0",
                    isFirstItem
                      ? "bg-emerald-100 dark:bg-emerald-950"
                      : "bg-gradient-to-r from-indigo-500 to-pink-500 md:h-9",
                  )}
                >
                  <div className="flex h-full flex-col justify-center gap-2 px-4 py-3 md:flex-row md:items-center md:py-2">
                    <div className="inline-flex items-center gap-2 pr-8 md:pr-0">
                      <BadgeAlert
                        variant={isFirstItem ? "success" : "info"}
                        className={cn(
                          "mb-0 size-6 [&>svg]:size-3.5",
                          isFirstItem
                            ? "bg-green-500/20"
                            : "bg-pink-300/50! text-pink-50",
                        )}
                      />
                      <p
                        className={cn("text-xs md:text-sm", {
                          "text-white": !isFirstItem,
                        })}
                      >
                        {item.title}
                      </p>
                    </div>
                    {(item.path || item.action) && (
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => {
                          if (item.path) {
                            router.push(item.path);
                          } else if (item.action) {
                            item.action();
                          }
                        }}
                        className={cn(
                          "ml-8 h-auto w-fit gap-1 px-0! text-xs hover:underline md:ml-0 md:text-sm",
                          isFirstItem ? "text-foreground" : "text-white",
                        )}
                      >
                        {item.text && item.text}
                        {isFirstItem && <LinkIcon className="size-2!" />}
                      </Button>
                    )}
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
        <Button
          size="icon"
          variant="outline"
          onClick={dismiss}
          className="absolute top-2 right-2 size-6 border-0 md:inset-y-0 md:my-auto"
        >
          <X />
        </Button>
      </div>
      {!isPremium && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          setIsOpen={setIsPaymentModalOpen}
          mode={!isTrialUsed ? "trial" : "upgrade"}
        />
      )}
    </>
  );
};

export default ProfileMessage;
