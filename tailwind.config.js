/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Royal Blue (#2F58CD)
        primary: {
          50: '#eef3ff',
          100: '#dce7ff',
          200: '#c0d1ff',
          300: '#94b0ff',
          400: '#6285ff',
          500: '#2F58CD', // Main primary color
          600: '#2647a3',
          700: '#1e3a85',
          800: '#19306d',
          900: '#152a5c',
        },
        // Secondary Colors - Light Gray (#AFAFAF)
        secondary: {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#e4e4e4',
          300: '#d1d1d1',
          400: '#AFAFAF', // Main secondary color
          500: '#9a9a9a',
          600: '#818181',
          700: '#6a6a6a',
          800: '#5a5a5a',
          900: '#3d3d3d',
        },
        // Success Colors - Green
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          700: '#047857',
          900: '#064e3b',
        },
        // Warning Colors - Amber
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          700: '#b45309',
          900: '#78350f',
        },
        // Error Colors - Red
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          700: '#b91c1c',
          900: '#7f1d1d',
        },
        // Dark Colors - Based on Black (#000000)
        dark: {
          50: '#f2f2f2',
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4d4d4d',
          800: '#333333',
          900: '#1a1a1a',
          950: '#0d0d0d',
          1000: '#000000', // Pure black
        },
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': '0 0 #0000',
        'primary': '0 0 15px rgba(0, 112, 243, 0.5)',
        'secondary': '0 0 15px rgba(111, 48, 255, 0.5)',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
