import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
    darkMode: ["class"], // Keeping dark mode config even if not used yet
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Set Poppins as the default sans-serif font
        sans: ["var(--font-poppins)", ...fontFamily.sans],
      },
      colors: {
        // Map CSS variables to Tailwind color names
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))', // --forest-green
          foreground: 'hsl(var(--primary-foreground))', // --off-white
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))', // --pewter
          foreground: 'hsl(var(--secondary-foreground))', // --charcoal
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))', // --pewter
          foreground: 'hsl(var(--muted-foreground))', // --pewter
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))', // --deep-green
          foreground: 'hsl(var(--accent-foreground))', // --off-white
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))', // --off-white
          foreground: 'hsl(var(--popover-foreground))', // --charcoal
        },
        card: {
          DEFAULT: 'hsl(var(--card))', // --off-white
          foreground: 'hsl(var(--card-foreground))', // --charcoal
        },
        // Direct access to guideline colors if needed
        charcoal: 'var(--charcoal)',
        pewter: 'var(--pewter)',
        'off-white': 'var(--off-white)',
        'forest-green': 'var(--forest-green)',
        'deep-green': 'var(--deep-green)',
      },
      borderRadius: {
        lg: 'var(--radius)', // 8px
        md: 'calc(var(--radius) - 2px)', // 6px
        sm: 'calc(var(--radius) - 4px)', // 4px
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
