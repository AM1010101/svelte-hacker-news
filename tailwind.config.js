/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#fb923c',
          secondary: '#fed7aa',
          accent: '#e5e7eb',
          neutral: '#1e141f',
          'base-100': '#332f42',
          info: '#f3f4f6',
          success: '#d9f99d',
          warning: '#fda4af',
          error: '#be123c',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
