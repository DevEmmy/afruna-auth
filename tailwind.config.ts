import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: '',
  theme: {
    screens: {
      xs: "357px",
      sm: "640px",
      md: "880px",
      lg: "1024px",
      xl: "1280px",
      air: "850px",
      '999px': '999px',
      '980px': '980px',
      '924px': '924px',
      '820px': '820px',
      '785px': '785px',
      '730px': '730px',
      '680px': '680px',
      '630px': '630px',
      '580px': '580px',
      '510px': '510px',
      '450px': '450px',
      '400px': '400px',
      '380px': '380px',
      '350px': '350px',
     '2xl': "1440px",
      "3xl": "1680px",
      "4xl": "1920px",
      "5xl": "2240px",
    },
    extend: {
      fontFamily: {
        sans: [`var(--font-outfit)`]
      },
      boxShadow: {
        "3xl": "0px 12px 24px 0px #4750760A",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        other: "#9BA1A6r",
        black: "#1D2329",
        white: "#FFFFFF",
        destructive: "#FF0000",
        error: {
          DEFAULT: "#FF0000",
          50: "#DE3730",
          60: "#FF5449",
          95: "#FFEDEA",
        },
        success: {
          DEFAULT: "#00FF00",
          30: "#005234",
          60: "#37A372",
          70: "#55BE8B",
          99: "#F4FFF5",
        },
        primary: {
          DEFAULT: "#FEA000",
          10: "#011947",
          20: "#002C72",
          30: "#1D438F",
          40: '#395BA9',
          100: "#304499",
          200: "#2B3674",
          300: "#2563EB",
        },
        neutral: {
          40: "#586283",
          60: "#F0F2F5",
          95: '#53575E',
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [nextui(), require("tailwindcss-animate")],
};
export default config;
