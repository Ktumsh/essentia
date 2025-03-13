"use client";

import { useState, useCallback } from "react";

export const useProfileImagePreview = (initialImage: string | null) => {
  const [previewProfileImage, setPreviewProfileImage] = useState<string | null>(
    initialImage
  );

  const handleFilePreview = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewProfileImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const resetPreviewsImages = useCallback(() => {
    setPreviewProfileImage(initialImage);
  }, [initialImage]);

  return {
    previewProfileImage,
    setPreviewProfileImage,
    handleFilePreview,
    resetPreviewsImages,
  };
};
