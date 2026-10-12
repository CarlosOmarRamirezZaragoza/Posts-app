/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: TanStack Query key factory for all posts-related queries.
 *
 * PATTERN: Query Key Factory
 *   Centralizing query keys prevents key collisions, makes invalidations trivial,
 *   and documents every query the feature uses in one place.
 *   Example: queryClient.invalidateQueries({ queryKey: postKeys.all() })
 *   would invalidate both posts and comments — handy for pull-to-refresh.
 */

export const postKeys = {
  /** Base key — scopes all posts-related queries */
  all: () => ['posts'] as const,

  /** Key for the posts list */
  lists: () => [...postKeys.all(), 'list'] as const,

  /** Key for the comment count map (all comments, single request) */
  commentCounts: () => [...postKeys.all(), 'commentCounts'] as const,

  /** Key for comments belonging to a specific post */
  comments: (postId: number) => [...postKeys.all(), 'comments', postId] as const,

  /** Key for a single post detail (if needed in the future) */
  detail: (postId: number) => [...postKeys.all(), 'detail', postId] as const,
} as const;
