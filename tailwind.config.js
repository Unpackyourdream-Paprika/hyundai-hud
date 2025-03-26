/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'], // Pretendard 추가
        Roboto: ['Roboto', 'sans-serif'], //Roboto 추가
      },
    },
  },
  plugins: [],
};
