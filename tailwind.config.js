/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 18s linear infinite",
      },
    },
  },

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#06923E",
          secondary: "#d926a9",
          accent: "#386641",
          neutral: "#2a323c",
          "base-100": "#fff",
          info: "#3abff8",
          success: "#06923E",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
};
