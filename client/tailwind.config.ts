import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        pulse: 'pulse 2s infinite',
        bounce: 'bounce 2s infinite',
      },
      fontFamily: {
        edu: ['"Edu AU VIC WA NT Pre"', 'sans-serif'],  
        nunito: ['"Nunito"', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
