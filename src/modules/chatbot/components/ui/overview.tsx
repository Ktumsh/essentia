import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StarIcon } from "@/modules/icons/common";

const EmptyScreen = () => {
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 pt-6">
        <Card className="border-none">
          <CardHeader className="md:p-8">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base text-main dark:text-white sm:text-lg">
                Bienvenido a Essentia AI
              </CardTitle>
              <StarIcon className="size-3 text-yellow-400 dark:text-yellow-600" />
            </div>
            <CardDescription>
              Haz preguntas sobre salud y bienestar, ejercicio, nutrición,
              bienestar emocional, salud sexual y más. Recibe información
              confiable y toma decisiones informadas sobre tu salud.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </>
  );
};

export default EmptyScreen;
