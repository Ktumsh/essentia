const BASE_URL =
  "https://res.cloudinary.com/dcub4itgg/image/upload/f_auto,q_auto/v1/essentia/guide";

export const GUIDES_DATA = [
  {
    id: 1,
    title: "Guía de primeros auxilios",
    description:
      "Recurso destacado que proporciona una guía descriptiva y enlaces a videos instructivos RCP, maniobra de Heimlich y otros procedimientos de emergencias.",
    type: "Primero auxilios",
    category: "Guías",
    tags: ["primeros auxilios", "emergencia", "RCP", "Heimlich"],
    thumbnail: `${BASE_URL}/g-01`,
    keyPoints: [
      "Aprende técnicas de RCP y maniobra de Heimlich",
      "Aprende a controlar hemorragias y tratar quemaduras",
      "Aprende a reconocer signos de emergencias médicas",
      "Mantén la calma y llama a emergencias (131)",
    ],
    quickTips: [
      "Actualiza tus conocimientos de primeros auxilios cada 2 años con cursos de repaso.",
      "Guarda los números de emergencia en marcación rápida en tu teléfono.",
      "Nunca muevas a una persona con posible lesión de columna a menos que esté en peligro inmediato.",
    ],
    faqs: [
      {
        q: "¿Cuándo debo llamar a emergencias antes de iniciar RCP?",
        a: "Siempre debes llamar a emergencias (131) inmediatamente al encontrar a una persona inconsciente, antes de iniciar RCP. Si estás solo, llama primero y luego inicia RCP. Si hay más personas presentes, pide a alguien que llame mientras tú comienzas las compresiones.",
      },
      {
        q: "¿Cómo sé si estoy haciendo las compresiones correctamente?",
        a: "Las compresiones efectivas deben ser fuertes y rápidas, a un ritmo de 100-120 por minuto, presionando el pecho aproximadamente 5-6 cm de profundidad en adultos. Debes permitir que el pecho se expanda completamente entre compresiones. Si las costillas se fracturan durante RCP, debes continuar; salvar la vida es prioritario.",
      },
      {
        q: "¿Puedo hacer daño a alguien realizando la maniobra de Heimlich?",
        a: "Aunque la maniobra de Heimlich puede causar lesiones como costillas fracturadas o daños internos, el riesgo de no actuar cuando alguien se está asfixiando es mucho mayor. Si la persona puede toser con fuerza, anímala a seguir tosiendo y no intervengas. Solo realiza la maniobra si la persona no puede hablar, toser o respirar.",
      },
      {
        q: "¿Qué hago si no tengo entrenamiento en RCP pero necesito actuar?",
        a: "Si no tienes entrenamiento, puedes realizar RCP solo con compresiones (sin respiraciones). Llama a emergencias, coloca a la persona boca arriba, coloca tus manos en el centro del pecho y presiona fuerte y rápido a un ritmo de 100-120 compresiones por minuto hasta que llegue ayuda profesional.",
      },
      {
        q: "¿Cuándo debo usar un torniquete para una hemorragia?",
        a: "Los torniquetes solo deben usarse como último recurso cuando una hemorragia severa en una extremidad no puede controlarse con presión directa y pone en peligro la vida. Aplícalo por encima de la herida (no sobre una articulación), apriétalo hasta que se detenga el sangrado, anota la hora de aplicación y busca atención médica inmediata.",
      },
    ],
    content: `### Introducción a los primeros auxilios
  Los primeros auxilios son la asistencia inmediata que se brinda a una persona que ha sufrido un accidente o enfermedad repentina, hasta que llegue la ayuda profesional. El objetivo principal es preservar la vida, prevenir el empeoramiento de la condición y promover la recuperación.
  
  ### Reanimación Cardiopulmonar (RCP)
  La RCP es una técnica que puede salvar vidas en casos de paro cardíaco:
  
  1. Verifica si la persona está consciente y respira.  
  2. Si no responde y no respira normalmente, llama a emergencias (131).  
  3. Coloca a la persona boca arriba sobre una superficie firme.  
  4. Coloca el talón de una mano en el centro del pecho, entre los pezones.  
  5. Coloca la otra mano encima de la primera.  
  6. Comprime el pecho aproximadamente 5–6 cm, a un ritmo de 100–120 compresiones por minuto.  
  7. Si estás capacitado, realiza 30 compresiones seguidas de 2 respiraciones.  
  8. Continúa hasta que llegue ayuda profesional o la persona muestre signos de vida.  
  
  ### Maniobra de Heimlich
  La maniobra de Heimlich se utiliza para desobstruir las vías respiratorias:
  
  1. Colócate detrás de la persona y rodea su cintura con tus brazos.  
  2. Cierra un puño y coloca el lado del pulgar contra el abdomen de la persona, justo por encima del ombligo y debajo del esternón.  
  3. Agarra tu puño con la otra mano.  
  4. Presiona tu puño hacia adentro y hacia arriba con movimientos rápidos y firmes.  
  5. Repite hasta que el objeto sea expulsado o la persona pierda el conocimiento.  
  
  ### Control de hemorragias
  Para controlar una hemorragia externa:
  
  1. Aplica presión directa sobre la herida con un paño limpio o gasa.  
  2. Si es posible, eleva la parte del cuerpo afectada por encima del nivel del corazón.  
  3. Mantén la presión constante durante al menos 15 minutos.  
  4. Si la sangre empapa el material, no lo retires; añade más material encima y continúa presionando.  
  5. Una vez que la hemorragia se detenga, asegura el vendaje en su lugar.  
  
  ### Quemaduras
  Para tratar quemaduras leves:
  
  1. Enfría la quemadura con agua corriente fría durante 10–15 minutos.  
  2. No apliques hielo directamente sobre la quemadura.  
  3. Cubre la quemadura con un vendaje estéril no adherente.  
  4. No apliques mantequilla, aceite o pasta de dientes sobre la quemadura.  
  5. Toma analgésicos de venta libre si es necesario para el dolor.  
  
  > **Para quemaduras graves, busca atención médica inmediata.**
  
  ### Fracturas y esguinces
  Para tratar posibles fracturas:
  
  1. Inmoviliza la zona lesionada en la posición en que se encuentra.  
  2. Aplica hielo envuelto en un paño para reducir la inflamación.  
  3. No intentes realinear el hueso o la articulación.  
  4. Busca atención médica lo antes posible.  
  
  ### Recuerda
  - Siempre asegura tu propia seguridad antes de ayudar a otros.  
  - Llama a los servicios de emergencia lo antes posible.  
  - No muevas a una persona lesionada a menos que esté en peligro inmediato.  
  - Mantén la calma y tranquiliza a la persona lesionada.  
  - Solo realiza procedimientos para los que estés capacitado.`,
  },
  {
    id: 2,
    title: "Guía de sueño y descanso",
    description:
      "Información sobre la importancia del sueño, técnicas para mejorar la calidad del sueño y hábitos para lograr un descanso óptimo.",
    type: "Bienestar",
    category: "Guías",
    tags: ["sueño", "descanso", "insomnio", "bienestar"],
    thumbnail: `${BASE_URL}/g-02`,
    keyPoints: [
      "Comprende la importancia de los ciclos del sueño",
      "Establece rutinas para mejorar tu descanso",
      "Conoce técnicas para conciliar el sueño",
      "Sabrás cuándo buscar ayuda profesional",
    ],
    quickTips: [
      "Evita comer o usar pantallas en la cama para mejorar la calidad del sueño.",
      "Ventila tu habitación por la mañana para favorecer un ambiente de descanso.",
      "No ignores el insomnio crónico; puede indicar un trastorno del sueño que requiere evaluación profesional.",
    ],
    faqs: [
      {
        q: "¿Qué es exactamente el autocuidado emocional?",
        a: "El autocuidado emocional es el conjunto de prácticas conscientes destinadas a reconocer, atender y regular nuestras emociones para mantener un equilibrio psicológico. No se trata de evitar emociones negativas, sino de generar herramientas para comprenderlas, darles un espacio y actuar desde la compasión hacia uno mismo.",
      },
      {
        q: "¿Por qué es importante el autocuidado emocional en la vida diaria?",
        a: "Porque permite identificar nuestras necesidades afectivas antes de que se transformen en síntomas de agotamiento, ansiedad o conflicto con otros. Al practicarlo, aumentamos nuestra capacidad para tomar decisiones sanas, comunicarnos mejor y sostener relaciones más equilibradas.",
      },
      {
        q: "¿Cómo puedo saber si estoy descuidando mi autocuidado emocional?",
        a: "Algunos indicadores son la irritabilidad constante, cansancio emocional, dificultad para poner límites, sensación de vacío o desmotivación prolongada. También puede manifestarse como desconexión de uno mismo o priorización excesiva de las necesidades de los demás sobre las propias.",
      },
      {
        q: "¿Qué prácticas puedo integrar fácilmente a mi rutina para cultivar el autocuidado emocional?",
        a: "Puedes comenzar por establecer espacios de pausa durante el día, llevar un registro emocional (como journaling), practicar respiración consciente o meditación, establecer límites claros en tus relaciones, y buscar actividades que te brinden calma o gozo, aunque sean breves.",
      },
      {
        q: "¿Qué hacer si me cuesta priorizarme sin sentir culpa?",
        a: "Es normal sentir culpa al comenzar a priorizarse, especialmente si se ha aprendido a anteponer a los demás. El primer paso es reconocer que el cuidado propio no es egoísmo, sino una responsabilidad personal. Puedes iniciar con pequeños actos de cuidado que no interfieran con tus otras obligaciones, y avanzar desde ahí.",
      },
    ],
    content: `### La importancia del sueño
  El sueño es un componente esencial para la salud física y mental. Durante el sueño, el cuerpo realiza funciones vitales como la consolidación de la memoria, la reparación celular y la regulación hormonal. La falta de sueño adecuado puede afectar negativamente el rendimiento cognitivo, el estado de ánimo, el sistema inmunológico y aumentar el riesgo de enfermedades crónicas.
  
  ### Ciclos del sueño
  El sueño se divide en varias etapas que se repiten en ciclos durante la noche:
  
  - **Fase 1 (N1):** Sueño ligero, transición entre vigilia y sueño.  
  - **Fase 2 (N2):** Sueño más profundo, disminución de la temperatura corporal y ritmo cardíaco.  
  - **Fase 3 (N3):** Sueño profundo o de ondas lentas, esencial para la recuperación física.  
  - **Fase REM:** Sueño de movimientos oculares rápidos, donde ocurren la mayoría de los sueños y se consolida la memoria.  
  
  ### Recomendaciones para mejorar el sueño
  
  #### Establece un horario regular
  Acuéstate y levántate a la misma hora todos los días, incluso los fines de semana. Esto ayuda a regular tu reloj biológico interno.
  
  #### Crea un ambiente propicio
  Mantén tu dormitorio oscuro, silencioso y a una temperatura confortable (18–20 °C). Considera usar cortinas opacas, tapones para los oídos o una máquina de ruido blanco si es necesario.
  
  #### Limita la exposición a pantallas
  Evita dispositivos electrónicos al menos 1 hora antes de acostarte. La luz azul puede suprimir la producción de melatonina.
  
  #### Cuida tu alimentación
  Evita comidas pesadas, cafeína y alcohol antes de dormir. La cafeína puede permanecer en tu sistema hasta 8 horas.
  
  #### Realiza actividad física regularmente
  El ejercicio regular mejora la calidad del sueño, pero evítalo cerca de la hora de acostarte.
  
  ### Técnicas de relajación para conciliar el sueño
  
  #### Respiración profunda
  1. Inhala lentamente por la nariz durante 4 s.  
  2. Mantén la respiración durante 7 s.  
  3. Exhala por la boca durante 8 s.  
  4. Repite varias veces.
  
  #### Relajación muscular progresiva
  Tensa y luego relaja cada grupo muscular, de pies a cabeza.
  
  #### Visualización
  Imagina un lugar tranquilo (playa, bosque) y concéntrate en los detalles sensoriales.
  
  ### ¿Cuándo buscar ayuda profesional?
  Consulta a un profesional si experimentas:
  - Dificultad para conciliar o mantener el sueño más de un mes.  
  - Somnolencia diurna excesiva.  
  - Ronquidos fuertes con pausas en la respiración.  
  - Sensaciones incómodas en las piernas que mejoran con el movimiento.  
  - Comportamientos inusuales durante el sueño.`,
  },
  {
    id: 3,
    title: "Guía de meditación para reducir el estrés",
    description:
      "Técnicas de meditación, información sobre sus beneficios para la reducción del estrés y cómo integrarla en la vida diaria.",
    type: "Salud Mental",
    category: "Guías",
    tags: ["meditación", "estrés", "ansiedad", "salud mental"],
    thumbnail: `${BASE_URL}/g-03`,
    keyPoints: [
      "Aprende técnicas de meditación paso a paso",
      "Descubre los beneficios del mindfulness",
      "Incorpora la meditación en tu rutina diaria",
      "Maneja el estrés con ejercicios prácticos",
    ],
    quickTips: [
      "Empieza con solo 5 minutos de meditación al día y ve aumentando con el tiempo.",
      "Meditar en el mismo lugar a diario ayuda a crear una rutina sólida.",
      "No te frustres si tu mente divaga: es parte del proceso, no un error.",
    ],
    faqs: [
      {
        q: "¿Qué es el burnout y cómo se diferencia del estrés común?",
        a: "El burnout es un estado de agotamiento físico, mental y emocional causado por una exposición prolongada al estrés, especialmente en contextos laborales o de cuidado. A diferencia del estrés común, que puede ser temporal y manejable, el burnout genera una sensación de desconexión profunda, pérdida de sentido y agotamiento crónico que afecta significativamente el bienestar general.",
      },
      {
        q: "¿Cuáles son las principales señales de que estoy desarrollando burnout?",
        a: "Las señales más comunes incluyen fatiga constante, irritabilidad, insomnio, desapego emocional, baja autoestima, cinismo respecto al trabajo o a las personas a tu cargo, y disminución del rendimiento. También pueden aparecer síntomas físicos como dolores de cabeza o problemas digestivos sin causa aparente.",
      },
      {
        q: "¿Quiénes están más propensos a experimentar burnout?",
        a: "Personas que trabajan en contextos de alta demanda emocional (como salud, educación o cuidado), quienes tienen dificultad para desconectarse del trabajo, los perfeccionistas y quienes carecen de redes de apoyo sólidas están más expuestos. También influye un entorno laboral desorganizado, sin reconocimiento o con carga excesiva.",
      },
      {
        q: "¿Qué puedo hacer para prevenir el burnout si tengo un trabajo muy exigente?",
        a: "Algunas estrategias incluyen establecer límites claros entre la vida personal y laboral, tomar pausas activas durante la jornada, desconectarse fuera del horario laboral, buscar apoyo emocional, hacer actividad física regular, dormir bien y practicar técnicas de autorregulación emocional como mindfulness. La prevención es un proceso constante, no una solución rápida.",
      },
      {
        q: "¿Es posible recuperarse completamente del burnout?",
        a: "Sí, pero requiere tiempo, autocompasión y cambios en los hábitos que llevaron al desgaste. Puede ser necesario tomar descansos prolongados, buscar ayuda profesional, reestructurar rutinas o incluso cambiar de ambiente laboral. Reconocer el problema a tiempo y actuar con decisión son claves para una recuperación efectiva y sostenible.",
      },
    ],
    content: `### Introducción a la meditación
  La meditación es una práctica milenaria para entrenar la atención y la conciencia, logrando un estado mental claro y tranquilo. En el mundo acelerado de hoy, es una herramienta valiosa contra el estrés.
  
  ### Beneficios de la meditación para reducir el estrés
  - Reducción de los niveles de cortisol.  
  - Disminución de la ansiedad y síntomas depresivos.  
  - Mejora de la concentración y la claridad mental.  
  - Aumento de la autoconciencia y regulación emocional.  
  - Mejora de la calidad del sueño.  
  - Reducción de la presión arterial.  
  - Fortalecimiento del sistema inmunológico.  
  
  ### Técnicas básicas de meditación
  
  #### Meditación Mindfulness
  1. Siéntate cómodo con la espalda recta.  
  2. Cierra los ojos o fija la mirada suave.  
  3. Enfoca tu atención en la respiración.  
  4. Cuando tu mente divague, regresa a la respiración.  
  5. Empieza con 5 minutos e incrementa gradualmente.  
  
  #### Escaneo corporal
  1. Acuéstate boca arriba.  
  2. Dirige atención de pies a cabeza.  
  3. Observa sensaciones sin juzgar.  
  4. Imagina que la respiración libera tensión.  
  
  #### Visualización
  1. Siéntate cómodo y cierra los ojos.  
  2. Imagina un lugar tranquilo.  
  3. Usa todos tus sentidos para explorarlo.  
  4. Mantén la sensación de calma varios minutos.  
  
  ### Incorporando la meditación
  - Comienza con 5–10 min diarios.  
  - Establece un horario fijo.  
  - Crea un espacio tranquilo.  
  - Usa apps o guías si lo necesitas.  
  - Sé paciente contigo mismo.`,
  },
  {
    id: 4,
    title: "Guía de alimentación saludable en el trabajo",
    description:
      "Consejos sobre cómo mantener una dieta balanceada y saludable mientras se trabaja, con recomendaciones de comidas rápidas y saludables.",
    type: "Nutrición",
    category: "Guías",
    tags: ["alimentación", "nutrición", "trabajo", "dieta"],
    thumbnail: `${BASE_URL}/g-04`,
    keyPoints: [
      "Planifica comidas saludables para tu jornada laboral",
      "Explora opciones prácticas para desayuno y almuerzo",
      "Conoce snacks inteligentes y tips de hidratación",
      "Optimiza tu rendimiento cuidando tu alimentación",
    ],
    quickTips: [
      "Lleva siempre snacks saludables en tu bolso o mochila.",
      "Bebe agua antes de sentir sed para mantenerte hidratado.",
      "No uses el café como reemplazo de una comida: puede alterar tu energía y sueño.",
    ],
    faqs: [
      {
        q: "¿Qué significa el consentimiento en el contexto de una relación sexual?",
        a: "El consentimiento es un acuerdo explícito, informado y entusiasta entre todas las personas involucradas para participar en una actividad sexual. Debe ser otorgado libremente, sin presiones, manipulación ni confusión, y puede ser retirado en cualquier momento. No es válido si la persona está bajo los efectos del alcohol, drogas o no está en condiciones de decidir conscientemente.",
      },
      {
        q: "¿Por qué hablar de consentimiento es clave en la educación sexual?",
        a: "Porque permite construir relaciones basadas en el respeto mutuo, la comunicación clara y el reconocimiento de los propios límites y los de los demás. Hablar de consentimiento ayuda a prevenir abusos, malentendidos y promueve una sexualidad más segura, libre y ética para todas las personas involucradas.",
      },
      {
        q: "¿Qué señales indican que una persona no está dando su consentimiento real?",
        a: "El silencio, la duda, la incomodidad o la falta de entusiasmo no son consentimientos. Frases como 'supongo', 'haz lo que quieras' o quedarse inmóvil también indican falta de consentimiento. El consentimiento debe ser claro, entusiasta y afirmativo, no interpretado ni asumido.",
      },
      {
        q: "¿Qué puedo hacer si tengo dudas sobre cómo pedir consentimiento?",
        a: "Pedir consentimiento es una muestra de cuidado y respeto. Puedes hacerlo con preguntas claras como '¿Está bien si hacemos esto?', '¿Te sientes cómodo/a con esto?' o simplemente '¿Quieres seguir?'. Asegúrate de que la respuesta sea libre y positiva. Pedir consentimiento no arruina el momento, lo mejora.",
      },
      {
        q: "¿El consentimiento se da una sola vez o debe renovarse?",
        a: "El consentimiento debe renovarse cada vez que una actividad cambie, incluso dentro de una misma relación o encuentro. El hecho de que alguien haya consentido en el pasado no implica que siempre lo hará. El consentimiento es dinámico, se puede modificar o retirar en cualquier momento sin necesidad de justificarlo.",
      },
    ],
    content: `### Importancia de una alimentación saludable en el trabajo
  Mantener una alimentación equilibrada durante la jornada laboral mejora tu rendimiento cognitivo, niveles de energía y estado de ánimo.
  
  ### Planificación de comidas
  
  #### Preparación semanal
  - Elabora un menú variado.  
  - Prepara porciones individuales.  
  - Cocina en lotes y congela.  
  - Ten snacks saludables a la mano.
  
  #### Contenedores adecuados
  - Recipientes herméticos de vidrio o acero inoxidable.  
  - Termos para sopas o guisos.  
  - Bolsas reutilizables para frutas.  
  - Botellas para agua o infusiones.
  
  ### Desayuno: el combustible inicial
  Opciones rápidas y nutritivas:
  - Avena con frutas y semillas.  
  - Tostada integral con aguacate y huevo.  
  - Yogur natural con frutos secos.  
  - Batido de proteínas con plátano.  
  - Wrap de huevo con espinacas.
  
  ### Almuerzos equilibrados
  Debe incluir proteínas, carbohidratos y grasas saludables:
  - Bowl de quinoa con pollo y verduras.  
  - Ensalada de lentejas con queso feta.  
  - Wrap integral con hummus y pavo.  
  - Buddha bowl con tofu y edamame.  
  - Ensalada de pasta integral con atún.
  
  ### Snacks inteligentes
  - Fruta fresca.  
  - Frutos secos sin sal.  
  - Palitos de verduras con hummus.  
  - Yogur griego con miel.  
  
  ### Hidratación
  - Lleva botella de agua reutilizable.  
  - Recuerda beber cada hora.  
  - Considera infusiones sin azúcar.  
  - Limita café a 2–3 tazas diarias.`,
  },
  {
    id: 5,
    title: "Guía de yoga para principiantes",
    description:
      "Detalles sobre posturas básicas, técnicas de respiración y sus beneficios para la salud mental y física.",
    type: "Ejercicio",
    category: "Guías",
    tags: ["yoga", "ejercicio", "bienestar", "flexibilidad"],
    thumbnail: `${BASE_URL}/g-05`,
    keyPoints: [
      "Descubre posturas básicas de yoga para principiantes",
      "Mejora tu flexibilidad, fuerza y concentración",
      "Aprende a armar una rutina básica de yoga",
      "Disfruta los beneficios físicos y mentales del yoga",
    ],
    quickTips: [
      "Practica yoga con el estómago vacío o al menos 2 horas después de comer.",
      "Escucha a tu cuerpo: el yoga no debe doler.",
      "Evita comparar tu práctica con la de otros: cada cuerpo es distinto.",
    ],
    faqs: [
      {
        q: "¿Qué es la ansiedad y cuándo deja de ser normal?",
        a: "La ansiedad es una respuesta natural del cuerpo ante situaciones percibidas como amenazantes o desafiantes. Sin embargo, deja de ser funcional cuando aparece de forma constante, sin motivo claro o interfiere con la vida diaria. En esos casos, puede transformarse en un trastorno de ansiedad que requiere atención profesional.",
      },
      {
        q: "¿Cuáles son los síntomas más comunes de la ansiedad cotidiana?",
        a: "Incluyen preocupación excesiva, dificultad para concentrarse, insomnio, tensión muscular, palpitaciones, sudoración, sensación de ahogo o un nudo en el estómago. Aunque son muy reales, muchas veces quienes los experimentan no logran identificar que se deben a la ansiedad.",
      },
      {
        q: "¿Qué estrategias rápidas puedo aplicar cuando me siento ansioso/a?",
        a: "Algunas estrategias incluyen la respiración diafragmática, cambiar de entorno, hacer una pausa consciente, caminar, escribir lo que sientes, o aplicar la técnica 5-4-3-2-1 (identificar 5 cosas que ves, 4 que puedes tocar, etc.). Estas técnicas ayudan a recuperar el control en momentos de ansiedad aguda.",
      },
      {
        q: "¿Qué hábitos ayudan a reducir la ansiedad de manera sostenida?",
        a: "Dormir bien, mantener rutinas, evitar estimulantes en exceso (como café o azúcar), hacer ejercicio físico, practicar mindfulness, limitar el consumo de redes sociales y tener espacios de descarga emocional o conversación son pilares para prevenir o disminuir la ansiedad cotidiana.",
      },
      {
        q: "¿Cuándo debo buscar ayuda profesional por ansiedad?",
        a: "Si la ansiedad es constante, intensa, interfiere con tus actividades diarias o sientes que no puedes manejarla solo/a, es importante acudir a un profesional. La terapia psicológica puede ayudarte a comprender tus patrones de pensamiento, encontrar estrategias personalizadas y mejorar tu calidad de vida.",
      },
    ],
    content: `### Introducción al yoga
  El yoga combina posturas físicas, respiración y meditación para promover bienestar físico y mental.
  
  ### Beneficios del yoga
  - Aumenta la flexibilidad.  
  - Fortalece músculos y mejora postura.  
  - Reduce el estrés y ansiedad.  
  - Mejora concentración y descanso.  
  
  ### Antes de comenzar
  **Equipo básico:** esterilla, ropa cómoda, toalla y agua.  
  **Consideraciones:** consulta médica, practica con el estómago ligero y escucha a tu cuerpo.
  
  ### Posturas básicas
  
  #### Montaña (Tadasana)
  1. Pies juntos o separados al ancho de caderas.  
  2. Distribuye peso en ambos pies.  
  3. Alarga columna y relaja hombros.  
  4. Mantén 30–60 s.
  
  #### Perro mirando hacia abajo
  1. Desde tabla, levanta caderas.  
  2. Estira piernas con ligera flexión si necesitas.  
  3. Presiona manos y pies en el suelo.  
  4. Mantén 30–60 s.
  
  #### Guerrero I
  1. Paso largo atrás con pie izquierdo girado 45°.  
  2. Dobla rodilla derecha a 90°.  
  3. Levanta brazos sobre la cabeza.  
  4. Mantén 30–60 s por lado.
  
  ### Secuencia básica (15–20 min)
  1. Montaña – 30 s  
  2. Perro abajo – 30 s  
  3. Plancha – 30 s  
  4. Cobra – 15 s  
  5. Guerrero I – 30 s cada lado  
  6. Árbol – 30 s cada lado  
  7. Pinza sentada – 30 s  
  8. Cadáver (Savasana) – 3–5 min.`,
  },
  {
    id: 6,
    title: "Guía para situaciones de emergencia",
    description:
      "Una guía esencial que proporciona información y pasos a seguir en situaciones de emergencia para brindar primeros auxilios en el hogar.",
    type: "Primero auxilios",
    category: "Guías",
    tags: ["emergencia", "primeros auxilios", "hogar", "seguridad"],
    thumbnail: `${BASE_URL}/g-06`,
    keyPoints: [
      "Prepárate para actuar ante diferentes emergencias",
      "Arma tu kit y plan de emergencia familiar",
      "Aprende qué hacer en incendios, sismos o fugas",
      "Actúa con calma y protege a quienes te rodean",
    ],
    quickTips: [
      "Guarda tu kit de emergencia en un lugar accesible para todos.",
      "Realiza simulacros con tu familia al menos dos veces al año.",
      "Nunca regreses a un edificio en llamas, aunque parezca seguro.",
    ],
    faqs: [
      {
        q: "¿Qué significa 'diversidad corporal'?",
        a: "La diversidad corporal reconoce que los cuerpos humanos existen en múltiples formas, tamaños, colores, capacidades y géneros. Esta mirada rechaza los estándares únicos de belleza y valida que todos los cuerpos son legítimos, dignos de respeto y merecen acceso a los mismos derechos y oportunidades.",
      },
      {
        q: "¿Por qué es tan difícil aceptar nuestro cuerpo en una sociedad que impone estereotipos?",
        a: "Porque desde temprana edad se nos enseñan ideales inalcanzables de belleza a través de medios, redes sociales y cultura popular. Esta presión constante genera insatisfacción corporal y nos lleva a creer que nuestro valor depende de cómo nos vemos. Aceptar el cuerpo implica deconstruir estas ideas y recuperar una mirada propia, más amable y realista.",
      },
      {
        q: "¿Aceptar mi cuerpo significa dejar de cuidarlo?",
        a: "No. Aceptar tu cuerpo no es resignación, sino reconocer su valor sin someterlo a estándares destructivos. Cuidarlo desde la aceptación implica alimentarte, moverte y atender tu salud desde el respeto y no desde la culpa o la autoexigencia excesiva. Es una forma más sostenible y compasiva de bienestar.",
      },
      {
        q: "¿Qué puedo hacer si tengo pensamientos negativos sobre mi cuerpo?",
        a: "Comienza por cuestionar de dónde vienen esas ideas y a quién benefician. Rodéate de referentes diversos, reduce el consumo de contenido que refuerza estereotipos dañinos, y practica afirmaciones positivas. También es útil hablar con otras personas que pasen por lo mismo y, si es necesario, buscar apoyo terapéutico especializado.",
      },
      {
        q: "¿Cómo puedo fomentar una cultura de aceptación corporal en mi entorno?",
        a: "Puedes comenzar dejando de comentar sobre el cuerpo de los demás, evitar juicios sobre el propio cuerpo en voz alta, usar lenguaje inclusivo, visibilizar cuerpos diversos en redes y conversaciones, y promover espacios donde las personas se sientan cómodas con quienes son, más allá de su apariencia.",
      },
    ],
    content: `### Preparación para emergencias
  Estar preparado puede marcar la diferencia entre la vida y la muerte.
  
  ### Kit de emergencia básico
  - Agua potable (4 L/persona/día para 3 días).  
  - Alimentos no perecederos (3 días).  
  - Botiquín completo.  
  - Linterna y pilas.  
  - Radio a pilas.  
  - Silbato, mascarillas y bolsas.  
  - Herramientas básicas y documentos importantes.
  
  ### Plan de emergencia familiar
  1. Identifica emergencias locales (terremotos, incendios).  
  2. Establece puntos de encuentro.  
  3. Designa responsabilidades.  
  4. Practica simulacros regularmente.
  
  ### Emergencias médicas
  **Paro cardíaco:**  
  1. Llama al 131.  
  2. Comienza RCP (100–120 compresiones/min).  
  3. Usa desfibrilador si hay.  
  
  **Atragantamiento:**  
  1. Anima a toser si puede.  
  2. Si no, realiza Heimlich.  
  3. Si pierde el conocimiento, llama al 131 y comienza RCP.
  
  ### Emergencias en el hogar
  **Incendio:** Evacúa, gatea bajo el humo y cierra puertas. Llama al 132.  
  
  **Fuga de gas:** Ventila, cierra la llave y evacúa.  
  
  **Inundación:** Muévete a terreno alto y evita aguas.
  
  ### Emergencias naturales
  **Terremoto:** Agáchate bajo un mueble resistente.  
  **Tormenta:** Refúgiate lejos de ventanas y líneas eléctricas.
  
  ### Después de la emergencia
  - Verifica heridos.  
  - Escucha instrucciones oficiales.  
  - Documenta daños para seguros.  
  - Contacta a familiares.  
  - Ayuda a vecinos.`,
  },
  {
    id: 7,
    title: "Guía de autocuidado emocional",
    description:
      "Recomendaciones prácticas y fundamentos sobre cómo cultivar el autocuidado emocional de manera consciente y sostenida.",
    type: "Bienestar emocional",
    category: "Guías",
    tags: ["emociones", "autocuidado", "estrés", "salud mental"],
    thumbnail: `${BASE_URL}/g-07`,
    keyPoints: [
      "Conecta con tus emociones de forma consciente",
      "Aplica técnicas para el autocuidado diario",
      "Identifica señales de agotamiento emocional",
      "Fortalece tu bienestar emocional a largo plazo",
    ],
    quickTips: [
      "Reserva al menos 10 minutos al día solo para ti.",
      "Habla con alguien de confianza cuando te sientas sobrepasado.",
      "No minimices tus emociones por ser 'demasiado sensibles'.",
    ],
    faqs: [
      {
        q: "¿Qué significa tener un uso consciente del celular?",
        a: "Significa utilizar el celular de manera intencionada, eligiendo cuándo, cómo y para qué lo usamos, en lugar de hacerlo por impulso o costumbre. Implica establecer límites, evitar el uso excesivo y estar presentes en el momento, sin depender constantemente de las notificaciones o el desplazamiento automático por redes.",
      },
      {
        q: "¿Cuáles son las señales de un uso poco saludable del celular?",
        a: "Algunas señales incluyen revisar el celular compulsivamente, sentir ansiedad si no está cerca, perder la noción del tiempo en redes sociales, dificultad para dormir por el uso nocturno, o reemplazar interacciones reales por virtuales. También puede afectar la concentración y aumentar la sensación de insatisfacción personal.",
      },
      {
        q: "¿Cómo afectan las redes sociales a nuestra salud mental?",
        a: "Pueden generar ansiedad, baja autoestima, comparación constante con otros, y sensación de no ser suficiente. Si bien también ofrecen conexión y entretenimiento, su uso excesivo o mal gestionado puede afectar el sueño, las relaciones personales y nuestra percepción de la realidad, ya que muchas veces muestran versiones editadas o idealizadas de la vida.",
      },
      {
        q: "¿Qué hábitos ayudan a tener una relación más sana con el celular?",
        a: "Algunos hábitos útiles son: establecer horarios sin celular (como al despertar o antes de dormir), desactivar notificaciones innecesarias, usar funciones de tiempo de pantalla, dejar el celular fuera del dormitorio, y priorizar interacciones cara a cara. También es útil preguntarte antes de usarlo: ¿lo necesito o lo hago por inercia?",
      },
      {
        q: "¿Es posible desconectarse sin dejar de estar informado o conectado con otros?",
        a: "Sí. No se trata de eliminar la tecnología, sino de usarla de manera más equilibrada. Puedes elegir momentos específicos del día para revisar noticias o redes, utilizar aplicaciones que bloquean el uso excesivo, y buscar formas de conectar con otros más allá del entorno digital. El objetivo es recuperar el control sobre el tiempo y la atención.",
      },
    ],
    content: `### ¿Qué es el autocuidado emocional?
  El autocuidado emocional implica desarrollar una relación activa con nuestras emociones, necesidades psicológicas y límites personales. No se trata solo de evitar el malestar, sino de construir cotidianamente una base de bienestar emocional que nos permita afrontar las exigencias de la vida.
  
  ### Fundamentos del autocuidado emocional
  
  - **Conciencia emocional:** Es la capacidad de identificar y nombrar nuestras emociones. Practicar la conciencia emocional evita que actuemos de forma impulsiva y nos permite responder con mayor equilibrio.
  - **Validación interna:** Aceptar nuestras emociones como legítimas sin juzgarlas ni reprimirlas. La tristeza, la rabia o la angustia son respuestas humanas naturales.
  - **Regulación emocional:** Usar herramientas que nos ayuden a disminuir la intensidad de emociones desbordantes (respiración, movimiento corporal, escritura).
  - **Límites saludables:** Aprender a decir “no” y establecer espacios seguros es esencial para proteger nuestro bienestar psicológico.
  
  ### Estrategias de autocuidado práctico
  
  #### Diario emocional
  Escribe durante 5–10 minutos al día lo que sientes, cómo lo vives y qué necesitas. No edites ni filtres. Esta práctica permite procesar emociones de forma más clara.
  
  #### Rutinas de contención
  Establece rituales breves que te reconecten con la calma:
  - Respiración 4–7–8 (inhalar 4s, sostener 7s, exhalar 8s).
  - Tomar agua lentamente y concentrarse en la sensación.
  - Escuchar música instrumental o sonidos naturales.
  
  #### Tiempo de calidad contigo
  Dedica momentos del día a actividades que disfrutes y no estén ligadas a la productividad (leer por placer, caminar sin rumbo, dibujar).
  
  #### Círculo de apoyo
  Identifica personas que te den contención emocional. Hablar con alguien que te escuche sin juzgar reduce significativamente la carga emocional.
  
  ### Señales de agotamiento emocional
  
  - Sensación de estar siempre irritable o cansado.
  - Dificultad para disfrutar actividades cotidianas.
  - Aislamiento progresivo.
  - Problemas para concentrarse o tomar decisiones simples.
  - Aparición de síntomas físicos sin causa médica clara.
  
  > **Recuerda:** El autocuidado no es egoísmo, es responsabilidad. Cuidarte te permite sostenerte mejor a ti y también a quienes te rodean.
  
  ### Recursos recomendados
  
  - App de meditación y registro emocional: Insight Timer, Moodpath.
  - Lecturas: *“Los dones de la imperfección”* – Brené Brown.
  - Contacto profesional: Psicólogo/a, terapeuta, grupos de apoyo.`,
  },
  {
    id: 8,
    title: "Guía para prevenir el burnout",
    description:
      "Información clave sobre el síndrome de agotamiento profesional, sus causas, señales de alerta y estrategias para prevenirlo y afrontarlo.",
    type: "Salud Mental",
    category: "Guías",
    tags: ["burnout", "estrés laboral", "agotamiento", "salud mental"],
    thumbnail: `${BASE_URL}/g-08`,
    keyPoints: [
      "Reconoce los síntomas del burnout",
      "Descubre sus causas y cómo prevenirlo",
      "Aplica estrategias para cuidar tu salud mental",
      "Aprende cuándo y cómo buscar ayuda profesional",
    ],
    quickTips: [
      "Toma micro pausas de 1 minuto cada hora durante tu jornada.",
      "Haz una lista diaria con 3 tareas prioritarias y realistas.",
      "No normalices el agotamiento constante: es una señal de alerta.",
    ],
    faqs: [
      {
        q: "¿Por qué es importante hablar abiertamente sobre la menstruación?",
        a: "Porque el silencio y los tabúes alrededor de la menstruación han generado desinformación, vergüenza y dificultades para acceder a una salud menstrual digna. Hablar abiertamente permite reconocer la menstruación como un proceso natural del cuerpo, promover el autocuidado y derribar estigmas que afectan la salud física y emocional.",
      },
      {
        q: "¿Qué se considera un ciclo menstrual saludable?",
        a: "Un ciclo saludable puede durar entre 21 y 35 días, con una menstruación de 2 a 7 días. Es normal que haya leves variaciones, pero signos como sangrado excesivo, dolor incapacitante o ciclos muy irregulares pueden ser señales de desequilibrios hormonales u otras condiciones médicas que deben ser evaluadas.",
      },
      {
        q: "¿Qué beneficios tiene llevar un registro del ciclo menstrual?",
        a: "Registrar tu ciclo permite identificar patrones, reconocer síntomas premenstruales, anticipar cambios emocionales o físicos, y detectar irregularidades a tiempo. Además, favorece el autoconocimiento, ayuda en la planificación de actividades y puede ser útil para conversaciones con profesionales de la salud.",
      },
      {
        q: "¿Cómo afecta el entorno y el estilo de vida al ciclo menstrual?",
        a: "Factores como el estrés, el sueño, la alimentación, la actividad física y el uso de anticonceptivos influyen en la regularidad y características del ciclo. También cambios emocionales o psicológicos pueden tener un impacto directo en la duración y el flujo menstrual. Por eso, es clave cuidar el cuerpo de forma integral.",
      },
      {
        q: "¿Qué alternativas existen para una gestión menstrual más sostenible y consciente?",
        a: "Además de toallas y tampones, existen opciones como la copa menstrual, las toallas reutilizables y la ropa interior absorbente. Estas alternativas permiten reducir residuos, conocer mejor el cuerpo y tener un control más saludable del flujo. Elegir una opción consciente también implica informarse y respetar las propias preferencias y comodidad.",
      },
    ],
    content: `### ¿Qué es el burnout?
  El burnout, o síndrome de agotamiento profesional, es una respuesta al estrés crónico relacionado con el trabajo. Se caracteriza por agotamiento emocional, despersonalización y disminución del sentido de eficacia personal. No es simplemente “estar cansado”: es un agotamiento profundo que impacta en el cuerpo, la mente y las emociones.
  
  ### Causas comunes del burnout
  
  - Exigencias laborales excesivas.  
  - Falta de control sobre el trabajo.  
  - Recompensas insuficientes (económicas o emocionales).  
  - Falta de reconocimiento.  
  - Ambientes laborales tóxicos o conflictivos.  
  - Desalineación entre valores personales y organizacionales.
  
  ### Señales de alerta
  
  - Cansancio persistente, incluso después de descansar.  
  - Dificultad para concentrarse o tomar decisiones.  
  - Sensación de fracaso o inutilidad.  
  - Irritabilidad o cambios bruscos de humor.  
  - Desmotivación o cinismo frente al trabajo.  
  - Problemas de sueño, dolores de cabeza o molestias gastrointestinales.  
  - Aislamiento social.
  
  > **Importante:** El burnout puede afectar a cualquier persona, pero es especialmente frecuente en quienes trabajan en áreas de cuidado (salud, educación, servicios sociales).
  
  ### Estrategias para prevenir el burnout
  
  #### 1. Establece límites claros
  Define horarios de trabajo y descanso. Evita responder mensajes fuera del horario laboral, siempre que sea posible.
  
  #### 2. Cuida tu descanso
  Dormir bien no es un lujo, es una necesidad fisiológica. Intenta dormir 7–8 horas y respeta tu ciclo de sueño.
  
  #### 3. Tómate pausas activas
  Levántate, estira el cuerpo, respira profundamente o da una caminata breve durante tu jornada. El cuerpo también necesita resetearse.
  
  #### 4. Organiza tu carga laboral
  Haz listas realistas. Prioriza tareas según urgencia e importancia. Delegar también es una forma de cuidarte.
  
  #### 5. Busca espacios de apoyo
  Habla con colegas, amistades o un profesional. Compartir lo que vives alivia la carga emocional.
  
  #### 6. Alimentación y movimiento
  Mantén una dieta equilibrada y realiza alguna actividad física aunque sea breve. Cuerpo y mente están profundamente conectados.
  
  ### ¿Qué hacer si ya estás en burnout?
  
  - Reconócelo: No se trata de debilidad, sino de un sistema que llegó a su límite.  
  - Pide ayuda: Acude a un profesional de la salud mental.  
  - Evalúa cambios: Tal vez sea necesario modificar rutinas, roles o incluso repensar el entorno laboral.  
  - Date permiso para descansar: Recuperarse lleva tiempo, y no es egoísmo priorizarte.
  
  ### Recursos recomendados
  
  - Libro: *“Cuando el cuerpo dice no”* – Gabor Maté  
  - Podcast: *The Burnout Recovery Podcast*  
  - App: Calm, Headspace, Balance
  
  > **Recuerda:** el burnout no desaparece ignorándolo. El primer paso para prevenirlo o superarlo es **tomarte en serio** tu bienestar.`,
  },
  {
    id: 9,
    title: "Guía de salud sexual y consentimiento",
    description:
      "Una guía informativa y práctica para entender el consentimiento, los derechos sexuales, el autocuidado y el acceso a una sexualidad segura y respetuosa.",
    type: "Salud sexual",
    category: "Guías",
    tags: ["sexualidad", "consentimiento", "cuidado", "derechos sexuales"],
    thumbnail: `${BASE_URL}/g-09`,
    keyPoints: [
      "Entiende qué es el consentimiento y por qué importa",
      "Conoce tus derechos sexuales y reproductivos",
      "Explora prácticas de cuidado y prevención",
      "Accede a recursos de apoyo si los necesitas",
    ],
    quickTips: [
      "Usa siempre protección en tus prácticas sexuales.",
      "Habla abiertamente con tus parejas sobre salud sexual.",
      "No hay consentimiento si hay presión o miedo: detente siempre.",
    ],
    faqs: [
      {
        q: "¿Qué son las infecciones urinarias y por qué ocurren con tanta frecuencia?",
        a: "Las infecciones urinarias son causadas generalmente por bacterias que ingresan al tracto urinario, afectando la uretra, la vejiga o incluso los riñones. Son comunes, especialmente en mujeres, debido a factores anatómicos (como la cercanía entre la uretra y el ano), prácticas de higiene, actividad sexual o retención prolongada de orina.",
      },
      {
        q: "¿Cuáles son los síntomas más comunes de una infección urinaria?",
        a: "Los síntomas incluyen ardor al orinar, necesidad urgente y frecuente de orinar, dolor en la parte baja del abdomen, orina turbia o con mal olor, y en algunos casos, fiebre o sangre en la orina. Si no se trata a tiempo, puede derivar en complicaciones más graves como una infección renal.",
      },
      {
        q: "¿Cómo prevenir infecciones urinarias de forma efectiva?",
        a: "Es recomendable orinar después de tener relaciones sexuales, evitar productos irritantes (como jabones perfumados), usar ropa interior de algodón, mantener una buena hidratación, y evitar aguantar la orina por tiempos prolongados. La higiene debe ser suave, sin exceso de lavado o duchas vaginales que alteren la flora natural.",
      },
      {
        q: "¿Qué prácticas ayudan a prevenir infecciones genitales recurrentes?",
        a: "Mantener relaciones sexuales protegidas, evitar el uso compartido de objetos íntimos, cambiar con frecuencia compresas o tampones, no usar ropa ajustada por tiempos prolongados y acudir regularmente a controles ginecológicos son acciones clave para reducir el riesgo de infecciones genitales o de transmisión sexual.",
      },
      {
        q: "¿Cuándo es importante consultar a un profesional de salud?",
        a: "Si presentas síntomas persistentes, fiebre, flujo anormal, dolor pélvico intenso o infecciones recurrentes, es fundamental consultar a un profesional. La automedicación puede empeorar el cuadro o enmascarar otras condiciones. El diagnóstico y tratamiento oportuno son clave para evitar complicaciones.",
      },
    ],
    content: `### ¿Qué es la salud sexual?
  La salud sexual no se limita a la ausencia de enfermedades: implica bienestar físico, emocional, mental y social en relación con la sexualidad. Incluye el derecho a tomar decisiones libres e informadas sobre el propio cuerpo, relaciones y prácticas sexuales.
  
  ### Consentimiento: la base de toda relación sexual
  
  El consentimiento es un **acuerdo claro, voluntario, entusiasta y reversible** entre personas para participar en una actividad. Algunas claves esenciales:
  
  - **Debe ser explícito:** No basta con asumir. Se da con palabras y acciones claras.
  - **Debe ser informado:** No puede haber consentimiento si hay engaño o presión.
  - **Puede retirarse en cualquier momento.**
  - **No es válido si hay miedo, manipulación, presión o intoxicación.**
  
  > **Sin consentimiento, no hay relación sexual: hay violencia.**
  
  ### Derechos sexuales fundamentales
  
  - Derecho a decidir libremente sobre tu vida sexual.
  - Derecho a información basada en evidencia.
  - Derecho a recibir atención en salud sexual sin discriminación.
  - Derecho a decir NO sin ser culpabilizado.
  - Derecho a explorar el placer de forma segura.
  
  ### Autocuidado y exploración
  
  La sexualidad también es una dimensión íntima de autoconocimiento. Algunas formas de autocuidado sexual:
  
  - Conocer tu cuerpo: la autoexploración no es vergonzosa, es saludable.
  - Usar métodos de protección (condón externo/interno, barreras orales).
  - Consultar regularmente al ginecólogo o urólogo.
  - Realizarse exámenes de ITS aunque no haya síntomas.
  - Priorizar la comunicación abierta en tus relaciones.
  
  ### Prevención de infecciones de transmisión sexual (ITS)
  
  - Usa preservativo en todas tus prácticas sexuales con penetración.
  - Hazte chequeos cada 6–12 meses si tienes vida sexual activa.
  - Conversa con tu pareja sobre su salud sexual de forma abierta.
  - Evita el consumo de alcohol o sustancias si puede afectar tu decisión.
  - Si hubo riesgo, puedes optar por pruebas de detección o profilaxis post-exposición.
  
  ### ¿Qué hacer si sufriste violencia sexual?
  
  - No estás solo/a. No fue tu culpa.  
  - Busca atención médica lo antes posible (idealmente dentro de las 72 h).  
  - Puedes recibir tratamiento preventivo contra ITS y anticoncepción de emergencia.  
  - Acude a un espacio seguro: red de apoyo, profesional de salud, organizaciones.
  
  ### Recursos y apoyo
  
  - Línea de orientación sexual y violencia en Chile: *1455*  
  - Guía de salud sexual: MINSAL Chile  
  - ONG Miles, Aprofa, Fundación Iguales  
  - App: “SafeYou”, “SexPositive”  
  
  > La salud sexual se construye con respeto, información y libertad. El consentimiento no es un obstáculo: es la forma más plena y segura de vivir tu sexualidad.`,
  },
  {
    id: 10,
    title: "Guía para afrontar la ansiedad cotidiana",
    description:
      "Estrategias prácticas y orientación clara para reconocer, comprender y regular la ansiedad en la vida diaria.",
    type: "Bienestar emocional",
    category: "Guías",
    tags: ["ansiedad", "estrés", "emociones", "regulación emocional"],
    thumbnail: `${BASE_URL}/g-10`,
    keyPoints: [
      "Reconoce los síntomas físicos y emocionales",
      "Aplica técnicas de regulación emocional",
      "Entiende qué factores generan ansiedad",
      "Aprende cuándo acudir a un profesional",
    ],
    quickTips: [
      "Lleva un diario emocional para registrar patrones de ansiedad.",
      "Practica respiración profunda durante 3 minutos al día.",
      "No ignores la ansiedad persistente: es válida y merece atención.",
    ],
    faqs: [
      {
        q: "¿Cuántas horas de sueño necesita una persona adulta para estar saludable?",
        a: "En promedio, una persona adulta necesita entre 7 y 9 horas de sueño por noche para mantener una buena salud física y mental. Sin embargo, la calidad del sueño es tan importante como la cantidad. Dormir menos de lo necesario de forma habitual puede aumentar el riesgo de enfermedades cardíacas, ansiedad, depresión y deterioro cognitivo.",
      },
      {
        q: "¿Qué factores afectan negativamente el sueño?",
        a: "El estrés, el uso excesivo de pantallas antes de dormir, la cafeína, la falta de rutina, el consumo de alcohol, el ruido y la luz artificial pueden interferir con la capacidad para conciliar o mantener el sueño. También influyen los horarios irregulares o las preocupaciones constantes antes de acostarse.",
      },
      {
        q: "¿Qué hábitos ayudan a lograr un descanso realmente reparador?",
        a: "Establecer una rutina de sueño regular, evitar pantallas al menos 30 minutos antes de dormir, crear un ambiente oscuro y silencioso, reducir el consumo de estimulantes, realizar actividad física durante el día y practicar técnicas de relajación como respiración profunda o meditación pueden mejorar la calidad del descanso de forma notable.",
      },
      {
        q: "¿Es normal despertarse varias veces durante la noche?",
        a: "Despertarse ocasionalmente es normal, pero si ocurre con frecuencia o dificulta volver a dormir, puede estar relacionado con ansiedad, apnea del sueño, malos hábitos o incluso ciertas condiciones médicas. Si los despertares afectan tu energía o concentración durante el día, es importante evaluarlo con un profesional.",
      },
      {
        q: "¿Las siestas ayudan o perjudican el sueño nocturno?",
        a: "Las siestas pueden ser beneficiosas si son breves (20-30 minutos) y no muy cercanas a la hora de dormir. Una siesta reparadora puede mejorar el estado de alerta y la concentración. Sin embargo, si se prolongan o se toman muy tarde, pueden dificultar el sueño nocturno y alterar el ritmo circadiano.",
      },
    ],
    content: `### ¿Qué es la ansiedad?
  La ansiedad es una respuesta natural del cuerpo ante situaciones percibidas como amenazantes. No siempre es negativa: puede alertarnos y ayudarnos a actuar. Sin embargo, cuando se vuelve constante, intensa o desproporcionada, interfiere con la vida cotidiana.
  
  ### ¿Cómo se manifiesta?
  
  - **Síntomas físicos:** palpitaciones, sudoración, tensión muscular, fatiga, insomnio.
  - **Síntomas cognitivos:** preocupación excesiva, pensamientos intrusivos, dificultad para concentrarse.
  - **Síntomas conductuales:** evitación, irritabilidad, necesidad de control.
  
  > La ansiedad no siempre se nota desde fuera. A veces, se vive en silencio.
  
  ### Factores que contribuyen
  
  - Estrés acumulado.  
  - Exigencia autoimpuesta.  
  - Ambientes inestables.  
  - Falta de descanso y hábitos saludables.  
  - Experiencias pasadas no elaboradas.
  
  ### Estrategias para afrontar la ansiedad
  
  #### Respiración diafragmática
  1. Siéntate cómodo/a y lleva el aire hacia el abdomen.  
  2. Inhala en 4 segundos, sostiene en 4, exhala en 6.  
  3. Repite durante 3–5 minutos.
  
  #### Anclaje sensorial
  Concéntrate en lo que estás sintiendo ahora:
  - 5 cosas que ves.  
  - 4 cosas que puedes tocar.  
  - 3 sonidos.  
  - 2 olores.  
  - 1 sabor.  
  
  Esto ayuda a salir de la espiral mental.
  
  #### Diario de ansiedad
  Escribe lo que sientes, sin filtro. A veces entender el origen de la ansiedad ya disminuye su fuerza.
  
  #### Movimiento corporal consciente
  Caminar, estirarte, bailar, practicar yoga o mover tu cuerpo puede liberar la tensión acumulada.
  
  #### Rutinas de autocuidado
  Dormir bien, comer de forma balanceada, evitar la sobreestimulación digital y hacer pausas son pilares básicos de regulación emocional.
  
  ### Cuándo buscar ayuda profesional
  
  - Si la ansiedad interfiere con tu rutina diaria.  
  - Si sientes que no puedes controlarla.  
  - Si aparece junto a síntomas depresivos.  
  - Si tienes pensamientos persistentes de que algo malo va a pasar.  
  
  Un psicólogo o psiquiatra puede ayudarte con estrategias personalizadas o acompañamiento terapéutico.
  
  ### Recursos recomendados
  
  - App: “MindShift CBT”, “Sanvello”, “Insight Timer”.  
  - Lectura: *“El poder del ahora”* – Eckhart Tolle.  
  - Técnicas: Terapia cognitivo-conductual (TCC), mindfulness, EMDR.
  
  > Sentir ansiedad no significa que estés roto/a. Es una señal de que algo necesita tu atención, no tu castigo.`,
  },
  {
    id: 11,
    title: "Guía sobre diversidad corporal y aceptación del cuerpo",
    description:
      "Reflexiones y herramientas para comprender la diversidad corporal, cuestionar los estándares impuestos y cultivar una relación más sana con tu cuerpo.",
    type: "Bienestar emocional",
    category: "Guías",
    tags: ["autoimagen", "cuerpo", "autoaceptación", "diversidad corporal"],
    thumbnail: `${BASE_URL}/g-11`,
    keyPoints: [
      "Reflexiona sobre los estándares de belleza",
      "Fomenta la aceptación y el cuidado del cuerpo",
      "Identifica discursos dañinos en redes sociales",
      "Fortalece tu autoestima desde la compasión",
    ],
    quickTips: [
      "Sigue cuentas que promuevan cuerpos reales y positivos.",
      "Habla de tu cuerpo con el mismo respeto que usarías con un amigo.",
      "No necesitas cambiar tu cuerpo para empezar a cuidarlo.",
    ],
    faqs: [
      {
        q: "¿Qué es la alimentación intuitiva?",
        a: "Es un enfoque que invita a reconectar con las señales naturales del cuerpo como el hambre, la saciedad y el placer, dejando de lado dietas restrictivas o normas externas. Su objetivo es desarrollar una relación más saludable y flexible con la comida, sin culpa ni obsesión por el peso.",
      },
      {
        q: "¿En qué se diferencia de una dieta tradicional?",
        a: "Las dietas tradicionales suelen imponer reglas externas (qué, cuánto y cuándo comer), mientras que la alimentación intuitiva se basa en la autorregulación, permitiendo que el cuerpo guíe las decisiones alimenticias. No se enfoca en la pérdida de peso, sino en el bienestar general, la conciencia corporal y el respeto por el hambre real.",
      },
      {
        q: "¿Cómo puedo comenzar a comer de forma más intuitiva?",
        a: "Empieza por prestar atención a tus sensaciones de hambre y saciedad, evitar distracciones al comer, cuestionar creencias dietéticas rígidas y dar espacio a todos los alimentos sin categorizarlos como 'buenos' o 'malos'. También ayuda mantener un registro emocional para diferenciar el hambre física del hambre emocional.",
      },
      {
        q: "¿Puedo comer intuitivamente si tengo antecedentes de trastornos alimentarios?",
        a: "Sí, pero en estos casos es recomendable hacerlo con acompañamiento profesional. La alimentación intuitiva puede ser una herramienta poderosa de recuperación, siempre y cuando se aborde con seguridad, compasión y sin presión. No es un enfoque rígido, sino una invitación a sanar la relación con la comida y el cuerpo.",
      },
      {
        q: "¿Qué beneficios tiene la alimentación intuitiva a largo plazo?",
        a: "Favorece una mayor conexión con el cuerpo, disminuye la ansiedad alimentaria, mejora la autoestima, reduce los atracones y permite disfrutar de la comida sin culpa. A largo plazo, contribuye a hábitos sostenibles de bienestar, sin el ciclo de restricción y descontrol típico de muchas dietas convencionales.",
      },
    ],
    content: `### ¿Qué es la diversidad corporal?
  La diversidad corporal es la existencia natural de cuerpos distintos en formas, tamaños, capacidades, colores, edades y géneros. No existe un solo tipo de cuerpo “correcto” o “ideal”: cada cuerpo tiene valor por sí mismo, sin necesitar cumplir con expectativas externas.
  
  ### ¿Por qué es importante hablar de aceptación corporal?
  
  Vivimos expuestos a mensajes que idealizan ciertos cuerpos y rechazan otros. Esto puede generar:
  
  - Baja autoestima.  
  - Trastornos alimentarios.  
  - Aislamiento social.  
  - Odio hacia el propio cuerpo.  
  - Malestar físico y emocional constante.
  
  > La aceptación corporal no significa “me encanta todo de mi cuerpo”, sino “no necesito odiarlo para cuidarlo”.
  
  ### Claves para una relación más amable con tu cuerpo
  
  #### 1. Cuestiona los estándares
  Los modelos de belleza han cambiado históricamente y son construcciones sociales. Pregúntate: ¿quién gana cuando todos odiamos nuestros cuerpos?
  
  #### 2. Cambia el foco
  En lugar de observar tu cuerpo desde cómo “se ve”, piensa en lo que **hace por ti**: respirar, caminar, abrazar, crear, sostenerte.
  
  #### 3. Cuida desde el respeto
  Aliméntate, muévete y descansa no para cambiar tu cuerpo, sino para habitarlo con dignidad. El autocuidado no necesita dietas restrictivas ni castigo.
  
  #### 4. Limpia tus redes
  Sigue cuentas que representen cuerpos diversos y positivos. Aleja a personas o medios que promuevan culpa, vergüenza o exigencia estética constante.
  
  #### 5. Habla contigo con ternura
  Evita frases como “me veo horrible” o “debería pesar menos”. Cambia por “mi cuerpo merece respeto” o “estoy aprendiendo a aceptarme”.
  
  ### ¿Y si tengo días difíciles?
  
  - Todos los cuerpos fluctúan: peso, forma, energía.  
  - Puedes cuidarte incluso en los días en que no te gusta lo que ves.  
  - Sentirse inseguro no cancela tu valor.  
  - No estás solo/a: la presión estética nos afecta a muchas personas.
  
  ### Recursos y referentes
  
  - Movimiento Body Neutrality (Neutralidad corporal).  
  - Proyecto Body Positive.  
  - Podcast: *“Con cuerpo real”* (en español).  
  - Cuentas: @nutricion.inclusiva, @cuerpodiverso.cl, @bodyposipanda
  
  > Tu cuerpo no necesita cambiar para merecer amor, descanso y cuidado. Ya es suficiente como es. Empieza por tratarlo con la misma compasión que le ofrecerías a un ser querido.`,
  },
  {
    id: 12,
    title: "Guía para un uso consciente del celular y redes sociales",
    description:
      "Herramientas prácticas para desarrollar una relación más saludable con la tecnología, recuperar el foco y cuidar tu bienestar mental en la era digital.",
    type: "Bienestar digital",
    category: "Guías",
    tags: ["tecnología", "redes sociales", "uso consciente", "salud mental"],
    thumbnail: `${BASE_URL}/g-12`,
    keyPoints: [
      "Monitorea tu uso digital y redes sociales",
      "Aplica estrategias para reducir el tiempo en pantalla",
      "Desarrolla hábitos digitales más saludables",
      "Recupera foco y bienestar mental sin desconectarte",
    ],
    quickTips: [
      "Silencia notificaciones de apps que no son urgentes.",
      "Crea zonas libres de pantallas en tu casa.",
      "No revises el celular antes de dormir: interfiere con tu descanso.",
    ],
    faqs: [
      {
        q: "¿Qué es el movimiento corporal consciente?",
        a: "Es una forma de actividad física que pone énfasis en conectar con el cuerpo, escuchar sus necesidades y moverse desde el placer y no desde la obligación. A diferencia del ejercicio impuesto, el movimiento consciente valora la experiencia subjetiva, la respiración, el ritmo personal y el disfrute del presente mientras te mueves.",
      },
      {
        q: "¿Cuál es la diferencia entre moverse por disfrute y ejercitarse por obligación?",
        a: "Moverse por disfrute implica elegir actividades que generan bienestar, sin centrarse únicamente en la quema de calorías o la apariencia. En cambio, el ejercicio por obligación suele estar motivado por la culpa, la presión social o estándares estéticos, lo que puede generar rechazo, frustración o abandono a largo plazo.",
      },
      {
        q: "¿Qué tipos de movimiento se consideran conscientes?",
        a: "Cualquier actividad que se realice con atención plena puede ser movimiento consciente: caminar, bailar, practicar yoga, estiramientos, nadar, o incluso jugar. Lo importante no es la forma, sino la intención: conectar con el cuerpo, disfrutar el proceso y evitar el juicio constante sobre el rendimiento o el aspecto físico.",
      },
      {
        q: "¿Cómo puedo integrar el movimiento consciente en mi rutina diaria?",
        a: "Puedes empezar con pequeños momentos: estirarte al despertar, bailar una canción que te guste, caminar sin mirar el celular o tomar pausas activas mientras trabajas. La clave está en soltar la idea de 'entrenar' y abrirte a explorar cómo se siente tu cuerpo cuando se mueve sin exigencia.",
      },
      {
        q: "¿Qué beneficios tiene moverse de forma consciente?",
        a: "Además de mejorar la salud física, reduce el estrés, mejora el estado de ánimo, fortalece la autoestima y reconecta con la corporalidad desde el placer. También puede sanar la relación con el ejercicio y el cuerpo, especialmente si hay antecedentes de rigidez, rechazo o castigo asociados al movimiento físico.",
      },
    ],
    content: `### ¿Por qué importa el uso consciente del celular?
  
  Vivimos hiperconectados. Revisar notificaciones, redes o correos se vuelve casi automático. Sin darnos cuenta, pasamos **horas al día frente a pantallas** que influyen en nuestro ánimo, atención y percepción de la realidad.
  
  ### Señales de uso excesivo
  
  - Revisión constante del celular sin motivo claro.  
  - Dificultad para concentrarse sin estímulos digitales.  
  - Comparación constante con otras personas en redes.  
  - Sensación de ansiedad si no tienes el teléfono cerca.  
  - Interrupción frecuente del sueño por el uso nocturno.
  
  > La tecnología no es el problema. El desafío está en cómo, cuánto y para qué la usamos.
  
  ### Estrategias para recuperar el equilibrio digital
  
  #### 1. Monitorea tu tiempo
  Usa funciones del teléfono para saber cuántas horas pasas en cada app. Hazlo sin juicio, solo para observar tus hábitos reales.
  
  #### 2. Define horarios sin pantallas
  Elige momentos del día libres de celular: al despertar, durante las comidas, o antes de dormir. Intenta dejar el teléfono fuera del dormitorio.
  
  #### 3. Desactiva notificaciones innecesarias
  El sonido, vibración o íconos rojos generan micro interrupciones que afectan tu enfoque y aumentan la ansiedad.
  
  #### 4. Aplica el método “check-in”
  Antes de abrir una red social, pregúntate: ¿para qué la estoy abriendo? ¿Qué necesito? ¿Estoy aburrido, ansioso, evadiendo algo?
  
  #### 5. Revisa a quién sigues
  Prioriza cuentas que informen, inspiren o te hagan bien. Silencia o deja de seguir perfiles que generen comparación, exigencia o culpa.
  
  #### 6. Recupera el tiempo “muerto”
  Esos momentos donde solías scrollear (esperar el micro, estar en la fila) pueden ser usados para respirar, observar tu entorno o simplemente **no hacer nada**.
  
  ### Ideas para reemplazar el scroll automático
  
  - Leer un libro corto o microcuento.  
  - Dibujar, escribir o bordar.  
  - Escuchar un podcast reflexivo.  
  - Caminar sin audífonos, conectando con el entorno.  
  - Meditar o hacer una pausa activa.
  
  ### ¿Y si trabajo con redes sociales?
  
  - Establece límites entre uso personal y laboral.  
  - Planifica publicaciones y respuestas en bloques de tiempo.  
  - Recuerda que incluso si usas redes para trabajar, mereces descanso digital.
  
  ### Recursos útiles
  
  - App: “Forest”, “One Sec”, “Digital Wellbeing”  
  - Lectura: *“Cómo sobrevivir al mundo digital”* – Catherine Price  
  - Podcast: *“The Digital Mindfulness Podcast”*
  
  > No se trata de eliminar el celular, sino de volver a usarlo como herramienta, no como reflejo automático. El control no está en el algoritmo: está en tu conciencia.`,
  },
];

