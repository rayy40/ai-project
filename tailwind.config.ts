import type { Config } from "tailwindcss";

const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        label: "hsl(var(--label))",
        input: "hsl(var(--input))",
        input_hover: "hsl(var(--input-hover))",
        error: "hsl(var(--error))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          hover: "hsl(var(--primary-hover))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          hover: "hsl(var(--secondary-hover))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          hover: "hsl(var(--tertiary-hover))",
          foreground: "hsl(var(--tertiary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          hover: "hsl(var(--muted-hover))",
          foreground: "hsl(var(--muted-foreground))",
        },
        code: {
          DEFAULT: "hsl(var(--code))",
          foreground: "hsl(var(--code-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        input: "inset 0 0 0 1px rgb(15, 15, 15, 0.1)",
        button:
          "0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2)",
        light: " 0px 1px 2px rgba(15, 15, 15, 0.05)",
        medium: " 0px 0px 5px rgba(15, 15, 15, 0.2)",
      },
      keyframes: {
        pulse: {
          "50%": { opacity: "0.75" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
