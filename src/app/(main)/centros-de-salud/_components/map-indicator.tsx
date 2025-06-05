"use client";

import { X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

interface MapIndicatorProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  travelMode: string;
  clearDirections: () => void;
}

const SNAP_POINTS = ["280px", 1];

const MapIndicator = ({
  isOpen,
  setIsOpen,
  travelMode,
  clearDirections,
}: MapIndicatorProps) => {
  const [snap, setSnap] = useState<number | string | null>(SNAP_POINTS[1]);

  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? (
        <Drawer
          snapPoints={SNAP_POINTS}
          activeSnapPoint={snap}
          setActiveSnapPoint={setSnap}
          snapToSequentialPoint
          modal={false}
          open={isOpen}
          onOpenChange={() => {
            setSnap(SNAP_POINTS[1]);
            setIsOpen(!isOpen);
            if (isOpen) {
              clearDirections();
            }
          }}
        >
          <DrawerContent className="z-60">
            <DrawerHeader className="relative">
              <DrawerTitle>{travelMode}</DrawerTitle>
              <DrawerDescription className="sr-only">
                Indicaciones
              </DrawerDescription>
              <Button
                size="icon"
                radius="full"
                variant="outline"
                className="absolute top-0 right-2 size-7"
                onClick={() => {
                  setSnap(SNAP_POINTS[1]);
                  setIsOpen(false);
                  clearDirections();
                }}
              >
                <X className="size-3.5!" />
              </Button>
            </DrawerHeader>
            <div className="min-h-[600px] overflow-y-auto">
              <CardContent
                id="directions-content"
                className="p-4"
              ></CardContent>
            </div>
            <DrawerFooter className="min-h-14"></DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Card
          id="fixed-directions-panel"
          className="animate-fade-in fixed right-2 bottom-6 z-50 hidden h-80 max-w-md overflow-hidden rounded-xl shadow-lg"
        >
          <CardHeader isSecondary className="space-y-0 pb-0!">
            <CardTitle className="text-foreground text-base">
              {travelMode}
            </CardTitle>
            <Button
              id="close-directions"
              variant="ghost"
              size="icon"
              radius="full"
              className="absolute top-2 right-2 size-8"
              onClick={clearDirections}
            >
              <X className="size-3.5!" />
            </Button>
          </CardHeader>
          <ScrollArea className="h-[280px] overflow-y-auto">
            <CardContent
              id="directions-content"
              className="p-4 pt-0"
            ></CardContent>
          </ScrollArea>
        </Card>
      )}
    </>
  );
};

export default MapIndicator;
