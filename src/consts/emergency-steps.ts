import { EmergencySteps } from "@/types/resource";

export const EMERGENCY_STEPS: EmergencySteps[] = [
  {
    title: "Antes de una emergencia",
    steps: [
      {
        step: 1,
        title: "Evalúa la situación",
        description: "Mantén la calma y analiza lo que sucede.",
        color: "bg-violet-600!",
      },
      {
        step: 2,
        title: "Llama por ayuda",
        description:
          "Contacta a los servicios de emergencia o a quien pueda asistir.",
        color: "bg-violet-600!",
      },
      {
        step: 3,
        title: "Sigue los pasos adecuados",
        description:
          "Actúa de manera segura, guiándote por las mejores prácticas para cada situación.",
        color: "bg-violet-600!",
      },
    ],
  },
  {
    title: "Después de una emergencia",
    steps: [
      {
        step: 4,
        title: "Evalúa el Resultado",
        description: "Asegúrate de que la situación esté bajo control.",
        color: "bg-emerald-600!",
      },
      {
        step: 5,
        title: "Reporte y Documentación",
        description: "Informa a las autoridades y registra lo sucedido.",
        color: "bg-emerald-600!",
      },
      {
        step: 6,
        title: "Cuida tu Bienestar",
        description:
          "Tómate un momento para procesar lo ocurrido y cuida de tu salud emocional.",
        color: "bg-emerald-600!",
      },
    ],
  },
];
