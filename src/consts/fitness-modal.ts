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
<section>
  <div class="h-52 rounded-medium mb-5 shadow-lg shadow-black/20 overflow-hidden">
    <Image class="w-full h-full object-cover object-center" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2ZmYW0zdm56OHRwdWY1N2E5czUwb3l3MXZ0eG5ibmo2eXByaHEwMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/J99LWJ61hkOVq/giphy.gif" />
  </div>
  <div class="flex flex-col w-full gap-4 mb-10">
    <h2 class="text-lg text-main dark:text-main-dark font-medium">Rutina de Cardio</h2>
    <p>
      Mantén un ritmo constante al correr y asegúrate de mantener una buena postura para evitar lesiones.
    </p>
    <ul class="flex flex-col gap-4 ml-5">
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Calentamiento:</strong> 5-10 minutos de estiramientos ligeros.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Correr o caminar rápido:</strong> 30 minutos.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Saltar la cuerda:</strong> 5 minutos.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Enfriamiento:</strong> 5-10 minutos de estiramientos.</li>
    </ul>
  </div>
  <p class="text-xs uppercase text-main-m dark:text-main-dark-m font-bold">Video tutorial</p>
  <h2 class="text-xl text-main dark:text-main-dark font-medium my-2">${videoTitle}</h2>
</section>

        `;
    case 2:
      return `
<section>
  <div class="h-52 rounded-medium mb-5 shadow-lg shadow-black/20 overflow-hidden">
    <Image class="w-full h-full object-cover object-[50%_30%]" src="https://media.giphy.com/media/lPdnkrxkqnS48/giphy.gif?cid=ecf05e47e09pvv8odkp7hnbyy2a1up07835dzrn2j6yezeca&ep=v1_gifs_search&rid=giphy.gif&ct=g" />
  </div>
  <div class="flex flex-col w-full gap-4 mb-10">
    <h2 class="text-lg text-main dark:text-main-dark font-medium">Rutina de Fuerza para Principiantes</h2>
    <p>
      No sobrecargues el peso al principio, aumenta gradualmente según tu capacidad.
    </p>
    <ul class="flex flex-col gap-4 ml-5">
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Sentadillas:</strong> 3 series de 12 repeticiones.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Flexiones de brazos:</strong> 3 series de 10 repeticiones.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Peso muerto con mancuernas:</strong> 3 series de 10 repeticiones.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Plancha:</strong> 3 series de 30 segundos.</li>
    </ul>
  </div>
  <p class="text-xs uppercase text-main-m dark:text-main-dark-m font-bold">Video tutorial</p>
  <h2 class="text-xl text-main dark:text-main-dark font-medium my-2">${videoTitle}</h2>
</section>
      `;
    case 3:
      return `
<section>
  <div class="h-52 rounded-medium mb-5 shadow-lg shadow-black/20 overflow-hidden">
    <Image class="w-full h-full object-cover object-[50%_20%]" src="https://media.giphy.com/media/bcqfZjsFQJHLmXMYJw/giphy.gif?cid=ecf05e47e09pvv8odkp7hnbyy2a1up07835dzrn2j6yezeca&ep=v1_gifs_search&rid=giphy.gif&ct=g" />
  </div>
  <div class="flex flex-col w-full gap-4 mb-10">
    <h2 class="text-lg text-main dark:text-main-dark font-medium">Rutina de Alta Intensidad (HIIT)</h2>
    <p>
      Mantén una buena hidratación antes y después del ejercicio.
    </p>
    <ul class="flex flex-col gap-4 ml-5">
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Burpees:</strong> 30 segundos.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Descanso:</strong> 15 segundos.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Sentadillas con salto:</strong> 30 segundos.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Descanso:</strong> 15 segundos.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Mountain climbers:</strong> 30 segundos.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Descanso:</strong> 15 segundos.</li>
    </ul>
  </div>
  <p class="text-xs uppercase text-main-m dark:text-main-dark-m font-bold">Video tutorial</p>
  <h2 class="text-xl text-main dark:text-main-dark font-medium my-2">${videoTitle}</h2>
</section>
      `;
    case 4:
      return `
