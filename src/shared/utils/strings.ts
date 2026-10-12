/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: Shared utility functions — pure helpers with no framework dependencies.
 */

/**
 * Truncates a string to `maxLength` characters and appends `…` if truncated.
 * Used by PostCard to clamp body text without relying on CSS (more predictable in RN).
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

/**
 * Capitalizes the first letter of a string.
 */
export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Returns a string with first letter capitalized and the rest in proper title case.
 * Used for comment names that sometimes arrive in ALL CAPS from the API.
 */
export function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
}
