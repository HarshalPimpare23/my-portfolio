/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 20px 80px rgba(0,0,0,0.45)",
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at top, rgba(168,85,247,0.24), transparent 36%), radial-gradient(circle at bottom right, rgba(34,211,238,0.16), transparent 30%)",
      },
    },
  },
  plugins: [],
};
