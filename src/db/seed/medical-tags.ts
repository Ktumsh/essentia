import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { medicalTag } from "@/db/schema";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

const tags = [
  { name: "Alergia", description: "Condiciones relacionadas con alergias." },
  { name: "Cirugía", description: "Documentos de intervenciones quirúrgicas." },
  { name: "Consulta General", description: "Consultas médicas generales." },
  { name: "Diagnóstico", description: "Diagnósticos médicos formales." },
  { name: "Enfermedad Crónica", description: "Condiciones crónicas." },
  {
    name: "Examen de Laboratorio",
    description: "Exámenes clínicos de laboratorio.",
  },
  {
    name: "Examen de Imagenología",
    description: "Radiografías, ecografías y similares.",
  },
  { name: "Medicación", description: "Prescripciones de medicamentos." },
  { name: "Vacunación", description: "Registro de vacunas recibidas." },
  { name: "Salud Mental", description: "Información de salud mental." },
  { name: "Nutrición", description: "Documentos sobre estado nutricional." },
  { name: "Odontología", description: "Tratamientos odontológicos." },
  { name: "Oftalmología", description: "Documentos sobre salud visual." },
  { name: "Pediatría", description: "Historial médico infantil." },
  {
    name: "Cardiología",
    description: "Información relacionada con el corazón.",
  },
  { name: "Dermatología", description: "Condiciones dermatológicas." },
  { name: "Neurología", description: "Condiciones neurológicas." },
  {
    name: "Certificado Médico",
    description: "Certificados formales de salud.",
  },
  { name: "Informe Médico", description: "Informes clínicos." },
  { name: "Epicrisis", description: "Resumen clínico al alta médica." },
  { name: "Consentimiento Informado", description: "Consentimientos médicos." },
  { name: "Receta Médica", description: "Prescripciones médicas formales." },
  { name: "Rehabilitación", description: "Procesos de rehabilitación." },
  { name: "Ginecología", description: "Información ginecológica." },
  { name: "Otro", description: "Categoría general." },
];

/* await db.insert(plan).values([
  {
    id: "free",
    name: "Plan Básico",
    description:
      "Comienza gratis con acceso limitado a funciones esenciales.",
    maxFiles: 6,
    price: 0,
    supportLevel: "basic",
  },
  {
    id: "premium",
    name: "Plan Premium",
    description:
      "Desbloquea IA, planes personalizados y más herramientas de salud.",
    maxFiles: 24,
    price: 12000,
    supportLevel: "standard",
  },
  {
    id: "premium-plus",
    name: "Plan Premium Plus",
    description:
      "Ahorra 20% al año y obtén soporte prioritario y más espacio médico.",
    maxFiles: 60,
    price: 115200,
    supportLevel: "priority",
  },
]);
 */
async function seedMedicalTags() {
  try {
    await db.insert(medicalTag).values(tags);
    console.log("✅ Tags médicos añadidos correctamente.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error insertando tags:", error);
    process.exit(1);
  }
}

seedMedicalTags();
