/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: Configured Axios instance — the single HTTP client for the entire app.
 *
 * Architecture role (Data layer):
 *   - Centralizes base URL, timeout, and default headers in ONE place.
 *   - The response interceptor normalizes API errors into a consistent AppError shape,
 *     so upper layers (repository, hooks, UI) never need to inspect raw Axios errors.
 *   - WHY not just use fetch? Axios gives us interceptors, automatic JSON parsing,
 *     and a request/response pipeline that's much cleaner to extend (e.g., auth tokens).
 */

import axios, { AxiosError } from 'axios';

import { BASE_URL, REQUEST_TIMEOUT_MS } from '@/core/config/constants';

/** Normalized error type used throughout the app. */
export interface AppError {
  message: string;
  statusCode?: number;
  isNetworkError: boolean;
}

/** Type guard — narrows an unknown error to AppError */
export function isAppError(error: unknown): error is AppError {
  return (
    typeof error === 'object' && error !== null && 'message' in error && 'isNetworkError' in error
  );
}

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// ─── Response error interceptor ────────────────────────────────────────────────
// Transforms every Axios error into our AppError shape before it bubbles up.
// This means hooks/repos only ever see AppError — no need to type-check AxiosError
// in multiple places (DRY, single responsibility).
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const appError: AppError = {
      message: 'Something went wrong. Please try again.',
      isNetworkError: false,
    };

    if (!error.response) {
      // Network error (no connection, timeout, DNS failure, etc.)
      appError.message = 'Network error. Please check your connection.';
      appError.isNetworkError = true;
    } else {
      // HTTP error (4xx, 5xx)
      appError.statusCode = error.response.status;
      appError.message =
        (error.response.data as { message?: string })?.message ??
        `Request failed with status ${error.response.status}`;
    }

    return Promise.reject(appError);
  },
);
