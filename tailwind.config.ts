import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'principal-100': '#ff9ec6',
        'principal-200': '#df81a9',
        'principal-300': '#974068',
        'accent-100': '#ffd3e1',
        'text-100': '#262222',
        'text-200': '#333333',
        'bg-100': '#fdfdfd',
        'bg-200': '#f2f2f2',
        'accent-300': '#90596b',
        'text-50': '#0d0d0d',
        'bg-300': '#ffebf0',
        'accent-200': '#ffc1d5',
      },
    },
  },
  plugins: [],
};
export default config;
