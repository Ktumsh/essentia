"use client";

import { useEffect, useState } from "react";
import { calculateProfileProgress } from "../lib/utils";
import { UserProfileData } from "@/types/session";

const useProfileUpdate = (initialProfileData: UserProfileData) => {
  const [profileData, setProfileData] =
    useState<UserProfileData>(initialProfileData);
  const [progress, setProgress] = useState<number>(
    calculateProfileProgress(initialProfileData)
  );

  useEffect(() => {
    const newProgress = calculateProfileProgress(profileData);
    setProgress(newProgress);
  }, [profileData]);

  const updateProfile = (newData: Partial<UserProfileData>) => {
    setProfileData((prevData) => {
      const updatedData = { ...prevData, ...newData };
      setProgress(calculateProfileProgress(updatedData));
      return updatedData;
    });
  };

  return {
    profileData,
    progress,
    updateProfile,
  };
};

export default useProfileUpdate;
