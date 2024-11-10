import { MedicineCategory } from "@/types/resource";

export const medicinesDataGroup1: MedicineCategory[] = [
  {
    category: "Analgésicos y Antiinflamatorios",
    verticalDividerClasses: "mb-[70px] h-auto bg-gray-300 dark:bg-dark md:mb-7",
    innerDividersClasses: [
      "my-4 bg-gray-300 dark:bg-dark",
      "mb-9 bg-gray-300 dark:bg-dark",
      "mb-[70px] bg-gray-300 dark:bg-dark md:mb-7",
    ],
    items: [
      {
        name: "Paracetamol",
        description: "Utilizado para el alivio del dolor y la fiebre.",
      },
      {
        name: "Ibuprofeno",
        description:
          "Un antiinflamatorio no esteroideo (AINE) que también alivia el dolor y reduce la fiebre.",
      },
      {
        name: "Aspirina",
        description:
          "Útil para el alivio del dolor, la fiebre, y como anticoagulante en casos de emergencia cardíaca (como un ataque cardíaco).",
      },
    ],
  },
  {
    category: "Antihistamínicos",
    verticalDividerClasses:
      "mb-[90px] h-auto bg-gray-300 dark:bg-dark md:mb-7 md:bg-gray-200",
    innerDividersClasses: [
      "my-4 bg-gray-300 dark:bg-dark",
      "mb-[90px] bg-gray-300 dark:bg-dark md:mb-7",
    ],
    items: [
      {
        name: "Loratadina",
        description:
          "Utilizado para tratar reacciones alérgicas y síntomas de la fiebre del heno.",
      },
      {
        name: "Difenhidramina",
        description:
          "Un antihistamínico de primera generación que puede ser útil para reacciones alérgicas agudas y como sedante en caso de picaduras de insectos o urticaria.",
      },
    ],
  },
  {
    category: "Antidiarreicos",
    verticalDividerClasses: "mb-8 h-auto bg-gray-300 dark:bg-dark md:mb-4",
    innerDividersClasses: ["my-4 bg-gray-300 dark:bg-dark"],
    items: [
      {
        name: "Loperamida",
        description: "Utilizado para tratar episodios agudos de diarrea.",
      },
    ],
  },
  {
    category: "Antieméticos",
    verticalDividerClasses: "mb-[70px] h-auto bg-gray-300 dark:bg-dark md:mb-7",
    innerDividersClasses: [
      "my-4 bg-gray-300 dark:bg-dark",
      "mb-[70px] bg-gray-300 dark:bg-dark md:mb-7",
    ],
    items: [
      {
        name: "Metoclopramida",
        description:
          "Puede ser utilizado para prevenir o tratar náuseas y vómitos.",
      },
      {
        name: "Ondansetrón",
        description:
          "Un antiemético más potente, útil en casos de náuseas severas, como las que pueden ocurrir con tratamientos de quimioterapia o cirugías.",
      },
    ],
  },
  {
    category: "Antiácidos y Tratamientos para Reflujo Ácido",
    verticalDividerClasses: "mb-12 h-auto bg-gray-300 dark:bg-dark md:mb-7",
    innerDividersClasses: [
      "my-4 bg-gray-300 dark:bg-dark",
      "mb-12 bg-gray-300 dark:bg-dark md:mb-7",
    ],
    items: [
      {
        name: "Omeprazol",
        description:
          "Un inhibidor de la bomba de protones que reduce la producción de ácido en el estómago, útil para el tratamiento del reflujo ácido y la acidez.",
      },
      {
        name: "Hidróxido de magnesio/aluminio (Maalox, Mylanta)",
        description:
          "Antiácidos de acción rápida para aliviar la acidez estomacal.",
      },
    ],
  },
];

export const medicinesDataGroup2: MedicineCategory[] = [
  {
    category: "Antibióticos Tópicos",
    verticalDividerClasses: "mb-[72px] h-auto bg-gray-300 dark:bg-dark md:mb-8",
    innerDividersClasses: ["my-4 bg-gray-300 dark:bg-dark"],
    items: [
      {
        name: "Neomicina/Bacitracina/Polimixina B (Neosporin)",
        description:
          "Una crema o ungüento antibiótico para prevenir infecciones en cortes y raspaduras.",
      },
    ],
  },
  {
    category: "Crema de Hidrocortisona",
    verticalDividerClasses: "mb-[72px] h-auto bg-gray-300 dark:bg-dark md:mb-8",
    innerDividersClasses: ["my-4 bg-gray-300 dark:bg-dark"],
    items: [
      {
        name: "Crema de Hidrocortisona",
        description:
          "Útil para tratar picazón e inflamación por picaduras de insectos, dermatitis de contacto, y otras afecciones cutáneas menores.",
      },
    ],
  },
  {
    category: "Solución Salina Estéril",
    verticalDividerClasses: "mb-8 h-auto bg-gray-300 dark:bg-dark md:mb-4",
    innerDividersClasses: ["my-4 bg-gray-300 dark:bg-dark"],
    items: [
      {
        name: "Solución Salina Estéril",
        description:
          "Para limpiar heridas o utilizar como colirio en caso de irritación ocular.",
      },
    ],
  },
  {
    category: "Epinefrina (EpiPen)",
    verticalDividerClasses: "mb-[72px] h-auto bg-gray-300 dark:bg-dark md:mb-8",
    innerDividersClasses: ["my-4 bg-gray-300 dark:bg-dark"],
    items: [
      {
        name: "Epinefrina (EpiPen)",
        description:
          "Utilizada para tratar reacciones alérgicas severas (anafilaxia). Este medicamento solo debe ser utilizado bajo prescripción médica y con la debida capacitación.",
      },
    ],
  },
  {
    category: "Carbón Activado",
    verticalDividerClasses: "mb-[72px] h-auto bg-gray-300 dark:bg-dark md:mb-8",
    innerDividersClasses: ["my-4 bg-gray-300 dark:bg-dark"],
    items: [
      {
        name: "Carbón Activado",
        description:
          "Puedes ser utilizado en ciertos casos de intoxicación para adsorber toxinas en el estómago, siempre bajo la dirección de un profesional de salud.",
      },
    ],
  },
];
