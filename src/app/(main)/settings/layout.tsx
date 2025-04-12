import { auth } from "@/app/(auth)/auth";
import PageWrapper from "@/components/ui/layout/page-wrapper";
import { getPaymentHistory } from "@/db/querys/payment-querys";
import { getUserProfileData } from "@/utils/profile";

import SettingsTabs from "./_components/settings-tabs";

interface SettingLayoutProps {
  children: React.ReactNode;
}

const SettingLayout = async ({ children }: SettingLayoutProps) => {
  const session = await auth();
  const userId = session?.user?.id as string;

  const userData = userId ? await getUserProfileData({ userId }) : null;

  const paymentHistory = session ? await getPaymentHistory(userId) : [];
  return (
    <PageWrapper className="pb-0">
      <SettingsTabs
        user={userData}
        session={session}
        paymentHistory={paymentHistory}
      />
      {children}
    </PageWrapper>
  );
};

export default SettingLayout;
