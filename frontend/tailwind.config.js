/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: ['./public/index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      borderRadius: {
        inherit: 'inherit',
      },
      boxShadow: {
        sm: '0px 2px 2px rgba(0, 0, 0, 0.12)',
        md: '0px 4px 8px rgba(0, 0, 0, 0.04), 0px 2px 4px rgba(0, 0, 0, 0.08)',
        lg: '0px 8px 16px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.08)',
        xl: ' 0px 32px 48px rgba(0, 0, 0, 0.04), 0px 16px 32px rgba(0, 0, 0, 0.08), 0px 4px 8px rgba(0, 0, 0, 0.08)',
        inset: 'inset  0px -1px 0px #CCCCCC',
      },
      colors: {
        primary: {
          DEFAULT: '#1A6349',
          16: '#2159AB',
          18:'#196248',
          24: '#143567',
          32: '#1A4789',
          48: '#286BCD',
          92: '#DDE8F8',
          96: '#EEF4FC',
          56: '#4380DB',
        },
      },
      lineHeight: {
        100: '100%',
        130: '130%',
        150: '150%',
        180: '180%',
        200: '200%',
      },
      screens: {
        xs: '475px',
        xxl: '1536px',
      },
      width: {
        'app-max': '85.375rem',
      },
      minHeight: {
        12: '12rem',
        20: '20rem',
        25: '25rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
  ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
};
