import type { News } from "@/types/common";

const randomViews = () => Math.floor(Math.random() * 200);

export const NEWS: News[] = [
  {
    id: 1,
    category: "Bienestar Emocional",
    title: "El síndrome premenstrual podría aumentar el riesgo de suicidio",
    source_icon:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcxi2hnP0GACbSw8RCCRS3-s1W2IN-j6ZhVg&s",
    source_url: "https://hipertextual.com/",
    creator: "Hipertextual",
    pubDate: "2024-05-29 11:01:59",
    views: randomViews(),
    link: "http://hipertextual.com/2024/05/sindrome-premenstrual-suicidio",
    image_url:
      "https://imgs.hipertextual.com/wp-content/uploads/2024/05/aleksandra-sapozhnikova-BthSqlD2Cso-unsplash-scaled.jpg",
  },
  {
    id: 2,
    category: "Bienestar",
    title:
      "Panoramas para vacaciones de invierno 2024 en O'Higgins y todo Chile: Más de 350 actividades",
    source_icon: "https://i.bytvi.com/domain_icons/elrancahuaso.jpg",
    source_url: "https://www.elrancahuaso.cl",
    creator: "El Rancahuaso",
    pubDate: "2024-06-19 21:30:59",
    views: randomViews(),
    link: "https://www.elrancahuaso.cl/noticia/cultura/panoramas-para-vacaciones-de-invierno-2024-en-ohiggins-y-todo-chile-mas-de-350-activ",
    image_url:
      "https://cdn.elrancahuaso.cl/sites/elrancahuaso.cl/files/imagecache/380x285/imagen_noticia/ohiggins_panoramas_vacaciones_de_invierno_2024_ohiggins_rancagua_chile.jpg",
  },
  {
    id: 3,
    category: "Bienestar",
    title:
      "SEREMI de la Mujer Alejandra Ruiz Ovando: “Con esta nueva legislación Chile marca un hito en la protección de las mujeres»",
    source_icon: "https://i.bytvi.com/domain_icons/ovejeronoticias_cl.jpg",
    source_url: "https://www.ovejeronoticias.cl",
    creator: "Ovejero Noticias",
    pubDate: "2024-06-19 11:09:43",
    views: randomViews(),
    link: "https://www.ovejeronoticias.cl/2024/06/seremi-de-la-mujer-alejandra-ruiz-ovando-con-esta-nueva-legislacion-chile-marca-un-hito-en-la-proteccion-de-las-mujeres/",
    image_url:
      "https://www.ovejeronoticias.cl/wp-content/uploads/2024/06/Equipo-CDM-Punta-Arenas.jpeg",
  },
  {
    id: 4,
    category: "Salud",
    title:
      "Desafíos en Cáncer 2024 lanza su quinta edición e invita a presentar proyectos enfocados en cáncer de mamaDesafíos en Cáncer 2024 lanza su quinta edición e invita a presentar proyectos enfocados en cáncer de mama",
    source_icon: "https://i.bytvi.com/domain_icons/elcalbucano_cl.jpg",
    source_url: "https://www.elcalbucano.cl",
    creator: "El Calbucano",
    pubDate: "2024-06-19 01:25:47",
    views: randomViews(),
    link: "https://www.elcalbucano.cl/2024/06/desafios-en-cancer-2024-lanza-su-quinta-edicion-e-invita-a-presentar-proyectos-enfocados-en-cancer-de-mamadesafios-en-cancer-2024-lanza-su-quinta-edicion-e-invita-a-presentar-proyectos-enfocados-en-ca/",
    image_url:
      "https://www.elcalbucano.cl/wp-content/uploads/2024/06/4369eb16-f5fa-4a35-94b1-d95948ad42a1-1068x732.jpg",
  },
  {
    id: 5,
    category: "Bienestar Emocional",
    title:
      "Cesfam Dr. René Tapia, realiza acciones de sensibilización en el “Día Mundial de la Toma de Conciencia contra el Abuso y Maltrato de las Personas Mayores”.",
    source_icon: "https://i.bytvi.com/domain_icons/elcalbucano_cl.jpg",
    source_url: "https://www.elcalbucano.cl",
    creator: "El Calbucano",
    pubDate: "2024-06-19 00:58:43",
    views: randomViews(),
    link: "https://www.elcalbucano.cl/2024/06/cesfam-dr-rene-tapia-realiza-acciones-de-sensibilizacion-en-el-dia-mundial-de-la-toma-de-conciencia-contra-el-abuso-y-maltrato-de-las-personas-mayores/",
    image_url: "https://www.elcalbucano.cl/wp-content/uploads/2024/06/5-6.jpg",
  },
  {
    id: 6,
    category: "Salud",
    title: "Claves para resistir un nuevo invierno",
    source_icon: "https://i.bytvi.com/domain_icons/elcalbucano_cl.jpg",
    source_url: "https://www.elcalbucano.cl",
    creator: "El Calbucano",
    pubDate: "2024-06-19 14:45:20",
    views: randomViews(),
    link: "https://www.elcalbucano.cl/2024/06/claves-para-resistir-un-nuevo-invierno/",
    image_url:
      "https://www.elcalbucano.cl/wp-content/uploads/2024/06/Flu_5333857-1068x713.jpg",
  },
  {
    id: 7,
    category: "Salud",
    title: "Operaciones falsas: ¿funciona el efecto placebo en la cirugía?",
    source_icon:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcxi2hnP0GACbSw8RCCRS3-s1W2IN-j6ZhVg&s",
    source_url: "https://hipertextual.com/",
    creator: "Hipertextual",
    pubDate: "2024-06-04 13:51:55",
    views: randomViews(),
    link: "http://hipertextual.com/2024/06/operaciones-falsas-placebo-cirugia",
    image_url:
      "https://imgs.hipertextual.com/wp-content/uploads/2022/09/jafar-ahmed-E285pJbC4uE-unsplash-2-scaled.jpg",
  },
  {
    id: 8,
    category: "Bienestar",
    title:
      "Si te has preguntado cuánto tiempo libre necesitas para ser feliz, la ciencia tiene una respuesta",
    source_icon:
      "https://yt3.googleusercontent.com/NPGG6W29r_iI84KA6h3ZtUzhyzkxnKkGkjmy8GOBZ57CuR881sjpYZ5d_8nD2xCmfa2c210xnA=s900-c-k-c0x00ffffff-no-rj",
    source_url: "https://www.xataka.com/",
    creator: "Xataka",
    pubDate: "2024-06-15 09:00:29",
    views: randomViews(),
    link: "https://www.xataka.com/medicina-y-salud/te-has-preguntado-cuanto-tiempo-libre-necesitas-para-ser-feliz-ciencia-tiene-respuesta",
    image_url: "https://i.blogs.es/04d47b/tiempo-de-ocio/840_560.jpeg",
  },
  {
    id: 9,
    category: "Salud",
    title:
      "Han encontrado “bacterias resistentes” y “gérmenes fecales” en el pollo de LIDL. Es mucho menos grave de lo que parece",
    source_icon:
      "https://yt3.googleusercontent.com/NPGG6W29r_iI84KA6h3ZtUzhyzkxnKkGkjmy8GOBZ57CuR881sjpYZ5d_8nD2xCmfa2c210xnA=s900-c-k-c0x00ffffff-no-rj",
    source_url: "https://www.xataka.com/",
    creator: "Xataka",
    pubDate: "2024-06-18 11:31:04",
    views: randomViews(),
    link: "https://www.xataka.com/medicina-y-salud/han-encontrado-bacterias-resistentes-germenes-fecales-pollo-lidl-mucho-grave-que-parece",
    image_url:
      "https://i.blogs.es/7b4a4b/22651379145_448a5ce270_k/840_560.jpeg",
  },
  {
    id: 10,
    category: "Sexualidad",
    title:
      "Qué es la agamia, la nueva forma de relacionarse que rompe con la monogamia y el poliamor y gana peso en España",
    source_icon:
      "https://yt3.googleusercontent.com/NPGG6W29r_iI84KA6h3ZtUzhyzkxnKkGkjmy8GOBZ57CuR881sjpYZ5d_8nD2xCmfa2c210xnA=s900-c-k-c0x00ffffff-no-rj",
    source_url: "https://www.xataka.com/",
    creator: "Xataka",
    pubDate: "2024-05-24 17:01:36",
    views: randomViews(),
    link: "https://www.xataka.com/magnet/que-agamia-tendencia-que-rompe-monogamia-poliamor",
    image_url:
      "https://i.blogs.es/4b0e55/bewakoof-com-official-mg-hdjyipte-unsplash/840_560.jpeg",
  },
  {
    id: 11,
    category: "Nutrición",
    title:
      "Llevamos décadas tratando de averiguar por qué engordamos. La ciencia cada vez lo tiene más claro",
    source_icon:
      "https://yt3.googleusercontent.com/NPGG6W29r_iI84KA6h3ZtUzhyzkxnKkGkjmy8GOBZ57CuR881sjpYZ5d_8nD2xCmfa2c210xnA=s900-c-k-c0x00ffffff-no-rj",
    source_url: "https://www.xataka.com/",
    creator: "Xataka",
    pubDate: "2024-06-17 16:35:18",
    views: randomViews(),
    link: "https://www.xataka.com/medicina-y-salud/llevamos-decadas-tratando-averiguar-que-engordamos-ciencia-cada-vez-tiene-claro",
    image_url: "https://i.blogs.es/cc03ea/adipocyte-edit/840_560.jpeg",
  },
  {
    id: 12,
    category: "Bienestar",
    title:
      "Con 102 años sigue trabajando en la empresa que creó en 1940. Tiene sabios consejos que compartir: “mantén la mente activa”",
    source_icon:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeCtY_wjZgj3ubgwWpHAwnCtVpzXooFGFSsw&s",
    source_url: "https://www.genbeta.com/",
    creator: "Genbeta",
    pubDate: "2024-06-07 08:15:39",
    views: randomViews(),
    link: "https://www.genbeta.com/actualidad/102-anos-sigue-trabajando-empresa-que-creo-1940-tiene-sabios-consejos-que-compartir-manten-mente-activa",
    image_url:
      "https://i.blogs.es/f512bb/captura-de-pantalla-2024-06-07-092519-1-/840_560.jpeg",
  },
  {
    id: 13,
    category: "Bienestar",
    title:
      "¿El dinero da la felicidad? Este estudio responde con la cantidad necesaria y es la razón por la que Tim Cook se baja sueldo cada año",
    source_icon:
      "https://pbs.twimg.com/profile_images/1572934455198728193/addsHtKN_400x400.jpg",
    source_url: "https://www.applesfera.com/",
    creator: "Applesfera",
    pubDate: "2024-06-06 12:01:31",
    views: randomViews(),
    link: "https://www.applesfera.com/curiosidades/dinero-da-felicidad-este-estudio-responde-cantidad-necesaria-razon-que-tim-cook-se-baja-sueldo-cada-ano",
    image_url: "https://i.blogs.es/90eace/dinero-y-felicidad/840_560.jpeg",
  },
  {
    id: 14,
    category: "Salud y Bienestar",
    title: "Los perros también pueden cuidar de nuestra salud",
    source_icon:
      "https://pbs.twimg.com/profile_images/1156168848221057024/MpvA3kM6_400x400.jpg",
    source_url: "https://www.muyinteresante.com/",
    creator: "Muyinteresante",
    pubDate: "2024-06-13 11:27:24",
    views: randomViews(),
    link: "https://www.muyinteresante.com/mascotas/64998.html",
    image_url:
      "https://imagenes.muyinteresante.com/files/article_social_75/uploads/2024/06/05/666023bbf3fad.jpeg",
  },
  {
    id: 15,
    category: "Bienestar",
    title:
      "Asumir las emociones negativas mejora nuestra calidad de vida, según los expertos",
    source_icon:
      "https://pbs.twimg.com/profile_images/1156168848221057024/MpvA3kM6_400x400.jpg",
    source_url: "https://www.muyinteresante.com/",
    creator: "Muyinteresante",
    pubDate: "2024-06-11 18:30:00",
    views: randomViews(),
    link: "https://www.muyinteresante.com/ciencia/65064.html",
    image_url:
      "https://imagenes.muyinteresante.com/files/article_social_75/uploads/2022/10/17/634d2451b3085.jpeg",
  },
  {
    id: 16,
    category: "Bienestar Emocional",
    title:
      "Por qué deberíamos prestar más atención a nuestro cuerpo, según psicólogos",
    source_icon:
      "https://pbs.twimg.com/profile_images/1156168848221057024/MpvA3kM6_400x400.jpg",
    source_url: "https://www.muyinteresante.com/",
    creator: "Muyinteresante",
    pubDate: "2024-06-18 17:03:46",
    views: randomViews(),
    link: "https://www.muyinteresante.com/ciencia/65136.html",
    image_url:
      "https://imagenes.muyinteresante.com/files/article_social_75/uploads/2023/09/25/651193934a75d.jpeg",
  },
  {
    id: 17,
    category: "Bienestar Emocional",
    title: "¿Tienen beneficios las emociones negativas?",
    source_icon:
      "https://pbs.twimg.com/profile_images/1156168848221057024/MpvA3kM6_400x400.jpg",
    source_url: "https://www.muyinteresante.com/",
    creator: "Muyinteresante",
    pubDate: "2024-05-28 14:00:00",
    views: randomViews(),
    link: "https://www.muyinteresante.com/ciencia/64906.html",
    image_url:
      "https://imagenes.muyinteresante.com/files/article_social_75/uploads/2024/05/28/6655ccb8f21da.jpeg",
  },
  {
    id: 18,
    category: "Nutrición",
    title:
      "Recetas reconfortantes, pero fáciles, en el menú semanal vegano del 20 de mayo",
    source_icon:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkpB8FfLj617HeCbpVn5CqW9b_KJo7BymttQ&s",
    source_url: "https://www.directoalpaladar.com/",
    creator: "Directoalpaladar",
    pubDate: "2024-05-20 09:01:05",
    views: randomViews(),
    link: "https://www.directoalpaladar.com/recetas-vegetarianas/recetas-veganas-reconfortantes-que-faciles-hacer-menu-semanal-20-mayo",
    image_url: "https://i.blogs.es/35100a/1366_2000-3/840_560.jpeg",
  },
  {
    id: 19,
    category: "Nutrición",
    title:
      "La especialista en microbiota Sari Arponen desvela cuántas horas deberíamos dejar pasar entre una comida y otra, como mínimo",
    source_icon:
      "https://play-lh.googleusercontent.com/BzW36kJtSe3OheGZj3ALXRftyEZx01qG4mZTghnU9h9z0zgW3ONIQN-bLaewfa2FJN0",
    source_url: "https://www.elmundo.es/",
    creator: "El Mundo",
    pubDate: "2024-05-27 11:08:07",
    views: randomViews(),
    link: "https://www.elmundo.es/vida-sana/bienestar/2024/05/27/664db133e4d4d8d02f8b45ad.html",
    image_url:
      "https://phantom-elmundo.unidadeditorial.es/64aa4e6dbd9862c07fcb33ca3e8d4b52/resize/1200/f/webp/assets/multimedia/imagenes/2024/05/24/17165405320748.jpg",
  },
];
