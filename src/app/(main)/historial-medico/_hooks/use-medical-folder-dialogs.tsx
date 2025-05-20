"use client";

import { createContext, useContext, useState } from "react";

const MedicalFolderDialogContext = createContext<{
  isFolderFormOpen: boolean;
  openFolderForm: () => void;
  closeFolderForm: () => void;
} | null>(null);

export const MedicalFolderDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isFolderFormOpen, setIsFolderFormOpen] = useState(false);

  return (
    <MedicalFolderDialogContext.Provider
      value={{
        isFolderFormOpen,
        openFolderForm: () => setIsFolderFormOpen(true),
        closeFolderForm: () => setIsFolderFormOpen(false),
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
