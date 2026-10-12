/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: Favorites store — persisted client state for favorite post IDs.
 *
 * ARCHITECTURE NOTE (State Management Strategy):
 *   Zustand handles CLIENT state ONLY (favorites, search, filter).
 *   Server state (posts, comments) lives in TanStack Query — we never duplicate it here.
 *
 *   WHY persist favorites?
 *   Favorites are a user preference that must survive app restarts.
 *   We store a Set<number> of postIds. The persist middleware serializes it to
 *   AsyncStorage via our zustandAsyncStorage adapter.
 *
 *   PERFORMANCE: Using granular Zustand selectors (state => state.favoriteIds)
 *   prevents components that only read favorites from re-rendering when the
 *   toggle action is dispatched if the selected slice didn't change.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { zustandAsyncStorage } from '@/core/storage/asyncStorageAdapter';

interface FavoritesState {
  /** Set of favorited post IDs. Persisted to AsyncStorage. */
  favoriteIds: Set<number>;

  /** Toggle a post as favorite/unfavorite */
  toggleFavorite: (postId: number) => void;

  /** Check if a post is currently favorited */
  isFavorite: (postId: number) => boolean;
}

// WHY Set over Array: O(1) lookup for `isFavorite` — no need to scan an array.
// AsyncStorage serializes sets as JSON via a custom replacer in zustandAsyncStorage.
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: new Set<number>(),

      toggleFavorite: (postId: number) => {
        set((state) => {
          const next = new Set(state.favoriteIds);
          if (next.has(postId)) {
            next.delete(postId);
          } else {
            next.add(postId);
          }
          return { favoriteIds: next };
        });
      },

      isFavorite: (postId: number) => get().favoriteIds.has(postId),
    }),
    {
      name: 'posts-favorites-storage', // Key in AsyncStorage
      storage: zustandAsyncStorage,

      // Zustand can't serialize Set natively — we convert to/from Array.
      partialize: (state) => ({
        favoriteIds: Array.from(state.favoriteIds),
      }),

      merge: (persisted: any, current) => ({
        ...current,
        favoriteIds: new Set<number>(persisted?.favoriteIds ?? []),
      }),
    },
  ),
);
