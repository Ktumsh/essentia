import Link from "next/link";
import MoreSectonItem from "./more-section-item";

const MoreSection = () => {
  return (
    <section id="todo_y_mas" className="relative flex flex-col mx-auto w-full">
      <div className="bg-noise bg-repeat bg-[length:100px] pointer-events-none absolute inset-0 opacity-5"></div>
      <div className="w-max max-w-full mx-auto mt-20 md:mt-32">
        <div className="mx-auto">
          <div className="flex justify-start lg:justify-center px-5 md:px-24">
            <div>
              <h2 className="font-grotesk font-semibold text-3xl sm:text-5xl w-full">
                ¡Descúbrelo todo y mucho más!
              </h2>
            </div>
          </div>
        </div>
        <div className="box-border max-w-full overflow-x-auto">
          <div className="flex flex-nowrap flex-col sm:flex-row items-start justify-center h-full mx-auto pt-8 px-5 md:px-24 pb-20 md:pb-28 mb-20 md:mb-28 gap-6">
            <div className="relative shrink w-[416px] max-w-full sm:min-h-full p-6 bg-bento-gradient backdrop-blur-2xl shadow-bento-shadow rounded-2xl">
              <div className="bg-noise bg-repeat bg-[length:100px] pointer-events-none absolute inset-0 opacity-5 rounded-2xl z-10"></div>
              <article className="flex flex-col h-full">
                <header className="pb-6">
                  <h3 className="text-start text-3xl font-semibold leading-10">
                    Essentia gratis
                  </h3>
                </header>
                <div className="relative grow self-stretch overflow-hidden">
                  <div>
                    <span className="text-base font-medium leading-9">
                      Accede a todas estas funciones:
                    </span>
                    <ul className="grid justify-items-start gap-2">
                      <MoreSectonItem text="Recursos principales: ">
                        <span slot="additional" className="font-bold">
                          Vida saludable, Ejercicios y fitness, Nutrición y
                          alimentación, Bienestar emocional, Salud y educación
                          sexual y Salud para todas las edades
                        </span>
                      </MoreSectonItem>
                      <MoreSectonItem text="Sección de noticias" />
                      <MoreSectonItem text="Experiencia personalizada y adaptable, decide qué quieres ver, acomodada a tus necesidades" />
                      <MoreSectonItem text="Inteligencia artificial especializada Essentia AI" />
                      <MoreSectonItem text="Recursos adicionales como guías, recomendaciones, tutoriales y más" />
                      <MoreSectonItem text="Contenido descargable" />
                      <MoreSectonItem text="Personalización de tu perfil" />
                    </ul>
                  </div>
                </div>
              </article>
              <div className="relative flex flex-col -mx-6 px-6">
                <div className="w-full mt-6">
                  <Link
                    type="button"
                    aria-label="Registrar usuario"
                    className="relative inline-flex items-center justify-center overflow-hidden h-10 w-full py-3 px-4 sm:px-8 font-medium text-lg rounded-full bg-light-gradient hover:brightness-90 active:scale-[.98] text-white shadow-md transition"
                    href="/signup"
                  >
                    Comenzar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoreSection;
