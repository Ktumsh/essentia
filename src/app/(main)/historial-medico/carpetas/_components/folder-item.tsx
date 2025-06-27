"use client";

import { EllipsisVerticalIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { DeleteButton } from "@/components/button-kit/delete-button";
import { EditButton } from "@/components/button-kit/edit-button";
import { InfoButton } from "@/components/button-kit/info-button";
import { PencilButton } from "@/components/button-kit/pencil-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  MaybeContextMenu,
} from "@/components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn, capitalize } from "@/utils";

import {
  folderActiveClass,
  folderBottomLayerSelectedClass,
  folderHoverClass,
  folderLayerHoverClass,
  folderSelectedClass,
  folderTopLayerSelectedClass,
} from "../../_lib/consts";
import { folderColorClassMap, folderIconMap } from "../../_lib/utils";

import type { Folder } from "@/lib/types";

interface FolderItemProps {
  folder: Folder;
  onRename: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
  selected: boolean;
  onSelect: (e: React.MouseEvent) => void;
  onDoubleClick: () => void;
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerUp: () => void;
  isMultiMode: boolean;
}

const FolderItem = ({
  folder,
  onRename,
  onEdit,
  onDelete,
  onView,
  selected,
  onSelect,
  onDoubleClick,
  onPointerDown,
  onPointerUp,
  isMultiMode,
}: FolderItemProps) => {
  const router = useRouter();

  const isMobile = useIsMobile();

  const color = folder.color ?? "gray";
  const icon = folder.icon ?? "folder";
  const { bg, text } = folderColorClassMap[color];
  const Icon = folderIconMap[icon];

  const formattedFolderName = folder.name
    .replace(/[^a-zA-Z0-9]/g, "-")
    .toLowerCase();

  return (
    <MaybeContextMenu
      content={
        <>
          <ContextMenuGroup>
            <ContextMenuItem asChild>
              <InfoButton
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onView();
                }}
                className="h-auto w-full justify-start px-2! font-normal"
              >
                Ver detalles
              </InfoButton>
            </ContextMenuItem>
            <ContextMenuItem asChild>
              <PencilButton
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onRename();
                }}
                className="h-auto w-full justify-start px-2! font-normal"
              >
                Renombrar
              </PencilButton>
            </ContextMenuItem>
            <ContextMenuItem asChild>
              <EditButton
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
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
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="h-auto w-full justify-start px-2! font-normal"
            >
              Eliminar
            </DeleteButton>
          </ContextMenuItem>
        </>
      }
    >
      <Card
        key={folder.id}
        onDoubleClick={() => {
          if (!isMultiMode && !isMobile) {
            router.push(
              `/historial-medico/carpetas/${folder.id}?${formattedFolderName}`,
            );
            onDoubleClick();
          }
        }}
        onClick={(e) => {
          if (!isMultiMode && isMobile) {
            router.push(
              `/historial-medico/carpetas/${folder.id}?${formattedFolderName}`,
            );
            onDoubleClick();
          } else {
            onSelect(e);
          }
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        className="group rounded-none select-none"
      >
        {/* layers */}
        <div
          aria-hidden
          className={cn(
            "bg-muted h-4 w-20 rounded-t-md",
            folderLayerHoverClass,
            selected && folderTopLayerSelectedClass,
          )}
        />
        <div
          aria-hidden
          className={cn(
            "bg-muted absolute inset-x-0 top-4 bottom-0 z-1 rounded-xl rounded-tl-none",
            folderLayerHoverClass,
            selected && folderBottomLayerSelectedClass,
          )}
        />
        <div
          aria-hidden
          className={cn(
            "absolute inset-x-2 top-4 h-4 rounded-t-sm border bg-white transition group-hover:-translate-y-2 dark:bg-slate-300",
            selected && "-translate-y-2",
          )}
        />
        {/* content */}
        <CardContent
          className={cn(
            "bg-accent relative z-2 flex flex-col rounded-xl rounded-tl-sm p-3",
            folderHoverClass,
            folderActiveClass,
            selected && folderSelectedClass,
          )}
        >
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center justify-center rounded-full p-1.5",
                bg,
                text,
              )}
            >
              <Icon className="size-5" />
            </div>
            <div className="grid overflow-hidden">
              <span className="truncate text-sm font-medium">
                {capitalize(folder.name)}
              </span>
              <span className="text-muted-foreground text-xxs leading-none md:hidden">
                {folder.documentCount} documentos
              </span>
            </div>
            <div className="ms-auto">
              <DropdownMenu modal={false}>
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
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <InfoButton
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          onView();
                        }}
                        className="h-auto w-full justify-start px-2! font-normal"
                      >
                        Ver detalles
                      </InfoButton>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <PencilButton
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRename();
                        }}
                        className="h-auto w-full justify-start px-2! font-normal"
                      >
                        Renombrar
                      </PencilButton>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <EditButton
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit();
                        }}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                      }}
                      className="h-auto w-full justify-start px-2! font-normal"
                    >
                      Eliminar
                    </DeleteButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <span className="text-muted-foreground mt-2 hidden text-xs md:block">
            {folder.documentCount} documentos
          </span>
        </CardContent>
      </Card>
    </MaybeContextMenu>
  );
};

export default FolderItem;
