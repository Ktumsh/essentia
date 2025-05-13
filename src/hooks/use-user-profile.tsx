"use client";

import { createContext, useContext, useState, ReactNode } from "react";

import type { UserProfileData } from "@/lib/types";

interface UserProfileContextType {
  user: UserProfileData | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfileData | null>>;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(
  undefined,
);

interface UserProfileProviderProps {
  initialUserData: UserProfileData | null;
  children: ReactNode;
}

export const UserProfileProvider = ({
  initialUserData,
  children,
}: UserProfileProviderProps) => {
  const [user, setUser] = useState<UserProfileData | null>(initialUserData);

  return (
    <UserProfileContext.Provider value={{ user, setUser }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error(
      "useUserProfile debe usarse dentro de un UserProfileProvider",
    );
  }
  return context;
};
