import { auth } from "@/app/(auth)/auth";
import {
  getPaymentDetails,
  getPaymentHistory,
  getSubscription,
} from "@/db/querys/payment-querys";
import SettingsTabs from "@/modules/settings/components/settings-tabs";
import { getUserProfileData } from "@/utils/profile";

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
    <div className="mx-auto flex h-full min-h-[calc(100dvh-56px)] max-w-7xl flex-1 flex-col border-gray-200 bg-white text-main dark:border-dark dark:bg-full-dark dark:text-main-dark md:h-auto md:border md:border-y-0">
      <SettingsTabs
        user={userData}
        session={session}
        subscription={subscription}
        subscriptionDetails={subscriptionDetails}
        paymentHistory={paymentHistory}
      />
      {children}
    </div>
  );
};

export default SettingLayout;
