/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: Design tokens — the typed mirror of tailwind.config.js values.
 *
 * WHY this file exists alongside tailwind.config:
 *   Tailwind generates utility class strings. But sometimes we need raw token values
 *   in JavaScript (e.g., StatusBar color, native shadow props, Animated interpolations).
 *   This file is the TypeScript-typed source of truth for those cases.
 *   It MUST stay in sync with tailwind.config.js — any change there should be reflected here.
 */

export const Colors = {
  primary: '#6C63FF',
  primaryLight: '#8B85FF',
  primaryDark: '#4D44E0',

  secondary: '#00D4AA',
  secondaryLight: '#33DEBB',
  secondaryDark: '#00A884',

  bgPrimary: '#0F0F1A',
  bgSecondary: '#161627',
  bgTertiary: '#1E1E35',
  bgOverlay: '#252540',

  textPrimary: '#F0F0FF',
  textSecondary: '#A8A8C8',
  textTertiary: '#6B6B8A',

  error: '#FF5370',
  warning: '#FFB86C',
  success: '#50FA7B',

  border: '#2A2A4A',
  borderLight: '#3A3A5A',

  // Transparent utility
  transparent: 'transparent',
} as const;

export type ColorKey = keyof typeof Colors;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
} as const;

export const Radius = {
  sm: 6,
  md: 10,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 9999,
} as const;

export const FontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  lg: 17,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
} as const;
