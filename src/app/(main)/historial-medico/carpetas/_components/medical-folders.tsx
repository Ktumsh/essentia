"use client";

import { useUserProfile } from "@/hooks/use-user-profile";

import DeleteFolderAlert from "./delete-folder-alert";
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
    currentFolder,
    setCurrentFolder,
    isLoading,
    isSubmitting,
  } = useMedicalFolders();

  const { open, setOpen } = useMedicalFoldersDialog();

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

  const selectedFolderCount = selectedFolders.length;

  return (
    <div ref={containerRef}>
      <FolderSectionHeader
        count={selectedFolderCount}
        onClear={clearSelection}
        onDelete={() => openDialog("isMultiDeleteFoldersDialogOpen")}
        onNewFolder={() => {
          setCurrentFolder(null);
          setOpen({ ...open, isFolderFormOpen: true });
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
                  setCurrentFolder(folder);
                  setOpen({ ...open, isRenameFolderOpen: true });
                }}
                onEdit={() => {
                  setCurrentFolder(folder);
                  setOpen({ ...open, isFolderFormOpen: true });
                }}
                onDelete={() => {
                  setCurrentFolder(folder);
                  setOpen({ ...open, isDeleteFolderOpen: true });
                }}
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
        isOpen={open.isRenameFolderOpen}
        onOpenChange={(isOpen) =>
          setOpen({ ...open, isRenameFolderOpen: isOpen })
        }
        isSubmitting={isSubmitting}
        currentName={currentFolder?.name || ""}
        onRename={handleRenameFolder}
      />

      <DeleteFolderAlert
        isOpen={open.isDeleteFolderOpen}
        folder={currentFolder}
        setIsOpen={(isOpen) => setOpen({ ...open, isDeleteFolderOpen: isOpen })}
        isSubmitting={isSubmitting}
        onDelete={() => handleDeleteFolder(currentFolder!.id)}
      />

      <MultiDeleteAlert
        ref={modalRef}
        selectedCount={selectedFolderCount}
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
