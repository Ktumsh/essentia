import { getStripeCustomerById } from "@/db/actions";
import BillingDetails from "@/modules/account/components/billing-details";
import BillingHeader from "@/modules/account/components/billing-header";
import BillingTabs from "@/modules/account/components/billing-tabs";
import {
  createSetupIntent,
  getUserBillingDetails,
} from "@/modules/payment/pay/actions";
import { Session } from "@/types/session";
import { auth } from "@@/auth";

export default async function BillingPage() {
  const session = (await auth()) as Session;

  const customer = session
    ? await getStripeCustomerById(session.user.id)
    : null;

  const billingDetails = customer
    ? await getUserBillingDetails(customer)
    : null;

  const clientSecret =
    billingDetails && customer ? await createSetupIntent(customer) : null;

  return (
    <div className="flex flex-col min-h-dvh w-full pt-14">
      <main className="flex-1">
        <div className="flex-1 size-full max-w-5xl mx-auto text-base-color dark:text-base-color-dark bg-white dark:bg-base-full-dark border border-y-0 border-gray-200 dark:border-base-dark">
          <BillingHeader />
          <BillingTabs
            billingDetails={billingDetails}
            clientSecret={clientSecret}
          />
        </div>
      </main>
    </div>
  );
}
