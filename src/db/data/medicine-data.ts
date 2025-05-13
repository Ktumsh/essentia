export const MEDICINE_DATA = [
  {
    id: 1,
    category: "Analgésicos y Antiinflamatorios",
    description:
      "Medicamentos para aliviar el dolor, la inflamación y la fiebre",
    items: [
      {
        name: "Paracetamol",
        description:
          "Analgésico y antipirético para el alivio del dolor y la fiebre.",
        dosage: "500-1000 mg cada 4-6 horas (máx. 4g/día)",
        usage: "Dolor leve a moderado, fiebre",
        warnings: "No exceder la dosis. Riesgo de daño hepático en sobredosis.",
        type: "tabletas",
        tags: ["fiebre", "dolor", "analgésico"],
      },
      {
        name: "Ibuprofeno",
        description:
          "Antiinflamatorio no esteroideo (AINE) para dolor, inflamación y fiebre.",
        dosage: "200-400 mg cada 4-6 horas (máx. 1200 mg/día)",
        usage: "Dolor muscular, inflamación, fiebre, dolor menstrual",
        warnings: "Evitar en personas con úlceras o problemas renales.",
        type: "tabletas",
        tags: ["dolor", "inflamación", "fiebre", "aine"],
      },
      {
        name: "Aspirina",
        description: "Analgésico, antipirético y anticoagulante.",
        dosage: "325-650 mg cada 4-6 horas (máx. 4g/día)",
        usage: "Dolor, fiebre, prevención de eventos cardíacos",
        warnings:
          "No usar en niños (riesgo de síndrome de Reye). Evitar si hay riesgo de sangrado.",
        type: "tabletas",
        tags: ["dolor", "cardiaco", "fiebre", "anticoagulante"],
      },
    ],
  },
  {
    id: 2,
    category: "Antihistamínicos",
    description:
      "Usados para tratar reacciones alérgicas, picazón y congestión",
    items: [
      {
        name: "Loratadina",
        description:
          "Antihistamínico para aliviar síntomas de alergias como picazón y congestión.",
        dosage: "10 mg una vez al día",
        usage: "Alergias estacionales, rinitis, urticaria",
        warnings:
          "Evitar combinar con alcohol. Puede causar somnolencia en algunos casos.",
        type: "tabletas",
        tags: ["alergias", "congestión", "antihistamínico"],
      },
      {
        name: "Difenhidramina",
        description: "Antihistamínico sedante de primera generación.",
        dosage: "25-50 mg cada 4-6 horas (máx. 300 mg/día)",
        usage: "Alergias agudas, insomnio, picaduras, urticaria",
        warnings: "Produce somnolencia. No operar maquinaria.",
        type: "tabletas",
        tags: ["alergia", "sedante", "urticaria"],
      },
    ],
  },
  {
    id: 3,
    category: "Antidiarreicos",
    description: "Indicados para controlar episodios de diarrea aguda",
    items: [
      {
        name: "Loperamida",
        description: "Tratamiento para episodios agudos de diarrea.",
        dosage: "2 mg después de cada deposición líquida (máx. 8 mg/día)",
        usage: "Diarrea aguda",
        warnings:
          "No usar en casos de fiebre alta o sangre en heces. No para uso prolongado.",
        type: "cápsulas",
        tags: ["diarrea", "digestivo", "emergencia"],
      },
    ],
  },
  {
    id: 4,
    category: "Antieméticos",
    description: "Medicamentos que ayudan a controlar náuseas y vómitos",
    items: [
      {
        name: "Metoclopramida",
        description: "Tratamiento para náuseas y vómitos.",
        dosage: "10 mg hasta 3 veces al día",
        usage: "Náuseas por migrañas, gastroenteritis o medicamentos",
        warnings:
          "Puede causar somnolencia o movimientos involuntarios en uso prolongado.",
        type: "tabletas",
        tags: ["náuseas", "vómito", "digestivo"],
      },
      {
        name: "Ondansetrón",
        description: "Antiemético potente para náuseas severas.",
        dosage: "4-8 mg cada 8 horas",
        usage: "Náuseas por quimioterapia, cirugía o gastroenteritis severa",
        warnings: "Consultar antes de usar durante el embarazo.",
        type: "tabletas sublinguales",
        tags: ["quimioterapia", "náuseas", "antiemético"],
      },
    ],
  },
  {
    id: 5,
    category: "Antiácidos y Tratamientos para Reflujo Ácido",
    description: "Reducen la acidez estomacal y alivian el reflujo gástrico",
    items: [
      {
        name: "Omeprazol",
        description: "Reduce la producción de ácido en el estómago.",
        dosage: "20-40 mg una vez al día antes del desayuno",
        usage: "Reflujo gastroesofágico, úlceras, gastritis",
        warnings: "No usar por más de 14 días sin supervisión médica.",
        type: "cápsulas",
        tags: ["acidez", "reflujo", "estómago"],
      },
      {
        name: "Hidróxido de magnesio/aluminio (Maalox, Mylanta)",
        description: "Alivio rápido para la acidez estomacal.",
        dosage: "10-20 mL según necesidad, hasta 4 veces al día",
        usage: "Alivio ocasional de acidez o indigestión",
        warnings: "Puede causar diarrea o estreñimiento según el compuesto.",
        type: "suspensión oral",
        tags: ["acidez", "digestivo", "rápido"],
      },
    ],
  },
  {
    id: 6,
    category: "Antibióticos Tópicos",
    description: "Previenen infecciones en heridas y cortes menores",
    items: [
      {
        name: "Neomicina/Bacitracina/Polimixina B (Neosporin)",
        description: "Antibiótico tópico para cortes y raspaduras.",
        dosage: "Aplicar una pequeña capa 1-3 veces al día",
        usage: "Prevención de infecciones cutáneas leves",
        warnings: "No usar en heridas profundas o quemaduras graves.",
        type: "ungüento",
        tags: ["heridas", "infección", "tópico"],
      },
    ],
  },
  {
    id: 7,
    category: "Crema de Hidrocortisona",
    description: "Alivia irritaciones e inflamaciones leves en la piel",
    items: [
      {
        name: "Crema de Hidrocortisona",
        description: "Alivia picazón e inflamación en la piel.",
        dosage: "Aplicar 1-2 veces al día según indicación médica",
        usage: "Picaduras, dermatitis, alergias cutáneas",
        warnings:
          "No aplicar en zonas extensas ni por más de 7 días sin indicación médica.",
        type: "crema",
        tags: ["alergia", "piel", "inflamación"],
      },
    ],
  },
  {
    id: 8,
    category: "Solución Salina Estéril",
    description: "Para limpiar heridas, ojos o lentes de contacto",
    items: [
      {
        name: "Solución Salina Estéril",
        description: "Limpieza de heridas, ojos y lentes de contacto.",
        dosage: "Uso tópico según necesidad",
        usage: "Lavar heridas, enjuagar ojos, limpiar lentes de contacto",
        warnings: "Usar solo si el envase está intacto. No reutilizar.",
        type: "ampolla o spray",
        tags: ["heridas", "ojos", "salina"],
      },
    ],
  },
  {
    id: 9,
    category: "Epinefrina (EpiPen)",
    description: "Tratamiento de emergencia para reacciones alérgicas graves",
    items: [
      {
        name: "Epinefrina (EpiPen)",
        description:
          "Tratamiento de emergencia para reacciones alérgicas severas.",
        dosage: "0.3 mg por autoinyector en adultos (solo en emergencia)",
        usage: "Anafilaxia por alimentos, picaduras o medicamentos",
        warnings: "Solo con indicación médica y entrenamiento previo.",
        type: "autoinyector",
        tags: ["anafilaxia", "alergia", "emergencia"],
      },
    ],
  },
  {
    id: 10,
    category: "Carbón Activado",
    description: "Absorbe toxinas en casos de intoxicación aguda",
    items: [
      {
        name: "Carbón Activado",
        description: "Ayuda a adsorber toxinas en el estómago.",
        dosage: "25-100 g en adultos según el tipo de intoxicación",
        usage: "Intoxicaciones agudas por medicamentos o químicos",
        warnings:
          "No usar si hay riesgo de obstrucción intestinal. Solo bajo supervisión médica.",
        type: "polvo o suspensión",
        tags: ["intoxicación", "emergencia", "digestivo"],
      },
    ],
  },
];

