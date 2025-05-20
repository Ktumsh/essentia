import type { MedicalFolderActivity } from "@/db/querys/medical-folder-querys";
import type { MedicalHistoryActivityWithDetails } from "@/db/querys/medical-history-querys";
import type { StageProgressType } from "@/db/querys/progress-querys";
import type { UserTrialStatusType } from "@/db/querys/user-querys";
import type {
  Payment,
  Lesson,
  Review,
  Route,
  Stage,
  UserMedicalFolder,
} from "@/db/schema";
import type { FC, SVGProps } from "react";

declare global {
  interface Window {
    YT: any;
  }
}

export type IconSvgProps = SVGProps<SVGSVGElement>;

export type ArticleType = {
  id: number;
  slug: string;
  title: string;
  image: string;
  category: string;
  body: string;
};

export type UserProfileData = {
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
};

export type PaymentHistory = {
  payment: Payment;
  type: "free" | "premium" | "premium-plus" | null;
};

interface ReviewWithCount extends Review {
  questionCount?: number;
}

export type Stages = {
  stage: Stage;
  lessons: Lesson[];
  review: ReviewWithCount | null;
};

export type LearningRoute = {
  userId: string;
  route: {
    routeId: string;
    routeName: string;
  };
  stages: Stages[];
  about: string;
  slug: string;
  completedLessons: string[];
  stageProgress: StageProgressType[];
  routeProgress: { completed: boolean; progress: number };
  routeInitialized: boolean;
  isPremium?: boolean | null;
};

export type LearningRoutes = {
  routeId: string;
  routeName: string;
  routeSlug: string;
  progress: number;
  completed: boolean;
  startedAt: Date | null;
  completedAt: Date | null;
}[];

export type RouteResource = Route & {
  label: string;
  quote: string;
  videoTitle: string;
  videoLink: string;
  component: FC;
  audience: string[];
  benefits: string[];
  learningOutcomes: string[];
};

export type MedicalHistoryActivity =
  | (MedicalHistoryActivityWithDetails & { source: "document" })
  | (MedicalFolderActivity & { source: "folder" });

export type Folder = UserMedicalFolder & {
  documentCount: number;
};

export type FolderIconType =
  | "folder"
  | "health"
  | "document"
  | "heart"
  | "vaccine"
  | "prescription"
  | "exam"
  | "xray"
  | "lab"
  | "surgery"
  | "mental"
  | "pregnancy"
  | "dentist"
  | "file";

export type DeleteManyResult = {
  success: boolean;
  deleted: string[];
  failed: { id: string; error: string }[];
};
