/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary-color, #18856d)',
          light: 'var(--primary-light, #f8fdfb)',
        },
        accent: {
          DEFAULT: 'var(--accent-color, #0e6eff)',
          dark: 'var(--accent-dark, #0048b3)',
        },
        text: {
          DEFAULT: 'var(--text-color)',
          light: 'var(--text-light)',
          lighter: 'var(--text-lighter)',
        },
        background: 'var(--bg-color)',
        card: {
          bg: 'var(--card-bg, #ffffff)',
          border: 'var(--card-border, #e9ecef)',
          hover: 'var(--card-hover, #f8f9fa)',
        }
      },
    },
  },
  plugins: [],
}

