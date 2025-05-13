/* import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { RESOURCE_DATA } from "@/consts/resources-data";
import { route } from "@/db/schema";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

async function seedExtraFields() {
  for (const item of RESOURCE_DATA) {
    await db
      .update(route)
      .set({
        audience: item.audience,
        benefits: item.benefits,
        learningOutcomes: item.learningOutcomes,
      })
      .where(eq(route.slug, item.slug));
  }

  console.log("✅ Campos adicionales actualizados en tabla `route`");
}

await seedExtraFields();
 */
