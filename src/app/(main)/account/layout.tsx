import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import { getStripeCustomerById } from "@/db/payment-querys";
import BillingTabs from "@/modules/account/components/billing-tabs";
import {
  createSetupIntent,
  getUserBillingDetails,
} from "@/modules/payment/pay/actions";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await auth()) as Session;

  if (!session) {
    return redirect("/");
  }

  const customer = session
    ? await getStripeCustomerById(session.user.id)
    : null;

  const billingDetails = customer
    ? await getUserBillingDetails(customer)
    : null;

  const clientSecret =
    billingDetails && customer ? await createSetupIntent(customer) : null;

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
