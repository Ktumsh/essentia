import RESOURCES_VIDEOS from "@/consts/resources-videos";

import type { ModalData } from "@/types/common";

const videos =
  RESOURCES_VIDEOS.find((section) => section.section === "ExerciseFitness")
    ?.videos || [];

function generateModalTitle(index: number) {
  switch (index) {
    case 1:
      return "Rutina de Cardio";
    case 2:
      return "Rutina de Fuerza para Principiantes";
    case 3:
      return "Rutina de Alta Intensidad (HIIT)";
    case 4:
      return "Rutina de Core y Abdominales";
    case 5:
      return "Rutina de Movilidad y Equilibrio";
    case 6:
      return "Rutina de Piernas y Glúteos";
    case 7:
      return "Rutina de Espalda y Bíceps";
    case 8:
      return "Rutina de Pecho y Tríceps";
    case 9:
      return "Rutina de Flexibilidad";
    default:
      return "Caminatas";
  }
}

function generateModalBody(index: number, videoTitle: string) {
  switch (index) {
    case 1:
      return `
<section class="prose dark:prose-dark">
  <div class="h-52 rounded-md mb-5 shadow-lg shadow-black/20 overflow-hidden">
    <img
      class="!mt-0 w-full h-full object-cover object-center"
      src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2ZmYW0zdm56OHRwdWY1N2E5czUwb3l3MXZ0eG5ibmo2eXByaHEwMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/J99LWJ61hkOVq/giphy.gif"
      alt="Rutina de Cardio"
    />
  </div>
  <h3>Rutina de Cardio</h3>
  <p>
    Mantén un ritmo constante al correr y asegúrate de mantener una buena postura para evitar lesiones.
  </p>
  <ul>
    <li><strong>Calentamiento:</strong> 5-10 minutos de estiramientos ligeros.</li>
    <li><strong>Correr o caminar rápido:</strong> 30 minutos.</li>
    <li><strong>Saltar la cuerda:</strong> 5 minutos.</li>
    <li><strong>Enfriamiento:</strong> 5-10 minutos de estiramientos.</li>
  </ul>
  <p class="text-xs uppercase font-bold">Video tutorial</p>
  <h3 class="text-xl my-2">${videoTitle}</h3>
</section>
      `;
    case 2:
      return `
<section class="prose dark:prose-dark">
  <div class="h-52 rounded-md mb-5 shadow-lg shadow-black/20 overflow-hidden">
    <img
      class="!mt-0 w-full h-full object-cover object-[50%_30%]"
      src="https://media.giphy.com/media/lPdnkrxkqnS48/giphy.gif?cid=ecf05e47e09pvv8odkp7hnbyy2a1up07835dzrn2j6yezeca&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      alt="Rutina de Fuerza para Principiantes"
    />
  </div>
  <h3>Rutina de Fuerza para Principiantes</h3>
  <p>
    No sobrecargues el peso al principio, aumenta gradualmente según tu capacidad.
  </p>
  <ul>
    <li><strong>Sentadillas:</strong> 3 series de 12 repeticiones.</li>
    <li><strong>Flexiones de brazos:</strong> 3 series de 10 repeticiones.</li>
    <li><strong>Peso muerto con mancuernas:</strong> 3 series de 10 repeticiones.</li>
    <li><strong>Plancha:</strong> 3 series de 30 segundos.</li>
  </ul>
  <p class="text-xs uppercase font-bold">Video tutorial</p>
  <h3 class="text-xl my-2">${videoTitle}</h3>
</section>
      `;
    case 3:
      return `
<section class="prose dark:prose-dark">
  <div class="h-52 rounded-md mb-5 shadow-lg shadow-black/20 overflow-hidden">
    <img
      class="!mt-0 w-full h-full object-cover object-[50%_20%]"
      src="https://media.giphy.com/media/bcqfZjsFQJHLmXMYJw/giphy.gif?cid=ecf05e47e09pvv8odkp7hnbyy2a1up07835dzrn2j6yezeca&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      alt="Rutina de Alta Intensidad (HIIT)"
    />
  </div>
  <h3>Rutina de Alta Intensidad (HIIT)</h3>
  <p>
    Mantén una buena hidratación antes y después del ejercicio.
  </p>
  <ul>
    <li><strong>Burpees:</strong> 30 segundos.</li>
    <li><strong>Descanso:</strong> 15 segundos.</li>
    <li><strong>Sentadillas con salto:</strong> 30 segundos.</li>
    <li><strong>Descanso:</strong> 15 segundos.</li>
    <li><strong>Mountain climbers:</strong> 30 segundos.</li>
    <li><strong>Descanso:</strong> 15 segundos.</li>
  </ul>
  <p class="text-xs uppercase font-bold">Video tutorial</p>
  <h3 class="text-xl my-2">${videoTitle}</h3>
</section>
      `;
    case 4:
      return `
<section class="prose dark:prose-dark">
  <div class="h-52 rounded-md mb-5 shadow-lg shadow-black/20 overflow-hidden">
    <img
      class="!mt-0 w-full h-full object-cover object-[50%_20%]"
      src="https://media.giphy.com/media/rDIbIO2O7UStO/giphy.gif?cid=ecf05e476t5litj5r7tis0ebyo54r42l5iuf8iyo76nrwmkr&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      alt="Rutina de Core y Abdominales"
    />
  </div>
  <h3>Rutina de Core y Abdominales</h3>
  <p>
    Realiza los ejercicios lentamente para maximizar el trabajo muscular.
  </p>
  <ul>
    <li><strong>Crunches:</strong> 3 series de 15 repeticiones.</li>
    <li><strong>Elevaciones de piernas:</strong> 3 series de 15 repeticiones.</li>
    <li><strong>Bicicleta:</strong> 3 series de 15 repeticiones por lado.</li>
    <li><strong>Plancha lateral:</strong> 3 series de 30 segundos por lado.</li>
  </ul>
  <p class="text-xs uppercase font-bold">Video tutorial</p>
  <h3 class="text-xl my-2">${videoTitle}</h3>
</section>
      `;
    case 5:
      return `
<section class="prose dark:prose-dark">
  <div class="h-52 rounded-md mb-5 shadow-lg shadow-black/20 overflow-hidden">
    <img
      class="!mt-0 w-full h-full object-cover object-[50%_80%]"
      src="https://media.giphy.com/media/ScAw6bZg3P2j6/giphy.gif?cid=ecf05e47x2f8uyp73tosejku4jdzh3gojwtuehw7kgx43tfi&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      alt="Rutina de Movilidad y Equilibrio"
    />
  </div>
  <h3>Rutina de Movilidad y Equilibrio</h3>
  <p>
    Realiza los ejercicios en una superficie estable para evitar caídas.
  </p>
  <ul>
    <li><strong>Equilibrio en una pierna:</strong> 3 series de 30 segundos por pierna.</li>
    <li><strong>Giros de cadera:</strong> 3 series de 10 repeticiones por lado.</li>
    <li><strong>Rotaciones de hombros:</strong> 3 series de 15 repeticiones.</li>
    <li><strong>Estiramiento de tobillos:</strong> 3 series de 30 segundos por lado.</li>
  </ul>
  <p class="text-xs uppercase font-bold">Video tutorial</p>
  <h3 class="text-xl my-2">${videoTitle}</h3>
</section>
      `;
    case 6:
      return `
<section class="prose dark:prose-dark">
  <div class="h-52 rounded-md mb-5 shadow-lg shadow-black/20 overflow-hidden">
    <img
      class="!mt-0 w-full h-full object-cover object-[50%_70%]"
      src="https://media.giphy.com/media/AWfeFosX36RTW/giphy.gif?cid=ecf05e47q8p2fzjleegjwey4hfd14z5yc2kuit25bgr4doye&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      alt="Rutina de Piernas y Glúteos"
    />
  </div>
  <h3>Rutina de Piernas y Glúteos</h3>
  <p>
    No permitas que la rodilla delantera pase la punta del pie en las zancadas.
  </p>
  <ul>
    <li><strong>Sentadillas:</strong> 3 series de 15 repeticiones.</li>
    <li><strong>Zancadas:</strong> 3 series de 12 repeticiones por lado.</li>
    <li><strong>Elevación de talones:</strong> 3 series de 20 repeticiones.</li>
    <li><strong>Puente de glúteos:</strong> 3 series de 15 repeticiones.</li>
  </ul>
  <p class="text-xs uppercase font-bold">Video tutorial</p>
  <h3 class="text-xl my-2">${videoTitle}</h3>
</section>
      `;
    case 7:
      return `
<section class="prose dark:prose-dark">
  <div class="h-52 rounded-md mb-5 shadow-lg shadow-black/20 overflow-hidden">
    <img
      class="!mt-0 w-full h-full object-cover object-center"
      src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2ZmYW0zdm56OHRwdWY1N2E5czUwb3l3MXZ0eG5ibmo2eXByaHEwMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/W7dBXzbnEpOBG/giphy.gif"
      alt="Rutina de Espalda y Bíceps"
    />
  </div>
  <h3>Rutina de Espalda y Bíceps</h3>
  <p>
    Mantén la espalda recta y evita encorvarte durante los ejercicios.
  </p>
  <ul>
    <li><strong>Dominadas:</strong> 3 series de 8-10 repeticiones.</li>
    <li><strong>Remo con mancuernas:</strong> 3 series de 12 repeticiones.</li>
    <li><strong>Curl de bíceps con mancuernas:</strong> 3 series de 15 repeticiones.</li>
    <li><strong>Plancha inversa:</strong> 3 series de 30 segundos.</li>
  </ul>
  <p class="text-xs uppercase font-bold">Video tutorial</p>
  <h3 class="text-xl my-2">${videoTitle}</h3>
</section>
      `;
    case 8:
      return `
<section class="prose dark:prose-dark">
  <div class="h-52 rounded-md mb-5 shadow-lg shadow-black/20 overflow-hidden">
    <img
      class="!mt-0 w-full h-full object-cover object-bottom"
      src="https://media.giphy.com/media/l378edm0oLZN1hmTK/giphy.gif?cid=ecf05e47x2f8uyp73tosejku4jdzh3gojwtuehw7kgx43tfi&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      alt="Rutina de Pecho y Tríceps"
    />
  </div>
  <h3>Rutina de Pecho y Tríceps</h3>
  <p>
    Controla el movimiento y evita rebotes bruscos para prevenir lesiones.
  </p>
  <ul>
    <li><strong>Flexiones de brazos:</strong> 3 series de 15 repeticiones.</li>
    <li><strong>Press de banca con mancuernas:</strong> 3 series de 12 repeticiones.</li>
    <li><strong>Fondos en paralelas:</strong> 3 series de 10 repeticiones.</li>
    <li><strong>Extensiones de tríceps:</strong> 3 series de 15 repeticiones.</li>
  </ul>
  <p class="text-xs uppercase font-bold">Video tutorial</p>
  <h3 class="text-xl my-2">${videoTitle}</h3>
</section>
      `;
    case 9:
      return `
<section class="prose dark:prose-dark">
  <div class="h-52 rounded-md mb-5 shadow-lg shadow-black/20 overflow-hidden">
    <img
      class="!mt-0 w-full h-full object-cover object-[50%_40%]"
      src="https://media.giphy.com/media/3o85xtk0zf2Vvpuy1W/giphy.gif?cid=ecf05e47vjzlpesk23giu2yzyww60w40qf7k1i4rm1mnw4tf&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      alt="Rutina de Flexibilidad"
    />
  </div>
  <h3>Rutina de Flexibilidad</h3>
  <p>
    No fuerces los estiramientos, hazlos de manera suave y gradual.
  </p>
  <ul>
    <li><strong>Estiramiento de isquiotibiales:</strong> 3 series de 30 segundos por lado.</li>
    <li><strong>Estiramiento de cuádriceps:</strong> 3 series de 30 segundos por lado.</li>
    <li><strong>Estiramiento de espalda baja:</strong> 3 series de 30 segundos.</li>
    <li><strong>Estiramiento de hombros:</strong> 3 series de 30 segundos por lado.</li>
  </ul>
  <p class="text-xs uppercase font-bold">Video tutorial</p>
  <h3 class="text-xl my-2">${videoTitle}</h3>
</section>
      `;
    default:
      return "No hay video disponible";
  }
}

export const FITNESS_MODAL_DATA: ModalData[] = videos.map(
  (video: { id: number; title: string }, index: number) => ({
    id: index + 1,
    modalTitle: generateModalTitle(video.id),
    modalImage: `/modal/fitness-article-0${index + 1}.webp`,
    modalBody: generateModalBody(video.id, video.title),
  }),
);
