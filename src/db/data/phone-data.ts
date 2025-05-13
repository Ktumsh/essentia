export const PHONE_DATA = [
  {
    title: "Salud Responde",
    description:
      "Permite acceder a un servicio telefónico compuesto por médicos, enfermeros, enfermeras, matrones y matronas del Ministerio de Salud (MINSAL).",
    phone: "600 360 77 77",
  },
  {
    title: "Prevención del suicidio",
    description:
      "A través de esta línea, quien esté enfrentando una emergencia o crisis de salud mental asociada al suicidio, podrá contactarse con un psicólogo.",
    phone: "*41 41",
  },
  {
    title: "Ambulancia SAMU",
    description:
      "El Servicio de atención médica de urgencia (SAMU) entrega atención prehospitalaria oportuna, de acceso universal y de calidad.",
    phone: "131",
  },
];

export type PhoneType = (typeof PHONE_DATA)[number];

export const PHONE_COLORS = {
  bg: "bg-red-50 dark:bg-red-950",
  bgMuted: "bg-red-100 dark:bg-red-900",
  text: "text-red-600 dark:text-red-400",
  border: "border-red-200 dark:border-red-900/50",
  borderAccent: "border-l-red-500!",
};

export type PhoneColors = (typeof PHONE_COLORS)[keyof typeof PHONE_COLORS];
