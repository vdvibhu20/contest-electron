/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/ui/**/*.{js,ts,jsx,tsx}",],
    theme: {
      extend: {
        screens: {
          '2xl': { max: '1535px' },
          // => @media (max-width: 1535px) { ... }
  
          xl: { max: '1279px' },
          // => @media (max-width: 1279px) { ... }
  
          lg: { max: '1023px' },
          // => @media (max-width: 1023px) { ... }
  
          md: { max: '767px' },
          // => @media (max-width: 767px) { ... }
  
          sm: { max: '639px' },
          // => @media (max-width: 639px) { ... }
        },
        fontSize: {
          heading: '2.5rem',
        },
        lineHeight: {
          heading: '3.125rem',
        },
        borderRadius: {
          filter: '1.25rem',
        },
        boxShadow: {
          filter: '0px 8px 30px rgba(99, 99, 99, 0.18)',
          button: '0px 2px 12px rgba(99, 99, 99, 0.25)',
        },
        colors: {
          primary: {
            light: '#fb8133',
            DEFAULT: '#f26a3e',
            dark: '#e74e4b',
            extradark: '#573028',
          },
          secondary: {
            DEFAULT: '#ffba08',
          },
          'dark-0': '#2e3442',
          'dark-1': '#15171e',
          'dark-2': '#1f222c',
          'dark-3': '#08090c',
          'dark-4': '#3b4254',
          'dark-5': '#1a1c25',
          'light-1': '#cccccc',
          'light-2': '#e0e0e0',
        },
      },
    },
    plugins: [require('@tailwindcss/typography')],
}

