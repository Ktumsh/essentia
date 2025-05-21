"use client";

import {
  Eye,
  Trash,
  Edit,
  FileText,
  Calendar,
  Building,
  Stars,
  Tag,
  ChevronRight,
  MoreVertical,
  EllipsisVerticalIcon,
} from "lucide-react";
import { useMemo } from "react";

import { ChevronButton } from "@/components/button-kit/chevron-button";
import { DeleteButton } from "@/components/button-kit/delete-button";
import { DownloadButton } from "@/components/button-kit/download-button";
import { EditButton } from "@/components/button-kit/edit-button";
import { EyeButton } from "@/components/button-kit/eye-button";
import { SparklesButton } from "@/components/button-kit/sparkles-button";
import { Badge } from "@/components/kit/badge";
import { Button } from "@/components/kit/button";
import {
  Card,
  CardContent,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/kit/dropdown-menu";
import { Separator } from "@/components/kit/separator";
import { BetterTooltip } from "@/components/kit/tooltip";
import { MedicalHistoryWithTags } from "@/db/querys/medical-history-querys";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/format";

import { getFileTypeColor, getTagColor } from "../_lib/utils";

interface DocumentCardProps {
  doc: MedicalHistoryWithTags;
  onView: (doc: MedicalHistoryWithTags) => void;
  onEdit: (doc: MedicalHistoryWithTags) => void;
  onDelete: (doc: MedicalHistoryWithTags) => void;
  onAIClick: (doc: MedicalHistoryWithTags) => void;
  onViewFile: (fileData: { url?: string | null; name: string }) => void;
  onDownload: (fileData: { url?: string | null; name: string }) => void;
  onOpenOptions: (doc: MedicalHistoryWithTags | null) => void;
  currentDoc: MedicalHistoryWithTags | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  selected: boolean;
  onToggleSelect: (e: React.MouseEvent) => void;
  onPointerDown: () => void;
  onPointerUp: () => void;
}

const DocumentCard = ({
  doc,
  onView,
  onEdit,
  onDelete,
  onAIClick,
  onViewFile,
  onDownload,
  onOpenOptions,
  currentDoc,
  open,
  setOpen,
  selected,
  onToggleSelect,
  onPointerDown,
  onPointerUp,
}: DocumentCardProps) => {
  const isMobile = useIsMobile();

  const createdAtText = formatDate(new Date(doc.createdAt), "dd MMM yyyy");

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
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
      </BetterTooltip>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <SparklesButton
              onClick={() => onAIClick(doc)}
              className="h-auto w-full justify-start border-0 bg-transparent font-normal hover:bg-fuchsia-100! dark:bg-transparent dark:hover:bg-fuchsia-950!"
            >
              Analizar con IA
            </SparklesButton>
          </DropdownMenuItem>
          {doc.file && (
            <DropdownMenuItem asChild>
              <EyeButton
                variant="ghost"
                onClick={() =>
                  onViewFile({
                    url: doc.file?.url,
                    name: doc.file?.name || "archivo",
                  })
                }
                className="h-auto w-full justify-start font-normal"
              >
                Ver documento
              </EyeButton>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <DownloadButton
              variant="ghost"
              onClick={() => {
                onDownload({
                  url: doc.file?.url,
                  name: doc.file?.name || "archivo",
                });
              }}
              className="h-auto w-full justify-start font-normal"
            >
              Descargar
            </DownloadButton>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <EditButton
              variant="ghost"
              onClick={() => onEdit(doc)}
              className="h-auto w-full justify-start font-normal"
            >
              Editar
            </EditButton>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" asChild>
          <DeleteButton
            variant="ghost"
            onClick={() => onDelete(doc)}
            className="h-auto w-full justify-start font-normal"
          >
            Eliminar
          </DeleteButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const mobileActions = (
    <Drawer
      open={open && currentDoc?.id === doc.id}
      onOpenChange={(open) => {
        if (!open) {
          setOpen(false);
          onOpenOptions(null);
        }
      }}
    >
      <DrawerTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="size-8"
          onClick={() => onOpenOptions(doc)}
        >
          <MoreVertical className="size-3.5!" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Acciones - {doc.condition}</DrawerTitle>
        </DrawerHeader>
        <DrawerDescription className="sr-only">
          Selecciona una acción para este documento
        </DrawerDescription>
        <DrawerFooter>
          <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
            {doc.file && (
              <Button
                variant="mobile"
                onClick={() =>
                  onViewFile({
                    url: doc.file?.url,
                    name: doc.file?.name || "archivo",
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
              onClick={() => onAIClick(doc)}
              className="text-indigo-700 dark:text-indigo-300"
            >
              <Stars />
              Analizar con IA
            </Button>
            <Separator className="dark:bg-alternative/50 z-10 ml-6" />
            <Button variant="mobile" onClick={() => onView(doc)}>
              <ChevronRight />
              Ver detalles
            </Button>
            <Separator className="dark:bg-alternative/50 z-10 ml-6" />
            <Button variant="mobile" onClick={() => onEdit(doc)}>
              <Edit />
              Editar
            </Button>
            <Separator className="dark:bg-alternative/50 z-10 ml-6" />
            <Button
              variant="mobile"
              className="text-red-500 hover:bg-red-50 hover:text-red-700"
              onClick={() => onDelete(doc)}
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

  const fileTypeColor = useMemo<string>(
    () => getFileTypeColor(doc.type),
    [doc.type],
  );

  return (
    <Card
      onDoubleClick={() => onView(doc)}
      onClick={(e) => {
        if (onToggleSelect) {
          onToggleSelect(e);
        }
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      className={cn(
        "group/item active:bg-accent bg-muted hover:bg-accent flex flex-col overflow-hidden select-none",
        selected && "bg-primary/20 hover:bg-primary/20",
      )}
    >
      <CardHeader className="px-4 pt-4 pb-2">
        <div className="mb-2 flex items-start justify-between">
          <div className="bg-background flex items-center justify-center rounded-full p-1.5">
            <FileText className={cn("size-5", fileTypeColor)} />
          </div>
          {isMobile ? mobileActions : desktopActions}
        </div>
        <CardTitle className="truncate leading-normal font-medium">
          {doc.condition}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col px-4 pb-2">
        <div className="@xxs:grid-cols-2 grid grid-cols-2 items-start gap-2 text-xs">
          {doc.issuer && (
            <div className="text-muted-foreground flex items-start gap-1">
              <Building className="size-3.5 shrink-0" />
              <span className="truncate">{doc.issuer}</span>
            </div>
          )}
          {doc.documentDate && (
            <div className="text-muted-foreground flex items-center gap-1">
              <Calendar className="size-3.5 shrink-0" />
              <span>
                {formatDate(new Date(doc.documentDate), "dd MMM yyyy")}
              </span>
            </div>
          )}
        </div>
        {doc.tags && doc.tags.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-1">
            {doc.tags.slice(0, 1).map((tag) => (
              <Badge
                key={tag}
                className={cn("font-normal text-white", getTagColor(tag))}
              >
                <Tag className="size-2.5!" />
                {tag}
              </Badge>
            ))}
            {doc.tags.length > 1 && (
              <Badge
                variant="outline"
                className="bg-background border-alternative text-foreground/80"
              >
                +{doc.tags.length - 1}
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

      <CardFooter className="mt-auto flex justify-between px-4 py-2 md:pb-4">
        <p className="text-muted-foreground text-xs">
          Añadido el {createdAtText}
        </p>
        <BetterTooltip content="Ver detalles">
          <ChevronButton
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onView(doc);
            }}
            className="hover:bg-background size-8 group-hover/item:opacity-100 md:opacity-0"
          >
            <span className="sr-only">Ver detalles</span>
          </ChevronButton>
        </BetterTooltip>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;
