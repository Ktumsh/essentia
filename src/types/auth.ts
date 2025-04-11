import { UserTrialStatusType } from "@/db/querys/user-querys";

export interface UserProfileData {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  profileImage: string | null;
  birthdate: Date | null;
  genre: string | null;
  weight: number | null;
  height: number | null;
  bio: string | null;
  location: string | null;
  isPremium: boolean | null;
  createdAt: Date;
  trial: UserTrialStatusType;
}
