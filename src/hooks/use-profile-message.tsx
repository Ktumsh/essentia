"use client";

import {
  useCallback,
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";

import type { UserProfileData } from "@/lib/types";

interface ProfileMessageContextProps {
  isDismissed: boolean;
  dismiss: () => void;
}

const ProfileMessageContext = createContext<
  ProfileMessageContextProps | undefined
>(undefined);

export const ProfileMessageProvider = ({
  user,
  children,
}: {
  user: UserProfileData | null;
  children: ReactNode;
}) => {
  const [isDismissed, setIsDismissed] = useState(true);

  const isProfileIncomplete =
    !user?.bio ||
    !user?.location ||
    !user?.height ||
    !user?.weight ||
    !user?.genre;
  const isNotPremium = !user?.isPremium;

  useEffect(() => {
    const dismissed = sessionStorage.getItem(`usrMsgDismiss-${user?.id}`);

    if (!user?.id) {
      setIsDismissed(true);
      return;
    }

    if (dismissed === "true") {
      setIsDismissed(true);
      return;
    }

    if (isProfileIncomplete || isNotPremium) {
      setIsDismissed(false);
    } else {
      setIsDismissed(true);
    }
  }, [isProfileIncomplete, isNotPremium, user?.id]);

  const dismiss = useCallback(() => {
    if (!user?.id) return;
    sessionStorage.setItem(`usrMsgDismiss-${user.id}`, "true");
    setIsDismissed(true);
  }, [user?.id]);

  return (
    <ProfileMessageContext.Provider value={{ isDismissed, dismiss }}>
      {children}
    </ProfileMessageContext.Provider>
  );
};

export const useProfileMessage = () => {
  const context = useContext(ProfileMessageContext);
  if (!context)
    throw new Error(
      "useProfileMessage debe usarse dentro de un ProfileMessageProvider",
    );
  return context;
};
