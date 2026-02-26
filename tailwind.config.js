/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        custom: '0px 4px 6px hsla(0, 0%, 91%, 0.08)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        tableHeader:'var(--tableHeader)',
        tableHeaderText:'var(--tableHeaderText)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        white: 'var(--white)',
        backgroundShade: 'var(--backgroundShade)',
        green: 'var(--green)',
        greenOverlay:'var(--greenOverlay)',
        orange: 'var(--orange)',
        yellow: 'var(--yellow)',
        textSecondary: 'var(--textSecondary)',
        input: 'var(--input)',
        textTertiary: 'var(--textTertiary)',
        black: 'var(--black)',
        red: 'var(--red)',
        redOverlay:'var(--redOverlay)',
        redBackground: 'var(--redBackground)',
        sidebar: 'var(--sidebar)',

        textDefault: 'var(--textDefault)',
        borderDefault: 'var(--borderDefault)',
        borderDefault2: 'var(--borderDefault2)',
        specificCard: 'var(--specificCard)',

        untitle: {
          50: 'var(--untitle-50)',
          100: 'var(--untitle-100)',
          200: 'var(--untitle-200)',
          300: 'var(--untitle-300)',
          400: 'var(--untitle-400)',
          500: 'var(--untitle-500)',
          600: 'var(--untitle-600)',
          700: 'var(--untitle-700)',
          800: 'var(--untitle-800)',
          900: 'var(--untitle-900)',
        },

        /* ===== primary shades ===== */
        primaryShade: {
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          500: 'var(--primary-500)',
          700: 'var(--primary-700)',
        },

        /* ===== text shades ===== */
        text: {
          100: 'var(--text-100)',
          200: 'var(--text-200)',
          300: 'var(--text-300)',
          400: 'var(--text-400)',
          500: 'var(--text-500)',
          600: 'var(--text-600)',
          700: 'var(--text-700)',
          800: 'var(--text-800)',
          900: 'var(--text-900)',
          1000: 'var(--text-1000)',
        },

        /* ===== neutral ===== */
        neutral: {
          100: 'var(--neutral-100)',
          200: 'var(--neutral-200)',
          300: 'var(--neutral-300)',
          400: 'var(--neutral-400)',
          500: 'var(--neutral-500)',
          600: 'var(--neutral-600)',
          700: 'var(--neutral-700)',
          800: 'var(--neutral-800)',
        },

        /* ===== danger ===== */
        danger: {
          100: 'var(--danger-100)',
          200: 'var(--danger-200)',
          300: 'var(--danger-300)',
          400: 'var(--danger-400)',
          500: 'var(--danger-500)',
          600: 'var(--danger-600)',
          700: 'var(--danger-700)',
          800: 'var(--danger-800)',
        },

        /* ===== success ===== */
        success: {
          100: 'var(--success-100)',
          200: 'var(--success-200)',
          300: 'var(--success-300)',
          400: 'var(--success-400)',
          500: 'var(--success-500)',
          600: 'var(--success-600)',
          700: 'var(--success-700)',
          800: 'var(--success-800)',
        },

        baseStroke: 'var(--baseStroke)',

        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },

        border: 'var(--border)',
        ring: 'var(--ring)',
        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)',
        },

        sidebar: {
          DEFAULT: 'var(--sidebar-background)',
          foreground: 'var(--sidebar-foreground)',
          background: 'var(--sidebar-background)',
          primary: 'var(--sidebar-primary)',
          'primary-foreground': 'var(--sidebar-primary-foreground)',
          accent: 'var(--sidebar-accent)',
          hover: 'var(--sidebar-hover)',
          'accent-foreground': 'var(--sidebar-accent-foreground)',
          border: 'var(--sidebar-border)',
          ring: 'var(--sidebar-ring)',
        },
      },

      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
