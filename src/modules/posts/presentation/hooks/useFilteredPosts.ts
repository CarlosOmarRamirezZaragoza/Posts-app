/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: useFilteredPosts — derives the visible post list from server data + client state.
 *
 * PATTERN: Selector / Derived State
 *   This hook is the composition point between:
 *     - usePosts (server state via TanStack Query)
 *     - usePostsUiStore (client state: search + filter via Zustand)
 *     - useFavoritesStore (client state: favoriteIds via Zustand)
 *
 *   WHY useMemo?
 *   The filter/search operations iterate over all posts on every render.
 *   memoizing ensures we only recalculate when actual dependencies change,
 *   not on every parent re-render.
 *
 *   WHY no debounce here?
 *   Debounce happens at the SearchBar input level (useDebounce hook).
 *   By the time searchQuery reaches this store, it's already debounced.
 */

import { useMemo } from 'react';

import { useFavoritesStore } from '../store/favoritesStore';
import { usePostsUiStore } from '../store/postsUiStore';
import { usePosts } from './usePosts';

export function useFilteredPosts() {
  const { posts, isLoading, isError, error, refetch } = usePosts();

  // Granular selectors — only re-render when these specific slices change
  const searchQuery = usePostsUiStore((state) => state.searchQuery);
  const activeFilter = usePostsUiStore((state) => state.activeFilter);
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);

  const filteredPosts = useMemo(() => {
    if (!posts) return [];

    let result = posts;

    // Step 1: Filter by favorites tab
    if (activeFilter === 'favorites') {
      result = result.filter((post) => favoriteIds.has(post.id));
    }

    // Step 2: Search filter (case-insensitive, over title + body)
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (post) => post.title.toLowerCase().includes(q) || post.body.toLowerCase().includes(q),
      );
    }

    return result;
  }, [posts, activeFilter, favoriteIds, searchQuery]);

  return {
    posts: filteredPosts,
    totalCount: posts?.length ?? 0,
    isLoading,
    isError,
    error,
    refetch,
  };
}
