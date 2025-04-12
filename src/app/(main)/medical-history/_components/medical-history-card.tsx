"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Eye,
  EyeOff,
  Trash,
  Edit,
  FileText,
  Calendar,
  Building,
  Stars,
  Tag,
  ChevronRight,
  MoreVertical,
} from "lucide-react";

import { ChevronButton } from "@/components/button-kit/chevron-button";
import { DeleteButton } from "@/components/button-kit/delete-button";
import { EditButton } from "@/components/button-kit/edit-button";
import { EyeButton } from "@/components/button-kit/eye-button";
import { SparklesButton } from "@/components/button-kit/sparkles-button";
import { Badge } from "@/components/kit/badge";
import { Button } from "@/components/kit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
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
import { Separator } from "@/components/kit/separator";
import { BetterTooltip } from "@/components/kit/tooltip";
import { MedicalHistoryWithTags } from "@/db/querys/medical-history-querys";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import { getFileTypeColor, getTagColor } from "../_lib/utils";

interface MedicalHistoryCardProps {
  item: MedicalHistoryWithTags;
  onView: (item: MedicalHistoryWithTags) => void;
  onEdit: (item: MedicalHistoryWithTags) => void;
  onDelete: (item: MedicalHistoryWithTags) => void;
  onAIClick: (item: MedicalHistoryWithTags) => void;
  onViewFile: (fileData: { url?: string | null; name: string }) => void;
  onOpenOptions: (item: MedicalHistoryWithTags) => void;
  currentItem: MedicalHistoryWithTags | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const MedicalHistoryCard = ({
  item,
  onView,
  onEdit,
  onDelete,
  onAIClick,
  onViewFile,
  onOpenOptions,
  currentItem,
  isOpen,
  setIsOpen,
}: MedicalHistoryCardProps) => {
  const isMobile = useIsMobile();

  return (
    <Card className="group/item flex flex-col overflow-hidden shadow-xs transition-all duration-200 hover:shadow-md">
      <CardHeader className="px-4 pt-4 pb-2">
        <div className="mb-2 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <FileText className={getFileTypeColor(item.type)} />
            <Badge variant="outline" className="font-normal">
              {item.type}
            </Badge>
          </div>
          <Badge
            className={cn(
              "text-xxs! relative h-5 overflow-visible px-1.5 py-0 font-medium",
              item.visibility === "shared" &&
                "bg-primary text-primary-foreground",
            )}
          >
            {item.visibility === "private" ? (
              <span className="text-foreground/80 flex items-center gap-1">
                <EyeOff className="size-3.5" />
                Privado
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Eye className="size-3.5" />
                Compartido
              </span>
            )}
          </Badge>
        </div>
        <CardTitle>{item.condition}</CardTitle>
        {item.description && (
          <CardDescription className="mt-1 line-clamp-2 text-xs">
            {item.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="@container flex flex-1 flex-col px-4 pb-2">
        <div className="@xxs:grid-cols-2 grid items-start gap-2 text-xs">
          {item.issuer && (
            <div className="text-muted-foreground flex items-start gap-1">
              <Building className="size-3.5 shrink-0" />
              <span className="truncate">{item.issuer}</span>
            </div>
          )}
          {item.documentDate && (
            <div className="text-muted-foreground flex items-center gap-1">
              <Calendar className="size-3.5 shrink-0" />
              <span>
                {format(new Date(item.documentDate), "dd MMM yyyy", {
                  locale: es,
                })}
              </span>
            </div>
          )}
        </div>
        {item.tags && item.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {item.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className={cn("h-5 px-1.5 py-0 text-xs", getTagColor(tag))}
              >
                <Tag className="mr-1 size-2.5!" /> {tag}
              </Badge>
            ))}
            {item.tags.length > 2 && (
              <Badge
                variant="outline"
                className="bg-accent text-foreground/80 h-5 rounded-full px-1.5 py-0 text-xs"
              >
                +{item.tags.length - 2}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between px-4 py-2 md:pb-4">
        <p className="text-muted-foreground text-xs">
          {format(new Date(item.createdAt), "dd MMM yyyy", { locale: es })}
        </p>
        <div
          className={cn(
            "flex gap-1 transition-opacity",
            isMobile ? "opacity-100" : "opacity-0 group-hover/item:opacity-100",
          )}
        >
          {!isMobile ? (
            <>
              <BetterTooltip content="Analizar con IA" side="top">
                <SparklesButton
                  size="icon"
                  onClick={() => onAIClick(item)}
                  className="size-7 rounded-sm border-0 bg-transparent hover:bg-indigo-50 dark:bg-transparent dark:hover:bg-indigo-950 [&_svg]:size-3.5!"
                />
              </BetterTooltip>
              {item.file && (
                <BetterTooltip content="Ver documento" side="top">
                  <EyeButton
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      onViewFile({
                        url: item.file?.url,
                        name: item.file?.name || "archivo",
                      })
                    }
                    className="size-7 rounded-sm text-emerald-500 hover:bg-emerald-50 hover:text-emerald-500 dark:text-emerald-300 dark:hover:bg-emerald-950 dark:hover:text-emerald-300 [&_svg]:size-3.5!"
                  />
                </BetterTooltip>
              )}
              <BetterTooltip content="Ver detalles" side="top">
                <ChevronButton
                  variant="ghost"
                  size="icon"
                  onClick={() => onView(item)}
                  className="size-7 rounded-sm [&_svg]:size-3.5!"
                />
              </BetterTooltip>
              <BetterTooltip content="Editar" side="top">
                <EditButton
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(item)}
                  className="size-7 rounded-sm [&_svg]:size-3.5!"
                />
              </BetterTooltip>
              <BetterTooltip content="Eliminar" side="top">
                <DeleteButton
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(item)}
                  className="size-7 rounded-sm text-red-500! hover:bg-red-50 dark:hover:bg-red-950 [&_svg]:size-3.5!"
                />
              </BetterTooltip>
            </>
          ) : (
            <Drawer
              open={isOpen && currentItem?.id === item.id}
              onOpenChange={setIsOpen}
            >
              <DrawerTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="size-8"
                  onClick={() => onOpenOptions(item)}
                >
                  <MoreVertical className="size-3.5!" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Acciones para {item.condition}</DrawerTitle>
                </DrawerHeader>
                <DrawerDescription className="mt-4 space-y-1.5 px-4 text-center text-sm">
                  Selecciona una acción para este documento
                </DrawerDescription>
                <DrawerFooter>
                  <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
                    {item.file && (
                      <Button
                        variant="mobile"
                        onClick={() =>
                          onViewFile({
                            url: item.file?.url,
                            name: item.file?.name || "archivo",
                          })
                        }
                        className="text-emerald-500 dark:text-emerald-300"
                      >
                        <Eye />
                        Ver documento
                      </Button>
                    )}
                    <Separator className="dark:bg-alternative/50 z-10 ml-6" />
                    <Button
                      variant="mobile"
                      onClick={() => onAIClick(item)}
                      className="text-indigo-700 dark:text-indigo-300"
                    >
                      <Stars />
                      Analizar con IA
                    </Button>
                    <Separator className="dark:bg-alternative/50 z-10 ml-6" />
                    <Button variant="mobile" onClick={() => onView(item)}>
                      <ChevronRight />
                      Ver detalles
                    </Button>
                    <Separator className="dark:bg-alternative/50 z-10 ml-6" />
                    <Button variant="mobile" onClick={() => onEdit(item)}>
                      <Edit />
                      Editar
                    </Button>
                    <Separator className="dark:bg-alternative/50 z-10 ml-6" />
                    <Button
                      variant="mobile"
                      className="text-red-500 hover:bg-red-50 hover:text-red-700"
                      onClick={() => onDelete(item)}
                    >
                      <Trash />
                      Eliminar
                    </Button>
                  </div>
                  <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
                    <DrawerClose asChild>
                      <Button
                        variant="mobile"
                        className="justify-center rounded-full"
                      >
                        Cerrar
                      </Button>
                    </DrawerClose>
                  </div>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default MedicalHistoryCard;
