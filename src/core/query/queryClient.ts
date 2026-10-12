/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: Global QueryClient configuration.
 *
 * Centralizing QueryClient here (rather than inline in _layout.tsx) keeps the
 * configuration testable and prevents duplicate instances during Fast Refresh.
 * The defaults are applied globally; individual queries can override them.
 */

import { QueryClient } from '@tanstack/react-query';

import { QUERY_RETRY_COUNT, STALE_TIME_MS } from '@/core/config/constants';
import { isAppError } from '@/core/api/apiClient';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered fresh for STALE_TIME_MS; no background refetch during that window.
      staleTime: STALE_TIME_MS,

      // Retry logic: don't retry on 4xx errors (client-side mistakes), do retry on network issues.
      retry: (failureCount, error) => {
        if (isAppError(error) && error.statusCode && error.statusCode < 500) {
          return false; // 4xx → don't retry
        }
        return failureCount < QUERY_RETRY_COUNT;
      },

      // Sane defaults for UX
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});