<section>
  <div class="h-52 rounded-medium mb-5 shadow-lg shadow-black/20 overflow-hidden">
    <Image class="w-full h-full object-cover object-[50%_20%]" src="https://media.giphy.com/media/rDIbIO2O7UStO/giphy.gif?cid=ecf05e476t5litj5r7tis0ebyo54r42l5iuf8iyo76nrwmkr&ep=v1_gifs_search&rid=giphy.gif&ct=g" />
  </div>
  <div class="flex flex-col w-full gap-4 mb-10">
    <h2 class="text-lg text-main dark:text-main-dark font-medium">Rutina de Core y Abdominales</h2>
    <p>
      Realiza los ejercicios lentamente para maximizar el trabajo muscular.
    </p>
    <ul class="flex flex-col gap-4 ml-5">
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Crunches:</strong> 3 series de 15 repeticiones.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Elevaciones de piernas:</strong> 3 series de 15 repeticiones.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Bicicleta:</strong> 3 series de 15 repeticiones por lado.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Plancha lateral:</strong> 3 series de 30 segundos por lado.</li>
    </ul>
  </div>
  <p class="text-xs uppercase text-main-m dark:text-main-dark-m font-bold">Video tutorial</p>
  <h2 class="text-xl text-main dark:text-main-dark font-medium my-2">${videoTitle}</h2>
</section>
      `;
    case 5:
      return `
<section>
  <div class="h-52 rounded-medium mb-5 shadow-lg shadow-black/20 overflow-hidden">
    <Image class="w-full h-full object-cover object-[50%_80%]" src="https://media.giphy.com/media/ScAw6bZg3P2j6/giphy.gif?cid=ecf05e47i3sy130tuempfm3qvypnc9ka2suxeyg0z6yqd9a1&ep=v1_gifs_search&rid=giphy.gif&ct=g" />
  </div>
  <div class="flex flex-col w-full gap-4 mb-10">
    <h2 class="text-lg text-main dark:text-main-dark font-medium">Rutina de Movilidad y Equilibrio</h2>
    <p>
      Realiza los ejercicios en una superficie estable para evitar caídas.
    </p>
    <ul class="flex flex-col gap-4 ml-5">
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Equilibrio en una pierna:</strong> 3 series de 30 segundos por pierna.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Giros de cadera:</strong> 3 series de 10 repeticiones por lado.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Rotaciones de hombros:</strong> 3 series de 15 repeticiones.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Estiramiento de tobillos:</strong> 3 series de 30 segundos por lado.</li>
    </ul>
  </div>
  <p class="text-xs uppercase text-main-m dark:text-main-dark-m font-bold">Video tutorial</p>
  <h2 class="text-xl text-main dark:text-main-dark font-medium my-2">${videoTitle}</h2>
</section>
      `;
    case 6:
      return `
<section>
  <div class="h-52 rounded-medium mb-5 shadow-lg shadow-black/20 overflow-hidden">
    <Image class="w-full h-full object-cover object-[50%_70%]" src="https://media.giphy.com/media/AWfeFosX36RTW/giphy.gif?cid=ecf05e47q8p2fzjleegjwey4hfd14z5yc2kuit25bgr4doye&ep=v1_gifs_search&rid=giphy.gif&ct=g" />
  </div>
  <div class="flex flex-col w-full gap-4 mb-10">
    <h2 class="text-lg text-main dark:text-main-dark font-medium">Rutina de Piernas y Glúteos</h2>
    <p>
      No permitas que la rodilla delantera pase la punta del pie en las zancadas.
    <ul class="flex flex-col gap-4 ml-5">
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Sentadillas:</strong> 3 series de 15 repeticiones.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Zancadas:</strong> 3 series de 12 repeticiones por lado.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Elevación de talones:</strong> 3 series de 20 repeticiones.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Puente de glúteos:</strong> 3 series de 15 repeticiones.</li>
    </ul>
  </div>
  <p class="text-xs uppercase text-main-m dark:text-main-dark-m font-bold">Video tutorial</p>
  <h2 class="text-xl text-main dark:text-main-dark font-medium my-2">${videoTitle}</h2>
</section>
      `;
    case 7:
      return `