export type MedicineCategory = (typeof MEDICINE_DATA)[number];
export type Medicine = (typeof MEDICINE_DATA)[number]["items"][number];

export const MEDICINE_COLOR = {
  1: {
    text: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950",
    border: "border-red-200 dark:border-red-900/50",
    borderAccent: "border-l-red-500!",
  },
  2: {
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950",
    border: "border-blue-200 dark:border-blue-900/50",
    borderAccent: "border-l-blue-500!",
  },
  3: {
    text: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-950",
    border: "border-green-200 dark:border-green-900/50",
    borderAccent: "border-l-green-500!",
  },
  4: {
    text: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-950",
    border: "border-yellow-200 dark:border-yellow-900/50",
    borderAccent: "border-l-yellow-500!",
  },
  5: {
    text: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950",
    border: "border-purple-200 dark:border-purple-900/50",
    borderAccent: "border-l-purple-500!",
  },
  6: {
    text: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-50 dark:bg-pink-950",
    border: "border-pink-200 dark:border-pink-900/50",
    borderAccent: "border-l-pink-500!",
  },
  7: {
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950",
    border: "border-amber-200 dark:border-amber-900/50",
    borderAccent: "border-l-amber-500!",
  },
  8: {
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950",
    border: "border-rose-200 dark:border-rose-900/50",
    borderAccent: "border-l-rose-500!",
  },
  9: {
    text: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-950",
    border: "border-teal-200 dark:border-teal-900/50",
    borderAccent: "border-l-teal-500!",
  },
  10: {
    text: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-950",
    border: "border-orange-200 dark:border-orange-900/50",
    borderAccent: "border-l-orange-500!",
  },
};
