"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "@/components/icons/media";
import FullLogo from "@/components/layout/full-logo";
import ThemeToggle from "@/components/layout/theme-toggle";
import { navConfig } from "@/config/nav.config";
import { cn } from "@/utils";

const footerSections = [
  {
    title: "Descubre Essentia",
    links: [
      { name: "Nuestro método", href: "/essentia#metodo" },
      { name: "Nuestros recursos", href: "/essentia#recursos" },
      {
        name: "Historial médico",
        href: "/essentia#historial-medico",
      },
      { name: "Habla con Aeris", href: "/essentia#ai" },
      { name: "Progreso", href: "/essentia#progreso" },
      {
        name: "Visión y propósito",
        href: "/essentia#vision-proposito",
      },
    ],
  },
  {
    title: "Sitio",
    links: navConfig.publicLinks.slice(1).map((link) => ({
      name: link.title,
      href: link.href,
    })),
  },
  {
    title: "Legal",
    links: [
      { name: "Términos de Servicio", href: "/terminos" },
      { name: "Política de Privacidad", href: "/privacidad" },
      { name: "Cookies", href: "/cookies" },
    ],
  },
];

const PublicFooter = () => {
  const pathname = usePathname();

  const isDiscover = pathname === "/essentia";

  const socialLinks = [
    {
      name: "Facebook",
      icon: <FacebookIcon className="size-5" />,
      href: "#",
    },
    {
      name: "Instagram",
      icon: <InstagramIcon className="size-5" />,
      href: "#",
    },
    {
      name: "Twitter",
      icon: <TwitterIcon className="size-5" />,
      href: "#",
    },
  ];

  return (
    <footer
      className={cn(
        "bg-muted py-12 text-sm md:text-base",
        isDiscover && "bg-background",
      )}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 flex flex-col md:col-span-1">
            <FullLogo withLabel href="/essentia" />
            <p className="my-4">
              Transformando vidas a través del bienestar integral y
              personalizado.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
            <div className="mt-4 w-fit md:mt-auto">
              <ThemeToggle />
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-merriweather mb-4 font-semibold">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="group hover:text-primary relative transition-colors"
                    >
                      {link.name}
                      <span className="bg-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
          <p className="text-sm">
            © 2025 Essentia. Todos los derechos reservados.
          </p>
          <div className="mt-4 flex gap-6 md:mt-0">
            <Link
              href="/privacidad"
              className="group hover:text-primary relative text-sm transition-colors"
            >
              Privacidad
              <span className="bg-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/terminos"
              className="group hover:text-primary relative text-sm transition-colors"
            >
              Términos
              <span className="bg-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/cookies"
              className="group hover:text-primary relative text-sm transition-colors"
            >
              Cookies
              <span className="bg-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
