"use client";

import { useUserProfile } from "@/hooks/use-user-profile";

import FolderItem from "./folder-item";
import FolderSectionHeader from "./folder-section-header";
import RenameFolderForm from "./rename-folder-form";
import { useMedicalFoldersDialog } from "../../_hooks/use-medical-folder-dialogs";
import { useMedicalFolders } from "../../_hooks/use-medical-folders";
import { useMultiSelect } from "../../_hooks/use-multi-select";

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
  } = useMedicalFolders();

  const { openFolderForm } = useMedicalFoldersDialog();

  const {
    selectedIds: selectedFolders,
    handleSelect,
    clearSelection,
    containerRef,
  } = useMultiSelect(folders);

  return (
    <>
      <FolderSectionHeader
        count={selectedFolders.length}
        onClear={clearSelection}
        onDelete={() => handleDeleteFolders(userId!, selectedFolders)}
        onNewFolder={() => {
          setEditingFolder(null);
          openFolderForm();
        }}
        variant="folders"
      />

      <div className="mt-3">
        {folders?.length === 0 ? (
          <div className="mt-3 flex h-20 items-center justify-center rounded-xl border border-dashed">
            <p className="text-muted-foreground text-sm">
              Aún no tienes carpetas creadas
            </p>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="grid grid-cols-1 gap-5 md:grid-cols-3 2xl:grid-cols-5"
          >
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
    </>
  );
};

export default MedicalFolders;
