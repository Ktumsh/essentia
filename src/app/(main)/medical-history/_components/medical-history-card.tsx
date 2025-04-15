"use client";

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
import { useMemo } from "react";

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
import { formatDate } from "@/utils/format";

import {
  getFileTypeBorderColor,
  getFileTypeColor,
  getTagColor,
} from "../_lib/utils";

interface MedicalHistoryCardProps {
  item: MedicalHistoryWithTags;
  onView: (item: MedicalHistoryWithTags) => void;
  onEdit: (item: MedicalHistoryWithTags) => void;
  onDelete: (item: MedicalHistoryWithTags) => void;
  onAIClick: (item: MedicalHistoryWithTags) => void;
  onViewFile: (fileData: { url?: string | null; name: string }) => void;
  onOpenOptions: (item: MedicalHistoryWithTags | null) => void;
  currentItem: MedicalHistoryWithTags | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  viewMode: "grid" | "list";
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
  viewMode,
}: MedicalHistoryCardProps) => {
  const isMobile = useIsMobile();

  const createdAtText = formatDate(new Date(item.createdAt), "dd MMM yyyy");

  const visibilityBadge = (
    <Badge
      className={cn(
        "text-xxs! relative h-5 overflow-visible px-1.5 py-0 font-medium",
        item.visibility === "shared" && "bg-primary text-primary-foreground",
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
  );

  const desktopActions = (
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
            className="size-7 rounded-sm text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950 [&_svg]:size-3.5!"
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
  );

  const mobileActions = (
    <Drawer
      open={isOpen && currentItem?.id === item.id}
      onOpenChange={(open) => {
        if (!open) {
          setIsOpen(false);
          onOpenOptions(null);
        }
      }}
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
        <DrawerHeader>
          <DrawerTitle>Acciones - {item.condition}</DrawerTitle>
        </DrawerHeader>
        <DrawerDescription className="sr-only">
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
            <Button
              variant="mobile"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
                onOpenOptions(null);
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

  const fileTypeBorderColor = useMemo(
    () =>
      getFileTypeBorderColor(item.type, viewMode === "grid" ? "top" : "left"),
    [item.type, viewMode],
  );

  const fileTypeColor = useMemo<string>(
    () => getFileTypeColor(item.type),
    [item.type],
  );

  return (
    <Card
      onClick={() => {
        if (isMobile) {
          onOpenOptions(item);
        }
      }}
      className={cn(
        "group/item active:bg-accent overflow-hidden shadow-xs transition-shadow duration-200 hover:shadow-md active:duration-75 md:active:bg-inherit",
        viewMode === "grid"
          ? "flex flex-col border-t-2"
          : "flex flex-row items-stretch border-l-2",
        fileTypeBorderColor,
      )}
    >
      {/* ==============================
          MODO GRID
          ============================== */}
      {viewMode === "grid" && (
        <>
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="mb-2 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <FileText className={fileTypeColor} />
                <Badge variant="outline" className="font-normal">
                  {item.type}
                </Badge>
              </div>
              {visibilityBadge}
            </div>
            <CardTitle className="truncate leading-normal">
              {item.condition}
            </CardTitle>
            {item.description && (
              <CardDescription className="mt-1 line-clamp-2 text-xs">
                {item.description}
              </CardDescription>
            )}
          </CardHeader>

          <CardContent className="flex flex-1 flex-col px-4 pb-2">
            <div className="@xxs:grid-cols-2 grid grid-cols-2 items-start gap-2 text-xs">
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
                    {formatDate(new Date(item.documentDate), "dd MMM yyyy")}
                  </span>
                </div>
              )}
            </div>
            {item.tags && item.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1 text-xs">
                {item.tags.slice(0, 2).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={cn("h-5 px-1.5 py-0 text-xs", getTagColor(tag))}
                  >
                    <Tag className="mr-1 size-2.5!" />
                    {tag}
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
            <p className="text-muted-foreground text-xs">{createdAtText}</p>
            <div
              className={cn(
                "flex gap-1 transition-opacity",
                isMobile
                  ? "opacity-100"
                  : "opacity-0 group-hover/item:opacity-100",
              )}
            >
              {isMobile ? mobileActions : desktopActions}
            </div>
          </CardFooter>
        </>
      )}

      {/* ==============================
          MODO LIST (horizontal)
          ============================== */}
      {viewMode === "list" && (
        <div className="flex w-full flex-1 flex-col">
          {/* ENCABEZADO: icono, tipo, condición, badge de visibilidad */}
          <CardHeader className="px-4 pt-4 pb-2">
            <div className="mb-2 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <FileText className={cn("size-5", fileTypeColor)} />
                <Badge variant="outline" className="font-normal">
                  {item.type}
                </Badge>
                <Separator orientation="vertical" className="mx-2 h-4!" />
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1 text-xs">
                    <span className="text-muted-foreground text-xxs mr-2">
                      Etiquetas:
                    </span>
                    {item.tags.slice(0, 4).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className={cn(
                          "h-5 px-1.5 py-0 text-xs",
                          getTagColor(tag),
                        )}
                      >
                        <Tag className="mr-1 size-2.5!" />
                        {tag}
                      </Badge>
                    ))}
                    {item.tags.length > 4 && (
                      <Badge
                        variant="outline"
                        className="bg-accent text-foreground/80 h-5 rounded-full px-1.5 py-0 text-xs"
                      >
                        +{item.tags.length - 4}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              {visibilityBadge}
            </div>
            <CardTitle className="truncate text-base leading-normal">
              {item.condition}
            </CardTitle>
          </CardHeader>

          {/* FOOTER: fecha de creación + acciones */}
          <CardFooter className="flex justify-between px-4 pb-2 md:pb-4">
            <p className="text-muted-foreground text-xs">{createdAtText}</p>
            <div
              className={cn(
                "flex gap-1 transition-opacity",
                isMobile
                  ? "opacity-100"
                  : "opacity-0 group-hover/item:opacity-100",
              )}
            >
              {isMobile ? mobileActions : desktopActions}
            </div>
          </CardFooter>
        </div>
      )}
    </Card>
  );
};

export default MedicalHistoryCard;
