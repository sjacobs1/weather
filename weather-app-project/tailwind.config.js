/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts}"],
  theme: {
    colors: {
      bodyBackground: "#93c5fd",
      textColor: "#ffffff",
      today: "#3b82f6",
      weekDays: "#60a5fa",
    },
    extend: {
      spacing: {
        4: "1rem",
        5: "1.25rem",
        20: "5rem",
        32: "8rem",
        72: "18rem",
      },
      height: {
        screen: "100vh",
      },
      width: {
        screen: "100vw",
      },
      fontSize: {
        sm: "0.875rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
      },
    },
  },
  plugins: [],
};
