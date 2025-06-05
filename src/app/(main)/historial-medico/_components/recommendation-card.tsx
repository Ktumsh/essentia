"use client";

import {
  BookmarkCheck,
  MoreVertical,
  Share,
  SparklesIcon,
  Tag,
  Trash,
} from "lucide-react";

import { ChevronButton } from "@/components/button-kit/chevron-button";
import { DeleteButton } from "@/components/button-kit/delete-button";
import { ShareButton } from "@/components/button-kit/share-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { BetterTooltip } from "@/components/ui/tooltip";
import { SavedAIRecommendation } from "@/db/querys/ai-recommendations-querys";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn, formatDate } from "@/utils";

import { getPriorityBadge, getPriorityText, getTagColor } from "../_lib/utils";

interface RecommendationCardProps {
  recommendation: SavedAIRecommendation;
  currentRec: SavedAIRecommendation | null;
  onShareRecommendation: (rec: SavedAIRecommendation) => void;
  onDeleteRecommendation: (rec: SavedAIRecommendation) => void;
  openDetailDialog: (rec: SavedAIRecommendation) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  selected: boolean;
  onToggleSelect: (e: React.MouseEvent) => void;
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerUp: () => void;
}

const RecommendationCard = ({
  recommendation,
  currentRec,
  onShareRecommendation,
  onDeleteRecommendation,
  openDetailDialog,
  open,
  setOpen,
  selected,
  onToggleSelect,
  onPointerDown,
  onPointerUp,
}: RecommendationCardProps) => {
  const isMobile = useIsMobile();

  const desktopActions = (
    <DropdownMenu>
      <BetterTooltip content="Acciones">
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="hover:bg-background size-8"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
      </BetterTooltip>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <ShareButton
            variant="ghost"
            onClick={() => onShareRecommendation(recommendation)}
            className="h-auto w-full justify-start"
          >
            Compartir
          </ShareButton>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" asChild>
          <DeleteButton
            variant="ghost"
            onClick={() => onDeleteRecommendation(recommendation)}
            className="h-auto w-full justify-start"
          >
            Eliminar
          </DeleteButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const mobileActions = (
    <Drawer
      open={open && currentRec?.id === recommendation.id}
      onOpenChange={setOpen}
    >
      <DrawerTrigger asChild>
        <Button size="sm" variant="ghost" className="size-8">
          <MoreVertical className="size-3.5!" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Acciones - {recommendation.title}</DrawerTitle>
        </DrawerHeader>
        <DrawerDescription className="sr-only">
          Selecciona una acción para este documento
        </DrawerDescription>
        <DrawerFooter>
          <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
            <Button
              variant="mobile"
              onClick={() => onShareRecommendation(recommendation)}
            >
              <Share />
              Compartir
            </Button>
            <Separator className="dark:bg-alternative/50 z-10 ml-6" />
            <Button
              variant="mobile"
              className="text-red-500 hover:bg-red-50 hover:text-red-700"
              onClick={() => onDeleteRecommendation(recommendation)}
            >
              <Trash />
              Eliminar
            </Button>
          </div>
          <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
            <Button
              variant="mobile"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              className="justify-center"
            >
              Cerrar
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );

  const priorityText = getPriorityText(recommendation.priority);
  const priorityBadge = getPriorityBadge(recommendation.priority);

  return (
    <Card
      onDoubleClick={() => openDetailDialog(recommendation)}
      onClick={(e) => {
        if (onToggleSelect) {
          onToggleSelect(e);
        }
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      className={cn(
        "group/item active:bg-accent bg-muted hover:bg-accent flex flex-col overflow-hidden select-none active:transition-colors",
        selected && "bg-primary/20 hover:bg-primary/20 transition-colors",
      )}
    >
      <CardHeader className="px-4 pt-4 pb-2">
        <div className="mb-2 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-background flex items-center justify-center rounded-full p-1.5">
              <SparklesIcon className="text-primary size-5" />
            </div>
            <BetterTooltip content={`Prioridad ${priorityText.toLowerCase()}`}>
              <Badge variant="outline" className={priorityBadge.color}>
                {priorityBadge.icon}
                {priorityBadge.label}
              </Badge>
            </BetterTooltip>
          </div>
          {isMobile ? mobileActions : desktopActions}
        </div>
        <CardTitle className="text-base font-medium">
          {recommendation.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col px-4 pb-2">
        <div className="text-muted-foreground flex items-start gap-1 text-xs">
          <BookmarkCheck className="size-3.5 shrink-0" />
          <span className="truncate">
            Guardado el{" "}
            {formatDate(new Date(recommendation.createdAt), "dd MMM yyyy")}
          </span>
        </div>
        {recommendation.relatedTags.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-1">
            {recommendation.relatedTags.slice(0, 1).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className={cn("font-normal text-white", getTagColor(tag))}
              >
                <Tag className="size-2.5!" />
                {tag}
              </Badge>
            ))}
            {recommendation.relatedTags.length > 1 && (
              <Badge
                variant="outline"
                className="bg-background text-foreground/80 border-alternative"
              >
                +{recommendation.relatedTags.length - 1}
              </Badge>
            )}
          </div>
        ) : (
          <div className="mt-2 flex">
            <Badge
              variant="outline"
              className="bg-background border-alternative font-normal"
            >
              Sin etiquetas
            </Badge>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between px-4 pt-2 pb-4">
        <p className="bg-premium bg-clip-text text-xs font-medium text-transparent">
          Generado por IA
        </p>
        <BetterTooltip content="Ver detalles">
          <ChevronButton
            variant="ghost"
            size="icon"
            onClick={() => openDetailDialog(recommendation)}
            className="hover:bg-background group-hover/item:opacity-100 md:opacity-0"
          />
        </BetterTooltip>
      </CardFooter>
    </Card>
  );
};

export default RecommendationCard;
