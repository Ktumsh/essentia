"use client";

import { FolderPlusIcon, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useSWRConfig } from "swr";

import { DeleteButton } from "@/components/button-kit/delete-button";
import { Button } from "@/components/kit/button";
import { BetterTooltip } from "@/components/kit/tooltip";
import {
  createMedicalFolder,
  deleteMedicalFolder,
  updateMedicalFolder,
} from "@/db/querys/medical-folder-querys";

import FolderForm from "./folder-form";
import FolderItem from "./folder-item";
import RenameFolderForm from "./rename-folder-form";
import { useMedicalFolders } from "../../_hooks/use-medical-folders";

import type { Folder, FolderIconType } from "@/lib/types";

type FolderFormData = {
  name: string;
  description?: string;
  color: "gray" | "blue" | "green" | "pink" | "red" | "orange" | "purple";
  icon: FolderIconType;
};

interface MedicalFoldersPanelProps {
  userId: string;
}

const MedicalFoldersPanel = ({ userId }: MedicalFoldersPanelProps) => {
  const { folders, mutate } = useMedicalFolders();

  const { mutate: mutateActivity } = useSWRConfig();

  const [editing, setEditing] = useState<Folder | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [renaming, setRenaming] = useState<Folder | null>(null);
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(
    null,
  );

  const foldersRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        foldersRef.current &&
        !foldersRef.current.contains(e.target as Node)
      ) {
        setSelectedFolders([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCreate = async (data: FolderFormData) => {
    await createMedicalFolder({ userId, ...data });
    mutate();
    mutateActivity("/api/medical-activity");
    setShowForm(false);
  };

  const handleRename = async (newName: string) => {
    if (!renaming) return;
    await updateMedicalFolder({
      userId,
      folderId: renaming.id,
      name: newName,
    });
    mutate();
    mutateActivity("/api/medical-activity");
    setRenaming(null);
  };

  const handleUpdate = async (data: FolderFormData) => {
    if (!editing) return;
    await updateMedicalFolder({ userId, folderId: editing.id, ...data });
    mutate();
    mutateActivity("/api/medical-activity");
    setEditing(null);
    setShowForm(false);
  };

  const handleDelete = async (folder: Folder) => {
    if (confirm("¿Eliminar carpeta?")) {
      await deleteMedicalFolder({ userId, folderId: folder.id });
      mutate();
      mutateActivity("/api/medical-activity");
    }
  };

  const handleSelect = (
    e: React.MouseEvent,
    folderId: string,
    index: number,
  ) => {
    const isCtrl = e.metaKey || e.ctrlKey;
    const isShift = e.shiftKey;

    if (isCtrl) {
      setSelectedFolders((prev) =>
        prev.includes(folderId)
          ? prev.filter((id) => id !== folderId)
          : [...prev, folderId],
      );
      setLastSelectedIndex(index);
    } else if (isShift && lastSelectedIndex !== null) {
      const [start, end] = [
        Math.min(lastSelectedIndex, index),
        Math.max(lastSelectedIndex, index),
      ];
      const range = folders.slice(start, end + 1).map((f) => f.id);
      setSelectedFolders((prev) => {
        const isFullySelected = range.every((id) => prev.includes(id));

        return isFullySelected
          ? [folderId]
          : Array.from(new Set([...prev, ...range]));
      });
      setLastSelectedIndex(index);
    } else {
      setSelectedFolders([folderId]);
      setLastSelectedIndex(index);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {selectedFolders.length > 0 ? (
          <motion.div
            key="selected"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="bg-muted mt-6 flex h-9 items-center gap-2 rounded-full px-1"
          >
            <BetterTooltip content="Deseleccionar todo">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSelectedFolders([]);
                  setLastSelectedIndex(null);
                }}
                className="hover:bg-alternative/50 size-7"
              >
                <X className="size-3.5!" />
              </Button>
            </BetterTooltip>
            <h3 className="text-base font-medium">
              {selectedFolders.length} seleccionadas
            </h3>
            <BetterTooltip content="Eliminar selección">
              <DeleteButton
                variant="ghost"
                size="icon"
                onClick={() => {}}
                className="size-7 text-red-500! hover:bg-red-50 dark:hover:bg-red-950 [&_svg]:size-3.5!"
              >
                <span className="sr-only">Eliminar selección</span>
              </DeleteButton>
            </BetterTooltip>
          </motion.div>
        ) : (
          <motion.div
            key="folders"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="mt-6 flex h-9 items-center gap-2 rounded-full"
          >
            <BetterTooltip content="Añadir carpeta">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setEditing(null);
                  setShowForm(true);
                }}
                className="size-8"
              >
                <FolderPlusIcon />
                <span className="sr-only">Añadir carpeta</span>
              </Button>
            </BetterTooltip>
            <h3 className="text-base font-medium">Carpetas</h3>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-3">
        <div
          ref={foldersRef}
          className="grid grid-cols-1 gap-5 md:grid-cols-3 2xl:grid-cols-5"
        >
          {folders?.slice(0, 10).map((folder, index) => (
            <FolderItem
              key={folder.id}
              folder={folder}
              onRename={() => {
                setRenaming(folder);
              }}
              onEdit={() => {
                setEditing(folder);
                setShowForm(true);
              }}
              onDelete={() => handleDelete(folder)}
              isSelected={selectedFolders.includes(folder.id)}
              onToggleSelect={(e) => handleSelect(e, folder.id, index)}
            />
          ))}
        </div>
      </div>

      <FolderForm
        isOpen={showForm}
        initial={editing || undefined}
        onClose={() => setShowForm(false)}
        onSubmit={editing ? handleUpdate : handleCreate}
      />

      <RenameFolderForm
        isOpen={!!renaming}
        currentName={renaming?.name || ""}
        onRename={handleRename}
        onClose={() => setRenaming(null)}
      />
    </>
  );
};

export default MedicalFoldersPanel;
