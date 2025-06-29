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
import { InfoButton } from "@/components/button-kit/info-button";
import { SparklesButton } from "@/components/button-kit/sparkles-button";
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
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
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
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { BetterTooltip } from "@/components/ui/tooltip";
import { MedicalHistory } from "@/db/querys/medical-history-querys";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUserProfile } from "@/hooks/use-user-profile";
import { cn, formatDate } from "@/utils";

import { useMedicalDialogs } from "../_hooks/use-medical-dialogs";
import {
  docActiveClass,
  docHoverClass,
  docSelectedClass,
} from "../_lib/consts";
import { getFileTypeColor, getTagColor } from "../_lib/utils";

interface DocumentCardProps {
  doc: MedicalHistory;
  onView: (doc: MedicalHistory) => void;
  onEdit: (doc: MedicalHistory) => void;
  onDelete: (doc: MedicalHistory) => void;
  onAIClick: (doc: MedicalHistory) => void;
  onViewFile: (fileData: { url?: string | null; name: string }) => void;
  onDownload: (fileData: { url?: string | null; name: string }) => void;
  onOpenOptions: (doc: MedicalHistory | null) => void;
  currentDoc: MedicalHistory | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  selected: boolean;
  onToggleSelect: (e: React.MouseEvent) => void;
  onPointerDown: (e: React.PointerEvent) => void;
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
  const { user } = useUserProfile();
  const isPremium = user?.isPremium || false;
  const isMobile = useIsMobile();
  const { openDialog } = useMedicalDialogs();

  const createdAtText = formatDate(new Date(doc.createdAt), "dd MMM yyyy");

  const desktopActions = (
    <DropdownMenu modal={false}>
      <BetterTooltip content="Acciones">
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="hover:bg-background size-8"
          >
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
      </BetterTooltip>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <SparklesButton
              onClick={() => {
                if (isPremium) {
                  onAIClick(doc);
                } else {
                  openDialog("isPremiumModal");
                }
              }}
              className="h-auto w-full justify-start border-0 bg-transparent font-normal hover:bg-fuchsia-100! dark:bg-transparent dark:hover:bg-fuchsia-950!"
            >
              Analizar con IA
            </SparklesButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
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
                className="h-auto w-full justify-start px-2! font-normal"
              >
                Vista previa
              </EyeButton>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem asChild>
            <InfoButton
              variant="ghost"
              onClick={() => onView(doc)}
              className="h-auto w-full justify-start px-2! font-normal"
            >
              Ver información
            </InfoButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <DownloadButton
              variant="ghost"
              onClick={() => {
                onDownload({
                  url: doc.file?.url,
                  name: doc.file?.name || "archivo",
                });
              }}
              className="h-auto w-full justify-start px-2! font-normal"
            >
              Descargar
            </DownloadButton>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <EditButton
              variant="ghost"
              onClick={() => onEdit(doc)}
              className="h-auto w-full justify-start px-2! font-normal"
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
            className="h-auto w-full justify-start px-2! font-normal"
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
          onClick={() => {
            console.log({ doc });
            onOpenOptions(doc);
          }}
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
            <Button
              variant="mobile"
              onClick={() => {
                if (isPremium) {
                  onAIClick(doc);
                } else {
                  openDialog("isPremiumModal");
                }
              }}
              className="text-secondary"
            >
              <Stars />
              Analizar con IA
            </Button>
            <Separator className="dark:bg-alternative/50 z-10 ml-6" />
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
                Vista previa
              </Button>
            )}
            <Separator className="dark:bg-alternative/50 z-10 ml-6" />
            <Button variant="mobile" onClick={() => onView(doc)}>
              <ChevronRight />
              Ver información
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
    <ContextMenu modal={false}>
      <ContextMenuTrigger asChild>
        <Card
          onDoubleClick={() =>
            onViewFile({
              url: doc.file?.url,
              name: doc.file?.name || "archivo",
            })
          }
          onClick={(e) => onToggleSelect(e)}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          className={cn(
            "group/item bg-muted flex flex-col overflow-hidden select-none",
            docHoverClass,
            docActiveClass,
            selected && docSelectedClass,
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
            <BetterTooltip content="Ver información">
              <ChevronButton
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onView(doc);
                }}
                className="hover:bg-background size-8 group-hover/item:opacity-100 md:opacity-0"
              >
                <span className="sr-only">Ver información</span>
              </ChevronButton>
            </BetterTooltip>
          </CardFooter>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem asChild>
            <SparklesButton
              onClick={() => {
                if (isPremium) {
                  onAIClick(doc);
                } else {
                  openDialog("isPremiumModal");
                }
              }}
              className="h-auto w-full justify-start border-0 bg-transparent px-2! font-normal hover:bg-fuchsia-100! dark:bg-transparent dark:hover:bg-fuchsia-950!"
            >
              Analizar con IA
            </SparklesButton>
          </ContextMenuItem>
          <ContextMenuSeparator />
          {doc.file && (
            <ContextMenuItem asChild>
              <EyeButton
                variant="ghost"
                onClick={() =>
                  onViewFile({
                    url: doc.file?.url,
                    name: doc.file?.name || "archivo",
                  })
                }
                className="h-auto w-full justify-start px-2! font-normal"
              >
                Vista previa
              </EyeButton>
            </ContextMenuItem>
          )}
          <ContextMenuItem asChild>
            <InfoButton
              variant="ghost"
              onClick={() => onView(doc)}
              className="h-auto w-full justify-start px-2! font-normal"
            >
              Ver información
            </InfoButton>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem asChild>
            <DownloadButton
              variant="ghost"
              onClick={() => {
                onDownload({
                  url: doc.file?.url,
                  name: doc.file?.name || "archivo",
                });
              }}
              className="h-auto w-full justify-start px-2! font-normal"
            >
              Descargar
            </DownloadButton>
          </ContextMenuItem>
          <ContextMenuItem asChild>
            <EditButton
              variant="ghost"
              onClick={() => onEdit(doc)}
              className="h-auto w-full justify-start px-2! font-normal"
            >
              Editar
            </EditButton>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive" asChild>
          <DeleteButton
            variant="ghost"
            onClick={() => onDelete(doc)}
            className="h-auto w-full justify-start px-2! font-normal"
          >
            Eliminar
          </DeleteButton>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default DocumentCard;
