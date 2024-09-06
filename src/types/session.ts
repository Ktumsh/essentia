import { DateValue } from "@internationalized/date";

export interface Session {
  user: {
    id: string;
    email: string;
    username?: string;
    name?: string;
    lastname?: string;
    birthdate?: string;
    image?: string;
  };
}

export interface AuthResult {
  type: string;
  message: string;
}

export interface User extends Record<string, any> {
  id: string;
  email: string;
  username: string;
  password: string;
  salt: string;
}

export interface UserProfile {
  first_name: string;
  last_name: string;
  birthdate: DateValue | string | undefined;
  profile_image: string | null;
  bio: string | null;
  location: string | null;
  banner_image: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface UserProfileData {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  profile_image: string | null;
  birthdate: DateValue | string | undefined;
  bio: string | null;
  location: string | null;
  banner_image: string | null;
  created_at: Date;
}
