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

  const userData = session ? await getUserProfileData({ session }) : null;

  const userId = session?.user?.id as string;

  const paymentHistory = session ? await getPaymentHistory(userId) : [];
  return (
    <PageWrapper>
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
