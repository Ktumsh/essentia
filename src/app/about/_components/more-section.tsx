import Link from "next/link";

import MoreSectonItem from "./more-section-item";

const MoreSection = () => {
  return (
    <section id="todo_y_mas" className="relative mx-auto flex w-full flex-col">
      <div className="mx-auto mt-20 w-max max-w-full md:mt-32">
        <div className="mx-auto">
          <div className="flex justify-start px-5 md:px-24 lg:justify-center">
            <div>
              <h2 className="w-full text-3xl font-semibold sm:text-5xl">
                ¡Descúbrelo todo y mucho más!
              </h2>
            </div>
          </div>
        </div>
        <div className="box-border max-w-full overflow-x-auto">
          <div className="mx-auto mb-20 flex h-full flex-col flex-nowrap items-start justify-center gap-6 px-5 pt-8 pb-20 sm:flex-row md:mb-28 md:px-24 md:pb-28">
            <div className="shadow-bento-shadow relative w-[416px] max-w-full shrink rounded-2xl p-6 backdrop-blur-2xl [background:var(--bento-gradient)] sm:min-h-full">
              <article className="flex h-full flex-col">
                <header className="pb-6">
                  <h3 className="text-start text-3xl leading-10 font-semibold">
                    Essentia gratis
                  </h3>
                </header>
                <div className="relative grow self-stretch overflow-hidden">
                  <div>
                    <span className="text-main leading-9 font-medium">
                      Accede a todas estas funciones:
                    </span>
                    <ul className="grid justify-items-start gap-2">
                      <MoreSectonItem text="Recursos principales: ">
                        <span slot="additional" className="font-bold">
                          Vida saludable, Ejercicios y fitness, Nutrición y
                          alimentación, Bienestar emocional, Salud y educación
                          sexual y Salud en todas las edades
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
              <div className="relative -mx-6 flex flex-col px-6">
                <div className="mt-6 w-full">
                  <Link
                    type="button"
                    aria-label="Registrar usuario"
                    className="bg-light-gradient relative inline-flex h-10 w-full items-center justify-center overflow-hidden rounded-full px-4 py-3 text-lg font-medium text-white shadow-md transition hover:brightness-90 active:scale-[.98] sm:px-8"
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
