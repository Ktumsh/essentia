import Link from "next/link";

import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "@/components/ui/icons/media";
import Logo from "@/components/ui/layout/logo";
import { navConfig } from "@/config/nav.config";

const Footer = () => {
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
        { name: "Essentia AI", href: "/essentia#ai" },
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
    <footer className="border-t border-gray-200 bg-white py-12 text-base">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="bg-logo flex size-8 shrink-0 items-center justify-center rounded-sm">
                <Logo />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Essentia</span>
              </div>
            </Link>
            <p className="mb-4 text-gray-600">
              Transformando vidas a través del bienestar integral y
              personalizado.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-gray-400 transition duration-300 hover:scale-110 hover:text-indigo-600"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="mb-4 font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="group relative text-gray-600 transition-colors hover:text-indigo-600"
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-200 pt-8 md:flex-row">
          <p className="text-sm text-gray-500">
            © 2025 Essentia. Todos los derechos reservados.
          </p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <Link
              href="/privacidad"
              className="group relative text-sm text-gray-500 transition-colors hover:text-indigo-600"
            >
              Privacidad
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/terminos"
              className="group relative text-sm text-gray-500 transition-colors hover:text-indigo-600"
            >
              Términos
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/cookies"
              className="group relative text-sm text-gray-500 transition-colors hover:text-indigo-600"
            >
              Cookies
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
