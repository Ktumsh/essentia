import { FC, SVGProps } from "react";

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
