import fs from "fs/promises";
import path from "path";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { route, stage, lesson, review, reviewQuestion } from "@/db/schema";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

async function seedLearningRoutes() {
  try {
    const filePath = path.resolve(
      __dirname,
      "../data/resources_actualizado_rutas.json",
    );
    const file = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(file);

    for (const r of data.resources) {
      const routeResult = await db
        .insert(route)
        .values({
          slug: r.slug,
          name: r.name,
          description: r.description,
          about: r.about,
        })
        .returning({ id: route.id });

      const routeId = routeResult[0].id;

      for (const m of r.modules) {
        const stageResult = await db
          .insert(stage)
          .values({
            routeId,
            title: m.title,
            slug: m.slug,
            description: m.description,
            objectives: m.objectives,
            order: m.order,
          })
          .returning({ id: stage.id });

        const stageId = stageResult[0].id;

        for (const l of m.lessons) {
          await db.insert(lesson).values({
            stageId,
            title: l.title,
            slug: l.slug,
            objective: l.objective,
            content: l.content,
            order: l.order,
          });
        }

        if (m.exam) {
          const reviewResult = await db
            .insert(review)
            .values({
              stageId,
              title: m.exam.title,
              slug: m.exam.slug,
              instructions: m.exam.instructions,
            })
            .returning({ id: review.id });

          const reviewId = reviewResult[0].id;

          for (const q of m.exam.questions) {
            await db.insert(reviewQuestion).values({
              reviewId,
              question: q.question,
              options: JSON.stringify(q.options),
              answer: q.answer,
            });
          }
        }
      }
    }

    console.log("✅ Rutas de aprendizaje insertadas correctamente.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error insertando rutas de aprendizaje:", error);
    process.exit(1);
  }
}

seedLearningRoutes();
