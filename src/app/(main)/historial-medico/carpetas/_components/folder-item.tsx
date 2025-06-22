"use client";

import { EllipsisVerticalIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { DeleteButton } from "@/components/button-kit/delete-button";
import { EditButton } from "@/components/button-kit/edit-button";
import { PencilButton } from "@/components/button-kit/pencil-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
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

import { folderColorClassMap, folderIconMap } from "../../_lib/utils";

import type { Folder } from "@/lib/types";

interface FolderItemProps {
  folder: Folder;
  onRename: () => void;
  onEdit: () => void;
  onDelete: () => void;
  selected: boolean;
  onSelect: (e: React.MouseEvent) => void;
  onDoubleClick: () => void;
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerUp: () => void;
}

const FolderItem = ({
  folder,
  onRename,
  onEdit,
  onDelete,
  selected,
  onSelect,
  onDoubleClick,
  onPointerDown,
  onPointerUp,
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
    <ContextMenu modal={false}>
      <ContextMenuTrigger asChild>
        <Card
          key={folder.id}
          onDoubleClick={() => {
            router.push(
              `/historial-medico/carpetas/${folder.id}?${formattedFolderName}`,
            );
            onDoubleClick();
          }}
          onClick={(e) => {
            if (isMobile) {
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
          className={cn(
            "bg-muted hover:bg-accent active:bg-accent select-none active:transition-colors",
            selected && "bg-primary/20 hover:bg-primary/20 transition-colors",
          )}
        >
          <CardContent className="flex flex-col p-3">
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
              <span className="truncate text-sm font-medium">
                {capitalize(folder.name)}
              </span>
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
            <div className="text-muted-foreground mt-2 flex items-center text-xs">
              {folder.documentCount} documentos
            </div>
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
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
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default FolderItem;