export type Guide = (typeof GUIDES_DATA)[number];

export const GUIDE_THEME_COLORS = {
  1: {
    bg: "bg-orange-50 dark:bg-orange-950",
    border: "border-orange-200 dark:border-orange-900/50",
    text: "text-orange-600 dark:text-orange-400",
    dark: "bg-orange-100",
    accent: "bg-orange-500",
    hover: "hover:bg-orange-100",
    borderAccent: "border-l-orange-500",
  },
  2: {
    bg: "bg-blue-50 dark:bg-blue-950",
    border: "border-blue-200 dark:border-blue-900/50",
    text: "text-blue-600 dark:text-blue-400",
    dark: "bg-blue-100",
    accent: "bg-blue-500",
    hover: "hover:bg-blue-100",
    borderAccent: "border-l-blue-500",
  },
  3: {
    bg: "bg-green-50 dark:bg-green-950",
    border: "border-green-200 dark:border-green-900/50",
    text: "text-green-600 dark:text-green-400",
    dark: "bg-green-100",
    accent: "bg-green-500",
    hover: "hover:bg-green-100",
    borderAccent: "border-l-green-500",
  },
  4: {
    bg: "bg-purple-50 dark:bg-purple-950",
    border: "border-purple-200 dark:border-purple-900/50",
    text: "text-purple-600 dark:text-purple-400",
    dark: "bg-purple-100",
    accent: "bg-purple-500",
    hover: "hover:bg-purple-100",
    borderAccent: "border-l-purple-500",
  },
  5: {
    bg: "bg-teal-50 dark:bg-teal-950",
    border: "border-teal-200 dark:border-teal-900/50",
    text: "text-teal-600 dark:text-teal-400",
    dark: "bg-teal-100",
    accent: "bg-teal-500",
    hover: "hover:bg-teal-100",
    borderAccent: "border-l-teal-500",
  },
  6: {
    bg: "bg-red-50 dark:bg-red-950",
    border: "border-red-200 dark:border-red-900/50",
    text: "text-red-600 dark:text-red-400",
    dark: "bg-red-100",
    accent: "bg-red-500",
    hover: "hover:bg-red-100",
    borderAccent: "border-l-red-500",
  },
  7: {
    bg: "bg-rose-50 dark:bg-rose-950",
    border: "border-rose-200 dark:border-rose-900/50",
    text: "text-rose-600 dark:text-rose-400",
    dark: "bg-rose-100",
    accent: "bg-rose-500",
    hover: "hover:bg-rose-100",
    borderAccent: "border-l-rose-500",
  },
  8: {
    bg: "bg-amber-50 dark:bg-amber-950",
    border: "border-amber-200 dark:border-amber-900/50",
    text: "text-amber-600 dark:text-amber-400",
    dark: "bg-amber-100",
    accent: "bg-amber-500",
    hover: "hover:bg-amber-100",
    borderAccent: "border-l-amber-500",
  },
  9: {
    bg: "bg-pink-50 dark:bg-pink-950",
    border: "border-pink-200 dark:border-pink-900/50",
    text: "text-pink-600 dark:text-pink-400",
    dark: "bg-pink-100",
    accent: "bg-pink-500",
    hover: "hover:bg-pink-100",
    borderAccent: "border-l-pink-500",
  },
  10: {
    bg: "bg-sky-50 dark:bg-sky-950",
    border: "border-sky-200 dark:border-sky-900/50",
    text: "text-sky-600 dark:text-sky-400",
    dark: "bg-sky-100",
    accent: "bg-sky-500",
    hover: "hover:bg-sky-100",
    borderAccent: "border-l-sky-500",
  },
  11: {
    bg: "bg-fuchsia-50 dark:bg-fuchsia-950",
    border: "border-fuchsia-200 dark:border-fuchsia-900/50",
    text: "text-fuchsia-600 dark:text-fuchsia-400",
    dark: "bg-fuchsia-100",
    accent: "bg-fuchsia-500",
    hover: "hover:bg-fuchsia-100",
    borderAccent: "border-l-fuchsia-500",
  },
  12: {
    bg: "bg-indigo-50 dark:bg-indigo-950",
    border: "border-indigo-200 dark:border-indigo-900/50",
    text: "text-indigo-600 dark:text-indigo-400",
    dark: "bg-indigo-100",
    accent: "bg-indigo-500",
    hover: "hover:bg-indigo-100",
    borderAccent: "border-l-indigo-500",
  },
};

export type GuideThemeColors = (typeof GUIDE_THEME_COLORS)[1];
