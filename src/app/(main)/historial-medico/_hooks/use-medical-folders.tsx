"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";

import {
  createMedicalFolder,
  deleteDocumentsFromFolder,
  deleteManyMedicalFolders,
  deleteMedicalFolder,
  moveManyDocumentsToFolder,
  updateMedicalFolder,
} from "@/db/querys/medical-folder-querys";
import { fetcher } from "@/utils";

import { useMedicalDialogs } from "./use-medical-dialogs";
import { useMedicalFoldersDialog } from "./use-medical-folder-dialogs";

import type { Folder, FolderIconType } from "@/lib/types";

export type FolderFormData = {
  name: string;
  description?: string;
  color: "gray" | "blue" | "green" | "pink" | "red" | "orange" | "purple";
  icon: FolderIconType;
};

interface MedicalFoldersContextType {
  folders: Folder[];
  editingFolder: Folder | null;
  renamingFolder: Folder | null;
  setEditingFolder: (f: Folder | null) => void;
  setRenamingFolder: (f: Folder | null) => void;
  handleCreateFolder: (data: FolderFormData) => Promise<void>;
  handleRenameFolder: (newName: string) => Promise<void>;
  handleUpdateFolder: (data: FolderFormData) => Promise<void>;
  handleDeleteFolder: (id: string) => Promise<void>;
  handleDeleteFolders: (userId: string, ids: string[]) => Promise<void>;
  handleDeleteDocumentsFromFolder: ({
    userId,
    folderId,
    documentIds,
  }: {
    userId: string;
    folderId: string;
    documentIds: string[];
  }) => Promise<void>;
  handleMoveDocuments: (folderId: string, selectedDocuments: string[]) => void;
  isLoading: boolean;
  isSubmitting: boolean;
}

const MedicalFoldersContext = createContext<MedicalFoldersContextType | null>(
  null,
);

export const useMedicalFolders = () => {
  const context = useContext(MedicalFoldersContext);
  if (!context) {
    throw new Error(
      "useMedicalFolders must be used within a MedicalFoldersProvider",
    );
  }
  return context;
};

