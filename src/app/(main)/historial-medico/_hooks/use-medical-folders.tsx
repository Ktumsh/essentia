"use client";

import useSWR from "swr";

import { fetcher } from "@/lib/utils";

import type { Folder } from "@/lib/types";

export function useMedicalFolders() {
  const { data: folders = [], mutate } = useSWR<Folder[]>(
    "/api/medical-folders",
    fetcher,
  );
  return { folders, mutate };
}
