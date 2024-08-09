import { Space_Grotesk, DM_Sans, Space_Mono } from "next/font/google";
import localFont from "next/font/local";

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const spaceMono = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const fontMotiva = localFont({
  src: [
    {
      path: "../../public/fonts/motiva-sans/MotivaSansThin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/motiva-sans/MotivaSansLight.woff.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/motiva-sans/MotivaSansRegular.woff.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/motiva-sans/MotivaSansMedium.woff.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/motiva-sans/MotivaSansBold.woff.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/motiva-sans/MotivaSansExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-motiva-sans",
});
