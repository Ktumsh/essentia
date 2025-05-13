"use client";

import {
  Smile,
  Heart,
  Quote,
  Lightbulb,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { ArrowLeftButton } from "@/components/button-kit/arrow-left-button";
import { Card } from "@/components/kit/card";
import { ScrollArea } from "@/components/kit/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/kit/tabs";
import { CLOUDINARY_BASE_URL } from "@/consts/cloudinary";
import { cn } from "@/lib/utils";

import StockFooter from "./stock-footer";
import StockHeader from "./stock-header";
import { getActivityColor, getActivityTextColor } from "../../_lib/utils";

import type { MoodTrack } from "../../_lib/tool-schemas";

const MoodTrackStock = (moodTrack: MoodTrack) => {
  const [activeTab, setActiveTab] = useState("activities");
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);

  return (
    <Card className="dark:shadow-alternative/15 dark:border-accent shadow-stock mb-8 w-full max-w-lg overflow-hidden rounded-3xl border-slate-100 transition-all duration-300">
      <StockHeader
        imageSrc={`${CLOUDINARY_BASE_URL}/tool/mood-track`}
        title={moodTrack.title ?? "Actividades de Bienestar"}
        label="Seguimiento del ánimo"
        infoItems={[
          {
            icon: <Smile className="size-4" />,
            text: `${moodTrack.mood.length} actividades`,
          },
          {
            icon: <Heart className="size-4" />,
            text: "Mejora tu bienestar",
          },
        ]}
      />
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full gap-0"
      >
        <div className="dark:border-accent border-b border-slate-100 px-3 md:px-6">
          <TabsList className="h-14 w-full bg-transparent md:justify-start md:gap-8">
            {["activities", "inspiration"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="flex-1 rounded-none border-b-2 border-transparent px-0 font-medium capitalize transition-all duration-200 data-[state=active]:border-fuchsia-500 data-[state=active]:text-fuchsia-500 data-[state=active]:shadow-none md:flex-0 dark:data-[state=active]:text-fuchsia-400"
              >
                {tab === "activities" ? "Actividades" : "Inspiración"}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent
          value="activities"
          className="mt-0 focus-visible:ring-0 focus-visible:outline-none"
        >
          <ScrollArea className="h-[400px]">
            <div className="space-y-4 p-3 md:p-6">
              <AnimatePresence initial={false} mode="popLayout">
                {selectedActivity !== null ? (
                  <motion.div
                    key="activity-details"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ type: "spring", duration: 0.7 }}
                    className="space-y-4"
                  >
                    <ArrowLeftButton
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedActivity(null)}
                      className="rounded-full text-fuchsia-500 hover:text-fuchsia-600 dark:text-fuchsia-400 dark:hover:text-fuchsia-300"
                    >
                      Volver a actividades
                    </ArrowLeftButton>

                    <div className="rounded-2xl bg-gray-50 p-5 dark:bg-gray-900/40">
                      <div className="mb-4 flex items-center gap-3">
                        <div
                          className={cn(
                            "flex size-8 shrink-0 items-center justify-center rounded-full md:size-10",
                            getActivityColor(selectedActivity),
                          )}
                        >
                          <Sparkles className="size-4 text-white md:size-5" />
                        </div>
                        <h2
                          className={cn(
                            "text-base font-semibold md:text-lg",
                            getActivityTextColor(selectedActivity),
                          )}
                        >
                          {moodTrack.mood[selectedActivity].activity}
                        </h2>
                      </div>

                      <p className="text-foreground/80! prose-sm md:prose leading-relaxed md:text-base!">
                        {moodTrack.mood[selectedActivity].description}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="activity-list"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ type: "spring", duration: 0.7 }}
                  >
                    <div className="mb-4">
                      <h3 className="text-foreground flex items-center gap-2 text-base font-semibold">
                        <Sparkles className="size-5 text-purple-500" />
                        Actividades Recomendadas
                      </h3>
                      <p className="text-muted-foreground mt-1 text-sm">
                        Selecciona una actividad para ver más detalles.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {moodTrack.mood.map((activity, index) => (
                        <ActivityCard
                          key={index}
                          activity={activity}
                          index={index}
                          color={getActivityColor(index)}
                          onClick={() => setSelectedActivity(index)}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent
          value="inspiration"
          className="mt-0 focus-visible:ring-0 focus-visible:outline-none"
        >
          <ScrollArea className="h-[400px]">
            <div className="space-y-5 p-3 md:p-6">
              {moodTrack.poeticPhrase && (
                <div className="dark:bg-accent/50 rounded-2xl bg-slate-50 p-5">
                  <div className="flex items-start">
                    <Quote className="mt-1 mr-3 size-8 flex-shrink-0 text-purple-300 dark:text-fuchsia-700" />
                    <div>
                      <p className="text-base leading-relaxed text-gray-800 italic md:text-lg dark:text-gray-200">
                        {moodTrack.poeticPhrase.phrase}
                      </p>
                      <p className="text-muted-foreground mt-3 text-right text-sm">
                        — {moodTrack.poeticPhrase.author}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Suggestion */}
              <div className="rounded-2xl bg-fuchsia-50 p-5 dark:bg-fuchsia-900/20">
                <h3 className="text-foreground mb-2 flex items-center gap-2 text-base font-semibold">
                  <Lightbulb className="size-5 text-fuchsia-500" />
                  Sugerencia para Mejorar
                </h3>
                <p className="text-foreground/80 text-sm leading-relaxed md:text-base">
                  {moodTrack.suggestion}
                </p>
              </div>

              {/* Tip */}
              <div className="rounded-2xl bg-emerald-50 p-5 dark:bg-emerald-900/20">
                <h3 className="text-foreground mb-2 flex items-center gap-2 text-base font-semibold">
                  <Sparkles className="size-5 text-emerald-500" />
                  Consejo Motivador
                </h3>
                <p className="text-foreground/80 text-sm leading-relaxed md:text-base">
                  {moodTrack.tip}
                </p>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
      <StockFooter />
    </Card>
  );
};

export default MoodTrackStock;

function ActivityCard({
  activity,
  index,
  color,
  onClick,
}: {
  activity: MoodTrack["mood"][number];
  index: number;
  color: string;
  onClick: () => void;
}) {
  return (
    <div
      className="bg-background hover:shadow-little-pretty dark:border-accent transform-gpu cursor-pointer overflow-hidden rounded-2xl border border-slate-100 transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-full md:size-10",
              color,
            )}
          >
            <span className="font-medium text-white">{index + 1}</span>
          </div>
          <div>
            <h3 className="text-foreground text-sm font-medium md:text-base">
              {activity.activity}
            </h3>
            <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
              {activity.description.substring(0, 60)}...
            </p>
          </div>
        </div>
        <ChevronRight className="text-muted-foreground size-4 shrink-0" />
      </div>
    </div>
  );
}