export const MedicalFoldersProvider = ({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) => {
  const router = useRouter();
  const {
    data: folders = [],
    mutate,
    isLoading,
  } = useSWR<Folder[]>("/api/medical-folders", fetcher);

  const { mutate: mutateActivity } = useSWRConfig();

  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);
  const [renamingFolder, setRenamingFolder] = useState<Folder | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { closeFolderForm } = useMedicalFoldersDialog();

  const { closeDialog } = useMedicalDialogs();

  const handleCreateFolder = useCallback(
    async (data: FolderFormData) => {
      if (isSubmitting) return;
      setIsSubmitting(true);
      try {
        await createMedicalFolder({ userId, ...data });
        mutate();
        mutateActivity("/api/medical-activity");
        closeFolderForm();
      } catch (error) {
        console.error("Error creating folder:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [userId, mutate, mutateActivity, closeFolderForm, isSubmitting],
  );

  const handleRenameFolder = useCallback(
    async (newName: string) => {
      if (!renamingFolder) return;
      await updateMedicalFolder({
        userId,
        folderId: renamingFolder.id,
        name: newName,
      });
      mutate();
      mutateActivity("/api/medical-activity");
      setRenamingFolder(null);
    },
    [renamingFolder, userId, mutate, mutateActivity],
  );

  const handleUpdateFolder = useCallback(
    async (data: FolderFormData) => {
      if (isSubmitting) return;
      setIsSubmitting(true);
      try {
        if (!editingFolder) return;
        await updateMedicalFolder({
          userId,
          folderId: editingFolder.id,
          ...data,
        });
        mutate();
        mutateActivity("/api/medical-activity");
        setEditingFolder(null);
        closeFolderForm();
      } catch (error) {
        console.error("Error updating folder:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      editingFolder,
      userId,
      mutate,
      mutateActivity,
      closeFolderForm,
      isSubmitting,
    ],
  );

  const handleDeleteFolder = useCallback(
    async (folderId: string) => {
      await deleteMedicalFolder({ userId, folderId });
      mutate();
      mutateActivity("/api/medical-activity");
    },
    [userId, mutate, mutateActivity],
  );

  const handleDeleteFolders = useCallback(
    async (userId: string, ids: string[]) => {
      if (isSubmitting) return;
      setIsSubmitting(true);
      if (ids.length === 0) return;

      const promise = deleteManyMedicalFolders({ userId, folderIds: ids });

      try {
        toast.promise(promise, {
          loading:
            ids.length === 1
              ? "Eliminando carpeta..."
              : "Eliminando carpetas...",
          success:
            ids.length === 1
              ? "Carpeta eliminada correctamente"
              : "Carpetas eliminadas correctamente",
          error: "No se pudieron eliminar las carpetas",
        });

        const res = await promise;

        if (!res.success) {
          toast.error(`${res.failed.length} carpetas no se pudieron eliminar.`);
          console.warn("Fallos:", res.failed);
        }

        mutate();
        mutateActivity("/api/medical-activity");
        closeDialog("isMultiDeleteFoldersDialogOpen");
      } catch (err) {
        console.error("Error en eliminación:", err);
        toast.error("Error inesperado al eliminar carpetas.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [mutate, mutateActivity, closeDialog, isSubmitting],
  );

  const handleDeleteDocumentsFromFolder = useCallback(
    async ({
      userId,
      folderId,
      documentIds,
    }: {
      userId: string;
      folderId: string;
      documentIds: string[];
    }) => {
      if (isSubmitting) return;
      setIsSubmitting(true);
      if (documentIds.length === 0) return;

      const promise = deleteDocumentsFromFolder({
        userId,
        folderId,
        documentIds,
      });

      try {
        toast.promise(promise, {
          loading:
            documentIds.length === 1
              ? "Eliminando documento..."
              : "Eliminando documentos...",
          success:
            documentIds.length === 1
              ? "Documento eliminado correctamente"
              : "Documentos eliminados correctamente",
          error: "No se pudieron eliminar los documentos",
        });

        const res = await promise;

        if (!res.success) {
          toast.error(
            `${res.failed.length} documentos no se pudieron eliminar.`,
          );
          console.warn("Fallos:", res.failed);
        }

        mutate();
        mutateActivity("/api/medical-activity");
        closeDialog("isMultiDeleteDocsDialogOpen");
        router.refresh();
      } catch (err) {
        console.error("Error en eliminación:", err);
        toast.error("Error inesperado al eliminar documentos.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [mutate, mutateActivity, router, isSubmitting, closeDialog],
  );

  const handleMoveDocuments = useCallback(
    async (folderId: string, documentIds: string[]) => {
      if (isSubmitting || documentIds.length === 0) return;
      setIsSubmitting(true);

      const promise = moveManyDocumentsToFolder({
        userId,
        documentIds,
        folderId,
      });

      toast.promise(promise, {
        loading:
          documentIds.length === 1
            ? "Moviendo documento..."
            : "Moviendo documentos...",
        success:
          documentIds.length === 1
            ? "Documento movido correctamente."
            : "Documentos movidos correctamente.",
        error: "No se pudieron mover los documentos.",
      });

      try {
        const res = await promise;

        if (!res.success) {
          toast.error(
            `${res.failed.length} documento${res.failed.length > 1 ? "s" : ""} no se movieron.`,
          );
          console.warn("Fallos al mover:", res.failed);
        }

        mutate();
        mutateActivity("/api/medical-activity");
        router.refresh();

        closeDialog("isMoveDocumentsDialogOpen");
      } catch (err) {
        console.error("Error inesperado al mover:", err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, userId, mutate, mutateActivity, router, closeDialog],
  );

  const value = useMemo(
    () => ({
      folders,
      editingFolder,
      renamingFolder,
      setEditingFolder,
      setRenamingFolder,
      handleCreateFolder,
      handleRenameFolder,
      handleUpdateFolder,
      handleDeleteFolder,
      handleDeleteFolders,
      handleDeleteDocumentsFromFolder,
      handleMoveDocuments,
      isLoading,
      isSubmitting,
    }),
    [
      folders,
      editingFolder,
      renamingFolder,
      setEditingFolder,
      setRenamingFolder,
      handleCreateFolder,
      handleRenameFolder,
      handleUpdateFolder,
      handleDeleteFolder,
      handleDeleteFolders,
      handleDeleteDocumentsFromFolder,
      handleMoveDocuments,
      isLoading,
      isSubmitting,
    ],
  );

  return (
    <MedicalFoldersContext.Provider value={value}>
      {children}
    </MedicalFoldersContext.Provider>
  );
};
