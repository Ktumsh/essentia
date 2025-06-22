import { auth } from "@/app/(auth)/auth";
import PageWrapper from "@/components/layout/page-wrapper";
import { getPaymentHistory } from "@/db/querys/payment-querys";

import SettingsTabs from "./_components/settings-tabs";

export const experimental_ppr = true;

interface SettingLayoutProps {
  children: React.ReactNode;
}

const SettingLayout = async ({ children }: SettingLayoutProps) => {
  const session = await auth();
  const userId = session?.user?.id as string;

  const paymentHistory = userId ? await getPaymentHistory(userId) : [];
  return (
    <PageWrapper className="pb-0">
      <SettingsTabs session={session} paymentHistory={paymentHistory} />
      {children}
    </PageWrapper>
  );
};

export default SettingLayout;
