import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      spacing: {
        "responsive-xs": "clamp(0.5rem, 2vw, 0.75rem)",
        "responsive-sm": "clamp(0.75rem, 2vw, 1rem)",
        "responsive-md": "clamp(1rem, 3vw, 1.5rem)",
        "responsive-lg": "clamp(1.5rem, 4vw, 2rem)",
      },
      fontSize: {
        "responsive-xs": "clamp(0.75rem, 1vw, 0.875rem)",
        "responsive-sm": "clamp(0.875rem, 1.5vw, 1rem)",
        "responsive-base": "clamp(1rem, 2vw, 1.125rem)",
        "responsive-lg": "clamp(1.125rem, 2.5vw, 1.5rem)",
        "responsive-xl": "clamp(1.25rem, 3vw, 1.875rem)",
      },
    },
  },
  plugins: [],
};

export default config;
