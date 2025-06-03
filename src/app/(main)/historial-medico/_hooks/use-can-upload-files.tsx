"use client";

import useSWR from "swr";

import { fetcher } from "@/utils";

import type { CanUploadMedicalFile } from "@/db/querys/medical-history-querys";

export function useCanUploadFile(userId?: string) {
  const { data, error, isLoading, mutate } = useSWR<CanUploadMedicalFile>(
    userId ? `/api/can-upload-files?userId=${userId}` : null,
    fetcher,
  );

  return {
    uploadStatus: data,
    isLoading,
    isError: !!error,
    refreshUploadStatus: mutate,
  };
}
