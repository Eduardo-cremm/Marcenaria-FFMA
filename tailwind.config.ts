import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F1EFE8",
        nav: "#2C2C2A",
        gold: "#FAC775",
        "brown-dk": "#412402",
        "brown-md": "#854F0B",
        cta: "#BA7517",
        "gray-1": "#5F5E5A",
        "gray-2": "#888780",
        "gray-3": "#B4B2A9",
        "blade-red": "#D91A1A",
        whats: "#25D366",
        cream: "#FAEEDA",
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["-apple-system", "BlinkMacSystemFont", "Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "10px",
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.06)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.10)",
      },
    },
  },
  plugins: [],
};
export default config;
