"use client";

import { Menu, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { ArrowLeftButton } from "@/components/button-kit/arrow-left-button";
import { LoginButton } from "@/components/button-kit/login-button";
import { Button } from "@/components/kit/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/kit/drawer";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { title: "Descubre Essentia", href: "/", hasDropdown: true },
  { title: "Planes", href: "/planes" },
  { title: "Sobre Nosotros", href: "/sobre-nosotros" },
  /* { title: "Blog", href: "/blog" }, */
  { title: "Soporte", href: "/soporte" },
];

const discoverItems = [
  {
    title: "Nuestro Método",
    href: "/descubre-essentia#metodo",
    description:
      "Conoce el enfoque integral y personalizado de Essentia para tu bienestar.",
  },
  {
    title: "Nuestros Recursos",
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

const Navbar = ({
  scrollRef,
}: {
  scrollRef: React.RefObject<HTMLElement | null>;
}) => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isMobile = useIsMobile();

  useEffect(() => {
    const scrollElement = isMobile ? window : scrollRef.current;

    const handleScroll = () => {
      const scrollTop = isMobile
        ? window.scrollY
        : (scrollRef.current?.scrollTop ?? 0);
      setIsScrolled(scrollTop > 10);
    };

    scrollElement?.addEventListener("scroll", handleScroll);
    return () => scrollElement?.removeEventListener("scroll", handleScroll);
  }, [scrollRef, isMobile]);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 flex items-center transition-all duration-300",
        isScrolled
          ? "shadow-little-pretty h-12 bg-white/80 backdrop-blur-lg backdrop-saturate-150"
          : "h-14 bg-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-logo flex size-8 shrink-0 items-center justify-center rounded-sm">
            <Logo />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Essentia</span>
          </div>
        </Link>

        <div className="hidden items-center md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {mainNavItems.map((item) =>
                item.hasDropdown ? (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger
                      className={cn(
                        "bg-transparent",
                        {
                          "hover:bg-white hover:data-[state=open]:bg-white":
                            !isScrolled,
                        },
                        pathname.startsWith("/recursos") &&
                          "font-medium text-indigo-600",
                      )}
                    >
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {discoverItems.map((resource) => (
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
                        { "hover:bg-white": !isScrolled },
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
            className="border-indigo-200 text-indigo-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
          >
            Iniciar sesión
          </LoginButton>
          <Link href="/planes">
            <Button size="sm" variant="gradient" className="hidden md:flex">
              Hazte premium
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Drawer
          open={isMobileMenuOpen}
          onOpenChange={setIsMobileMenuOpen}
          direction="right"
        >
          <DrawerTrigger className="flex size-8 items-center justify-center text-gray-700 md:hidden">
            <Menu className="size-6" />
          </DrawerTrigger>
          <DrawerContent className="p-0!">
            <DrawerHeader className="sr-only">
              <DrawerTitle>Navegación</DrawerTitle>
              <DrawerDescription>Navega por las secciones.</DrawerDescription>
            </DrawerHeader>
            <div className="mb-4 flex flex-col gap-4 p-6 pb-0">
              <Link
                href="/"
                className="relative inline-flex items-center gap-2"
              >
                <div className="bg-logo flex size-8 shrink-0 items-center justify-center rounded-sm">
                  <Logo width={16} height={16} className="h-4" />
                </div>
                <div className="grid flex-1 text-left text-sm">
                  <span className="truncate font-semibold">Essentia</span>
                </div>
              </Link>
              <ArrowLeftButton
                size="sm"
                variant="secondary"
                className="h-7 rounded-sm text-xs [&_svg]:size-3.5!"
              >
                Regresar al sitio
              </ArrowLeftButton>
            </div>
            <nav className="flex flex-col divide-y divide-slate-200 overflow-y-auto px-6 text-base">
              {mainNavItems.map((item) =>
                item.hasDropdown ? (
                  <div key={item.title} className="border-t py-4">
                    <div className="mb-2 text-sm font-semibold text-gray-900">
                      {item.title}
                    </div>
                    <div className="space-y-2 pl-2">
                      {discoverItems.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className={cn(
                            "flex items-center gap-2 rounded py-2 text-sm transition",
                            pathname === subItem.href
                              ? "font-medium text-indigo-600"
                              : "text-gray-700 hover:text-indigo-600",
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <ChevronRight className="size-3 text-gray-400" />
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      "block py-4 text-sm font-semibold text-gray-900 transition",
                      pathname === item.href
                        ? "text-indigo-600"
                        : "text-gray-700 hover:text-indigo-600",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ),
              )}
            </nav>
            <DrawerFooter className="flex flex-col gap-2">
              <LoginButton
                variant="outline"
                className="w-full border-indigo-200 text-indigo-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
              >
                Iniciar sesión
              </LoginButton>
              <Button
                variant="gradient"
                onClick={() => router.push("/signup")}
                className="w-full"
              >
                Comenzar gratis
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      {/* Mobile Menu */}
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
