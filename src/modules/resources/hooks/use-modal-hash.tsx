"use client";

import { useEffect } from "react";

import { Video } from "@/types/resource";

export const useModalHash = (
  formatedTitle: string,
  isOpen: boolean,
  onOpen: () => void,
  setActiveVideo?: (video: Video | null) => void,
  video?: Video | null,
) => {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === formatedTitle) {
        if (setActiveVideo && video) {
          setActiveVideo(video);
        }
        onOpen();
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [formatedTitle, onOpen, setActiveVideo, video]);

  useEffect(() => {
    if (isOpen) {
      history.replaceState(null, "", `#${formatedTitle}`);
    } else {
      if (window.location.hash.slice(1) === formatedTitle) {
        history.replaceState(null, "", window.location.pathname);
      }
    }
  }, [isOpen, formatedTitle]);
};
