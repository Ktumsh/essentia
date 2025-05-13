import type { ArticleType } from "@/lib/types";

const timeSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12h-8V4Q8.65 4 6.325 6.325T4 12t2.325 5.675T12 20"/></svg>`;
const quantitySVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="currentColor" d="M117.25 157.92a60 60 0 1 0-66.5 0a95.83 95.83 0 0 0-47.22 37.71a8 8 0 1 0 13.4 8.74a80 80 0 0 1 134.14 0a8 8 0 0 0 13.4-8.74a95.83 95.83 0 0 0-47.22-37.71M40 108a44 44 0 1 1 44 44a44.05 44.05 0 0 1-44-44m210.14 98.7a8 8 0 0 1-11.07-2.33A79.83 79.83 0 0 0 172 168a8 8 0 0 1 0-16a44 44 0 1 0-16.34-84.87a8 8 0 1 1-5.94-14.85a60 60 0 0 1 55.53 105.64a95.83 95.83 0 0 1 47.22 37.71a8 8 0 0 1-2.33 11.07"/></svg>`;
const ingredientsSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="currentColor" d="M240 112a56.06 56.06 0 0 0-56-56c-1.77 0-3.54.1-5.29.26a56 56 0 0 0-101.42 0C75.54 56.1 73.77 56 72 56a56 56 0 0 0-24 106.59V208a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-45.41A56.09 56.09 0 0 0 240 112m-48 96H64v-40.58a55.5 55.5 0 0 0 8 .58h112a55.5 55.5 0 0 0 8-.58Zm-8-56h-13.75l5.51-22.06a8 8 0 0 0-15.52-3.88L153.75 152H136v-24a8 8 0 0 0-16 0v24h-17.75l-6.49-25.94a8 8 0 1 0-15.52 3.88L85.75 152H72a40 40 0 0 1 0-80h.58a55 55 0 0 0-.58 8a8 8 0 0 0 16 0a40 40 0 0 1 80 0a8 8 0 0 0 16 0a55 55 0 0 0-.58-8h.58a40 40 0 0 1 0 80"/></svg>`;
const toolsSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 4v17M4 4v3a3 3 0 1 0 6 0V4m4 4a3 4 0 1 0 6 0a3 4 0 1 0-6 0m3 4v9"/></svg>`;

const Header = ({ time, quantity }: { time: string; quantity: string }) => `
  <div class="flex items-center gap-4">
    <div class="flex items-center gap-3">
      ${timeSVG}
      <span class="uppercase">${time}</span>
    </div>
    <div class="flex items-center gap-3">
      ${quantitySVG}
      <span class="uppercase">${quantity}</span>
    </div>
  </div>
`;

const Ingredients = ({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: string[];
}) => `
  ${
    title
      ? `
  <div class="flex flex-col w-fit mt-8!">
    <div class="flex gap-3">
      <div>${ingredientsSVG}</div>
      <h2 class="uppercase tracking-widest">${title}</h2>
    </div>
    <hr class="w-[calc(100%-28px)] h-[1px] border-t-2 border-current ml-8 mt-2!" />
  </div>
  `
      : ""
  }
  ${subtitle ? `<p class="font-bold">${subtitle}</p>` : `<p class="mt-4!"></p>`}
  <ul class="flex flex-col space-y-2 pl-5 mt-2!">
    ${items.map((item) => `<li class="list-disc">${item}</li>`).join("")}
  </ul>
`;

const Preparation = ({
  title,
  subtitle,
  steps,
}: {
  title: string;
  subtitle: string;
  steps: string[];
}) => `
  ${
    title
      ? `
  <div class="flex flex-col w-fit mt-8!">
    <div class="flex gap-3">
      <div>${toolsSVG}</div>
      <h2 class="uppercase tracking-widest">${title}</h2>
    </div>
    <hr class="w-[calc(100%-28px)] h-[1px] border-t-2 border-current ml-8 mt-2!" />
  </div>
  `
      : ""
  }
  ${subtitle ? `<p class="font-bold">${subtitle}</p>` : `<p class="mt-4!"></p>`}
  <ul class="flex flex-col space-y-2 pl-8 mt-2!">
    ${steps.map((step) => `<li class="list-decimal">${step}</li>`).join("")}
  </ul>
`;

