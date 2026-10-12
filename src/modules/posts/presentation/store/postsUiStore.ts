/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: Posts UI store — ephemeral client state for the list screen.
 *
 * Manages search query and filter tab selection.
 * NOT persisted — these reset on app restart, which is the correct UX behavior
 * (users expect a fresh list when they reopen the app).
 *
 * Separated from favoritesStore because the state concerns are different:
 *   - favoritesStore: persistent user preferences
 *   - postsUiStore: transient session UI state
 */

import { create } from 'zustand';

export type FilterTab = 'all' | 'favorites';

interface PostsUiState {
  searchQuery: string;
  activeFilter: FilterTab;

  setSearchQuery: (query: string) => void;
  setFilter: (filter: FilterTab) => void;
  clearSearch: () => void;
}

export const usePostsUiStore = create<PostsUiState>()((set) => ({
  searchQuery: '',
  activeFilter: 'all',

  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilter: (filter) => set({ activeFilter: filter }),
  clearSearch: () => set({ searchQuery: '' }),
}));
