import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    container: { center: true, padding: '1rem', screens: { '2xl': '1400px' } },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        navy: {
          DEFAULT: '#1A2744',
          50:  '#EEF0F7',
          100: '#D6DDED',
          400: '#415EA2',
          500: '#253561',
          600: '#1A2744',
          700: '#141E35',
        },
        brand: {
          orange:      '#C9541C',
          'orange-lt': '#FDE8DC',
          'orange-hov':'#E8692E',
          green:       '#3A6B47',
          'green-lt':  '#D8EDE0',
          'green-hov': '#4A8A5C',
          purple:      '#5B3F7A',
          'purple-lt': '#E5DCF0',
          gold:        '#C49A10',
          'gold-lt':   '#FDF3D0',
          cream:       '#FAF7F0',
          'cream-2':   '#F0EBE0',
        },
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
      },
      fontFamily: {
        display: ['var(--font-playfair)', ...fontFamily.serif],
        body:    ['var(--font-crimson)',  ...fontFamily.serif],
        mono:    ['var(--font-jetbrains)',...fontFamily.mono],
        sans:    ['var(--font-crimson)',  ...fontFamily.serif],
      },
      borderRadius: {
        lg: 'var(--radius)', md: 'calc(var(--radius) - 2px)', sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        's':  '0 2px 12px rgba(26,39,68,.08)',
        'm':  '0 6px 32px rgba(26,39,68,.14)',
        'l':  '0 16px 64px rgba(26,39,68,.20)',
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up':   { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'fade-up':  { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'wave': {
          '0%, 100%': { transform: 'scaleY(1)', opacity: '0.6' },
          '50%':      { transform: 'scaleY(1.8)', opacity: '1' },
        },
        'pulse-ring': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(208,64,64,.4)' },
          '50%':      { boxShadow: '0 0 0 20px rgba(208,64,64,0)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
        'fade-up':        'fade-up 0.3s ease',
        'wave':           'wave 0.8s ease-in-out infinite',
        'pulse-ring':     'pulse-ring 1.5s ease infinite',
        'shimmer':        'shimmer 2s linear infinite',
      },
      spacing: { nav: '72px', header: '60px' },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
