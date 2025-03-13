import { LucideProps } from "lucide-react";
import {
  FC,
  ForwardRefExoticComponent,
  RefAttributes,
  SVGProps,
  type JSX,
} from "react";

import { Payment } from "@/db/schema";

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
  appId: string;

  name: string;

  description: string;

  url: string;

  keywords: string[];

  planPrices: {
    free: string;
    premium: string;
    premiumPlus: string;
  };

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
    activeIcon: (props: IconSvgProps) => JSX.Element;
    isSearch?: boolean;
  }[];

  asideMenuLinks: {
    name: string;
    link: string;
    icon: (props: any) => JSX.Element;
    emoji: string;
    activeIcon: (props: any) => JSX.Element;
  }[];

  additionalLinks: {
    href: string;
    name: string;
    icon: (props: any) => JSX.Element;
    activeIcon: (props: any) => JSX.Element;
    component: FC;
  }[];

  menuFooterLinks: {
    extras: {
      name: string;
      link: string;
      icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
    }[];
    config: {
      name: string;
      link: string;
      icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
    }[];
    account: {
      name: string;
      link?: string;
      icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
    }[];
  };

  footerLinks: {
    resources: { href: string; text: string }[];
    additionalresources: { href: string; text: string }[];
    more: { href: string; text: string }[];
  };

  desktopFooterLinks: {
    more: { href: string; text: string }[];
  };
};

export interface FAQPrincing {
  id: number;
  question: string;
  answer: string;
}

interface BubbleData {
  ref: React.RefObject<HTMLImageElement | null> | null;
  src: string;
  className: string;
}

export interface AboutSection {
  slug: string;
  section: string;
  title: string;
  description: string;
  img: string;
  video: string;
  bubbles: BubbleData[];
}

export type ModalSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "full"
  | undefined;

export type PaymentHistory = {
  payment: Payment;
  type: "free" | "premium" | "premium-plus" | null;
};
