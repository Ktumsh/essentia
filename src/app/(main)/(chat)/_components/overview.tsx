import { Card, CardHeader, CardTitle } from "@/components/kit/card";
import { StarsIcon } from "@/components/ui/icons/common";
import Logo from "@/components/ui/layout/logo";
import { cn, getRouteColor, getRouteDarkColor } from "@/lib/utils";

const resources = [
  { title: "salud y bienestar" },
  { title: "ejercicio" },
  { title: "nutrición" },
  { title: "bienestar emocional" },
  { title: "salud sexual" },
];

const Overview = () => {
  return (
    <>
      <div className="z-10 mx-auto w-full max-w-xl px-4 pt-6">
        <Card className="border-0 bg-transparent text-center leading-relaxed">
          <CardHeader className="items-center gap-4 md:gap-8 md:p-8">
            <div className="flex flex-col items-center gap-2">
              <Logo className="h-8 w-fit" width={32} height={32} />
              <div className="bg-background flex items-center gap-2 rounded-md px-3 py-1">
                <StarsIcon
                  aria-hidden="true"
                  className="stars-icon size-5! focus:outline-hidden"
                />
                <CardTitle className="from-gradient-from via-gradient-via to-gradient-to bg-gradient-to-r bg-clip-text text-lg font-extrabold tracking-wider text-transparent sm:text-xl dark:from-[-100%]">
                  Essentia AI
                </CardTitle>
              </div>
            </div>
            <p className="text-sm md:text-base">
              Haz preguntas sobre{" "}
              {resources.map((resource, index) => (
                <span key={index}>
                  <code
                    className={cn(
                      "rounded-sm px-1 py-0.5",
                      getRouteColor(index, "background"),
                      getRouteDarkColor(index),
                    )}
                  >
                    {resource.title}
                  </code>
                  {index < resources.length - 1 ? ", " : " "}
                </span>
              ))}
              y{" "}
              <code
                className={cn(
                  "rounded-sm px-1 py-0.5",
                  getRouteColor(resources.length, "background"),
                  getRouteDarkColor(resources.length),
                )}
              >
                más
              </code>
              .
            </p>
            <p className="text-sm md:text-base">
              Obtén respuestas precisas y cuida tu bienestar con confianza.
            </p>
          </CardHeader>
        </Card>
      </div>
    </>
  );
};

export default Overview;
