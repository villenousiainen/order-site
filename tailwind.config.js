/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      "canon-red": "#CD2E21",
      "easybee-blue": "#1E293B"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      }
  }
  },
  plugins: [],
}

