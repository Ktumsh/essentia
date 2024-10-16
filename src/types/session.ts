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
  email_verified: boolean;
  username: string;
  password: string;
  salt: string;
  is_premium: boolean;
  premium_expires_at: Date;
  stripe_customer_id: string;
  subscription_id: string;
  subscription_status: string;
  updated_at: Date;
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
  email: string;
  is_premium: boolean;
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

export interface UserMessageCount {
  user_id: string;
  message_date: string;
  message_count: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
}

export interface Payment {
  paymentIntentId: string;
  amount: number;
  currency: string;
  date: string;
}

export interface AccountDetails {
  payments: Payment[];
  isPremium: boolean;
  premiumExpiresAt: string | null;
}
