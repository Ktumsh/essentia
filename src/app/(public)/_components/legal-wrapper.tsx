"use client";

import {
  ChevronRight,
  FileText,
  Shield,
  Cookie,
  Search,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

import { Button } from "@/components/kit/button";
import { Input } from "@/components/kit/input";
import { Markdown } from "@/components/markdown";

interface LegalPageProps {
  title: string;
  description: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const LegalWrapper = ({
  title,
  description,
  lastUpdated,
  children,
}: LegalPageProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [tableOfContents, setTableOfContents] = useState<
    { id: string; title: string; level: number }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const legalPages = [
    { title: "Términos de Servicio", icon: FileText, href: "/terminos" },
    { title: "Política de Privacidad", icon: Shield, href: "/privacidad" },
    { title: "Política de Cookies", icon: Cookie, href: "/cookies" },
  ];

  useEffect(() => {
    if (contentRef.current) {
      const headings = contentRef.current.querySelectorAll("h2, h3");
      const toc = Array.from(headings).map((heading) => {
        const id =
          heading.id ||
          heading.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
          "";
        if (!heading.id) heading.id = id;

        return {
          id,
          title: heading.textContent || "",
          level: heading.tagName === "H2" ? 2 : 3,
        };
      });

      setTableOfContents(toc);
    }
  }, [children]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" },
    );

    const headings = document.querySelectorAll("h2, h3");
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, [tableOfContents]);

  // Filtrar los elementos del TOC basados en la búsqueda
  const filteredToc = tableOfContents.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mt-14 bg-slate-50">
      <header
        className="bg-linear-to-tr/shorter from-indigo-500 to-purple-500 text-white"
        aria-labelledby="legal-heading"
      >
        <div className="mx-auto flex h-60 max-w-7xl items-center justify-center px-4 py-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1
              id="legal-heading"
              className="font-merriweather mb-3 text-3xl font-bold"
            >
              {title}
            </h1>
            <p className="mb-5 text-balance text-indigo-100">{description}</p>
            <p className="text-sm text-indigo-200">
              Última actualización: {lastUpdated}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Barra lateral */}
          <aside className="shrink-0 lg:w-64 xl:w-72">
            <div className="sticky top-24 space-y-6">
              {/* Navegación entre documentos legales */}
              <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
                  <h3 className="font-medium text-gray-900">
                    Documentos legales
                  </h3>
                </div>
                <nav className="divide-y divide-gray-100">
                  {legalPages.map((page) => {
                    const isCurrentPage = page.title === title;
                    return (
                      <Link
                        key={page.href}
                        href={page.href}
                        className={`flex items-center gap-2 p-3 transition-colors ${
                          isCurrentPage
                            ? "bg-indigo-50 font-medium text-indigo-600"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <page.icon className="h-4 w-4" />
                        <span>{page.title}</span>
                        {isCurrentPage && (
                          <ChevronRight className="ml-auto h-4 w-4" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Búsqueda en índice */}
              <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
                  <h3 className="font-medium text-gray-900">
                    Índice de contenidos
                  </h3>
                </div>
                <div className="p-3">
                  <div className="relative mb-3">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Buscar sección..."
                      className="w-full border-gray-200 bg-gray-50 pl-9"
                      value={searchQuery}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearchQuery(e.target.value)
                      }
                    />
                  </div>
                  {filteredToc.length > 0 ? (
                    <nav className="max-h-80 space-y-1 overflow-y-auto pt-1 pr-2">
                      {filteredToc.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`block w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                            activeSection === item.id
                              ? "bg-indigo-50 font-medium text-indigo-600"
                              : "text-gray-700 hover:bg-gray-50"
                          } ${item.level === 3 ? "pl-4" : ""}`}
                        >
                          {item.title}
                        </button>
                      ))}
                    </nav>
                  ) : (
                    <p className="p-2 text-sm text-gray-500">
                      No se encontraron resultados
                    </p>
                  )}
                </div>
              </div>

              {/* Contacto */}
              <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                <h3 className="mb-2 font-medium text-indigo-900">
                  ¿Necesitas ayuda?
                </h3>
                <p className="mb-3 text-sm text-indigo-700">
                  Si tienes dudas sobre nuestros términos legales, contáctanos.
                </p>
                <Link href="/contacto">
                  <Button className="w-full justify-between border border-indigo-200 bg-white text-indigo-600 hover:bg-indigo-100">
                    Contactar soporte <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </aside>

          {/* Contenido principal */}
          <article ref={contentRef} className="min-w-0 flex-1">
            <Markdown className="prose prose-indigo prose-headings:scroll-mt-24 prose-headings:font-medium prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:text-indigo-700 prose-img:rounded-xl max-w-none">
              {children as string}
            </Markdown>

            <div className="mt-12 border-t border-gray-100 pt-6">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <p className="text-sm text-gray-500">
                  © 2024 Essentia. Todos los derechos reservados.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="self-end"
                >
                  Volver arriba
                </Button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default LegalWrapper;
