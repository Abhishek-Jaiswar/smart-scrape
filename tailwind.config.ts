import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
      },

      // animation: {
      //   shimmer: "shimmer 2s linear infinite",
      // },
      // keyframes: {
      //   shimmer: {
      //     from: {
      //       backgroundPosition: "0 0",
      //     },
      //     to: {
      //       backgroundPosition: "-200% 0",
      //     },
      //   },
      // },
    },
  },
  plugins: [],
} satisfies Config;