<section>
  <div class="h-52 rounded-medium mb-5 shadow-lg shadow-black/20 overflow-hidden">
    <Image class="w-full h-full object-cover object-center" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2ZmYW0zdm56OHRwdWY1N2E5czUwb3l3MXZ0eG5ibmo2eXByaHEwMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/W7dBXzbnEpOBG/giphy.gif" />
  </div>
  <div class="flex flex-col w-full gap-4 mb-10">
    <h2 class="text-lg text-main dark:text-main-dark font-medium">Rutina de Espalda y Bíceps</h2>
    <p>
      Mantén la espalda recta y evita encorvarte durante los ejercicios.
    </p>
    <ul class="flex flex-col gap-4 ml-5">
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Dominadas:</strong> 3 series de 8-10 repeticiones.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Remo con mancuernas:</strong> 3 series de 12 repeticiones.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Curl de bíceps con mancuernas:</strong> 3 series de 15 repeticiones.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Plancha inversa:</strong> 3 series de 30 segundos.</li>
    </ul>
  </div>
  <p class="text-xs uppercase text-main-m dark:text-main-dark-m font-bold">Video tutorial</p>
  <h2 class="text-xl text-main dark:text-main-dark font-medium my-2">${videoTitle}</h2>
</section>
      `;
    case 8:
      return `
<section>
  <div class="h-52 rounded-medium mb-5 shadow-lg shadow-black/20 overflow-hidden">
    <Image class="w-full h-full object-cover object-bottom" src="https://media.giphy.com/media/l378edm0oLZN1hmTK/giphy.gif?cid=ecf05e47x2f8uyp73tosejku4jdzh3gojwtuehw7kgx43tfi&ep=v1_gifs_search&rid=giphy.gif&ct=g" />
  </div>
  <div class="flex flex-col w-full gap-4 mb-10">
    <h2 class="text-lg text-main dark:text-main-dark font-medium">Rutina de Pecho y Tríceps</h2>
    <p>
      Controla el movimiento y evita rebotes bruscos para prevenir lesiones.
    </p>
    <ul class="flex flex-col gap-4 ml-5">
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Flexiones de brazos:</strong> 3 series de 15 repeticiones.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Press de banca con mancuernas:</strong> 3 series de 12 repeticiones.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Fondos en paralelas:</strong> 3 series de 10 repeticiones.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Extensiones de tríceps:</strong> 3 series de 15 repeticiones.</li>
    </ul>
  </div>
  <p class="text-xs uppercase text-main-m dark:text-main-dark-m font-bold">Video tutorial</p>
  <h2 class="text-xl text-main dark:text-main-dark font-medium my-2">${videoTitle}</h2>
</section>
      `;
    case 9:
      return `
<section>
  <div class="h-52 rounded-medium mb-5 shadow-lg shadow-black/20 overflow-hidden">
    <Image class="w-full h-full object-cover object-[50%_40%]" src="https://media.giphy.com/media/3o85xtk0zf2Vvpuy1W/giphy.gif?cid=ecf05e47vjzlpesk23giu2yzyww60w40qf7k1i4rm1mnw4tf&ep=v1_gifs_search&rid=giphy.gif&ct=g" />
  </div>
  <div class="flex flex-col w-full gap-4 mb-10">
    <h2 class="text-lg text-main dark:text-main-dark font-medium">Rutina de Flexibilidad</h2>
    <p>
      No fuerces los estiramientos, hazlos de manera suave y gradual.
    </p>
    <ul class="flex flex-col gap-4 ml-5">
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Estiramiento de isquiotibiales:</strong> 3 series de 30 segundos por lado.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Estiramiento de cuádriceps:</strong> 3 series de 30 segundos por lado.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Estiramiento de espalda baja:</strong> 3 series de 30 segundos.</li>
      <li class="list-disc marker:text-gray-300 dark:marker:text-white/20"><strong class="font-medium text-bittersweet-900 dark:text-cerise-red-300/90">Estiramiento de hombros:</strong> 3 series de 30 segundos por lado.</li>
    </ul>
  </div>
  <p class="text-xs uppercase text-main-m dark:text-main-dark-m font-bold">Video tutorial</p>
  <h2 class="text-xl text-main dark:text-main-dark font-medium my-2">${videoTitle}</h2>
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
