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
import { useRef, useState, useEffect, useLayoutEffect } from "react";

import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils";

interface LegalPageProps {
  title: string;
  description: string;
  lastUpdated: string;
  content: string;
}

const LegalWrapper = ({
  title,
  description,
  lastUpdated,
  content,
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

  useLayoutEffect(() => {
    if (!contentRef.current) return;
    const headings = contentRef.current.querySelectorAll("h2, h3");
    const toc = Array.from(headings).map((heading) => {
      const id =
        heading.id ||
        heading
          .textContent!.toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      heading.id = id;
      return {
        id,
        title: heading.textContent!,
        level: heading.tagName === "H2" ? 2 : 3,
      };
    });
    setTableOfContents(toc);
  }, [content]);

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

  const filteredToc = tableOfContents.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="bg-muted dark:bg-background mt-14 text-base">
      <header
        className="bg-linear-to-tr/shorter from-indigo-500 to-purple-500 text-white"
        aria-labelledby="legal-heading"
      >
        <div className="mx-auto flex min-h-60 max-w-7xl items-center justify-center px-4 py-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1
              id="legal-heading"
              className="font-merriweather mb-3 text-3xl font-bold"
            >
              {title}
            </h1>
            <p className="mb-5 text-sm text-indigo-100 md:text-base">
              {description}
            </p>
            <p className="text-xs text-indigo-200 md:text-sm">
              Última actualización: {lastUpdated}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Barra lateral */}
          <aside className="shrink-0 lg:w-64 xl:w-72">
            <div className="sticky top-6 space-y-6">
              {/* Navegación entre documentos legales */}
              <div className="bg-background overflow-hidden rounded-xl border shadow-sm">
                <div className="bg-muted border-b px-4 py-3">
                  <h3 className="font-medium">Documentos legales</h3>
                </div>
                <nav>
                  {legalPages.map((page) => {
                    const isCurrentPage = page.title === title;
                    return (
                      <Link
                        key={page.href}
                        href={page.href}
                        className={cn(
                          "flex items-center gap-2 border-l-4 border-transparent p-3 transition-colors",
                          isCurrentPage
                            ? "border-primary text-primary bg-indigo-50 font-medium dark:bg-indigo-950"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground",
                        )}
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
              <div className="bg-background rounded-xl border shadow-sm">
                <div className="bg-muted border-b px-4 py-3">
                  <h3 className="font-medium">Índice de contenidos</h3>
                </div>
                <div className="p-3">
                  <div className="relative mb-3">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input
                      type="text"
                      placeholder="Buscar sección..."
                      className="bg-muted border-alternative w-full pl-9"
                      value={searchQuery}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearchQuery(e.target.value)
                      }
                    />
                  </div>
                  {filteredToc.length > 0 ? (
                    <nav className="max-h-80 space-y-1 overflow-y-auto pt-1 pr-2">
                      {filteredToc.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={cn(
                            "block w-full rounded-sm px-2 py-1 text-left text-sm transition-colors",
                            activeSection === item.id
                              ? "text-primary bg-indigo-50 font-medium dark:bg-indigo-950"
                              : "hover:bg-muted text-foreground/80 hover:text-foreground",
                            item.level === 3 && "pl-4",
                          )}
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  ) : (
                    <p className="text-muted0 p-2 text-sm">
                      No se encontraron resultados
                    </p>
                  )}
                </div>
              </div>

              {/* Contacto */}
              <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-900 dark:bg-indigo-950">
                <h3 className="mb-2 font-medium text-indigo-900 dark:text-indigo-100">
                  ¿Necesitas ayuda?
                </h3>
                <p className="mb-3 text-sm text-indigo-700 dark:text-indigo-300">
                  Si tienes dudas sobre nuestros términos legales, contáctanos.
                </p>
                <Link href="/contacto">
                  <Button className="w-full">
                    Contactar soporte <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </aside>

          <article ref={contentRef} className="min-w-0 flex-1">
            <Markdown className="prose-sm md:prose! prose-headings:scroll-mt-24 prose-headings:font-medium prose-headings prose-a:text-primary prose-a:no-underline hover:prose-a:text-indigo-700 max-w-none! md:max-w-none! md:text-base!">
              {content}
            </Markdown>

            <div className="mt-12 border-t pt-6">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <p className="text-muted0 text-sm">
                  © 2025 Essentia. Todos los derechos reservados.
                </p>
                <Link href="#legal-heading">
                  <Button variant="outline" size="sm" className="self-end">
                    Volver arriba
                  </Button>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default LegalWrapper;
