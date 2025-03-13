import { auth } from "@/app/(auth)/auth";
import PageWrapper from "@/components/ui/layout/page-wrapper";
import {
  getPaymentDetails,
  getPaymentHistory,
  getSubscription,
} from "@/db/querys/payment-querys";
import { getUserProfileData } from "@/utils/profile";

import SettingsTabs from "./_components/settings-tabs";

interface SettingLayoutProps {
  children: React.ReactNode;
}

const SettingLayout = async ({ children }: SettingLayoutProps) => {
  const session = await auth();

  const userData = session ? await getUserProfileData({ session }) : null;

  const userId = session?.user?.id as string;

  const [subscription] = session ? await getSubscription(userId) : [];

  const [subscriptionDetails] = session ? await getPaymentDetails(userId) : [];

  const paymentHistory = session ? await getPaymentHistory(userId) : [];
  return (
    <PageWrapper>
      <SettingsTabs
        user={userData}
        session={session}
        subscription={subscription}
        subscriptionDetails={subscriptionDetails}
        paymentHistory={paymentHistory}
      />
      {children}
    </PageWrapper>
  );
};

export default SettingLayout;
