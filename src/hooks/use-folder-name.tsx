"use client";

import useSWR from "swr";

import { getFolderNameById } from "@/db/querys/medical-folder-querys";

const useFolderName = (folderId: string | null) => {
  const { data, error, isLoading } = useSWR(
    folderId ? ["folderName", folderId] : null,
    async ([, id]) => await getFolderNameById(id),
  );

  return {
    folderName: data ?? null,
    isLoading,
    error,
  };
};

export default useFolderName;
