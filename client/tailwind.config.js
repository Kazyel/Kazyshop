/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {

    extend: {
      "fontFamily": {
        "raleway": ["Raleway", "sans-serif"],
        "merriweather": ["Merriweather", "serif"],
        "noto-serif": ["Noto Serif", "serif"]
      },
      "colors": {
        "kazy-purple-dark": "#100d10"
      },
      padding: {
        "content": "max(2rem,((100% - 750px) / 2))"
      }
    }
  },
  plugins: [],
}