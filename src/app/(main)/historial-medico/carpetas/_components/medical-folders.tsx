"use client";

import { useUserProfile } from "@/hooks/use-user-profile";

import FolderItem from "./folder-item";
import FolderLoading from "./folder-loading";
import FolderSectionHeader from "./folder-section-header";
import RenameFolderForm from "./rename-folder-form";
import MultiDeleteAlert from "../../_components/multi-delete-alert";
import { useMedicalDialogs } from "../../_hooks/use-medical-dialogs";
import { useMedicalFoldersDialog } from "../../_hooks/use-medical-folder-dialogs";
import { useMedicalFolders } from "../../_hooks/use-medical-folders";
import { useMultiSelect } from "../../_hooks/use-multi-select";

import type { Folder } from "@/lib/types";

const MedicalFolders = () => {
  const { user } = useUserProfile();
  const userId = user?.id;

  const {
    folders,
    handleRenameFolder,
    handleDeleteFolder,
    handleDeleteFolders,
    setEditingFolder,
    renamingFolder,
    setRenamingFolder,
    isLoading,
    isSubmitting,
  } = useMedicalFolders();

  const { openFolderForm } = useMedicalFoldersDialog();

  const { dialogs, openDialog, closeDialog } = useMedicalDialogs();

  const {
    selectedIds: selectedFolders,
    handleSelect,
    clearSelection,
    containerRef,
    modalRef,
    handlePointerDown,
    handlePointerUp,
  } = useMultiSelect<Folder>("folders", folders);

  return (
    <div ref={containerRef}>
      <FolderSectionHeader
        count={selectedFolders.length}
        onClear={clearSelection}
        onDelete={() => openDialog("isMultiDeleteFoldersDialogOpen")}
        onNewFolder={() => {
          setEditingFolder(null);
          openFolderForm();
        }}
        variant="folders"
      />

      <div className="mt-3">
        {isLoading ? (
          <FolderLoading />
        ) : folders?.length === 0 ? (
          <div className="mt-3 flex h-20 items-center justify-center rounded-xl border border-dashed">
            <p className="text-muted-foreground text-sm">
              Aún no tienes carpetas creadas
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 2xl:grid-cols-5">
            {folders?.slice(0, 10).map((folder, index) => (
              <FolderItem
                key={folder.id}
                folder={folder}
                onRename={() => {
                  setRenamingFolder(folder);
                }}
                onEdit={() => {
                  setEditingFolder(folder);
                  openFolderForm();
                }}
                onDelete={() => handleDeleteFolder(folder.id)}
                selected={selectedFolders.includes(folder.id)}
                onSelect={(e) => handleSelect(e, folder.id, index)}
                onDoubleClick={() => clearSelection()}
                onPointerDown={(e) => handlePointerDown(folder.id, index, e)}
                onPointerUp={() => handlePointerUp(folder.id, index)}
              />
            ))}
          </div>
        )}
      </div>

      <RenameFolderForm
        isOpen={!!renamingFolder}
        currentName={renamingFolder?.name || ""}
        onRename={handleRenameFolder}
        onClose={() => setRenamingFolder(null)}
      />

      <MultiDeleteAlert
        ref={modalRef}
        isOpen={dialogs.isMultiDeleteFoldersDialogOpen}
        setIsOpen={(open) =>
          open
            ? openDialog("isMultiDeleteFoldersDialogOpen")
            : closeDialog("isMultiDeleteFoldersDialogOpen")
        }
        onDelete={() => {
          handleDeleteFolders(userId!, selectedFolders);
          clearSelection();
        }}
        isSubmitting={isSubmitting}
        type="folder"
      />
    </div>
  );
};

export default MedicalFolders;
