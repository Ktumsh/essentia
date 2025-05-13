export const EMERGENCY_STEPS_DATA = [
  {
    id: 1,
    title: "Antes de una emergencia",
    description:
      "Pasos a seguir para prepararte ante una situación de emergencia",
    steps: [
      {
        step: 1,
        title: "Evalúa la situación",
        description: "Mantén la calma y analiza lo que sucede.",
      },
      {
        step: 2,
        title: "Llama por ayuda",
        description:
          "Contacta a los servicios de emergencia o a quien pueda asistir.",
      },
      {
        step: 3,
        title: "Sigue los pasos adecuados",
        description:
          "Actúa de manera segura, guiándote por las mejores prácticas para cada situación.",
      },
    ],
    content: `# Guía completa: Antes de una emergencia

Esta sección te ayudará a prepararte de forma integral antes de que ocurra cualquier incidente. Sigue cada apartado y revisa tu plan con regularidad.

---

### 1. Evaluación de riesgos

1. **Identifica las amenazas locales:** Investiga si vives en zonas de riesgo sísmico, inundaciones, incendios forestales o químicos.
2. **Inspecciona tu hogar y lugar de trabajo:** Revisa instalaciones eléctricas, fugas de gas y obstrucciones en rutas de evacuación.
3. **Crea un mapa de riesgos:** Anota en un plano simplificado las áreas de mayor peligro y salidas de emergencia.
4. **Define puntos de reunión:** Elige un lugar seguro dentro y fuera de la vivienda o edificio para reencontrarse.

### 2. Plan de comunicación y coordinación

- **Lista de contactos de emergencia:** Incluye números de bomberos, policía, servicios de salud y familiares cercanos.
- **Métodos alternativos:** Define cómo comunicarte si las líneas telefónicas fallan (radio, mensajería satelital, grupos de WhatsApp offline).
- **Responsabilidades familiares:** Asigna roles (quién avisa a vecinos, quién ayuda a mascotas, quién cuida a menores y personas con discapacidad).
- **Práctica de simulacros:** Realiza ejercicios bimensuales para familiarizar a todos con el protocolo.

### 3. Preparación del kit de emergencia

Incluye al menos:
- Agua potable (mínimo 3 litros por persona/día para 3 días).
- Alimentos no perecibles (barras energéticas, latas con abre fácil).
- Botiquín completo con analgésicos, vendas, desinfectantes y medicación específica.
- Linterna con baterías de repuesto o manivela.
- Radio portátil (preferiblemente de manivela o con panel solar).
- Copias de documentos esenciales (identidad, pólizas de seguro) en bolsas herméticas.
- Dinero en efectivo pequeño (monedas y billetes de baja denominación).
- Artículos para bebés, mascotas o personas con necesidades especiales.

### 4. Formación básica

- **Primeros auxilios:** Completa un curso certificado de al menos 4 horas.
- **Uso de extintor:** Aprende a manejar un extintor y practica cada 6 meses.
- **RCP y DEA:** Capacítate en reanimación cardiopulmonar y uso de desfibrilador.
- **Técnicas de evacuación:** Familiarízate con el protocolo de tu edificio o comunidad.

### 5. Mantenimiento y actualización periódica

- **Revisión trimestral:** Verifica fechas de caducidad de alimentos, medicinas y baterías.
- **Actualización de contactos:** Confirma que los números de emergencia y familiares están vigentes.
- **Simulacros:** Programa simulacros con la familia o compañeros de trabajo al menos dos veces al año.
- **Lecciones aprendidas:** Tras cada simulacro, anota mejoras y ajustes necesarios.
`,
  },
  {
    id: 2,
    title: "Después de una emergencia",
    description:
      "Acciones importantes tras atender una situación de emergencia",
    steps: [
      {
        step: 4,
        title: "Evalúa el Resultado",
        description: "Asegúrate de que la situación esté bajo control.",
      },
      {
        step: 5,
        title: "Reporte y Documentación",
        description: "Informa a las autoridades y registra lo sucedido.",
      },
      {
        step: 6,
        title: "Cuida tu Bienestar",
        description:
          "Tómate un momento para procesar lo ocurrido y cuida de tu salud emocional.",
      },
    ],
    content: `# Guía completa: Después de una emergencia

Una vez controlada la emergencia, este plan te guiará en la recuperación y mejora continua.

---

### 1. Verificación y control final

1. **Inspección del área:** Verifica que estructuras, instalaciones eléctricas y cañerías no presenten daños graves.
2. **Estado de las personas:** Realiza un chequeo médico para descartar lesiones internas o estrés agudo.
3. **Seguridad de accesos:** Asegura puertas, ventanas y caminos de salida antes de permitir el regreso completo.

### 2. Reporte y documentación detallada

- **Informe oficial:** Elabora un documento con fecha, hora, lugar, causa y consecuencias del incidente.
- **Registro visual:** Toma fotografías y videos que evidencien daños y acciones realizadas.
- **Registro testimonial:** Anota declaraciones de testigos y participantes.
- **Gestión de seguros:** Envía documentación requerida para reclamos y gestiona reparaciones.
- **Gestión de ayuda:** Contacta a ONG, municipalidad o entidades de apoyo si se necesitan recursos adicionales.

### 3. Recuperación y bienestar emocional

- **Apoyo psicológico:** Considera sesiones con un profesional de salud mental si experimentas ansiedad o insomnio.
- **Reunión de seguimiento:** Realiza un encuentro familiar o de equipo para compartir experiencias y lecciones aprendidas.
- **Rehabilitación progresiva:** Si hubo lesiones, sigue un plan de rehabilitación física o adaptaciones en el trabajo/escuela.
- **Red de apoyo:** Activa grupos comunitarios o familiares para revisión y apoyo mutuo.

### 4. Actualización del plan de emergencia

- **Lecciones aprendidas:** Documenta mejoras identificadas durante la emergencia.
- **Ajuste de kit y protocolos:** Añade o reemplaza elementos faltantes en el kit.
- **Programa de mantenimiento:** Define nuevas fechas para revisiones y ejercicios de simulacro.
- **Difusión:** Comparte el plan actualizado con todos los involucrados (familia, vecinos, compañeros).`,
  },
];

export type EmergencySteps = (typeof EMERGENCY_STEPS_DATA)[number];

export const EMERGENCY_STEPS_DATA_COLORS = {
  1: {
    bg: "bg-orange-50 dark:bg-orange-950",
    bgMuted: "bg-orange-100 dark:bg-orange-900",
    text: "text-orange-600 dark:text-orange-400",
    border: "border-orange-200 dark:border-orange-900/50",
    borderAccent: "border-l-orange-500!",
  },
  2: {
    bg: "bg-teal-50 dark:bg-teal-950",
    bgMuted: "bg-teal-100 dark:bg-teal-900",
    text: "text-teal-600 dark:text-teal-400",
    border: "border-teal-200 dark:border-teal-900/50",
    borderAccent: "border-l-teal-500!",
  },
};

export type EmergencyStepsColors = (typeof EMERGENCY_STEPS_DATA_COLORS)[1];
