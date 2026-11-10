import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/components/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: "#1C3329", deep: "#12211A" },
        cream: "#F3EFE4",
        surface: "#FBF8F0",
        ink: "#18261F",
        muted: "#5C675F",
        line: "#D9D3C2",
        brass: { DEFAULT: "#B8913F", lt: "#D4B166", dk: "#86641C" },
        sage: "#A9B8AE",
        pine: "#2F4A3D",
        whats: "#25D366",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
