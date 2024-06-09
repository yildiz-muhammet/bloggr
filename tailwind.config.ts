import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './containers/**/*.{js,ts,jsx,tsx,mdx}',
    './providers/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './prisma/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',

  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(79 70 229 / 100%)",
        secondary: '#2d3748',
        tertiary: '#4a5568',

        light: '#f7fafc',
        dark: '#1a202c',

        accent: '#63b3ed',
        success: '#9ae6b4',
        warning: '#faf089',
        error: '#feb2b2',
      },


      //  font- draumadrop - one
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        body: ['"Anton"', 'sans-serif'],
      }









    },
  },
  plugins: [
    // require('@tailwindcss/line-clamp'),
  ],
  darkMode: 'class',
}
export default config
