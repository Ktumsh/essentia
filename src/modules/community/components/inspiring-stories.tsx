import { Image } from "@nextui-org/react";

const InspiringStories = () => {
  const stories = [
    {
      title: "La historia de Juan",
      content: "Cómo Juan superó la adversidad y encontró la felicidad.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=La+historia+de+Juan",
      author: "Admin",
      date: "2024-07-04",
      comments: [
        { user: "Ana", comment: "¡Increíble historia!" },
        { user: "Luis", comment: "Muy inspirador." },
      ],
    },
    {
      title: "La historia de María",
      content:
        "María compartió su viaje de autodescubrimiento y empoderamiento.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=La+historia+de+María",
      author: "Admin",
      date: "2024-07-03",
      comments: [
        { user: "Elena", comment: "Me encantó esta historia." },
        { user: "Pedro", comment: "Muy motivador." },
      ],
    },
    {
      title: "La historia de Carlos",
      content:
        "Carlos encontró una nueva perspectiva de vida a través de la comunidad.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=La+historia+de+Carlos",
      author: "Admin",
      date: "2024-07-02",
      comments: [{ user: "Sofía", comment: "Una historia muy poderosa." }],
    },
    {
      title: "La historia de Laura",
      content: "Laura cambió su vida gracias a la meditación y el mindfulness.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=La+historia+de+Laura",
      author: "Admin",
      date: "2024-07-01",
      comments: [
        { user: "Juan", comment: "Me siento identificado con esta historia." },
      ],
    },
    {
      title: "La historia de Miguel",
      content:
        "Miguel encontró la fuerza para seguir adelante después de una pérdida.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=La+historia+de+Miguel",
      author: "Admin",
      date: "2024-06-30",
      comments: [{ user: "María", comment: "Muy emotiva y real." }],
    },
    {
      title: "La historia de Ana",
      content: "Ana venció sus miedos y ahora vive una vida plena y feliz.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=La+historia+de+Ana",
      author: "Admin",
      date: "2024-06-29",
      comments: [
        { user: "Carlos", comment: "Muy inspirador." },
        { user: "Luis", comment: "Gran historia, Ana." },
      ],
    },
    {
      title: "La historia de Luis",
      content:
        "Luis encontró la motivación para cambiar su vida a través del deporte.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=La+historia+de+Luis",
      author: "Admin",
      date: "2024-06-28",
      comments: [{ user: "Ana", comment: "¡Qué increíble historia!" }],
    },
    {
      title: "La historia de Elena",
      content:
        "Elena logró superar sus obstáculos y ahora es una exitosa empresaria.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=La+historia+de+Elena",
      author: "Admin",
      date: "2024-06-27",
      comments: [{ user: "Laura", comment: "Muy motivador, Elena." }],
    },
    {
      title: "La historia de Pedro",
      content: "Pedro encontró la paz interior a través de la meditación.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=La+historia+de+Pedro",
      author: "Admin",
      date: "2024-06-26",
      comments: [
        { user: "Juan", comment: "Me siento identificado con Pedro." },
      ],
    },
    {
      title: "La historia de Sofía",
      content:
        "Sofía superó una difícil etapa y ahora ayuda a otros a hacer lo mismo.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=La+historia+de+Sofía",
      author: "Admin",
      date: "2024-06-25",
      comments: [
        { user: "Sofía", comment: "¡Gracias por compartir mi historia!" },
      ],
    },
    {
      title: "La historia de Carlos y Ana",
      content:
        "Carlos y Ana trabajaron juntos para construir una comunidad de apoyo.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=La+historia+de+Carlos+y+Ana",
      author: "Admin",
      date: "2024-06-24",
      comments: [{ user: "Pedro", comment: "¡Qué inspirador equipo!" }],
    },
    {
      title: "La historia de Laura y Miguel",
      content:
        "Laura y Miguel encontraron la felicidad a través de la ayuda mutua.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=La+historia+de+Laura+y+Miguel",
      author: "Admin",
      date: "2024-06-23",
      comments: [{ user: "Ana", comment: "¡Muy inspirador!" }],
    },
    {
      title: "La historia de Elena y Luis",
      content: "Elena y Luis se motivaron mutuamente para alcanzar sus metas.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=La+historia+de+Elena+y+Luis",
      author: "Admin",
      date: "2024-06-22",
      comments: [{ user: "Laura", comment: "Gran trabajo en equipo." }],
    },
    {
      title: "La historia de Pedro y Sofía",
      content: "Pedro y Sofía superaron grandes desafíos juntos.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=La+historia+de+Pedro+y+Sofía",
      author: "Admin",
      date: "2024-06-21",
      comments: [{ user: "Carlos", comment: "¡Qué historia tan poderosa!" }],
    },
    {
      title: "La historia de Ana y Miguel",
      content: "Ana y Miguel trabajaron juntos para superar la adversidad.",
      imageUrl:
        "https://via.placeholder.com/800x400.png?text=La+historia+de+Ana+y+Miguel",
      author: "Admin",
      date: "2024-06-20",
      comments: [{ user: "Luis", comment: "Muy inspirador, Ana y Miguel." }],
    },
  ];

  return (
    <>
      <h2 className="text-2xl font-bold px-4 mb-6">Historias Inspiradoras</h2>
      <div className="bg-white/50 bg-bento-gradient dark:bg-none dark:bg-transparent border-y-1 border-gray-100/50 dark:border-base-dark backdrop-blur dark:backdrop-blur-none backdrop-saturate-150 dark:backdrop-saturate-100 shadow-md dark:shadow-none text-base-color dark:text-base-color-dark">
        <div className="grid grid-cols-1">
          {stories.map((story, index) => (
            <div
              key={index}
              className="px-4 py-6 border-t-1 first:border-t-0 border-white dark:border-base-dark"
            >
              <Image
                src={story.imageUrl}
                alt={story.title}
                classNames={{
                  wrapper: "!max-w-full",
                }}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{story.title}</h3>
              <p className="text-gray-800 dark:text-gray-300 mb-2">
                {story.content}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                Por {story.author} el {story.date}
              </p>
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                {story.comments.map((comment, idx) => (
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

export default InspiringStories;
