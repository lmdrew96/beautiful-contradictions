/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Semantic theme colors (CSS variables)
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'accent': 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'success': 'var(--success)',
        'error': 'var(--error)',
        'warning': 'var(--warning)',
        'special': 'var(--special)',
        'border': 'var(--border)',
        'focus-ring': 'var(--focus-ring)',
        // Feature-specific colors (keep for gradients)
        chaos: {
          purple: '#8B5CF6',
          pink: '#EC4899',
          indigo: '#6366F1',
        },
        'error-feature': {
          rose: '#F43F5E',
          orange: '#F97316',
        },
        fog: {
          teal: '#14B8A6',
          cyan: '#06B6D4',
        },
        // Theme-aware feature accents
        'chaos-accent': 'var(--chaos-accent)',
        'chaos-accent-soft': 'var(--chaos-accent-soft)',
        'garden-accent': 'var(--garden-accent)',
        'garden-accent-soft': 'var(--garden-accent-soft)',
        'fog-accent': 'var(--fog-accent)',
        'fog-accent-soft': 'var(--fog-accent-soft)',
        'forge-accent': 'var(--forge-accent)',
        'forge-accent-soft': 'var(--forge-accent-soft)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
