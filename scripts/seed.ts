import { config } from "dotenv";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import resources from "../src/db/data/resources.json";
import {
  resource,
  resourceModule,
  lesson,
  exam,
  examQuestion,
} from "../src/db/schema";

config({
  path: ".env.local",
});

const client = postgres(process.env.POSTGRES_URL!, {
  ssl: { rejectUnauthorized: false },
});
const db = drizzle(client);

async function importResources() {
  for (const resourceData of resources.resources) {
    // Recurso
    let res = await db
      .select()
      .from(resource)
      .where(eq(resource.slug, resourceData.slug))
      .execute();

    if (res.length === 0) {
      res = await db
        .insert(resource)
        .values({
          slug: resourceData.slug,
          name: resourceData.name,
          description: resourceData.description,
          about: resourceData.about,
        })
        .returning();
      console.log(`Recurso "${resourceData.name}" insertado.`);
    } else {
      console.log(`El recurso "${resourceData.name}" ya existe.`);
    }

    const resourceId = res[0].id;

    if (!resourceData.modules) continue;

    // Ordenar los módulos por el campo 'order'
    const sortedModules = [...resourceData.modules].sort(
      (a, b) => a.order - b.order,
    );

    for (const moduleData of sortedModules) {
      // Módulo
      let mod = await db
        .select()
        .from(resourceModule)
        .where(
          and(
            eq(resourceModule.title, moduleData.title),
            eq(resourceModule.resourceId, resourceId),
          ),
        )
        .execute();

      if (mod.length === 0) {
        mod = await db
          .insert(resourceModule)
          .values({
            resourceId: resourceId,
            title: moduleData.title,
            slug: moduleData.slug,
            description: moduleData.description,
            objectives: moduleData.objectives,
            order: moduleData.order,
          })
          .returning();
        console.log(`Módulo "${moduleData.title}" insertado.`);
      } else {
        console.log(`El módulo "${moduleData.title}" ya existe.`);
      }

      const moduleId = mod[0].id;

      // Ordenar las lecciones por el campo 'order'
      const sortedLessons = [...moduleData.lessons].sort(
        (a, b) => a.order - b.order,
      );

      for (const lessonData of sortedLessons) {
        // Lección
        const contentMarkdown = lessonData.content;

        let les = await db
          .select()
          .from(lesson)
          .where(
            and(
              eq(lesson.title, lessonData.title),
              eq(lesson.moduleId, moduleId),
            ),
          )
          .execute();

        if (les.length === 0) {
          les = await db
            .insert(lesson)
            .values({
              moduleId: moduleId,
              title: lessonData.title,
              slug: lessonData.slug,
              objective: lessonData.objective,
              content: contentMarkdown,
              order: lessonData.order,
            })
            .returning();
          console.log(`Lección "${lessonData.title}" insertada.`);
        } else {
          console.log(`La lección "${lessonData.title}" ya existe.`);
        }
      }

      // Examen
      if (moduleData.exam) {
        let ex = await db
          .select()
          .from(exam)
          .where(
            and(
              eq(exam.slug, moduleData.exam.slug),
              eq(exam.moduleId, moduleId),
            ),
          )
          .execute();

        if (ex.length === 0) {
          ex = await db
            .insert(exam)
            .values({
              moduleId: moduleId,
              title: moduleData.exam.title,
              slug: moduleData.exam.slug,
              instructions: moduleData.exam.instructions,
            })
            .returning();
          console.log(`Examen "${moduleData.exam.title}" insertado.`);
        } else {
          console.log(`El examen "${moduleData.exam.title}" ya existe.`);
        }

        const examId = ex[0].id;

        // Preguntas del examen
        for (const questionData of moduleData.exam.questions) {
          const questions = await db
            .select()
            .from(examQuestion)
            .where(
              and(
                eq(examQuestion.examId, examId),
                eq(examQuestion.question, questionData.question),
              ),
            )
            .execute();

          if (questions.length === 0) {
            await db
              .insert(examQuestion)
              .values({
                examId: examId,
                question: questionData.question,
                options: JSON.stringify(questionData.options),
                answer: questionData.answer,
              })
              .execute();
            console.log(
              `Pregunta "${questionData.question}" insertada en el examen "${moduleData.exam.title}".`,
            );
          } else {
            console.log(
              `La pregunta "${questionData.question}" ya existe en el examen "${moduleData.exam.title}".`,
            );
          }
        }
      }
    }
  }

  console.log("Importación de recursos completada exitosamente.");
  process.exit();
}

importResources();