export const RECIPE_DATA = [
  {
    id: 1,
    slug: "salmon-a-la-plancha",
    title: "Salmón a la Plancha",
    image: "/modal/nutricion-article-01.webp",
    body: `
      <div class="flex flex-col w-full space-y-6">
        ${Header({ time: "25 minutos", quantity: "3 personas" })}
        <p>
          El salmón a la plancha es una de las recetas con pescado más fáciles que pueden existir. Básicamente es cocinar a fuego alto con un toque de aceite, sal y limón. No necesitas más nada. Cualquier ingrediente y paso extra son simplemente para personalizar esta receta. Y por supuesto, eso es genial.
        </p>
        ${Ingredients({
          title: "Ingredientes",
          subtitle: "Para el salmón:",
          items: [
            "600 gr de salmón en trozos sin piel",
            "Sal de Mar  a gusto",
            "Mix de Pimientas  a gusto",
            "Jugo de 1 limón",
            "2 cdas de aceite de oliva",
          ],
        })}
        ${Ingredients({
          title: "",
          subtitle: "Para el aderezo:",
          items: [
            "1 cdta de mostaza Dijon",
            "1 cda de miel de abeja",
            "Jugo de 1 limón",
            "6 cdas de aceite de oliva",
          ],
        })}
        ${Ingredients({
          title: "",
          subtitle: "Para la ensalada:",
          items: [
            "2 puñados de mix hojas verdes",
            "1 palta picada",
            "½ pepino picado",
            "Jugo de 1 limón",
            "3 rabanitos laminados",
          ],
        })}
        ${Preparation({
          title: "Preparación",
          subtitle: "Para el salmón:",
          steps: [
            "En un bowl, poner los trozos de salmón y echarles el jugo de limón, sal y pimienta y aceite de oliva. Mezclar y dejar reposar por 5 minutos.",
            "Precalentar una sartén antiadherente a fuego medio-alto y agregar un poco de aceite de oliva. Agregar los trozos de salmón que entren cómodamente y dejarlos quietos por 3 minutos.",
            "Luego de ese tiempo, darles la vuelta y cocinar por 3 minutos más por el otro lado. Retirarlos y reservar.",
          ],
        })}
        ${Preparation({
          title: "",
          subtitle: "Para el aderezo y la ensalada:",
          steps: [
            "Batir la miel con la mostaza, sal, pimienta y jugo de limón. Batiendo constantemente, agregar en forma de hilo el aceite de oliva para incorporarlo.",
            "Servir la ensalada al lado del salmón y encima echarle el aderezo.",
          ],
        })}
        <p class="italic text-center font-bold mt-8!">
          El salmón contiene omega 3 que favorece la disminución de factores de riesgo cardiovascular.
        </p>
      </div>
  `,
  },
  {
    id: 2,
    slug: "ensalada-cobb",
    title: "Ensalada Cobb",
    image: "/modal/nutricion-article-02.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "45 minutos", quantity: "2 personas" })}
          <p>
            La ensalada Cobb es una receta americana muy conocida que, con el paso de los años, se ha versionado en todo el mundo.
          </p>
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "Para el pollo:",
            items: [
              "1 pechuga de pollo",
              "1 cda de jugo de limón",
              "1 cdta de Orégano ",
              "Sal de Mar ",
              "Mix de Pimientas ",
              "Aceite de oliva",
            ],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Para la ensalada:",
            items: [
              "6 tiras de tocino",
              "Lechuga costina cortada en trozos medianos",
              "1 palta",
              "2 huevos duros picados",
              "100 gr de tomate cherry cortado en mitades",
              "Queso azul",
              "Ciboulette picado finamente",
            ],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Para el aderezo:",
            items: [
              "2 cdas de mostaza dijon o mostaza antigua",
              "2 cdas de vinagre de vino blanco",
              "6 cdas de aceite de oliva",
              "Sal de Mar ",
              "Mix de Pimientas ",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "Para el pollo:",
            steps: [
              "Cubrir la pechuga de pollo con papel para hornear y darle golpecitos con un uslero para aplanarlo hasta que tenga 1cm de alto.",
              "Cubrir el pollo con jugo de limón, orégano, sal y pimienta.",
              "Precalentar una sartén a fuego medio y agregar aceite de oliva. Cocinar el pollo por ambos lados.",
            ],
          })}
          ${Preparation({
            title: "",
            subtitle: "Para la ensalada:",
            steps: [
              "Cocinar el tocino en una sartén a fuego medio sin aceite. Dorarlo por ambos lados y retirarlo a un plato con papel de cocina para quitar el exceso de grasa. Picar una vez frío.",
              "En un bowl, crear una cama de lechuga. Encima, disponer los ingredientes a modo de líneas. Terminar con queso azul desmigado y ciboulette.",
            ],
          })}
          ${Preparation({
            title: "",
            subtitle: "Para el aderezo:",
            steps: [
              "Batir la mostaza con el vinagre, sal y pimienta usando un batidor de mano.",
              "Agregar el aceite de oliva a modo de hilo mientras bates para incorporarlo.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            La ensalada Cobb es una ensalada americana que se originó en el restaurante Brown Derby de Hollywood, en California, en 1937. La receta original fue creada por Robert H. Cobb, el propietario del restaurante y primo del jugador de béisbol Ty Cobb.
          </p>
        </div>

    `,
  },
  {
    id: 3,
    slug: "ensalada-de-pasta-con-salsa-de-ajo-tostado",
    title: "Ensalada de Pasta con Salsa de Ajo Tostado",
    image: "/modal/nutricion-article-03.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "30 minutos", quantity: "4 personas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "50 gr de tocino",
              "150 gr de arvejitas",
              "100 gr de choclo",
              "300 gr de pasta corta",
              "30 gr de queso parmesano en láminas",
              "100 gr de tomate cherry en cuartos",
              "6 cdas de Salsa de Ajo Tostado ",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "En una sartén a fuego medio, cocinar las láminas de tocino por ambos lados hasta que estén doradas. Retirar y picar una vez frías.",
              "Cocinar las arvejitas en abundante agua hirviendo a fuego medio con sal por 2 minutos. Retirar y dejar enfriar.",
              "Cocinar el choclo desde agua fría con sal por 2 minutos desde que hierve el agua a fuego medio. Retirar y dejar enfriar.",
              "Cocinar la pasta en abundante agua con sal por 10 minutos o hasta que esté al dente. Drenar y mezclar con el aceite de oliva para que no se pegue mientras se enfría.",
              "Una vez que todos los components se hayan enfriado, mezclar todo con la salsa de ajo tostado y servir.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            Las pastas son una buena fuente de energía, sobre todo, para personas que realizan alta actividad física. Contienen fibra que ayuda al tránsito intestinal.
          </p>
        </div>

    `,
  },
  {
    id: 4,
    slug: "ensalada-de-pasta-con-salsa-de-ajo-tostado",
    title: "Zapallo Spaghetti con Tomate Cherry y Albahaca",
    image: "/modal/nutricion-article-04.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "60 minutos", quantity: "2 personas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "1 zapallo spaghetti",
              "2 cdas aceite de oliva y algo más para el final",
              "Sal Rosada del Himalaya  a gusto",
              "1 cdta Pimienta Limón ",
              "10 tomates cherry en mitades",
              "Hojas de albahaca",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Parte el zapallo a la mitad con cuidado.",
              "Con una cuchara, quita totalmente las semillas y la fibra en las que se encuentran.",
              "Frota el zapallo con aceite de oliva, Sal Rosada y Pimienta Limón.",
              "Hornea el zapallo a 200°C por 30-45 minutos o hasta que puedas insertar un cuchillo con facilidad.",
              "Retira el zapallo del horno. Con un tenedor y agarrándolo con cuidado, deshiláchalo. Vas a ver que se forma como una “pasta”.",
              "Mezcla con más aceite de oliva, Sal de Mar, Pimienta Limón, tomates cherry en mitades y albahaca.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            El zapallo spaghetti es bajo en calorías y colesterol, por lo que bueno para controlar el peso. Buena fuente de fibra y ácido fólico. Tiene propiedades antioxidantes que ayudan a prevenir el cáncer.
          </p>
        </div>

    `,
  },
  {
    id: 5,
    slug: "zapallo-spaghetti-con-tomate-cherry-y-albahaca",
    title: "Pescado Frito con Papas al Ajo y al Romero",
    image: "/modal/nutricion-article-05.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "40 minutos", quantity: "5 personas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "700 gr de papas",
              "1 sobre de base para papas al romero y ajo  o 1 cda de Ajo en polvo  + 1 cda de Romero ",
              "4 cdas de aceite de oliva",
              "500 gr de pescado de tu preferencia",
              "½ tz de agua",
              "1 sobre de Base para Pescado Frito ",
              "Aceite para freír",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Pela y corta las papas en rodajas. Lleva a una fuente de horno y agrega el sobre de base para papa al romero y ajo y el aceite de oliva, o 1 cda de Ajo en polvo  + 1 cda de Romero . Mezcla muy bien y hornea a 200 °C por 25 minutos.",
              "Para el pescado, en un bol agrega el agua, el sobre de base para pescado frito y mezcla.",
              "Sumerge cada trozo de pescado hasta cubrir por completo y fríe en abundante aceite hasta que queden dorados.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            El pescado es rico en ácidos grasos omega 3, que favorecen la salud cardiovascular, reducen los niveles de colesterol y triglicéridos en la sangre. Contiene vitaminas y minerales esenciales para el organismo, vitamina D, B12, fósforo, yodo y zinc. Tiene bajos niveles de grasas saturadas, ideal para personas que llevan una dieta saludable. Se puede comer asado, frito, horneado, a la plancha o incluso crudo en un ceviche.
          </p>
        </div>

    `,
  },
  {
    id: 6,
    title: "Pollo en Salsa Inglesa",
    slug: "pollo-en-salsa-inglesa",
    image: "/modal/nutricion-article-06.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "80 minutos", quantity: "6 a 8 personas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "1 kg de pollo",
              "½ tz de Salsa Inglesa ",
              "3 dientes de ajo",
              "¾ tz de vinagre de vino tinto",
              "½ cda de Salvia Deshidratada ",
              "¼ cda de Sal de Mar ",
              "1 cdta de Pimienta ",
              "2 cebollas",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Retira la grasa y piel del pollo y condimenta con salsa inglesa, ajo, vinagre de vino tinto, salvia, sal y pimienta. Cubre y deja marinar por 30 minutos (mientras más tiempo lo dejes marinando mejor quedará el sabor).",
              "Transcurrido el tiempo, vierte toda la mezcla en una fuente para horno y sobre esto cebolla picado en corte pluma.",
              "Hornea a 250 °C por 40 minutos y disfruta.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            El pollo tiene un alto contenido de proteínas importantes para el crecimiento y desarrollo muscular y la reparación de tejidos. Es bajo en grasas, ideal para una dieta saludable. Contiene un aminoácido esencial, que actúa a nivel cerebral disminuyendo trastornos de depresión, ansiedad y angustia.
          </p>
        </div>

    `,
  },
  {
    id: 7,
    title: "Tortilla de Zapallo Italiano",
    slug: "tortilla-de-zapallo-italiano",
    image: "/modal/nutricion-article-07.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "30 minutos", quantity: "4 a 6 personas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "2 zapallitos italianos",
              "200 gr de champiñones en láminas",
              "1 pimentón rojo pequeño en cubos",
              "4 huevos",
              "Orégano ",
              "Sal de mar ",
              "Mix de pimientas ",
              "Pimienta Limón ",
              "Aceite de oliva",
              "Tomates cherry",
              "Orégano fresco",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Corta el zapallito en rodajas finas y cocina en una sartén con un chorrito de aceite de oliva hasta que el zapallito esté levemente dorado. Condimenta con sal y pimienta, reserva.",
              "Cocina los champiñones con aceite de oliva sin mover hasta lograr eliminar su líquido y dejarlos bien dorados.",
              "En un bowl pon los zapallitos junto con los champiñones y el pimentón picado.",
              "En otro bowl pequeño pon los huevos y agrega sal, orégano y pimienta limón. Mezcla muy bien con un batidor hasta homogeneizar.",
              "Vierte el batido de huevos sobre las verduras.",
              "Cocina a fuego medio-bajo la preparación en una sartén caliente con una película de aceite.",
              "Una vez la capa del fondo esté dorada, da vuelta con ayuda de un plato plano y cocina por unos minutos más o hasta que la tortilla esté lista.",
              "Sirve de inmediato con una ensaladita de tomates cherry y orégano fresco.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            El zapallo italiano es un alimento muy nutritivo, con un bajo contenido calórico y grasas. Es una buena fuente de vitaminas, minerales y antioxidantes.
          </p>
        </div>

    `,
  },
  {
    id: 8,
    slug: "quiche-de-pollo",
    title: "Quiche de Pollo",
    image: "/modal/nutricion-article-08.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "90 minutos", quantity: "8 personas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "Para la masa:",
            items: [
              "200 gr de harina sin polvos de hornear",
              "1 cdta de Sal de Mar ",
              "100 gr de mantequilla sin sal fría y cortada en cubitos",
              "1 huevo",
              "1 cda de agua",
            ],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Para el relleno:",
            items: [
              "1 pechuga de pollo hervida",
              "2 cdas de aceite de oliva",
              "2 cebollines picados",
              "1 cdta de Orégano ",
              "1 cdta de Pimentón Paprika ",
              "1 pimiento rojo picado muy pequeño",
              "2 dientes de ajo o 2 cdas de Ajo picado con aceite de oliva ",
              "2 huevos",
              "50 gr de queso parmesano rallado",
              "50 gr de queso mozzarella rallado",
              "300 ml de leche",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "Para el relleno:",
            steps: [
              "Cocinar el pollo en agua con sal hasta que esté totalmente cocido.",
              "Retirarlo del agua y desmenuzarlo cuando esté frío.",
              "Precalentar una sartén a fuego medio y agregar el aceite, el cebollín, orégano, paprika y pimiento. Cocinarlos hasta que estén suaves y comiencen a dorarse.",
              "Agregar el ajo y mezclar constantemente por 1 minuto. Agregar sal y pimienta, probar y corregir el nivel de sal de ser necesario.",
              "Retirar todo de la sartén y cuando se enfríe mezclarlo con el pollo y el resto de los ingredientes.",
            ],
          })}
          ${Preparation({
            title: "",
            subtitle: "Para la masa:",
            steps: [
              "En un bowl, poner la harina, mantequilla y sal. Con tus dedos, pellizcar la mantequilla con el resto de los ingredientes hasta que tengas una textura como de arena húmeda.",
              "Agregar el agua y huevo y mezclar hasta formar una masa. Envolver en film y refrigerar por 1 hora.",
              "Estirar la masa en una superficie enharinada hasta que tenga 2mm de grosor.",
              "Poner la masa dentro de un molde para quiche de 25 cm de diámetro y acomodar en su lugar.",
              "Arrugar mucho un trozo de papel para hornear e insertarlo dentro de la masa, asegurándonos que entre hasta las esquinas. Rellenar con porotos hasta el tope para hornear en blanco. Estos porotos luego se pueden reutilizar para lo mismo.",
              "Hornear así a 180 °C por 15-20 minutos o hasta que los bordes estén dorados.",
              "Retirar el papel y porotos con cuidado y regresar al horno por 10-15 minutos más o hasta que esté dorado. Dejar enfriar por completo.",
              "Rellenar con la mezcla de pollo y nivelar.",
              "Hornear a 160 °C por 30 min o hasta que esté empezando a dorarse por encima y el relleno haya cuajado.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            El pollo contiene un aminoácido esencial, que actúa a nivel cerebral disminuyendo trastornos de depresión, ansiedad, angustia, entre otros.
          </p>
        </div>

    `,
  },
  {
    id: 9,
    slug: "shawarma-de-pollo-con-salsa-de-ajo-tostado",
    title: "Shawarma de Pollo con Salsa de Ajo Tostado",
    image: "/modal/nutricion-article-09.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({
            time: "Marinar una noche + 25 minutos",
            quantity: "3 personas",
          })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "Para el pollo:",
            items: [
              "500 gr de trutro de pollo sin piel ni hueso",
              "1 diente de ajo rallado finamente",
              "1 cdta de Comino en Polvo ",
              "½ cdta de Pimienta Cayena ",
              "1 cdta de Pimentón Paprika ",
              "1 cda de jugo de limón",
              "2 cdas de aceite de oliva",
              "½ cdta de Canela en Polvo ",
              "Sal de Mar ",
              "Mix de Pimientas ",
            ],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Para cocinar:",
            items: ["Aceite vegetal"],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Para servir:",
            items: [
              "3 pan libanés",
              "3 hojas de lechuga",
              "1 tomate en láminas",
              "¼ cebolla morada en pluma fina",
              "Salsa de Ajo Tostado ",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "Para el pollo:",
            steps: [
              "Mezclar las piezas de pollo con el resto de ingredientes y dejar marinar refrigerado toda la noche.",
            ],
          })}
          ${Preparation({
            title: "",
            subtitle: "Para cocinar:",
            steps: [
              "Precalentar una sartén tipo grill o parrilla a fuego alto.",
              "Esparcir una capa delgada de aceite y poner el pollo encima. Dorar el pollo por ambos lados hasta que esté totalmente cocido y retirar.",
              "Dejar descansar 5 minutos y picar en tiras.",
            ],
          })}
          ${Preparation({
            title: "",
            subtitle: "Para servir:",
            steps: [
              "Sobre un pan libanés poner la lechuga, láminas de tomate y el pollo. Terminar con la cebolla en pluma y salsa de ajo tostado .",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            El pollo contiene un aminoácido esencial, que actúa a nivel cerebral disminuyendo trastornos de depresión, ansiedad, angustia, entre otros.
          </p>
        </div>

    `,
  },
  {
    id: 10,
    title: "Gohan de Salmón con Salsa Acevichada",
    slug: "gohan-de-salmon-con-salsa-acevichada",
    image: "/modal/nutricion-article-10.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "35 minutos", quantity: "3 personas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "Para el arroz pegajoso:",
            items: ["1 ½ de taza arroz", "1 ¾ de taza agua"],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Para el gohan:",
            items: [
              "250 gr de edamame con vaina",
              "600 gr de salmón sin piel en cubos",
              "½ pepino en bastones, sin semillas",
              "1 palta en láminas",
              "1 cebollín, solo la parte verde, picado finamente",
              "½ mango pelado y en cubos",
              "½ lámina de Nori, picado en tiras delgadas con tijeras",
              "Togarashi para servir",
              "Salsa Acevichada ",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "Para el arroz pegajoso:",
            steps: [
              "Verter el arroz sobre un colador y lavarlo bajo el chorro de agua, restregando hasta que salga agua cristalina.",
              "Poner el arroz y agua de la receta en una olla y hacer hervir a fuego medio-alto. Desde que hierva, reducir el fuego a bajo, tapar y dejar cocinar por 15 min.",
              "Destapar y dejar enfriar por completo antes de servir.",
            ],
          })}
          ${Preparation({
            title: "",
            subtitle: "Para el gohan:",
            steps: [
              "Hervir agua con abundante sal en una olla pequeña y agregar el edamame. Cocinar por 5 minutos. Retirar, pelar y descartar las vainas. Enfriar antes de servir.",
              "Armar los gohan con todos los ingredientes.",
              "Servir con salsa acevichada y togarashi.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            El salmón contiene omega 3 que favorece la disminución de factores de riesgo cardiovascular.
          </p>
        </div>

    `,
  },
  {
    id: 11,
    slug: "brochetas-de-camaron-con-salsa-aji-chipotle",
    title: "Brochetas de Camarón con Salsa Ají Chipotle",
    image: "/modal/nutricion-article-11.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "30 minutos", quantity: "4 personas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "Para los camarones:",
            items: [
              "500 gr de camarones limpios y pelados, con cola",
              "4 cdas de aceite de oliva",
              "2 dientes de ajo rallados finamente",
              "2 cdas de azúcar rubia",
              "1 cdta de Pimentón Paprika ",
              "½ cdta de Comino en Polvo ",
              "Sal de Mar ",
              "Pimienta Negra Molida ",
            ],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Para armar y cocinar:",
            items: ["2 limones de pica en láminas delgadas", "Aceite vegetal"],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Para servir:",
            items: ["Salsa Ají Chipotle ", "Limón en gajos", "Cilantro"],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "Para los camarones:",
            steps: [
              "Mezclar los camarones con el resto de los ingredientes y dejar reposar por 2 horas.",
            ],
          })}
          ${Preparation({
            title: "",
            subtitle: "Para armar y cocinar:",
            steps: [
              "En una brocheta, intercalar camarones con las láminas de limón dobladas a la mitad.",
              "Precalentar un grill o parrilla a fuego alto y esparcir una capa delgada de aceite.",
              "Agregar los camarones y cocinar 1 minuto por lado.",
            ],
          })}
          ${Preparation({
            title: "",
            subtitle: "Para servir:",
            steps: [
              "Retirar y servir calientes con salsa Chipotle, limón en gajos y cilantro.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            Los camarones son bajos en grasas y calorías. Son altos en proteína y omega 3, contienen vitaminas D y B12.
          </p>
        </div>

    `,
  },
  {
    id: 12,
    slug: "curry-de-garbanzos",
    title: "Curry de Garbanzos",
    image: "/modal/nutricion-article-12.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "45 minutos", quantity: "2 personas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "Para el curry de garbanzos:",
            items: [
              "1 cda aceite vegetal",
              "½ cebolla blanca picada finamente",
              "2 dientes de ajo molido o rallado finamente",
              "5g jengibre pelado y rallado finamente",
              "1 cdta Curry en Polvo ",
              "1/8 cdta Comino Molido ",
              "380g garbanzos cocidos",
              "120g tomates enlatados, picados",
              "160ml crema de coco",
              "Sal de Mar ",
              "Mix de Pimientas ",
            ],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Para el arroz basmati:",
            items: [
              "1 cdta aceite vegetal",
              "1 taza arroz basmati",
              "1 ¼ taza agua",
              "1 cdta sal",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "Para el curry de garbanzos:",
            steps: [
              "Precalentar una olla a fuego medio, agregar el aceite y la cebolla y sofreír hasta que se vuelva translúcida.",
              "Agregar el ajo y jengibre y mezclar constantemente por 30 segundos.",
              "Agregar el Curry en Polvo, Comino Molido, garbanzos, tomates y crema de coco.",
              "Mezclar constantemente hasta que espese.",
              "Probar y agregar Sal de Mar y Mix de Pimientas.",
              "Servir con arroz.",
            ],
          })}
          ${Preparation({
            title: "",
            subtitle: "Para el arroz basmati:",
            steps: [
              "Precalentar una olla a fuego medio y agregar el aceite.",
              "Agregar el arroz y mezclar constantemente por 1 minuto.",
              "Agregar el agua y sal y mezclar. Dejar que rompa hervor y tapar.",
              "Dejar cocinar por 15 minutos.",
              "Destapar y mezclar con un tenedor para separar los granos.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            Los garbanzos destacan por su alto contenido en fibra, importante para reducir los niveles de colesterol.
          </p>
        </div>

    `,
  },
  {
    id: 13,
    slug: "berenjena-rellena",
    title: "Berenjena Rellena",
    image: "/modal/nutricion-article-13.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "35 minutos", quantity: "2 personas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "Para las berenjenas con pisto:",
            items: [
              "2 berenjenas pequeñas",
              "1 cda de aceite de oliva",
              "½ cebolla blanca picada finamente",
              "½ pimiento rojo picado en cubos pequeños",
              "½ pimiento verde picado en cubos pequeños",
              "2 dientes de ajo molido o rallado finamente",
              "½ zapallo italiano pequeño picado en cubos pequeños",
              "2 tomates pelados y picados finamente, sin semillas",
              "1 cda de concentrado de tomate",
              "1 taza de agua",
              "Sal de Mar  y Mix de Pimientas ",
              "Perejil picado finamente",
            ],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Para los crutones:",
            items: [
              "½ ciabatta en cubos",
              "Aceite de oliva",
              "Sal de Mar  y Mix de Pimientas ",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "Para las berenjenas:",
            steps: [
              "Frotar las berenjenas con aceite de oliva y envolverlas en papel aluminio.",
              "Hornear las berenjenas a 200°C por 30 minutos o hasta que estén muy suaves y sea fácil atravesarlas con un cuchillo.",
              "Precalentar una sartén a fuego medio y agregar la cebolla y pimientos.",
              "Sofreír hasta que la cebolla se vuelva translúcida.",
              "Agregar el ajo y concentrado de tomate y mezclar constantemente por 1 minuto.",
              "Agregar el zapallo italiano y los tomates y mezclar.",
              "Agregar el agua y dejar que hierva lentamente hasta que se reduzca el líquido y los vegetales se pongan suaves.",
              "Agregar la Sal de Mar y Mix de Pimientas y perejil picado.",
              "Abrir las berenjenas con cuidado a la mitad sin atravesarlas totalmente y rellenar con el pisto.",
            ],
          })}
          ${Preparation({
            title: "",
            subtitle: "Para los crutones:",
            steps: [
              "Mezclar el pan con abundante aceite de oliva, sal y pimienta.",
              "Hornear en un horno precalentado a 200°C por 8-10 min o hasta que se vean dorados.",
              "Servir sobre las berenjenas.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            Las berenjenas contienen vitaminas B1, B6 y potasio. Buena fuente de fibra, antioxidantes y minerales, ayudan a bajar el colesterol y controlar el peso.
          </p>
        </div>

    `,
  },
  {
    id: 14,
    slug: "camote-relleno",
    title: "Camote Relleno",
    image: "/modal/nutricion-article-14.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "70 minutos", quantity: "2 personas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "Para los camotes rellenos:",
            items: [
              "2 camotes",
              "6 cdas de porotos negros cocidos",
              "4 cdas de Salsa Barbecue  reducida en azúcar",
              "1 cebollín (solo la parte blanca picada finamente)",
              "Sal de Mar  y Mix de Pimientas  a gusto",
            ],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Para servir:",
            items: [
              "½ palta laminada",
              "4 cdas de queso fresco desmenuzado",
              "Hojas de cilantro",
              "Sal de Mar  y Mix de Pimientas  a gusto",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Envolver los camotes en papel aluminio y hornear en un horno precalentado a 200°C por 1 hora o hasta que puedas atravesarlos fácilmente con un cuchillo.",
              "En un bowl mezclar los porotos con la Salsa Barbecue  y cebollín picado.",
              "Probar y ajustar nivel de sal y pimienta.",
              "Abrir el camote a la mitad con un cuchillo sin atravesarlo totalmente para poder rellenarlo.",
              "Agregar los porotos a los camotes y sirve con palta salpimentada, queso fresco y cilantro.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            El camote posee propiedades anti cancerígenas, anti diabéticas y anti envejecimiento. Previene el daño cardiaco, ya que tiene vitamina B6. Rico en fibra, vitaminas B, A y C.
          </p>
        </div>

    `,
  },
  {
    id: 15,
    slug: "pollo-al-horno",
    title: "Pollo al Horno",
    image: "/modal/nutricion-article-15.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "50 minutos", quantity: "4 a 5 personas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "8 trutros cortos",
              "Ralladura de 1 limón",
              "2 cdas aceite de oliva",
              "1 cda mantequilla",
              "Sal Rosada del Himalaya ",
              "Mix Pimientas ",
              "½ cdta Ajo Sal Condimentada ",
              "½ cdta Pimentón Paprika ",
              "1 cdta Orégano Entero ",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Limpiar los trutros quitando exceso de piel y grasa.",
              "En un bowl, mezclar el resto de los ingredientes para crear una pasta.",
              "Frotar los trutros con la mezcla y ponerlos dentro de una fuente apta para horno.",
              "Hornear por 40 min a 180°C, servir caliente.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            El pollo contiene un aminoácido esencial, que actúa a nivel cerebral disminuyendo trastornos de depresión, ansiedad, angustia, entre otros.
          </p>
        </div>

    `,
  },
  {
    id: 16,
    slug: "tortilla-de-acelga",
    title: "Tortilla de Acelga",
    image: "/modal/nutricion-article-16.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "30 minutos", quantity: "4 a 5 personas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "1 kilo de acelgas",
              "1 cucharada de aceite",
              "½ cebolla, picada fino",
              "Ajo Granulado  a gusto",
              "1 cucharadita de Orégano Entero Deshidratado ",
              "1 cucharadita de Sal de Mar ",
              "¼ cucharadita de Pimienta Blanca Molida ",
              "5 huevos, separados en clara y yema",
              "4 cucharadas de aceite",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Sacar los tallos gruesos de la acelga y pasar las hojas por agua hirviendo (15 a 20 segundos). Colar, estrujar y cortar las hojas cocidas.",
              "Calentar una cucharada de aceite en una sartén de 22 cm de diámetro aproximadamente. Agregar la cebolla y el ajo granulado. Cocinar hasta que la cebolla esté blanda y transparente. Reservar.",
              "En un bol, batir las claras de huevo a nieve. Aliñar con sal de mar, pimienta blanca y orégano. Batir un poco más para integrar y luego agregar las 5 yemas una a una.",
              "Incorporar la acelga y el sofrito. Mezclar con movimientos envolventes.",
              "Calentar el resto del aceite en la misma sartén donde se cocinó la cebolla. Una vez que esté bien caliente, poner la mezcla de acelga. Cocinar hasta que esté firme y los bordes estén dorados (aproximadamente 8 minutos).",
              "Con la ayuda de una tapa de olla o un plato, dar vuelta la tortilla y cocinar por el otro lado; serán como 8 a 10 minutos más.",
            ],
          })}
        </div>

    `,
  },
  {
    id: 17,
    slug: "merluza-a-la-pimienta-limon",
    title: "Merluza a la Pimienta Limón",
    image: "/modal/nutricion-article-17.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "50 minutos", quantity: "4 a 5 personas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "1 filete de merluza austral u otro pescado blanco de carne firme",
              "2 cucharadas de mantequilla",
              "1 cucharada de Alcaparras ",
              "1 cucharadita de Pimienta Limón ",
              "1 kilo de papas pequeñas",
              "2 cucharadas de aceite de oliva",
              "1 cucharadita de Sal Rosada del Himalaya ",
              "1 cucharada de ciboulette picado. Si no tiene fresco puede usar Ciboulette Deshidratado .",
              "1 limón cortado en rodajas (opcional)",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Calentar el horno a 200°C.",
              "Cortar las papas por la mitad. Mezclar con el aceite y la Sal Rosada del Himalaya. Ponerlas en una bandeja para horno y hornearlas hasta que estén blandas y doradas. Esto en general toma como 45 minutos. Espolvorear con ciboulette al servir.",
              "Grillar las rodajas de limón en un sartén bien caliente (ideal si es de fierro), hasta que estén doradas.",
              "Poner el pescado en una lata de horno con papel de hornear o aluminio.",
              "Derretir la mantequilla en una olla chica y cocinar hasta que se empiece a dorar. Agregar las Alcaparras y cocinar por un minuto más.",
              "Poner la mantequilla sobre el pescado, espolvorear con Pimienta Limón y poner las rodajas de limón.",
              "Cocinar el pescado por 20 minutos, o hasta que esté cocido. Servir acompañado de las papas.",
            ],
          })}
        </div>

    `,
  },
  {
    id: 18,
    slug: "sandwich-en-pan-pita-con-pollo",
    title: "Sandwich en Pan Pita con Pollo",
    image: "/modal/nutricion-article-18.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "30 minutos", quantity: "3 personas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "300g de filetitos de pollo",
              "½ cebolla morada picada finamente",
              "½ tomate picado fino",
              "Perejil picado",
              "1 cda aceite de oliva",
              "3 pan pita",
              "1 taza lechuga picada",
              "Sal Rosada del Himalaya  a gusto",
            ],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Para la salsa de yogurt y palta:",
            items: [
              "120g yogurt griego natural",
              "1 cda aceite de oliva",
              "½ cdta Romero Deshidratado ",
              "½ cdta Albahaca Deshidratada ",
              "½ palta pequeña",
              "Sal Rosada del Himalaya  a gusto",
              "Mix Pimientas  a gusto",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Poner el pollo en una olla con agua fría y sal. Poner la olla sobre fuego medio y desde que hierve contar 15 minutos. Retirarlo y desmenuzar.",
              "Mientras se enfría un poco el pollo, poner todos los ingredientes de la salsa de yogurt y palta en una licuadora. Licuar hasta tener una pasta homogénea.",
              "Mezclar la cebolla, tomate, perejil, aceite de oliva, Sal Rosada del Himalaya y Mix Pimientas en un bowl pequeño. Reservar.",
              "Tostar el pan pita y esparcir el dressing en la base de manera generosa.",
              "Encima poner la lechuga picada, pollo desmenuzado y terminar con la mezcla de tomate y cebolla picada.",
              "<strong>*Puedes reemplazar la salsa de yogurt y palta por una Salsa Street Ajo Tostado o agregar un poco.</strong>",
            ],
          })}
        </div>

    `,
  },
  {
    id: 19,
    slug: "yogurt-con-granola-y-frutas",
    title: "Yogurt con Granola y Frutas",
    image: "/modal/nutricion-article-19.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "10 minutos", quantity: "2 personas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "200 gr de yogurt",
              "500 gr de fruta variada",
              "Coco rallado ",
              "200 gr de granola",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "En un bowl, disponer del yogurt. Encima, poner fruta variada picada, coco rallado y granola.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            La granola es un alimento elaborado a base de avena, frutos secos, semillas y miel. Es un alimento muy completo y saludable, con una gran variedad de propiedades beneficiosas para la salud.
          </p>
        </div>

    `,
  },
  {
    id: 20,
    slug: "batido-de-arandanos-en-bowl",
    title: "Batido de Arándanos en Bowl",
    image: "/modal/nutricion-article-20.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "10 minutos", quantity: "2 personas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "Para el smoothie bowl:",
            items: [
              "130 gr de arándanos congelados",
              "1 plátano congelado",
              "150 gr de yogurt natural",
              "Leche para ajustar",
            ],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Para servir:",
            items: [
              "3 cdas de Coco rallado ",
              "Fruta fresca",
              "Flores comestibles",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Licuar los arándanos y plátano congelados con el yogurt y agregar leche de a poco para ayudar a la licuadora, pero intentar agregar lo mínimo posible.",
              "Servir en un bowl con tu fruta favorita y coco rallado tostado.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            Los arándanos contienen antioxidantes. Estos ayudan a proteger el deterioro celular y la oxidación.
          </p>
        </div>

    `,
  },
  {
    id: 21,
    slug: "pan-con-mantequilla-de-mani-y-platano",
    title: "Pan con Mantequilla de Maní y Plátano",
    image: "/modal/nutricion-article-21.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "5 minutos", quantity: "2 personas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "2 tajadas de pan de masa madre integral tostado",
              "4 cdas mantequilla de maní a temperatura ambiente",
              "1 plátano en láminas",
              "2 cdas de almendras en láminas tostadas",
              "2 cdtas de chía",
              "2 cdas de miel de abeja",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Esparcir la mantequilla de maní sobre el pan tostado.",
              "Terminar con láminas de plátano, almendras en láminas, chía y un poco de miel de abeja.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            La mantequilla de maní es un alimento elaborado a partir de maní molido. Es una fuente importante de proteínas, fibra, grasas saludables, vitaminas y minerales.
          </p>
        </div>

    `,
  },
  {
    id: 22,
    slug: "avena-remojada-u-overnight-oats",
    title: "Avena Remojada u Overnight Oats",
    image: "/modal/nutricion-article-22.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({
            time: "10 minutos + Noche de Remojo",
            quantity: "3 personas",
          })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "Para la avena:",
            items: [
              "1 tz de avena integral",
              "2 tz de leche",
              "3 cdas de mantequilla de maní a temperatura ambiente",
              "6 cdas de Cacao Amargo en polvo ",
              "2 cdas de miel",
              "¼ cdta de Sal de Mar ",
              "½ cdta de Esencia de Vainilla ",
            ],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Para terminar:",
            items: ["2 cdas de Coco Rallado ", "Chips de Chocolate "],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Mezclar todos los ingredientes y refrigerarlos en un contenedor hermético.",
              "Servir frío o caliente luego de por lo menos una noche o hasta 5 días con coco rallado tostado y chips de chocolate.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            La avena es buena fuente de fibra, reduce los niveles de colesterol, controla los niveles de glucosa, aporta vitaminas y minerales como magnesio, cobre, hierro, zinc y vitamina B1. Además aumenta la sensación de saciedad.
          </p>
        </div>

    `,
  },
  {
    id: 23,
    slug: "huevos-turcos",
    title: "Huevos Turcos",
    image: "/modal/nutricion-article-23.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "25 minutos", quantity: "2 porciones" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "Para el yogur:",
            items: [
              "300 gr de yogur temperatura ambiente",
              "1 diente de ajo molido o 1 cda de Ajo picado con Aceite de Oliva ",
              "Mix de Pimientas ",
              "Sal de Mar ",
              "Eneldo fresco picado o Eneldo deshidratado ",
            ],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Para los huevos:",
            items: ["4 huevos"],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Para servir:",
            items: [
              "50 gr de mantequilla con sal",
              "½ cdta de pimentón paprika ",
              "¼ cdta de comino ",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "Para el yogur:",
            steps: [
              "Mezclar el yogur con el resto de los ingredientes y reservar.",
            ],
          })}
          ${Preparation({
            title: "",
            subtitle: "Para los huevos pochados:",
            steps: [
              "Pon a hervir agua. Agregar los huevos y cocinar por 5 minutos.",
              "Retirar y pelar con cuidado.",
            ],
          })}
          ${Preparation({
            title: "",
            subtitle: "Para servir:",
            steps: [
              "Derretir la mantequilla y mezclar con el pimentón y comino.",
              "Crear una cama con el yogurt, poner los huevos encima y bañar con la mantequilla. Cortar los huevos a la mitad.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            Los huevos son uno de los alimentos más nutritivos, ya que contienen vitaminas A, B, D y E, minerales que ayudan al funcionamiento del cuerpo. Ayudan al desarrollo y a la regeneración celular.
          </p>
        </div>

    `,
  },
  {
    id: 24,
    slug: "pan-de-avena-rapido",
    title: "Pan de Avena Rápido",
    image: "/modal/nutricion-article-24.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "50 minutos", quantity: "6 porciones" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "200 gr de harina de avena",
              "2 huevos",
              "2 cdta de Polvos de Hornear ",
              "1 cdta de Sal de Mar ",
              "6 cdas de agua",
              "Aceite de oliva para cocinar",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Mezclar todos los ingredientes en un bowl hasta formar una masa.",
              "Dividir la masa en 6 trozos y formarlos a la forma de un pan pita pequeño",
              "Precalentar una sartén a fuego medio-bajo y esparcir un poco de aceite de oliva.",
              "Agregar una porción de masa y cocinarla 3 minutos por lado. Repetir con todos los panes.",
              "Abrirlo a la mitad y rellenarlo como quieras.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            La avena es buena fuente de fibra, reduce los niveles de colesterol, controla los niveles de glucosa, aporta vitaminas y minerales como magnesio, cobre, hierro, zinc y vitamina B1. Además aumenta la sensación de saciedad.
          </p>
        </div>

    `,
  },
  {
    id: 25,
    slug: "granola",
    title: "Granola",
    image: "/modal/nutricion-article-25.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "25 minutos", quantity: "" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "2 tazas de avena tradicional",
              "½ taza de almendras laminadas (o cualquier otro fruto(s) seco(s))",
              "½ taza de mix de semillas (chía, linaza, maravillas, etc.)",
              "½ cdta de Canela Molida ",
              "¼ cdta de Sal de Mar ",
              "½ cdta de Esencia de Vainilla ",
              "2 cdas de aceite vegetal",
              "4 cdas de miel de maple o miel de abejas",
              "Pasas a gusto (opcional)",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Precalentar el horno a 160°C.",
              "En un bowl, mezclar la avena, almendras, mix de semillas, canela y sal.",
              "Agregar la esencia de vainilla, aceite y miel. Revolver hasta que todo quede bien integrado e impregnado en los ingredientes secos.",
              "Sobre una bandeja de horno previamente engrasada o con papel mantequilla, poner la mezcla y esparcir de manera uniforme por toda la superficie. Hornear por 15 minutos o hasta que la granola esté dorada y las almendras se hayan tostado. A los 7 minutos es recomendable mover la granola con una paleta de madera para asegurarse de que se hornee de manera pareja.",
              "Una vez sacado del horno, dejar enfriar la granola sobre la lata. Agregar las pasas y pasar la granola a un envase hermético para almacenarla.",
            ],
          })}
        </div>

    `,
  },
  {
    id: 26,
    slug: "leche-dorada",
    title: "Leche Dorada",
    image: "/modal/nutricion-article-26.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "10 minutos", quantity: "" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "Para la pasta (10 a 12 porciones):",
            items: [
              "3 cdas de Cúrcuma Molida ",
              "1 cda de Canela Molida  (opcional)",
              "1 cdta de Jengibre Molido  (opcional)",
              "1 pizca de Pimienta Negra Molida ",
              "1/2 taza de agua",
            ],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Para la Leche Dorada (1 porción):",
            items: [
              "1 cdta de pasta",
              "1 taza de leche vegetal",
              "Miel u otro endulzante a gusto",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "Para la pasta:",
            steps: [
              "En una olla pequeña, mezclar todos los ingredientes secos hasta que queden bien integrados.",
              "Añadir el agua y revolver constantemente a fuego lento hasta que el agua se evapore y se forme una pasta espesa.",
              "Guardar la pasta en un recipiente. Esta dura hasta 2 semanas refrigerada.",
            ],
          })}
          ${Preparation({
            title: "",
            subtitle: "Para 1 porción de Leche Dorada:",
            steps: [
              "Mezclar 1 cdta de pasta con la leche vegetal en una olla pequeña y calentar a fuego medio. Revolver y retirar del fuego antes de que empiece a hervir.",
              "Añadir miel o endulzante a gusto. Servir caliente.",
            ],
          })}
        </div>

    `,
  },
  {
    id: 27,
    slug: "queque-de-zanahoria-vegano",
    title: "Queque de Zanahoria Vegano",
    image: "/modal/nutricion-article-27.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({
            time: "45 minutos + 6 horas de remojo de las castañas cajú",
            quantity: "6 personas",
          })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "2 cucharadas de linaza molida",
              "6 cucharadas de agua",
              "2 tazas de harina",
              "1 ½ cucharadita de Polvos de Hornear ",
              "½ cucharadita de Bicarbonato de Sodio ",
              "1 cucharadita de Canela Molida ",
              "½ cucharadita de Jengibre ",
              "1 ¼ taza de azúcar rubia",
              "½ taza de aceite de maravilla o de oliva",
              "1 cucharadita de Esencia de Vainilla ",
              "1 cucharada de vinagre de manzanas",
              "1/3 taza de jugo de naranjas",
              "2 tazas de zanahoria ralladas",
              "1 taza de nueces picadas pequeño",
            ],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Glaseado y relleno",
            items: [
              "1 ½ taza de castañas de cajú crudas",
              "¾ taza de agua de remojo de las castañas",
              "2 a 4 cucharadas de miel de abeja, agave o maple syrup (la cantidad dependerá de lo que ocupen)",
              "2 cucharadas de aceite de coco.",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Lo primero que tienen que hacer, al menos 6 horas antes de preparar la receta, es poner a remojar las castañas de cajú en agua fría; el agua debe tapar las castañas.",
              "Calentar el horno a 180°C. Mantequillar dos moldes de torta de 22 cm aprox. Poner en el fondo papel mantequilla y mantequillar bien.",
              "Para el queque, mezclar la linaza molida con el agua, revolver bien y dejar reposar por 5 minutos.",
              "Cernir la harina con los Polvos de Hornear , el Bicarbonato , la Canela Molida  y el Jengibre ; reservar.",
              "Mezclar el azúcar, el aceite, la Esencia de Vainilla , el vinagre, el jugo de naranjas y la mezcla de linaza preparada; batir levemente hasta tener todo integrado. Incorporar las zanahorias y la mezcla de harina. Si la mezcla estuviera muy seca, esperar que las zanahorias suelten sus jugos, un par de minutos y volver a mezclar. Por último, agregar las nueces picadas. Poner la mezcla entre los dos moldes preparados.",
              "Hornear por 30 a 35 minutos o hasta que, al meter un palito al medio, éste salga seco. Dejar enfriar los queques.",
              "Para preparar el relleno procesar todos los ingredientes hasta tener una crema homogénea.",
              "Luego desmoldar uno de los queques sobre un plato, asegurándose de sacar el papel mantequilla que usaron para hornear. Rellenar con la mitad de la crema de cajú, poner el otro queque y terminar con el resto de la crema. Decorar con nueces.",
            ],
          })}
        </div>

    `,
  },
  {
    id: 28,
    slug: "manjar-de-datiles",
    title: "Manjar de Dátiles",
    image: "/modal/nutricion-article-28.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({
            time: "10 minutos + tiempo de remojo de los dátiles",
            quantity: "1 1/4 taza aprox.",
          })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "1 taza de dátiles, sin carozo",
              "Agua hirviendo",
              "1 cucharadita de Esencia de Vainilla ",
              "1 cucharada de aceite de coco, derretido (opcional)",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Remojar los dátiles en agua hirviendo, sólo lo suficiente para taparlos. Dejar por 4 horas o hasta que estén blandos.",
              "Luego poner los dátiles con ¼ de taza del líquido del remojo, en una licuadora de alta potencia o procesadora, asegurándose que los dátiles no tengan carozo para no dañar el aparato doméstico a usar.",
              "Procesar los dátiles, agregando agua de a poco hasta lograr una mezcla tipo puré cremoso. Incorporar el aceite de coco y Esencia de Vainilla  e integrar.",
              "Poner el manjar en un frasco con tapa.",
            ],
          })}
        </div>

    `,
  },
  {
    id: 29,
    slug: "pudin-de-chia",
    title: "Pudín de Chía",
    image: "/modal/nutricion-article-29.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({
            time: "10 minutos + 6 horas refrigeración",
            quantity: "4 vasos",
          })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "1 ½ taza de leche vegetal como coco, almendras, avena o la que quieran (300 ml)",
              "80 gr de yogurt natural griego (puede ser vegetal)",
              "1 cucharadita de Esencia de Vainilla ",
              "2 a 3 cucharadas de miel de abejas, agave, maple o el endulzante de preferencia",
              "½ taza de chía",
              "Frutos rojos para servir",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Mezclar la leche vegetal con el yogurt, la Esencia de Vainilla  y la miel.",
              "Con un batidor de mano integrar todos los ingredientes.",
              "Incorporar la chía y mezclar bien.",
              "Esperar 10 minutos y luego dividir en 4 vasos.",
              "Tapar y refrigerar por al menos 6 horas.",
              "Para servir decorar con frutos rojos o fruta de la estación.",
            ],
          })}
        </div>

    `,
  },
  {
    id: 30,
    slug: "panqueques-de-avena-y-platano",
    title: "Panqueques de Avena y Plátano",
    image: "/modal/nutricion-article-30.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "20 minutos", quantity: "2 personas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "1 taza de avena tradicional",
              "1/4 de taza de leche*",
              "2 huevos",
              "1 plátano (mientras más maduro mejor)",
              "Una cucharadita de Canela Molida ",
              "Una cucharadita de Esencia de Vainilla ",
              "Endulzante(a gusto)",
              "20 gr de aceite de coco o 20 ml de aceite vegetal",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "En una procesadora poner todos los ingredientes, menos los huevos y el aceite de coco. Mezclar por un minuto o dos hasta que todo quede bien integrado.",
              "Luego, agregar los huevos y el aceite. Volver a mezclar por unos segundos hasta que se vuelva una masa homogénea.",
              "Calentar un sartén grande, colocar aceite y esperar a que se derrita. Poner un cucharón mediano de mezcla por panqueque y cocinar hasta que empiecen a aparecer burbujas por el lado de arriba; dar vuelta y cocinar por el otro lado hasta que estén dorados. Sacar del sartén y mantener tapados hasta terminar con toda la mezcla, también se pueden recalentar en el horno.",
              "Servir acompañados de berries y maple syrup o la miel que deseen.",
            ],
          })}
        </div>

    `,
  },
  {
    id: 31,
    slug: "batido-de-frutas",
    title: "Batido de Frutas",
    image: "/modal/nutricion-article-31.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({
            time: "5 minutos + 4 horas para congelar el plátano",
            quantity: "2 a 3 personas",
          })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "1 plátano",
              "2 duraznos chicos, picados",
              "1 taza de frutillas picadas",
              "1 yogurt natural",
              "jugo de una naranja",
              "1 a 2 cucharadas de miel de abejas o azúcar rubia",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Unas 4 a 6 horas antes, poner a congelar el plátano.",
              "Para preparar el batido poner todos los ingredientes en la licuadora y procesar hasta tener una mezcla homogénea.",
              "Poner en vasos y servir.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            Las frutas contiene antioxidantes. Estos ayudan a proteger el deterioro celular y la oxidación.
          </p>
        </div>

    `,
  },
  {
    id: 32,
    slug: "batido-de-dos-colores",
    title: "Batido de Dos Colores",
    image: "/modal/nutricion-article-32.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "20 minutos", quantity: "4 porciones" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "1 ½ tazas de frambuesas o frutillas congeladas",
              "1 ½ taza de jugo de manzana",
              "1 taza de mango congelado",
              "1 plátano",
              "1 ½ tazas de jugo de naranjas",
              "Azúcar o endulzante a gusto",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Licuar las frambuesas o frutillas junto al jugo de manzanas hasta tener una mezcla homogénea, endulzar si fuera necesario. Dividir la mezcla entre 4 vasos y llevar al congelador por 10 a 15 minutos.",
              "Luego licuar el mango junto con el plátano y el jugo de naranjas; endulzar si fuera necesario. Sacar los vasos del congelador y con cuidado vaciar la mezcla de mango. Servir inmediatamente.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            La fruta contiene antioxidantes. Estos ayudan a proteger el deterioro celular y la oxidación.
          </p>
        </div>

    `,
  },
  {
    id: 33,
    slug: "rollitos-pan-de-molde",
    title: "Rollitos Pan de Molde",
    image: "/modal/nutricion-article-33.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "10 minutos", quantity: "12 unidades" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "12 panes de molde grande, sin orillas",
              "6 huevos duros",
              "5 cdas de mayonesa",
              "Sal a gusto",
              "Pimienta Blanca Molida  a gusto",
              "12 lonjas de jamón de pavo (o del tipo que deseen)",
              "Eneldo Deshidratado ",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Uslear los panes y reservar.",
              "Moler los huevos duros junto con 4 cucharadas de mayonesa, aliñar con sal y Pimienta Blanca Molida  a gusto.",
              "Esparcir la mezcla de huevo con mayonesa en toda la superficie de los panes preparados. Luego en la mitad poner una lonja de jamón. Enrollar y luego cortar en 4 piezas cada rollo. Esparcir un poco de mayonesa arriba de cada rollito y luego espolvorear Eneldo Deshidratado  para decorar.",
            ],
          })}
        </div>

    `,
  },
  {
    id: 34,
    slug: "tostadas-de-masa-madre",
    title: "Tostadas de Masa Madre",
    image: "/modal/nutricion-article-34.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "20 minutos", quantity: "2 personas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "Para el queso batido:",
            items: [
              "3 cdas de queso ricota",
              "3 cdas de queso de cabra",
              "2 cdas de crema de leche",
              "Sal de Mar ",
              "Mix de Pimientas ",
            ],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Para servir:",
            items: [
              "2 tajadas pan de masa madre tostadas",
              "2 huevos",
              "4 cdas de Pesto ",
              "2 láminas de jamón serrano",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Batir la ricota con el queso de cabra y la crema de leche con un batidor de mano hasta tener una textura cremosa. Agregar sal y pimienta a gusto.",
              "Esparcir el queso sobre las tostadas, terminar con huevo frito, pesto y láminas de jamón serrano.",
            ],
          })}
        </div>

    `,
  },
  {
    id: 35,
    slug: "pasta-de-salame",
    title: "Pasta de Salame",
    image: "/modal/nutricion-article-35.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "10 minutos", quantity: "4 porciones" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "100 gr de salame",
              "200 gr de queso crema a temperatura ambiente",
              "8 tajadas de pan miga",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Picar el salame finamente y mezclarlo con el queso crema. Alternativamente usar un procesador de alimentos para mezclar ambos ingredientes.",
              "Esparcir la pasta de salame en los panes, tapar y servir.",
            ],
          })}
        </div>

    `,
  },
  {
    id: 36,
    slug: "pasta-de-pollo-pimenton",
    title: "Pasta de Pollo Pimentón",
    image: "/modal/nutricion-article-36.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "35 minutos", quantity: "4 porciones" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "600 gr de pechuga de pollo",
              "1 pimiento en conserva",
              "Sal de Mar  a gusto",
              "Mix de Pimientas  a gusto",
              "5 cdas de mayonesa",
              "8 tajadas de pan miga",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Cocinar la pechuga de pollo desde agua a temperatura ambiente con sal. Desde que hierve el agua toma 15 minutos.",
              "Deshilachar el pollo y reservar.",
              "Drenar el líquido de la conserva y picar finamente el pimiento.",
              "Agregar el pimiento al pollo y agregar sal, pimienta y mayonesa.",
              "Esparcir la pasta de pollo sobre el pan y tapar para crear un sándwich.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            El pollo contiene un aminoácido esencial, que actúa a nivel cerebral disminuyendo trastornos de depresión, ansiedad, angustia, entre otros.
          </p>
        </div>

    `,
  },
  {
    id: 37,
    slug: "pizza-de-coliflor",
    title: "Pizza de Coliflor",
    image: "/modal/nutricion-article-37.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "75 minutos", quantity: "2 pizzas medianas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "Para la masa:",
            items: [
              "1 kg de coliflor",
              "1 huevo",
              "1 cdta de Orégano ",
              "¼ cdta de Sal de Mar ",
              "50 gr de queso mozzarella",
            ],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Para la pizza:",
            items: [
              "6 cdas de salsa de tomate",
              "100 gr de queso mozzarella de búfala",
              "Hojas de albahaca",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Cortar la coliflor en trozos medianos y procesarla hasta tener una textura fina. También se puede rallar con un rallador fino.",
              "Llevar a un horno precalentado a 180 °C por 15 minutos. Retirar y dejar enfriar.",
              "Con un paño de cocina limpio, exprimir muy bien la coliflor para retirar el líquido.",
              "Mezclar la coliflor con el resto de los ingredientes y formar dos formas circulares medianas en una bandeja para horno con papel para hornear.",
              "Hornear a 230 °C por 20min o hasta que esté dorada.",
              "Agregar la salsa de tomate, queso mozzarella y hornear nuevamente por 10 minutos o hasta que el queso se haya derretido. Terminar con hojas de albahaca.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            La coliflor es una hortaliza baja en grasas. Importante fuente de fibra y antioxidantes, contiene potasio y fósforo que ayudan a reponerse ante esfuerzos físicos.
          </p>
        </div>

    `,
  },
  {
    id: 38,
    slug: "sandwich-capresse-saludable",
    title: "Sandwich Capresse Saludable",
    image: "/modal/nutricion-article-38.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "10 minutos", quantity: "2 personas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "4 rodajas de pan integral",
              "4 cdas Pesto ",
              "1 tomate",
              "2 bolas de mozzarella de búfala o mozzarella laminada",
              "Hojas de rúcula",
              "Aceite de oliva",
              "Sal Rosada del Himalaya  a gusto",
              "Mix Pimientas  a gusto",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Tostar el pan y esparcir pesto generosamente sobre una tajada.",
              "Encima poner la mozzarella desmenuzada con las manos y echarle Sal Rosada del Himalaya y Mix Pimientas.",
              "Agregar el tomate en láminas y salpimentar también.",
              "Terminar con la rúcula, un chorrito de aceite de oliva y tapar con otra tajada de pan.",
            ],
          })}
        </div>

    `,
  },
  {
    id: 39,
    slug: "sandwich-en-pan-pita-con-pollo",
    title: "Sandwich en Pan Pita con Pollo",
    image: "/modal/nutricion-article-39.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "30 minutos", quantity: "3 personas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "Para el relleno:",
            items: [
              "300g de filetitos de pollo",
              "½ cebolla morada picada finamente",
              "½ tomate picado fino",
              "Perejil picado",
              "1 cda aceite de oliva",
              "3 pan pita",
              "1 taza lechuga picada",
              "Sal Rosada del Himalaya  a gusto",
            ],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Para la salsa de yogurt y palta:",
            items: [
              "120g yogurt griego natural",
              "1 cda aceite de oliva",
              "½ cdta Romero Deshidratado ",
              "½ cdta Albahaca Deshidratada ",
              "½ palta pequeña",
              "Sal Rosada del Himalaya  a gusto",
              "Mix Pimientas  a gusto",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Poner el pollo en una olla con agua fría y sal. Poner la olla sobre fuego medio y desde que hierve contar 15 minutos. Retirarlo y desmenuzar.",
              "Mientras se enfría un poco el pollo, poner todos los ingredientes de la salsa de yogurt y palta en una licuadora. Licuar hasta tener una pasta homogénea.",
              "Mezclar la cebolla, tomate, perejil, aceite de oliva, Sal Rosada del Himalaya y Mix Pimientas en un bowl pequeño. Reservar.",
              "Tostar el pan pita y esparcir el dressing en la base de manera generosa.",
              "Encima poner la lechuga picada, pollo desmenuzado y terminar con la mezcla de tomate y cebolla picada.",
              "*Puedes reemplazar la salsa de yogurt y palta por nuestra Salsa Street Ajo Tostado o agregar un poco.",
            ],
          })}
        </div>

    `,
  },
  {
    id: 40,
    slug: "pan-rapido-sin-levadura",
    title: "Pan Rápido sin Levadura",
    image: "/modal/nutricion-article-40.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "15 minutos", quantity: "6 panes planos" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "1 taza de harina todo uso",
              "150 gr de yogurt natural (1/2 taza)",
              "1 cdta de polvos de hornear",
              "½ cdta de Sal de Mar  (opcional, porque es bien neutro)",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Juntar la harina con los polvos y sal en un bol. Agregar el yogurt y juntar hasta formar una masa blanda pero no pegajosa. Amasar un poco en el mesón. Dejar reposar 5 minutos tapada (usar el mismo bol donde se preparó la masa).",
              "Dividir la masa en 6 porciones y darles forma de ovillo. Uslerear cada ovillo en un círculo de unos 8 a 10 cm aprox.",
              "Cocinar los panes en una sartén antiadherente o plancha (si no tienen, usar cualquier sartén levemente aceitada) por ambos lados hasta que estén algo dorados. Servir inmediatamente. Son panes que duran menos, pero se pueden guardar en una bolsita refrigerados y luego se calientan al servir.",
            ],
          })}
        </div>

    `,
  },
  {
    id: 41,
    slug: "pan-integral",
    title: "Pan Integral",
    image: "/modal/nutricion-article-41.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "12 horas", quantity: "1 pan mediano" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "Para el fermento:",
            items: [
              "300 gr de harina integral fina",
              "250 gr agua",
              "10 gr de levadura seca",
            ],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Para la masa:",
            items: [
              "200 gr de harina integral fina",
              "110 gr de avena (la que tengan)",
              "1 cda de miel",
              "1 cdta de Sal de Mar ",
              "Todo el fermento",
              "200 a 250 ml de agua tibia",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Para el fermento, mezclar todos los ingredientes, revolver y dejar reposar hasta que haya al menos doblado su volumen, de 3 a 10 horas, o toda la noche.",
              "Para la masa, poner la harina en una batidora (que pueda amasar, si no, lo hacen a mano) junto a la avena, miel, sal y todo el fermento. Empezar a amasar (con la máquina o a mano) y de a poco, ir agregando el agua suficiente hasta formar una masa blanda y no pegajosa. Luego, amasar hasta que la masa se sienta más elástica (con la harina integral no se logra tanta elasticidad).",
              "Aceitar levemente un bol, y también ponerle una capa fina al pan para que no se seque. Dejar reposar la masa por 1 hora o hasta que haya doblado su volumen. Luego, poner la masa en el mesón y darle forma para ponerla en un molde de queque alargado, previamente aceitado. Dejar reposar hasta que la masa suba al borde del molde. Mientras tanto, calentar el horno a 200°C.",
              "Hacer unos pequeños cortes al pan arriba (con un cuchillo de serrucho), pintar con un poco de aceite de oliva y espolvorear con avena.",
              "Hornear el pan por 40 minutos. Dejar enfriar por 30 minutos y desmoldar. Luego dejar enfriar por completo.",
            ],
          })}
        </div>

    `,
  },
  {
    id: 42,
    slug: "pan-pita-integral",
    title: "Pan Pita Integral",
    image: "/modal/nutricion-article-42.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "1 hora 15 minutos", quantity: "14 panes" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "3 tazas de harina integral",
              "2 tazas de harina blanca",
              "1 cdta de Sal de Mar ",
              "½ cda de levadura en polvo",
              "300 a 350 ml de agua tibia",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Juntar ambas harinas en un bol grande. Espolvorear la sal y poner la levadura en el centro. Ir agregando agua de a poco, mezclando hasta formar una masa blanda pero no pegajosa. Pasar la masa al mesón y amasar por 7 minutos, o hasta que la masa esté lisa y elástica.",
              "Dividir la masa en 14 bollos y dejar reposar, tapados con un paño, por 30 minutos.",
              "Uslerear cada bollo en un círculo hasta que tenga ¾ cm de altura aprox., ponerlos sobre un pedazo de papel del porte de la bandeja de horno (usarán alrededor de 3 pedazos de papel para todos los panes). Dejar reposar por 15 minutos.",
              "Calentar el horno a 250°C o lo más alto que se pueda. Poner la bandeja del horno en el interior y un pequeño pocillo de aluminio en la parte de abajo del horno.",
              "Poner los panes pitas en la bandeja del horno, deslizando con cuidado el papel con ellos e inmediatamente tirar agua al pocillo para formar vapor. Cerrar el horno y cocinar por 5 minutos. Sacar del horno. Repetir el proceso con el resto de los panes. Dejar enfriar y guardar en una bolsa plástica.",
            ],
          })}
        </div>

    `,
  },
  {
    id: 43,
    slug: "galletas-de-avena",
    title: "Galletas de Avena",
    image: "/modal/nutricion-article-43.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "50 minutos", quantity: "30 galletas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "125 gr de mantequilla, blanda",
              "1 taza de azúcar flor",
              "1 huevo",
              "1 cucharadita de Esencia de Vainilla ",
              "1 taza de harina",
              "1 1/3 taza de avena tradicional",
              "1 cucharadita de Polvos de Hornear ",
              "1/3 taza de Coco Rallado ",
              "½ taza de nueces picadas",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Calentar el horno a 180°C.",
              "Batir la mantequilla con el azúcar flor hasta tener una mezcla cremosa y pálida. Agregar el huevo y batir hasta homogenizar. Añadir el resto de los ingredientes y mezclar hasta tener una mezcla integrada.",
              "Formar pelotitas de unos 2 cm de diámetro y luego poner en una lata de horno con lámina de silicona o papel mantequilla. Hornear por 10 a 12 minutos o hasta que hayan crecido y estén levemente doradas.",
              "Sacar del horno, dejar reposar por 5 minutos. Sacarlas de la lata y enfriar sobre una rejilla.",
              "Guardar en un envase hermético.",
            ],
          })}
        </div>

    `,
  },
  {
    id: 44,
    slug: "panqueques-de-avena",
    title: "Panqueques de Avena",
    image: "/modal/nutricion-article-44.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "30 minutos", quantity: "12 panqueques" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "250 gr de harina de avena",
              "2 cdas de azúcar rubia",
              "1 cdta de Polvos de Hornear ",
              "½ cdta de Bicarbonato de Sodio ",
              "200 ml de yogurt natural",
              "200 ml de leche",
              "2 huevos",
              "40 gr de mantequilla derretida",
              "1 cdta de Esencia Vainilla ",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Mezclar la harina de avena con el Bicarbonato de Sodio , Polvos de Hornear  y la azúcar rubia. En otro bol, mezclar el yogurt, leche, Esencia de Vainilla , los huevos y la mantequilla derretida; batir levemente para integrar. Vaciar sobre la mezcla de harina, revolver bien hasta no tener ningún grumo y dejar reposar por 15 minutos.",
              "Calentar una sartén grande, pincelar con un poquito de mantequilla (o con un pedazo de papel). Poner un cucharón mediano de mezcla por panqueque y cocinar hasta que empiecen a aparecer burbujas por el lado de arriba; dar vuelta y cocinar por el otro lado hasta que estén dorados. Sacar de la sartén y mantener tapados hasta terminar con toda la mezcla, también se pueden recalentar en el horno.",
              "Servir acompañados de berries y maple syrup o la miel que deseen.",
            ],
          })}
        </div>

    `,
  },
  {
    id: 45,
    slug: "hamburguesas-de-lentejas",
    title: "Hamburguesas de Lentejas",
    image: "/modal/nutricion-article-45.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "1 hora", quantity: "6 personas" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "Para las hamburguesas:",
            items: [
              "1 ½ tazas de lentejas, lavadas y remojadas toda la noche",
              "6 tazas de agua",
              "2 sobres de Caldo en Polvo de Verduras  o Caldo en Polvo de Verduras Más Natural ",
              "2 hojas de Laurel ",
              "1 cda de aceite de oliva",
              "1 cebolla chica, cortada en cubos",
              "1 zanahoria rallada",
              "1 cdita de Ají de Color ",
              "½ cdita de Comino Molido ",
              "1 cdita de Perejil Deshidratado ",
              "1 cda de Sazonador para Carne ",
              "Sal Rosada del Himalaya ",
              "¾ taza de nueces picadas",
              "2 panes de molde integrales",
              "2 huevos",
              "2 a 4 cdas de avena",
            ],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Para la salsa:",
            items: ["½ taza de mayonesa", "½ taza de yogurt natural"],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Para el armado del sándwich:",
            items: [
              "Panes para hamburguesa",
              "Tomate en rodajas",
              "Hojas de lechuga",
              "Salsa",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "Para las hamburguesas:",
            steps: [
              "Dejar remojando las lentejas toda la noche y colar al día siguiente.",
              "Poner las lentejas con agua, Caldo en Polvo de Verduras, Laurel y cocinar por 25 a 30 minutos semitapado a fuego medio.",
              "Calentar una cucharada de aceite de oliva en un sartén.",
              "Agregar la cebolla picada y la zanahoria rallada, sofreír hasta que la cebolla esté transparente.",
              "Agregar el Comino Molido, Perejil Deshidratado, Ají de Color, Sazonador para Carne. Integrar y reservar.",
              "En un recipiente, verter la mitad de las lentejas, agregar la Sal Rosada del Himalaya, las nueces picadas, el sofrito reservado, los huevos, los panes de molde y triturar con una procesadora.",
              "Agregar la avena, poner el resto de las lentejas e integrar.",
              "Armar 6 hamburguesas y refrigerar por al menos 30 minutos.",
              "Calentar 2 cucharaditas de aceite y cocinar las hamburguesas por ambos lados.",
            ],
          })}
          ${Preparation({
            title: "",
            subtitle: "Para armar las hamburguesas:",
            steps: [
              "Mezclar la mayonesa con el yogurt y luego untar los panes con esta mezcla.",
              "Poner una hamburguesa en cada pan, agregar tomates y lechuga.",
              "Servir inmediatamente.",
              "*Puedes reemplazar la salsa de mayonesa con yogurt por nuestra Salsa Street Burger o agregar un poco.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            Las lentejas son buena fuente de energía, ayudan al sistema nervioso, regulan los niveles de glucosa en la sangre y casi no contienen grasa.
          </p>
        </div>

    `,
  },
  {
    id: 46,
    slug: "sandwich-vegetariano",
    title: "Sandwich Vegetariano",
    image: "/modal/nutricion-article-46.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "45 minutos", quantity: "2 porciones" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "200 gr champiñones partidos en 3",
              "1 cucharada de aceite de oliva",
              "1/3 taza de vino blanco",
              "1 cucharada de queso crema",
              "1 cucharadita de Condimento para Pollo ",
              "1 taza de hojas de espinacas",
              "50 gr de queso de cabra, picado en láminas finas",
              "2 panes integrales",
            ],
          })}
          ${Ingredients({
            title: "",
            subtitle: "Para los tomates:",
            items: [
              "½ taza de tomates secos, hidratados en agua caliente por 4 horas",
              "1/3 taza de aceite de oliva",
              "1/2 diente de ajo picado chico",
              "Una pizca de Ají Color ",
              "1 cucharadita de Orégano Entero ",
              "½ cucharadita Mix de Pimientas ",
              "Sal de Mar ",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "Primero preparar los tomates secos:",
            steps: [
              "Colar los tomates del agua donde fueron hidratados y picar cada tomate en 2 o 3 partes. Juntar con el aceite, ajo en pasta, ají color, orégano, mix pimientas y sal de mar a gusto. Revolver y dejar reposar por 1/2 hora para que se desarrollen los sabores.",
            ],
          })}
          ${Preparation({
            title: "",
            subtitle: "",
            steps: [
              "Calentar la cucharada de aceite en un sartén. Una vez que el aceite esté bien caliente, agregar los champiñones y cocinar revolviendo hasta que estén dorados. Agregar el vino blanco y cocinar hasta que éste se haya evaporado. Agregar el queso crema y aliño de pollo, revolver hasta que el queso se haya derretido, reservar tibio.",
              "Partir cada pan por la mitad. Poner tomates secos en la mitad de arriba de cada pan, agregando aceite para mojar el pan con él. El la otra tapa poner champiñones con el queso crema, luego hojas de espinacas, láminas de queso de cabra. Tapar el pan con la parte superior que tiene los tomates secos.",
              "*Agrega a tu sandwich un poco de nuestra Salsa Street Ajo Tostado y dale un toque extra. O la Salsa Street Burger con toques de pepinillo y eneldo.",
            ],
          })}
        </div>

    `,
  },
  {
    id: 47,
    slug: "hamburguesa-de-pavo",
    title: "Hamburguesa de Pavo",
    image: "/modal/nutricion-article-47.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "30 minutos", quantity: "4 porciones" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "500 gr de carne de pavo molida",
              "½ cebolla cortada en cuadraditos",
              "½ atado de perejil picado fino",
              "2 cdas de Condimento de Pollo ",
              "½ taza de pan rallado",
              "2 tomates",
              "4 láminas de queso",
              "1 lechuga escarola",
              "4 pepinillos",
              "4 panes de hamburguesa",
              "Aceite para sofreír",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Calentar un sartén a fuego medio con un poco de aceite y agregar la cebolla. Sudar hasta que la cebolla se ponga transparente y retirar del fuego. Reservar.",
              "En un bol juntar la carne de pavo molida, la cebolla, el perejil, pan rallado, huevo y el Condimento de Pollo . Mezclar bien. Formar unas pelotitas de carne y luego aplastarlas con la mano.",
              "Calentar un sartén a fuego medio con un poco de aceite y dorar las hamburguesas por ambos lados. Poner las hamburguesas sobre una lata de horno para terminar la cocción en el horno.",
              "Mientras, cortar los tomates en rodajas, lavar la lechuga y cortar los pepinillos en láminas. Tostar el pan de hamburguesa.",
              "Armar las hamburguesas poniendo en cada pan una hoja de lechuga, dos láminas de tomate, una hamburguesa y un par de láminas de pepinillo.",
              "Servir las hamburguesas con papas fritas.",
              "*Agrega nuestra Salsa Street Ajo Tostado para darle un sabor especial. O la Salsa Street Burger con toques de pepinillo y eneldo.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            El pavo es una buena fuente de minerales, entre los que destacan de mayor a menor proporción selenio, fósforo, zinc y potasio.
          </p>
        </div>

    `,
  },
  {
    id: 48,
    slug: "jamon-de-pavo-acaramelado-con-clavos-de-olor",
    title: "Jamón de Pavo Acaramelado con Clavos de Olor",
    image: "/modal/nutricion-article-48.webp",
    body: `

        <div class="flex flex-col w-full space-y-6">
          ${Header({ time: "60 minutos", quantity: "4 unidades" })}
          ${Ingredients({
            title: "Ingredientes",
            subtitle: "",
            items: [
              "½ pechuga de pavo deshuesada",
              "15 unidades de Clavo de Olor ",
              "1 lt de agua",
              "1 hoja de Laurel ",
              "2 ramitas de tomillo fresco",
              "1 ramita de romero fresco",
              "100 gr de sal",
              "2 cdas de aceite de maravilla",
              "2 cdas de miel de abejas",
            ],
          })}
          ${Preparation({
            title: "Preparación",
            subtitle: "",
            steps: [
              "Retirar la piel de la pechuga de pavo. Clavar los Clavos de Olor  en la parte superior de la pechuga, distribuyéndolos homogéneamente. Amarar la pechuga de pavo con un cordón o con la malla con la que viene envasada. Debe quedar lo más redonda posible.",
              "En una olla calentar el agua con el Laurel , Tomillo, Romero y Sal. Una vez que hierva, apagar el fuego e introducir la pechuga de pavo. Dejar marinar en el agua durante 1 hora.",
              "Retirar del agua, lavarla con agua fría y secar. Poner el pavo en una budinera y frotar completamente con el aceite. Calentar el horno a 160ºC y cocinar durante 20 minutos.",
              "Una vez que la pechuga esté cocida, verter la miel en la budinera alrededor del pavo y hornear durante 5 min. más para que el pavo quede acaramelado. Retirar del horno y dejar enfriar.",
              "Sacar los Clavos de Olor  de la pechuga de pavo y cortarla en tajadas delgadas. Servir con pan o tostaditas.",
            ],
          })}
          <p class="italic text-center font-bold mt-8!">
            El pavo es una buena fuente de minerales, entre los que destacan de mayor a menor proporción selenio, fósforo, zinc y potasio.
          </p>
        </div>

    `,
  },
] as ArticleType[];
