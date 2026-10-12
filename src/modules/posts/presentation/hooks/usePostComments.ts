/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: usePostComments — fetches comments for a specific post.
 *
 * Used on the Post Detail screen. This is a separate request from the list-level
 * comment count (which uses all comments at once). Here we fetch only the postId's
 * comments to display their full content (name, email, body).
 *
 * NOTE: The cache key includes postId, so navigating back and forth between
 * posts doesn't re-fetch — the data is already in the QueryClient cache.
 */

import { useQuery } from '@tanstack/react-query';

import { postsRepository } from '@/modules/posts/data/PostsRepositoryImpl';

import { postKeys } from './queryKeys';

export function usePostComments(postId: number) {
  return useQuery({
    queryKey: postKeys.comments(postId),
    queryFn: () => postsRepository.getCommentsByPostId(postId),
    // Don't fetch if postId is invalid
    enabled: postId > 0,
  });
}
