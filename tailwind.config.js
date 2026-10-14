/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vanilla-cream': '#F8EFE4',
        'cocoa-brown': '#754C3B',
        'deep-chocolate': '#422B25',
        'blush-pink': '#EFC9CE',
        'latte-beige': '#DCC8B1',
        'sage-mist': '#DCE9E2',
        'cloud-white': '#FFFFFF',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'cocoa-sm': '0 2px 8px -1px rgba(66, 43, 37, 0.08)',
        'cocoa-md': '0 8px 24px -4px rgba(66, 43, 37, 0.12)',
        'cocoa-lg': '0 16px 40px -8px rgba(66, 43, 37, 0.16)',
        'blush-glow': '0 0 30px rgba(239, 201, 206, 0.45)',
      },
      animation: {
        'float-gentle': 'floatGentle 6s ease-in-out infinite',
        'float-slow': 'floatSlow 9s ease-in-out infinite',
        'cloud-drift-1': 'cloudDrift 24s ease-in-out infinite alternate',
        'cloud-drift-2': 'cloudDriftReverse 28s ease-in-out infinite alternate',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.3s ease-out forwards',
      },
      keyframes: {
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(0.8deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        cloudDrift: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(24px)' },
        },
        cloudDriftReverse: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(-20px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.85' },
          '50%': { opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
