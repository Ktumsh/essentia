"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import { FeatureType } from "@/lib/types";

import type { AIRecommendationType } from "../_components/ai-recommendation";
import type { MedicalHistory } from "@/db/querys/medical-history-querys";

type FileData = { url?: string | null; name: string };

export type DialogKeys =
  | "isPremiumModal"
  | "isAddDialogOpen"
  | "isEditDialogOpen"
  | "isViewDialogOpen"
  | "isDeleteDialogOpen"
  | "isAIDialogOpen"
  | "isFileViewerOpen"
  | "isActivityFullViewOpen"
  | "isShareDialogOpen"
  | "isMultiDeleteDocsDialogOpen"
  | "isMultiDeleteRecomsDialogOpen"
  | "isMultiDeleteFoldersDialogOpen"
  | "isMoveDocumentsDialogOpen";

type DialogsState = Record<DialogKeys, boolean>;

interface MedicalDialogsContextValue {
  dialogs: DialogsState;
  openDialog: (key: DialogKeys) => void;
  closeDialog: (key: DialogKeys) => void;

  currentItem: MedicalHistory | null;
  setCurrentItem: (item: MedicalHistory | null) => void;

  editingItem: MedicalHistory | null;
  setEditingItem: (item: MedicalHistory | null) => void;

  itemToDelete: MedicalHistory | null;
  setItemToDelete: (item: MedicalHistory | null) => void;

  fileToView: FileData | null;
  setFileToView: (file: FileData | null) => void;

  recommendationsToShare: AIRecommendationType[];
  setRecommendationsToShare: (recs: AIRecommendationType[]) => void;

  selectedItemsForAI: string[];
  setSelectedItemsForAI: (ids: string[]) => void;

  premiumFeatureType: FeatureType;
  setPremiumFeatureType: (type: FeatureType) => void;
}

const MedicalDialogsContext = createContext<MedicalDialogsContextValue | null>(
  null,
);

export function MedicalDialogsProvider({ children }: { children: ReactNode }) {
  const [dialogs, setDialogs] = useState<DialogsState>({
    isPremiumModal: false,
    isAddDialogOpen: false,
    isEditDialogOpen: false,
    isViewDialogOpen: false,
    isDeleteDialogOpen: false,
    isAIDialogOpen: false,
    isFileViewerOpen: false,
    isActivityFullViewOpen: false,
    isShareDialogOpen: false,
    isMultiDeleteDocsDialogOpen: false,
    isMultiDeleteRecomsDialogOpen: false,
    isMultiDeleteFoldersDialogOpen: false,
    isMoveDocumentsDialogOpen: false,
  });
  const [currentItem, setCurrentItem] = useState<MedicalHistory | null>(null);
  const [editingItem, setEditingItem] = useState<MedicalHistory | null>(null);
  const [itemToDelete, setItemToDelete] = useState<MedicalHistory | null>(null);
  const [fileToView, setFileToView] = useState<FileData | null>(null);
  const [recommendationsToShare, setRecommendationsToShare] = useState<
    AIRecommendationType[]
  >([]);
  const [selectedItemsForAI, setSelectedItemsForAI] = useState<string[]>([]);
  const [premiumFeatureType, setPremiumFeatureType] =
    useState<FeatureType>("general");

  const openDialog = (key: DialogKeys) =>
    setDialogs((d) => ({ ...d, [key]: true }));
  const closeDialog = (key: DialogKeys) =>
    setDialogs((d) => ({ ...d, [key]: false }));

  return (
    <MedicalDialogsContext.Provider
      value={{
        dialogs,
        openDialog,
        closeDialog,
        currentItem,
        setCurrentItem,
        editingItem,
        setEditingItem,
        itemToDelete,
        setItemToDelete,
        fileToView,
        setFileToView,
        recommendationsToShare,
        setRecommendationsToShare,
        selectedItemsForAI,
        setSelectedItemsForAI,
        premiumFeatureType,
        setPremiumFeatureType,
      }}
    >
      {children}
    </MedicalDialogsContext.Provider>
  );
}

export function useMedicalDialogs() {
  const ctx = useContext(MedicalDialogsContext);
  if (!ctx) {
    throw new Error(
      "useMedicalDialogs must be used within a MedicalDialogsProvider",
    );
  }
  return ctx;
}
