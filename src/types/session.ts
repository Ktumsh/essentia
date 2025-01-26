export interface AuthResult {
  type: string;
  message: string;
}

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
