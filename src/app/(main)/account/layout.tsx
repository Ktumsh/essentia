import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import { getPaymentDetails, getSubscription } from "@/db/querys/payment-querys";
import AccountTabs from "@/modules/account/components/account-tabs";
import { getUserProfileData } from "@/utils/profile";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return redirect("/");
  }

  const [subscription] = await getSubscription(session?.user?.id as string);

  const [billingDetail] = await getPaymentDetails(session?.user?.id as string);

  const userData = session ? await getUserProfileData({ session }) : null;

  return (
    <div className="mx-auto h-full min-h-[calc(100dvh-56px)] max-w-7xl flex-1 border-gray-200 bg-white text-main dark:border-dark dark:bg-full-dark dark:text-main-dark md:h-auto md:border md:border-y-0">
      {children}
      <AccountTabs
        subscription={subscription}
        billingDetail={billingDetail}
        user={userData}
      />
    </div>
  );
}
