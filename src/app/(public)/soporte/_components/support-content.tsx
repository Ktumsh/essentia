"use client";

import {
  Search,
  HelpCircle,
  MessageSquare,
  Mail,
  X,
  ChevronRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/kit/accordion";
import { Button } from "@/components/kit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import { Input } from "@/components/kit/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/kit/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/kit/tabs";
import { WhatsappIcon } from "@/components/ui/icons/media";
import { FAQ_SUPPORT } from "@/consts/faq-support";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const knowledgeBase = {
  faqs: FAQ_SUPPORT,
  featuredFunctions: [
    {
      title: "Gestión de historial médico",
      description:
        "Almacena, organiza y accede fácilmente a todos tus documentos médicos en un solo lugar",
      icon: (
        <CheckCircle className="size-4 text-green-600" aria-hidden="true" />
      ),
    },
    {
      title: "Asistente de IA para recomendaciones",
      description:
        "Recibe recomendaciones personalizadas de salud basadas en tus documentos médicos y perfil",
      icon: <Sparkles className="size-4 text-indigo-600" aria-hidden="true" />,
    },
    {
      title: "Evaluación de riesgos de salud",
      description:
        "Conoce tus posibles factores de riesgo a partir del análisis de tus antecedentes médicos",
      icon: (
        <CheckCircle className="size-4 text-green-600" aria-hidden="true" />
      ),
    },
    {
      title: "Compartir documentos con profesionales",
      description:
        "Envía documentos médicos a tus profesionales de salud de forma segura y controlada",
      icon: (
        <CheckCircle className="size-4 text-green-600" aria-hidden="true" />
      ),
    },
  ],
};

const SupportContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "planes" | "tecnico">(
    "general",
  );
  const [searchFocusFaqId, setSearchFocusFaqId] = useState<string | null>(null);
  const contentRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const isMobile = useIsMobile();

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const query = searchQuery.toLowerCase();

    const matchingFaqs = knowledgeBase.faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.tags.some((tag) => tag.toLowerCase().includes(query)),
    );

    const results = [...matchingFaqs.map((item) => ({ ...item, type: "faq" }))];

    setSearchResults(results);
  }, [searchQuery]);

  useEffect(() => {
    if (!searchFocusFaqId) return;
    const id = setTimeout(() => {
      const btn = contentRefs.current[searchFocusFaqId];
      if (btn) {
        btn.scrollIntoView({ behavior: "smooth", block: "center" });
        btn.focus();
      }
    }, 100);
    return () => clearTimeout(id);
  }, [searchFocusFaqId]);

  return (
    <div className="mt-14 bg-slate-50 text-base">
      <header
        className="bg-linear-to-tr/shorter from-indigo-500 to-purple-500 text-white"
        aria-labelledby="search-heading"
      >
        <div className="mx-auto flex h-60 max-w-7xl items-center justify-center px-4 py-8">
          <div className="mx-auto w-full max-w-2xl text-center">
            <h1
              id="search-heading"
              className="font-merriweather mb-3 text-3xl font-bold"
            >
              Centro de Soporte
            </h1>
            <p className="mb-5 text-sm text-indigo-100 md:text-base">
              Encuentra respuestas a tus preguntas sobre Essentia
            </p>
            <div className="relative">
              <Search
                className="absolute top-1/2 left-3 size-4 -translate-y-1/2 transform text-gray-400"
                aria-hidden="true"
              />
              <Input
                placeholder="Buscar en el centro de soporte..."
                value={searchQuery}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setSearchQuery(e.target.value)}
                aria-label="Buscar en el centro de soporte"
                className="h-10 bg-white pr-9 pl-9 text-gray-900"
              />
              {searchQuery && (
                <button
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchQuery("")}
                  aria-label="Limpiar búsqueda"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Resultados de búsqueda */}
      {isSearching && (
        <section
          className="mx-auto max-w-7xl px-4 py-5"
          aria-live="polite"
          aria-labelledby="search-results-heading"
        >
          <div className="mx-auto max-w-3xl rounded-lg border bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 id="search-results-heading" className="text-lg font-medium">
                Resultados:{" "}
                <span className="text-indigo-600">{searchResults.length}</span>
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                aria-label="Cerrar resultados de búsqueda"
                className="group/close h-7 gap-1 rounded-full text-xs"
              >
                Cerrar
                <X
                  className="size-3 opacity-0 transition-opacity group-hover/close:opacity-100"
                  aria-hidden="true"
                />
              </Button>
            </div>

            {searchResults.length > 0 ? (
              <ul className="space-y-3">
                {searchResults.map((result) => (
                  <li
                    key={`${result.type}-${result.id}`}
                    className="rounded-md border-b p-2 pb-3 last:border-0 hover:bg-gray-50"
                  >
                    <div className="flex items-start">
                      <div className="mr-2 rounded-full bg-indigo-50 p-1.5">
                        <HelpCircle
                          className="size-4 text-indigo-600"
                          aria-label="Pregunta frecuente"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">
                          {result.question}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                          {result.answer}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-1 h-auto p-0 text-indigo-600 hover:text-indigo-800"
                          onClick={() => {
                            setSearchQuery("");
                            setIsSearching(false);
                            setActiveTab(result.category);
                            setActiveFaqId(result.id);
                            setSearchFocusFaqId(result.id);
                          }}
                        >
                          Ver respuesta completa{" "}
                          <ChevronRight
                            className="h-3 w-3"
                            aria-hidden="true"
                          />
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-6 text-center">
                <HelpCircle
                  className="mx-auto mb-3 h-10 w-10 text-gray-300"
                  aria-hidden="true"
                />
                <h3 className="mb-2 text-base font-medium">
                  No se encontraron resultados
                </h3>
                <p className="mb-3 text-sm text-gray-500">
                  No hemos encontrado resultados para &quot;{searchQuery}&quot;.
                  Intenta con otros términos o consulta nuestras preguntas
                  frecuentes.
                </p>
                <Button size="sm" onClick={() => setSearchQuery("")}>
                  Ver preguntas frecuentes
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Contenido principal - Solo visible cuando no se está buscando */}
      {!isSearching && (
        <article className="mx-auto max-w-7xl px-4 py-6">
          <div className="mx-auto max-w-4xl">
            {/* Preguntas frecuentes */}
            <section id="faq" className="mb-6" aria-labelledby="faq-heading">
              <div className="mb-3 flex items-center">
                <HelpCircle className="mr-2 size-4 text-indigo-600" />
                <h2 id="faq-heading" className="text-lg font-medium">
                  Preguntas frecuentes
                </h2>
              </div>
              <Card className="shadow-sm">
                <CardContent className="pt-4">
                  <Tabs
                    value={activeTab}
                    onValueChange={(tab) =>
                      setActiveTab(tab as "general" | "planes" | "tecnico")
                    }
                    className="w-full"
                  >
                    {isMobile ? (
                      <Select
                        value={activeTab}
                        onValueChange={(val) =>
                          setActiveTab(val as "general" | "planes" | "tecnico")
                        }
                      >
                        <SelectTrigger className="mb-4 w-full rounded-full">
                          <SelectValue placeholder="Selecciona categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="planes">
                            Planes y Precios
                          </SelectItem>
                          <SelectItem value="tecnico">
                            Información Técnica
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <TabsList
                        aria-label="Categorías de preguntas frecuentes"
                        className="mb-4 grid w-full grid-cols-3 rounded-full"
                      >
                        <TabsTrigger
                          value="general"
                          className="rounded-full text-xs"
                        >
                          General
                        </TabsTrigger>
                        <TabsTrigger
                          value="planes"
                          className="rounded-full text-xs"
                        >
                          Planes y Precios
                        </TabsTrigger>
                        <TabsTrigger
                          value="tecnico"
                          className="rounded-full text-xs"
                        >
                          Información Técnica
                        </TabsTrigger>
                      </TabsList>
                    )}

                    {(["general", "planes", "tecnico"] as const).map(
                      (category) => (
                        <TabsContent
                          key={category}
                          value={category}
                          className="mt-0"
                        >
                          <Accordion
                            type="single"
                            value={activeFaqId ?? undefined}
                            onValueChange={(id) => setActiveFaqId(id)}
                            collapsible
                            className="w-full"
                          >
                            {knowledgeBase.faqs
                              .filter((f) => f.category === category)
                              .map((faq) => (
                                <AccordionItem key={faq.id} value={faq.id}>
                                  <AccordionTrigger
                                    ref={(el) => {
                                      contentRefs.current[faq.id] = el;
                                    }}
                                    tabIndex={-1}
                                    onBlur={() => {
                                      if (searchFocusFaqId === faq.id)
                                        setSearchFocusFaqId(null);
                                    }}
                                    className={cn(
                                      "w-full py-3 text-left text-sm",
                                      searchFocusFaqId === faq.id &&
                                        "focus:ring-primary focus:ring-2",
                                    )}
                                  >
                                    {faq.question}
                                  </AccordionTrigger>
                                  <AccordionContent className="text-sm">
                                    {faq.answer}
                                  </AccordionContent>
                                </AccordionItem>
                              ))}
                          </Accordion>
                        </TabsContent>
                      ),
                    )}
                  </Tabs>
                </CardContent>
              </Card>
            </section>

            {/* Funcionalidades destacadas */}
            <section className="mb-6" aria-labelledby="features-heading">
              <div className="mb-3 flex items-center">
                <Sparkles
                  className="mr-2 size-4 text-indigo-600"
                  aria-hidden="true"
                />
                <h2 id="features-heading" className="text-lg font-medium">
                  Funcionalidades destacadas
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {knowledgeBase.featuredFunctions.map((feature, index) => (
                  <Card key={index} className="shadow-sm">
                    <CardHeader className="p-3 pb-1">
                      <CardTitle className="flex items-center gap-2 text-base">
                        {feature.icon}
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Opciones de contacto */}
            <section id="contact" aria-labelledby="contact-heading">
              <div className="mb-3 flex items-center">
                <MessageSquare
                  className="mr-2 size-4 text-indigo-600"
                  aria-hidden="true"
                />
                <h2 id="contact-heading" className="text-lg font-medium">
                  Contacta con nosotros
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[
                  {
                    title: "Correo electrónico",
                    description:
                      "¿Tienes dudas o sugerencias? Escríbenos y te responderemos pronto.",
                    icon: (
                      <Mail className="size-4 text-white" aria-hidden="true" />
                    ),
                    action: "Enviar correo electrónico",
                    color: "bg-blue-400",
                    contact: "essentia.app.cl@gmail.com",
                    link: "mailto:essential.app.cl@gmail.com",
                  },
                  {
                    title: "WhatsApp",
                    description:
                      "Escríbenos directamente por WhatsApp y resolveremos tus dudas lo antes posible.",
                    icon: (
                      <WhatsappIcon
                        className="size-4 text-white"
                        aria-hidden="true"
                      />
                    ),
                    action: "Abrir WhatsApp",
                    color: "bg-[#25d366]",
                    contact: "+56 9 6483 4194",
                    link: "https://wa.me/56964834194?text=Hola%2C%20tengo%20una%20duda%20sobre%20Essentia",
                  },
                ].map((option, index) => (
                  <Card key={index} className="overflow-hidden shadow-sm">
                    <div
                      className={`${option.color} flex items-center justify-between p-3`}
                    >
                      <div className="flex items-center">
                        <div className="mr-2 rounded-full bg-white/20 p-2">
                          {option.icon}
                        </div>
                        <h3 className="text-sm font-medium text-white">
                          {option.title}
                        </h3>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <p className="mb-1 text-sm text-gray-600">
                        {option.description}
                      </p>
                      <p className="mb-2 text-sm font-medium">
                        {option.contact}
                      </p>
                      {option.link ? (
                        <Link
                          href={option.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${option.action} a ${option.title}`}
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            className={cn(
                              "w-full border-0 text-white hover:text-white",
                              option.color,
                            )}
                          >
                            {option.action}
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          aria-label={`${option.action} a ${option.title}`}
                          size="sm"
                          variant="outline"
                          className={cn(
                            "w-full border-0 text-white hover:text-white",
                            option.color,
                          )}
                        >
                          {option.action}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Enlace a blog */}
            {/* <div className="mt-8 text-center">
              <p className="mb-2 text-sm text-gray-600">
                ¿Quieres conocer más sobre Essentia y mantenerte informado?
              </p>
              <Button
                variant="outline"
                className="mx-auto flex items-center bg-white hover:gap-4"
                asChild
              >
                <Link href="/blog" aria-label="Visitar el blog de Essentia">
                  Visita nuestro blog
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div> */}
          </div>
        </article>
      )}
    </div>
  );
};

export default SupportContent;
