"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const Footer = () => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const footerSections = [
    {
      id: "recursos",
      title: "Recursos",
      links: [
        { name: "Salud y Bienestar", href: "/recursos/salud-bienestar" },
        { name: "Ejercicios y Fitness", href: "/recursos/ejercicios-fitness" },
        {
          name: "Nutrición y Alimentación",
          href: "/recursos/nutricion-alimentacion",
        },
        { name: "Bienestar Emocional", href: "/recursos/bienestar-emocional" },
        { name: "Salud y Educación Sexual", href: "/recursos/salud-sexual" },
        { name: "Salud en Todas las Edades", href: "/recursos/salud-edades" },
      ],
    },
    {
      id: "empresa",
      title: "Empresa",
      links: [
        { name: "Sobre Nosotros", href: "/sobre-nosotros" },
        // { name: "Equipo", href: "#" }, // Comentado según lo solicitado
        // { name: "Carreras", href: "#" }, // Comentado según lo solicitado
        { name: "Blog", href: "/blog" },
        { name: "Soporte", href: "/soporte" },
      ],
    },
    {
      id: "legal",
      title: "Legal",
      links: [
        { name: "Términos de Servicio", href: "/terminos" },
        { name: "Política de Privacidad", href: "/privacidad" },
        { name: "Cookies", href: "/cookies" },
        { name: "Licencias", href: "/licencias" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
      href: "#",
    },
    {
      name: "Instagram",
      icon: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01",
      href: "#",
      additionalPath:
        "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M2 2h20v20H2z",
    },
    {
      name: "Twitter",
      icon: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
      href: "#",
    },
  ];

  return (
    <footer className="border-t border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="group mb-4 flex items-center gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 transition-transform duration-300 group-hover:scale-110">
                <span className="font-bold text-white">E</span>
              </div>
              <span className="text-lg font-semibold transition-colors group-hover:text-indigo-600">
                Essentia
              </span>
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
                  className="transform text-gray-400 transition-colors duration-300 hover:scale-110 hover:text-indigo-600"
                  aria-label={social.name}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={social.icon} />
                    {social.additionalPath && (
                      <path d={social.additionalPath} />
                    )}
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div
              key={section.id}
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <h3 className="mb-4 text-lg font-semibold">{section.title}</h3>
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
              {hoveredSection === section.id && (
                <motion.div
                  className="absolute mt-2 -ml-3 h-1 w-1 rounded-full bg-indigo-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-200 pt-8 md:flex-row">
          <p className="text-sm text-gray-500">
            © 2024 Essentia. Todos los derechos reservados.
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
