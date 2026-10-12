/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: App-wide constants and environment configuration.
 * Centralizing these here prevents magic strings scattered across the codebase.
 * If we ever add EAS Build env variables, they'd be read here via expo-constants.
 */

export const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Request timeout in ms. JSONPlaceholder is a public API — 10s is generous
// but keeps UX responsive on poor connections.
export const REQUEST_TIMEOUT_MS = 10_000;

// TanStack Query: how long until fresh data becomes stale.
// Posts/comments don't change in a demo — but we still allow background refetches
// so pull-to-refresh feels instant (data is already fresh on the first pull).
export const STALE_TIME_MS = 5 * 60 * 1000; // 5 minutes

// Max retries on failed queries. We fail fast so the error state shows quickly.
export const QUERY_RETRY_COUNT = 2;
