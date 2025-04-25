"use client";

import { Menu, X, LogIn } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { LoginButton } from "@/components/button-kit/login-button";
import { Button } from "@/components/kit/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/kit/navigation-menu";
import Logo from "@/components/ui/layout/logo";
import { cn } from "@/lib/utils";

const Navbar = ({
  scrollRef,
}: {
  scrollRef: React.RefObject<HTMLElement | null>;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const scrollElement = scrollRef.current;

    const handleScroll = () => {
      if (scrollElement && scrollElement.scrollTop > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    scrollElement?.addEventListener("scroll", handleScroll);
    return () => scrollElement?.removeEventListener("scroll", handleScroll);
  }, [scrollRef]);

  const mainNavItems = [
    { title: "Inicio", href: "/" },
    { title: "Planes", href: "/planes" },
    { title: "Recursos", href: "#", hasDropdown: true },
    { title: "Sobre Nosotros", href: "/sobre-nosotros" },
    { title: "Blog", href: "/blog" },
    { title: "Soporte", href: "/soporte" },
  ];

  const resourcesItems = [
    {
      title: "Nuestro Método",
      href: "/descubre-essentia#metodo",
      description:
        "Conoce el enfoque integral y personalizado de Essentia para tu bienestar.",
    },
    {
      title: "Nuestros Recursos Educativos",
      href: "/descubre-essentia#recursos",
      description:
        "Accede a rutas de aprendizaje con etapas, revisiones prácticas, artículos, guías y más recursos para tu bienestar.",
    },
    {
      title: "Historial Médico",
      href: "/descubre-essentia#historial-medico",
      description:
        "Gestiona y consulta tu información médica de forma segura y centralizada.",
    },
    {
      title: "Essentia AI",
      href: "/descubre-essentia#ai",
      description:
        "Aprovecha la inteligencia artificial para recomendaciones y seguimiento personalizado.",
    },
    {
      title: "Progreso",
      href: "/descubre-essentia#progreso",
      description:
        "Visualiza tus avances y logros en tu camino hacia una vida más saludable.",
    },
    {
      title: "Visión y Propósito",
      href: "/descubre-essentia#vision-proposito",
      description:
        "Descubre la misión y valores que impulsan el proyecto Essentia.",
    },
  ];

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 py-2 shadow-sm backdrop-blur-md"
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-logo flex size-8 shrink-0 items-center justify-center rounded-sm">
            <Logo />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Essentia</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {mainNavItems.map((item) =>
                item.hasDropdown ? (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger
                      className={cn(
                        "bg-transparent",
                        pathname.startsWith("/recursos") &&
                          "font-medium text-indigo-600",
                      )}
                    >
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {resourcesItems.map((resource) => (
                          <ListItem
                            key={resource.title}
                            title={resource.title}
                            href={resource.href}
                            className={
                              pathname === resource.href
                                ? "font-medium text-indigo-600"
                                : ""
                            }
                          >
                            {resource.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      href={item.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent",
                        pathname === item.href && "font-medium text-indigo-600",
                      )}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LoginButton
            variant="outline"
            size="sm"
            className="border-indigo-200 text-indigo-700 hover:border-indigo-300 hover:bg-indigo-50"
          >
            Iniciar sesión
          </LoginButton>
          <Link href="/planes">
            <Button
              className="hidden bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:from-indigo-600 hover:to-pink-600 md:flex"
              size="sm"
            >
              Hazte premium
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-gray-700 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full right-0 left-0 flex flex-col gap-4 bg-white px-4 py-4 shadow-lg md:hidden">
          {mainNavItems.map((item) =>
            item.hasDropdown ? (
              <div key={item.title} className="py-2">
                <div className="mb-2 font-medium">{item.title}</div>
                <div className="space-y-2 pl-4">
                  {resourcesItems.map((resource) => (
                    <Link
                      key={resource.title}
                      href={resource.href}
                      className={`block py-1 ${
                        pathname === resource.href
                          ? "font-medium text-indigo-600"
                          : "text-gray-700 hover:text-indigo-600"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {resource.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.title}
                href={item.href}
                className={`py-2 ${
                  pathname === item.href
                    ? "font-medium text-indigo-600"
                    : "text-gray-700 hover:text-indigo-600"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ),
          )}
          <div className="mt-2 flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full border-indigo-200 text-indigo-700 hover:border-indigo-300 hover:bg-indigo-50"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Iniciar sesión
            </Button>
            <Link href="/planes" className="w-full">
              <Button className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:from-indigo-600 hover:to-pink-600">
                Hazte premium
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

const ListItem = ({
  className,
  title,
  href,
  children,
  ...props
}: {
  className?: string;
  title: string;
  href: string;
  children?: React.ReactNode;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
            className,
          )}
          {...props}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};
ListItem.displayName = "ListItem";
