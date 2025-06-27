"use client";

import { createContext, useContext, useState } from "react";

const MedicalFolderDialogContext = createContext<{
  open: {
    isAddFolderOpen: boolean;
    isEditFolderOpen: boolean;
    isRenameFolderOpen: boolean;
    isDeleteFolderOpen: boolean;
    isViewFolderOpen: boolean;
  };
  setOpen: React.Dispatch<
    React.SetStateAction<{
      isAddFolderOpen: boolean;
      isEditFolderOpen: boolean;
      isRenameFolderOpen: boolean;
      isDeleteFolderOpen: boolean;
      isViewFolderOpen: boolean;
    }>
  >;
} | null>(null);

export const MedicalFolderDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState({
    isAddFolderOpen: false,
    isEditFolderOpen: false,
    isRenameFolderOpen: false,
    isDeleteFolderOpen: false,
    isViewFolderOpen: false,
  });

  return (
    <MedicalFolderDialogContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {children}
    </MedicalFolderDialogContext.Provider>
  );
};

export const useMedicalFoldersDialog = () => {
  const context = useContext(MedicalFolderDialogContext);
  if (!context)
    throw new Error("useMedicalFoldersDialog must be used within provider");
  return context;
};
