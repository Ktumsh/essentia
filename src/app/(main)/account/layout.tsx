import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import { getSubscription } from "@/db/querys/payment-querys";
import BillingTabs from "@/modules/account/components/billing-tabs";
import {
  createSetupIntent,
  getUserBillingDetails,
} from "@/modules/payment/pay/actions";
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

  const client = subscription.clientId;

  const billingDetails = client ? await getUserBillingDetails(client) : null;

  const clientSecret =
    billingDetails && client ? await createSetupIntent(client) : null;

  const profileData = session ? await getUserProfileData(session) : null;

  return (
    <div className="mx-auto h-full min-h-[calc(100dvh-56px)] max-w-7xl flex-1 border-gray-200 bg-white text-main dark:border-dark dark:bg-full-dark dark:text-main-dark md:h-auto md:border md:border-y-0">
      {children}
      <BillingTabs
        profileData={profileData}
        billingDetails={billingDetails}
        clientSecret={clientSecret as string}
      />
    </div>
  );
}
