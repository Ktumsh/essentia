import { FC, SVGProps } from "react";

declare global {
  interface Window {
    YT: any;
  }
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface News {
  id: number;
  category?: string;
  title?: string;
  source_icon?: string;
  source_url?: string;
  creator?: string;
  pubDate?: string;
  views?: number;
  link?: string;
  image_url?: string;
}

export interface ModalData {
  id: number;
  modalTitle: string;
  modalImage: string;
  modalBody: string;
  component?: FC;
}

export interface HealthFact {
  fact: string;
  image: string;
}

export type SiteConfig = {
  name: string;
  description: string;
  links: {
    github: string;
    instagram: string;
    twitter: string;
  };
  navLinks: {
    active?: boolean;
    name: string;
    href: string;
    icon: (props: IconSvgProps) => JSX.Element;
    fillIcon: (props: IconSvgProps) => JSX.Element;
    isSearch?: boolean;
  }[];
  asideMenuLinks: {
    name: string;
    link: string;
    icon: (props: any) => JSX.Element;
  }[];
  footerLinks: {
    resources: { href: string; text: string }[];
    additionalresources: { href: string; text: string }[];
    comunidad: { href: string; text: string }[];
    more: { href: string; text: string }[];
  };
};
