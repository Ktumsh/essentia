/** @type {import('tailwindcss').Config} */

import fontFamily from "tailwindcss/defaultTheme";

import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      boxShadow: {
        "bento-shadow": "var(--bento-shadow)",
        pretty: "var(--pretty-shadow)",
        "little-pretty": "var(--little-pretty-shadow)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
        "7xl": "3.5rem",
        "8xl": "4rem",
      },
      colors: {
        main: "var(--text-main)",
        "main-h": "var(--text-main-h)",
        "main-m": "var(--text-main-m)",
        "main-l": "var(--text-main-l)",
        "main-dark": "var(--text-main-dark)",
        "main-dark-h": "var(--text-main-dark-h)",
        "main-dark-m": "var(--text-main-dark-m)",
        "main-dark-l": "var(--text-main-dark-l)",
        dark: "var(--background-dark)",
        "full-dark": "var(--background-dark-f)",
        "accent-dark": "var(--background-accent-dark)",
        "muted-dark": "var(--background-muted-dark)",
        altern: "var(--background-alternative)",
        "altern-light": "var(--background-alternative-light)",
        "altern-accent": "var(--background-alternative-accent)",
        bittersweet: {
          "50": "#fef3f2",
          "100": "#fee5e2",
          "200": "#ffcfc9",
          "300": "#fdada4",
          "400": "#fa8072",
          "500": "#f15442",
          "600": "#df3623",
          "700": "#bb2b1a",
          "800": "#9b2619",
          "900": "#80261c",
          "950": "#460f09",
        },
        "cerise-red": {
          "50": "#fdf3f4",
          "100": "#fce7eb",
          "200": "#f8d3db",
          "300": "#f2afbc",
          "400": "#ea8299",
          "500": "#da4167",
          "600": "#c93560",
          "700": "#a92751",
          "800": "#8e2349",
          "900": "#7a2143",
          "950": "#430e21",
        },
        logo: "hsl(var(--logo))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        danger: "hsl(var(--danger))",
      },
      fontFamily: {
        grotesk: ["var(--font-space-grotesk)", ...fontFamily.fontFamily.sans],
        spacemono: ["var(--font-space-mono)", ...fontFamily.fontFamily.mono],
        dmsans: ["var(--font-dm-sans)", ...fontFamily.fontFamily.sans],
        sans: ["var(--font-geist-sans)"],
      },
      fontSize: {
        xxs: ["0.625rem", { lineHeight: "1rem" }],
      },
      backgroundImage: {
        "landing-gradient": "var(--landing-gradient)",
        "bento-gradient": "var(--bg-bento-gradient)",
        "light-gradient": "var(--light-gradient)",
        "light-gradient-v2": "var(--light-gradient-v2)",
        "dark-gradient": "var(--dark-gradient)",
        "dark-gradient-v2": "var(--dark-gradient-v2)",
        "light-radial-gradient": "var(--light-radial-gradient)",
        "dark-radial-gradient": "var(--dark-radial-gradient)",
        "dark-radial-gradient-2": "var(--dark-radial-gradient-2)",
      },
      transitionDuration: {
        "2000": "2000ms",
      },
      animation: {
        "shine-infinite": "shine 2s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "fade-in": "fade-in 0.2s ease-in",
        "fade-out": "fade-out 0.2s ease-out",
        "float-up-down": "float-up-down 8s ease-in-out infinite",
        "float-wave": "float-wave 10s ease-in-out infinite",
      },
      keyframes: {
        shine: {
          "0%": {
            transform: "skew(-12deg) translateX(-100%)",
          },
          "100%": {
            transform: "skew(-12deg) translateX(100%)",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "float-up-down": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "25%": { transform: "translateY(-20px) translateX(-15px)" },
          "50%": { transform: "translateY(20px) translateX(15px)" },
          "75%": { transform: "translateY(-10px) translateX(-10px)" },
        },
        "float-wave": {
          "0%, 100%": { transform: "translateY(0) translateX(0) rotate(0deg)" },
          "25%": {
            transform: "translateY(-15px) translateX(10px) rotate(5deg)",
          },
          "50%": {
            transform: "translateY(15px) translateX(-15px) rotate(-5deg)",
          },
          "75%": {
            transform: "translateY(-10px) translateX(5px) rotate(3deg)",
          },
        },
      },
      maxWidth: {
        "8xl": "88rem",
      },
    },
  },
};
export default config;
