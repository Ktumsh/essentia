import { StarIcon } from "@/modules/icons/common";

const EmptyScreen = () => {
  return (
    <div className="pb-[200px] pt-4 md:pt-10">
      <div className="mx-auto max-w-2xl px-4">
        <div className="bg-white dark:bg-base-full-dark flex flex-col gap-2 rounded-lg border border-gray-200 dark:border-base-dark p-8">
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg text-base-color-h dark:text-base-color-dark font-bold">
              Bienvenido a Essentia AI
            </h1>
            <StarIcon className="size-3 text-yellow-400 dark:text-yellow-600" />
          </div>
          <p className="text-sm sm:text-base text-base-color-m dark:text-base-color-dark-m">
            Haz preguntas sobre salud y bienestar, ejercicio, nutrición,
            bienestar emocional, salud sexual y más. Recibe información
            confiable y toma decisiones informadas sobre tu salud.
          </p>
        </div>
      </div>
      <div className="h-px w-full"></div>
    </div>
  );
};

export default EmptyScreen;
