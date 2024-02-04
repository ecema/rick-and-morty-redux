/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        120: "30rem",
      },
      maxWidth: {
        112: "28rem",
        "100-4rem": "calc(100% - 4rem)",
      },
    },
  },
  plugins: [],
};
