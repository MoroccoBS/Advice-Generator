/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        LightCyan: "hsl(193, 38%, 86%)",
        NeonGreen: "hsl(150, 100%, 66%)",
        GrayishBlue: "hsl(217, 19%, 38%)",
        DarkGrayishBlue: "hsl(217, 19%, 24%)",
        DarkBlue: "hsl(218, 23%, 16%)",
      },
      boxShadow: {
        ButtonShadow: "0 0rem 2rem hsl(150, 100%, 66%)",
      },
      letterSpacing: {
        0.5: "0.5em",
      },
      height: {
        55: "55vh",
      },
    },
  },
  plugins: [],
};
