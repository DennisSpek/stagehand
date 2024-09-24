import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        offWhite: '#F9F9FB',
        halfWhite: '#F5F5F5',
        lightGray: '#EBEBEB',
        gray: '#BABABA',
        darkGray: '#727272',
        lighterBlue: '#F6F7FD',
        lightBlue: '#D4D7F7',
        vividBlue: '#5650F5',
        positiveGreen: '#00A210',
      },
      borderRadius: {
        '2xl': '50px',
        'xl': '24px',
        'normal': '16px',
        'sm': '8px',
        'tiny': '4px',
        'tiny/2': '2px',
      },
      fontSize: {
        '2xl': '3rem',
        xxl: '2rem',
        xl: '1.5rem',
        normal: '1rem',
        sm: '0.75rem'
      }
    },
  },
  plugins: [],
};
export default config;
