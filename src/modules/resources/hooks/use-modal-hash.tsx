"use client";

import { useEffect } from "react";

import { Video } from "@/types/resource";

export const useModalHash = (
  formatedTitle: string,
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  setActiveVideo?: (video: Video | null) => void,
  video?: Video | null,
) => {
  const getDecodedHash = () =>
    decodeURIComponent(window.location.hash.slice(1));

  useEffect(() => {
    const handleHashChange = () => {
      const hash = getDecodedHash();

      if (hash === formatedTitle) {
        if (setActiveVideo && video) {
          setActiveVideo(video);
        }
        setIsOpen(true);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [formatedTitle, setIsOpen, setActiveVideo, video]);

  useEffect(() => {
    const hash = getDecodedHash();
    if (isOpen) {
      history.replaceState(null, "", `#${formatedTitle}`);
    } else {
      if (hash === formatedTitle) {
        history.replaceState(null, "", window.location.pathname);
      }
    }
  }, [isOpen, formatedTitle]);
};
