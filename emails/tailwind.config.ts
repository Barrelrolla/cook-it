import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      fontFamily: {
        heading: ["Fraunces", "serif"],
        logo: ["Hurricane", "serif"],
        sans: ["Manrope", "sans"],
      },
      colors: {
        main: "#f7ebdd",
        "main-content": "#2e241d",
        primary: "#f7ebdd",
        "primary-content": "#5a7302",
        "main-dark": "#221f19",
        "main-content-dark": "#f4eee8",
        "primary-dark": "#1b1b16",
        "primary-content-dark": "#739120",
      },
    },
  },
} satisfies Config;
