import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        jarvis: {
          bg: "#020811",
          panel: "#07111f",
          border: "#12304f",
          accent: "#22d3ee",
          text: "#d8f6ff",
          muted: "#7aa7c5"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(34, 211, 238, 0.12), 0 0 16px rgba(34, 211, 238, 0.08)"
      },
      borderRadius: {
        xl2: "1rem"
      }
    }
  },
  plugins: []
};

export default config;
