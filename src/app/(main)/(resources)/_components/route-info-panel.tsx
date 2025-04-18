"use client";

import { ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { memo, useCallback, useMemo, useState } from "react";

import { Button } from "@/components/kit/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import { Markdown } from "@/components/markdown";
import { cn, getRouteColor } from "@/lib/utils";

interface RouteInfoPanelProps {
  index: number;
  routeName: string;
  description: string;
  audience: string[];
  benefits: string[];
}

const RouteInfoPanel = ({
  index,
  routeName,
  description,
  audience,
  benefits,
}: RouteInfoPanelProps) => {
  const [activePanel, setActivePanel] = useState<
    "what-is" | "benefits" | "audience" | null
  >("what-is");

  const textColor = useMemo(
    () => getRouteColor(index, "text-contrast"),
    [index],
  );
  const textStrongColor = useMemo(
    () => getRouteColor(index, "text-strong"),
    [index],
  );
  const textMutedColor = useMemo(
    () => getRouteColor(index, "text-muted"),
    [index],
  );
  const backgroundColor = useMemo(
    () => getRouteColor(index, "background"),
    [index],
  );
  const borderColor = useMemo(() => getRouteColor(index, "border"), [index]);

  const togglePanel = useCallback(
    (key: string) => () =>
      setActivePanel((cur) =>
        cur === key ? null : (key as "what-is" | "benefits" | "audience"),
      ),
    [],
  );

  const panels = [
    { key: "what-is", label: `¿Qué es ${routeName}?` },
    { key: "benefits", label: "Beneficios" },
    { key: "audience", label: "¿Para quién es este curso?" },
  ] as const;

  return (
    <>
      <motion.div
        layout
        className="my-6 flex flex-wrap justify-center gap-3 md:justify-start"
      >
        {panels.map(({ key, label }) => (
          <Button
            key={key}
            variant="outline"
            size="sm"
            className={cn(
              "gap-2",
              activePanel === key && backgroundColor,
              activePanel === key && textColor,
              activePanel === key && borderColor,
            )}
            onClick={togglePanel(key)}
          >
            {label}
            {activePanel === key ? (
              <X className="size-3.5!" />
            ) : (
              <ChevronRight className="size-3.5!" />
            )}
          </Button>
        ))}
      </motion.div>
      {activePanel && (
        <Card className={cn("mb-8", backgroundColor, borderColor)}>
          <CardHeader
            isSecondary
            className="flex flex-row justify-between pb-2!"
          >
            <CardTitle className={cn("text-lg", textColor)}>
              {activePanel === "what-is" && `¿Qué es ${routeName}?`}
              {activePanel === "benefits" && "Beneficios de esta ruta"}
              {activePanel === "audience" && "¿Para quién es esta ruta?"}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className={cn("size-fit hover:bg-transparent", textColor)}
              onClick={() => setActivePanel(null)}
            >
              <X />
              <span className="sr-only">Cerrar</span>
            </Button>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <AnimatePresence mode="popLayout">
              {activePanel === "what-is" && (
                <motion.div
                  key="what"
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Markdown
                    className={cn(
                      "prose-sm md:prose prose-strong:font-semibold max-w-full! md:text-base!",
                      textMutedColor,
                      textStrongColor,
                    )}
                  >
                    {description}
                  </Markdown>
                </motion.div>
              )}

              {activePanel === "benefits" && (
                <motion.div
                  key="benefits"
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "prose-sm md:prose prose-li:marker:text-muted-foreground! prose dark:prose-invert! prose-p:leading-relaxed prose-headings:font-semibold! prose-hr:border-muted-foreground max-w-full! space-y-4 break-words md:text-base!",
                    textMutedColor,
                  )}
                >
                  <p>
                    Al completar esta ruta, obtendrás los siguientes beneficios:
                  </p>
                  <ul className="list-disc space-y-2 pl-5">
                    {benefits.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activePanel === "audience" && (
                <motion.div
                  key="audience"
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "prose-sm md:prose prose-li:marker:text-muted-foreground! prose dark:prose-invert! prose-p:leading-relaxed prose-headings:font-semibold! prose-hr:border-muted-foreground max-w-full! space-y-4 break-words md:text-base!",
                    textMutedColor,
                  )}
                >
                  <p>Esta ruta está diseñada para:</p>
                  <ul className="list-disc space-y-2 pl-5">
                    {audience.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default memo(RouteInfoPanel);
