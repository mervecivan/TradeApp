/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class"], // shadcn/ui için dark mode
  theme: {
    extend: {},
  },
  plugins: [],
}