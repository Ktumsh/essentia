import { expect as baseExpect, test as baseTest } from "@playwright/test";

import { createAuthenticatedContext, type UserContext } from "./helpers";

interface Fixtures {
  adaContext: UserContext;
  babbageContext: UserContext;
  curieContext: UserContext;
}

export const test = baseTest.extend<object, Fixtures>({
  adaContext: [
    async ({ browser }, use) => {
      const ada = await createAuthenticatedContext({ browser });
      await use(ada);
      await ada.context.close();
    },
    { scope: "worker" },
  ],
  babbageContext: [
    async ({ browser }, use) => {
      const babbage = await createAuthenticatedContext({ browser });
      await use(babbage);
      await babbage.context.close();
    },
    { scope: "worker" },
  ],
  curieContext: [
    async ({ browser }, use) => {
      const curie = await createAuthenticatedContext({ browser });
      await use(curie);
      await curie.context.close();
    },
    { scope: "worker" },
  ],
});

export const expect = baseExpect;
