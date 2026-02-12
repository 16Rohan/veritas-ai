/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base surfaces
        'deep-black': '#050608',

        // Primary accent: teal-ish mix of green and blue
        'neon-cyan': '#00FFC6',

        // Secondary accent
        'electric-purple': '#8A2BE2',

        // Supporting cool accent (still bluish, but shifted toward teal)
        'soft-blue': '#18C4FF',

        // Risk colors
        'risk-red': '#FF4C4C',
        'risk-amber': '#FFA500',
        'risk-green': '#00FF88',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'count-up': 'count-up 0.3s ease-out',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 245, 255, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 245, 255, 0.8)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'count-up': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionDuration: {
        '200': '200ms',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
