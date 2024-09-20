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
