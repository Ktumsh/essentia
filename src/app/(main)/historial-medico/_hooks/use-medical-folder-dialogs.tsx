"use client";

import { createContext, useContext, useState } from "react";

const MedicalFolderDialogContext = createContext<{
  open: {
    isFolderFormOpen: boolean;
    isRenameFolderOpen: boolean;
    isDeleteFolderOpen: boolean;
  };
  setOpen: React.Dispatch<
    React.SetStateAction<{
      isFolderFormOpen: boolean;
      isRenameFolderOpen: boolean;
      isDeleteFolderOpen: boolean;
    }>
  >;
} | null>(null);

export const MedicalFolderDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState({
    isFolderFormOpen: false,
    isRenameFolderOpen: false,
    isDeleteFolderOpen: false,
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
