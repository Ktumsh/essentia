"use client";

import { Stars, CheckCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";

import PaymentModal from "@/app/payment/_components/payment-modal";
import { SparklesButton } from "@/components/button-kit/sparkles-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTrial } from "@/hooks/use-trial";
import { useUserProfile } from "@/hooks/use-user-profile";
import { cn, getRouteColor, getRouteIndex } from "@/utils";

import SectionTitle from "./section-title";

import type { FeatureType } from "@/lib/types";

type AerisSectionProps = {
  route: string;
  title: string;
  hash: string;
  description: React.ReactNode;
  placeholder: string;
  suggestions?: string[];
  defaultPrompt: string;
  featureType: FeatureType;
  ctaLabel: string;
};

const AerisSection = ({
  route,
  title,
  hash,
  description,
  placeholder,
  suggestions = [],
  defaultPrompt,
  featureType,
  ctaLabel,
}: AerisSectionProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const { user } = useUserProfile();
  const { isPremium } = user ?? {};
  const [isOpen, setIsOpen] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const isMobile = useIsMobile();
  const { isTrialUsed } = useTrial();

  const routeIndex = useMemo(() => getRouteIndex(route), [route]);

  const textColor = useMemo(
    () => getRouteColor(routeIndex, "text"),
    [routeIndex],
  );
  const borderColor = useMemo(
    () => getRouteColor(routeIndex, "border"),
    [routeIndex],
  );

  const onSubmit = () => {
    const promptToSend = customPrompt.trim() || defaultPrompt;
    if (isPremium) {
      router.push(`/aeris?q=${encodeURIComponent(promptToSend)}`);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <section
        className={cn(
          "bg-muted/40 col-[1/2] mb-16 flex flex-col justify-center rounded-2xl border-2 border-dashed p-4 md:items-center md:p-8 md:text-center lg:col-[1/3]",
          borderColor,
        )}
      >
        <SectionTitle title={title} hash={hash} className="mb-6" />

        <div className="text-muted-foreground mb-6 max-w-3xl text-sm md:text-base">
          {description}
        </div>

        {session?.user && (
          <div className="w-full max-w-3xl text-left">
            {suggestions.length > 0 && (
              <>
                <p className="text-foreground mb-2 text-sm font-medium md:text-base">
                  Personaliza tu solicitud (opcional):
                </p>
                <ul className="text-muted-foreground mb-4 space-y-2 text-sm">
                  {suggestions.map((text, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className={cn("mt-0.5 size-4", textColor)} />
                      {text}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <p className="text-muted-foreground mb-3 text-sm">
              Si no escribes nada, Aeris generará una sugerencia base
              automáticamente.
            </p>

            <Textarea
              placeholder={placeholder}
              rows={4}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className={cn("bg-background mb-6 resize-none", borderColor)}
            />
          </div>
        )}

        {session?.user ? (
          isMobile ? (
            <Button fullWidth variant="premium" size="lg" onClick={onSubmit}>
              <Stars className="**:fill-white" />
              <span>{ctaLabel}</span>
            </Button>
          ) : (
            <SparklesButton onClick={onSubmit}>{ctaLabel}</SparklesButton>
          )
        ) : (
          <Button
            variant="default"
            onClick={() => router.push(`/login?next=${pathname}`)}
          >
            Inicia sesión para continuar
          </Button>
        )}
      </section>

      {session?.user && (
        <PaymentModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          featureType={featureType}
          mode={!isTrialUsed ? "trial" : "upgrade"}
        />
      )}
    </>
  );
};

export default AerisSection;
