/** @type {import('tailwindcss').Config} */
// tailwind.config.js
// Design tokens live here. NativeWind reads this and generates utility classes
// that map directly to React Native StyleSheet values.
// WHY ONE PLACE: Having tokens in tailwind.config means both Tailwind utilities
// AND direct theme imports (via src/core/theme/tokens.ts) are in sync.
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // ─── Color Palette ───────────────────────────────────────────────────────
      colors: {
        // Brand / accent
        primary: {
          DEFAULT: '#6C63FF',   // Electric violet — main CTAs, active states
          light:   '#8B85FF',
          dark:    '#4D44E0',
        },
        secondary: {
          DEFAULT: '#00D4AA',   // Emerald teal — favorites, positive indicators
          light:   '#33DEBB',
          dark:    '#00A884',
        },
        // Background layers (dark-first approach)
        bg: {
          primary:   '#0F0F1A',  // Deepest background
          secondary: '#161627',  // Card surface
          tertiary:  '#1E1E35',  // Elevated card / header
          overlay:   '#252540',  // Chips, tags
        },
        // Text hierarchy
        text: {
          primary:   '#F0F0FF',  // Headings
          secondary: '#A8A8C8',  // Body, subtitles
          tertiary:  '#6B6B8A',  // Placeholders, metadata
          inverse:   '#0F0F1A',  // On bright backgrounds
        },
        // Semantic
        error:   '#FF5370',
        warning: '#FFB86C',
        success: '#50FA7B',
        // Border / separator
        border: {
          DEFAULT: '#2A2A4A',
          light:   '#3A3A5A',
        },
      },
      // ─── Typography ──────────────────────────────────────────────────────────
      fontFamily: {
        // Inter loaded via expo-google-fonts; always referenced by these aliases
        sans:     ['Inter_400Regular', 'System'],
        medium:   ['Inter_500Medium', 'System'],
        semibold: ['Inter_600SemiBold', 'System'],
        bold:     ['Inter_700Bold', 'System'],
      },
      fontSize: {
        xs:   ['11px', { lineHeight: '16px' }],
        sm:   ['13px', { lineHeight: '18px' }],
        base: ['15px', { lineHeight: '22px' }],
        lg:   ['17px', { lineHeight: '24px' }],
        xl:   ['20px', { lineHeight: '28px' }],
        '2xl':['24px', { lineHeight: '32px' }],
        '3xl':['30px', { lineHeight: '38px' }],
      },
      // ─── Spacing ─────────────────────────────────────────────────────────────
      // Using Expo/React Native convention: multiples of 4
      spacing: {
        '0.5':  '2px',
        '1':    '4px',
        '1.5':  '6px',
        '2':    '8px',
        '2.5':  '10px',
        '3':    '12px',
        '4':    '16px',
        '5':    '20px',
        '6':    '24px',
        '8':    '32px',
        '10':   '40px',
        '12':   '48px',
        '16':   '64px',
      },
      // ─── Border Radius ───────────────────────────────────────────────────────
      borderRadius: {
        sm:   '6px',
        DEFAULT: '10px',
        md:   '12px',
        lg:   '16px',
        xl:   '20px',
        full: '9999px',
      },
      // ─── Shadows ─────────────────────────────────────────────────────────────
      boxShadow: {
        card:    '0 4px 16px rgba(0, 0, 0, 0.35)',
        elevated:'0 8px 28px rgba(0, 0, 0, 0.50)',
        glow:    '0 0 20px rgba(108, 99, 255, 0.30)',
      },
    },
  },
  plugins: [],
};
