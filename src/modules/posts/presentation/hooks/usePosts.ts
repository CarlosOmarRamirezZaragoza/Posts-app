/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: usePosts — fetches all posts + comment count map in parallel.
 *
 * WHY parallel requests?
 *   Both /posts and /comments are independent — no reason to serialize them.
 *   useQueries fires them simultaneously, cutting load time ~50% vs sequential.
 *
 * WHY not useQuery twice?
 *   useQueries gives us a combined loading/error state across both without
 *   manual coordination. Clean single hook surface for the list screen.
 */

import { useQueries } from '@tanstack/react-query';

import { postsRepository } from '@/modules/posts/data/PostsRepositoryImpl';

import { postKeys } from './queryKeys';

export function usePosts() {
  const [postsQuery, commentCountsQuery] = useQueries({
    queries: [
      {
        queryKey: postKeys.lists(),
        queryFn: () => postsRepository.getPosts(),
      },
      {
        queryKey: postKeys.commentCounts(),
        queryFn: () => postsRepository.getCommentCountMap(),
      },
    ],
  });

  const isLoading = postsQuery.isLoading || commentCountsQuery.isLoading;
  const isError = postsQuery.isError || commentCountsQuery.isError;
  const error = postsQuery.error ?? commentCountsQuery.error;

  // Compose posts + comment counts. Returns PostWithCommentCount[].
  // This is the "Selector pattern": derived data composed here, not in the UI.
  const posts = postsQuery.data?.map((post) => ({
    ...post,
    commentCount: commentCountsQuery.data?.[post.id] ?? 0,
  }));

  const refetch = () => {
    void postsQuery.refetch();
    void commentCountsQuery.refetch();
  };

  return {
    posts,
    isLoading,
    isError,
    error,
    refetch,
  };
}
