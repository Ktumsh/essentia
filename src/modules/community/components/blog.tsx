const Blog = () => {
  const posts = [
    {
      title: "Bienvenida al Blog",
      content:
        "Este es el lugar donde compartimos noticias, artículos y experiencias.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=Bienvenida+al+Blog",
      author: "Admin",
      date: "2024-07-04",
      comments: [
        { user: "Juan", comment: "Excelente espacio para compartir." },
        { user: "María", comment: "Muy informativo, gracias!" },
      ],
    },
    {
      title: "Salud y Bienestar",
      content: "Consejos y trucos para mantener una vida saludable.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=Salud+y+Bienestar",
      author: "Dr. Pérez",
      date: "2024-07-03",
      comments: [
        { user: "Ana", comment: "¡Me encantó este artículo!" },
        { user: "Carlos", comment: "Muy útil, gracias por compartir." },
      ],
    },
    {
      title: "Nutrición y Dietas",
      content:
        "Explora diferentes enfoques nutricionales y encuentra lo que funciona para ti.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=Nutrición+y+Dietas",
      author: "Nutricionista Claudia",
      date: "2024-07-02",
      comments: [
        {
          user: "Laura",
          comment: "Muy interesante, voy a probar algunas cosas.",
        },
      ],
    },
    {
      title: "10 Estrategias para Mejorar tu Bienestar Mental",
      content:
        "Descubre cómo la meditación, el ejercicio y una dieta equilibrada pueden ayudarte a mejorar tu salud mental.",
      imageUrl: "https://via.placeholder.com/800x400.png?text=Bienestar+Mental",
      author: "Psicólogo Martínez",
      date: "2024-07-01",
      comments: [
        { user: "Pedro", comment: "¡Esto es justo lo que necesitaba!" },
      ],
    },
    {
      title: "Historias de Superación Personal",
      content:
        "Lee historias inspiradoras de personas que han superado grandes desafíos y encuentra la motivación que necesitas.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=Superación+Personal",
      author: "Motivador López",
      date: "2024-06-30",
      comments: [
        { user: "Sofía", comment: "¡Qué inspirador! Gracias por compartir." },
      ],
    },
    {
      title: "Importancia del Sueño",
      content:
        "Aprende sobre la importancia del sueño y cómo mejorar tus hábitos de sueño.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=Importancia+del+Sueño",
      author: "Dr. Sueño",
      date: "2024-06-29",
      comments: [
        { user: "Carlos", comment: "Muy útil, gracias por compartir." },
      ],
    },
    {
      title: "Ejercicio en Casa",
      content:
        "Descubre rutinas de ejercicio que puedes hacer desde la comodidad de tu hogar.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=Ejercicio+en+Casa",
      author: "Coach Fit",
      date: "2024-06-28",
      comments: [{ user: "Ana", comment: "¡Me encantó este artículo!" }],
    },
    {
      title: "Alimentación Saludable",
      content:
        "Conoce los beneficios de una alimentación saludable y cómo incorporarla en tu vida diaria.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=Alimentación+Saludable",
      author: "Nutricionista Clara",
      date: "2024-06-27",
      comments: [
        {
          user: "Laura",
          comment: "Muy interesante, voy a probar algunas cosas.",
        },
      ],
    },
    {
      title: "Técnicas de Meditación",
      content:
        "Aprende diferentes técnicas de meditación para mejorar tu bienestar mental.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=Técnicas+de+Meditación",
      author: "Yogi Patel",
      date: "2024-06-26",
      comments: [
        { user: "Pedro", comment: "¡Esto es justo lo que necesitaba!" },
      ],
    },
    {
      title: "Consejos para Reducir el Estrés",
      content: "Sigue estos consejos para reducir el estrés en tu vida diaria.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=Reducir+el+Estrés",
      author: "Psicólogo Fernández",
      date: "2024-06-25",
      comments: [
        { user: "Sofía", comment: "¡Qué inspirador! Gracias por compartir." },
      ],
    },
    {
      title: "Beneficios del Yoga",
      content:
        "Descubre los múltiples beneficios del yoga para tu cuerpo y mente.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=Beneficios+del+Yoga",
      author: "Yogi Gupta",
      date: "2024-06-24",
      comments: [
        { user: "Carlos", comment: "Muy útil, gracias por compartir." },
      ],
    },
    {
      title: "Cuidado de la Piel",
      content:
        "Conoce los mejores consejos para cuidar tu piel y mantenerla saludable.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=Cuidado+de+la+Piel",
      author: "Dermatólogo Gómez",
      date: "2024-06-23",
      comments: [{ user: "Ana", comment: "¡Me encantó este artículo!" }],
    },
    {
      title: "Hidratación y Salud",
      content:
        "Aprende la importancia de la hidratación y cómo mantenerte adecuadamente hidratado.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=Hidratación+y+Salud",
      author: "Dr. Agua",
      date: "2024-06-22",
      comments: [
        {
          user: "Laura",
          comment: "Muy interesante, voy a probar algunas cosas.",
        },
      ],
    },
    {
      title: "Ejercicio al Aire Libre",
      content:
        "Conoce los beneficios de hacer ejercicio al aire libre y cómo empezar.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=Ejercicio+al+Aire+Libre",
      author: "Coach Outdoor",
      date: "2024-06-21",
      comments: [
        { user: "Pedro", comment: "¡Esto es justo lo que necesitaba!" },
      ],
    },
    {
      title: "Mentalidad Positiva",
      content: "Descubre cómo desarrollar y mantener una mentalidad positiva.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=Mentalidad+Positiva",
      author: "Motivador Ramírez",
      date: "2024-06-20",
      comments: [
        { user: "Sofía", comment: "¡Qué inspirador! Gracias por compartir." },
      ],
    },
  ];

  return (
    <>
      <h2 className="text-2xl font-bold px-4 mb-6">Blog principal</h2>
      <div className="bg-white/50 bg-bento-gradient dark:bg-none dark:bg-transparent border-y-1 border-gray-100/50 dark:border-base-dark backdrop-blur dark:backdrop-blur-none backdrop-saturate-150 dark:backdrop-saturate-100 shadow-md dark:shadow-none text-base-color dark:text-base-color-dark">
        <div className="grid grid-cols-1">
          {posts.map((post, index) => (
            <div
              key={index}
              className="px-4 py-6 border-t-1 first:border-t-0 border-white dark:border-base-dark"
            >
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-gray-800 dark:text-gray-300 mb-2">
                {post.content}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                Por {post.author} el {post.date}
              </p>
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                {post.comments.map((comment, idx) => (
                  <p key={idx}>
                    <strong>{comment.user}:</strong> {comment.comment}
                  </p>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4">
                <button className="text-blue-500 hover:text-blue-700">
                  Leer más...
                </button>
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <i className="fab fa-facebook"></i>
                  </button>
                  <button className="text-blue-500 hover:text-blue-700">
                    <i className="fab fa-twitter"></i>
                  </button>
                  <button className="text-blue-500 hover:text-blue-700">
                    <i className="fab fa-linkedin"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
