import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '1.5rem',
      },
    },
    extend: {
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        mono: ['var(--font-space-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        brand: {
          dark: '#121212',
          darker: '#0F1419',
          card: '#1E1E1E',
          border: '#374151',
          green: '#6EE7B7',
          blue: '#3B82F6',
          'blue-light': '#93C5FD',
          text: '#E5E7EB',
          muted: '#9CA3AF',
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        float1: 'float1 3s ease-in-out infinite',
        float2: 'float2 4s ease-in-out infinite',
        float3: 'float3 5s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float1: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        float2: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-15px)' } },
        float3: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
