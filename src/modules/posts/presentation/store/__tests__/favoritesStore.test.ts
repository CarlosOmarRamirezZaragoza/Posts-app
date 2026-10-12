/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: Unit tests for favorites store (Zustand state management).
 */

const mockStorage: Record<string, string> = {};

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn((key: string, value: string) => {
    mockStorage[key] = value;
    return Promise.resolve();
  }),
  getItem: jest.fn((key: string) => {
    return Promise.resolve(mockStorage[key] ?? null);
  }),
  removeItem: jest.fn((key: string) => {
    delete mockStorage[key];
    return Promise.resolve();
  }),
  clear: jest.fn(() => {
    Object.keys(mockStorage).forEach((k) => delete mockStorage[k]);
    return Promise.resolve();
  }),
}));

import { useFavoritesStore } from '../favoritesStore';

describe('useFavoritesStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useFavoritesStore.setState({
      favoriteIds: new Set<number>(),
    });
  });

  it('starts with an empty set of favorites', () => {
    const state = useFavoritesStore.getState();
    expect(state.favoriteIds.size).toBe(0);
    expect(state.isFavorite(1)).toBe(false);
  });

  it('adds a post id to favorites on first toggle', () => {
    const { toggleFavorite } = useFavoritesStore.getState();

    toggleFavorite(42);

    const state = useFavoritesStore.getState();
    expect(state.favoriteIds.has(42)).toBe(true);
    expect(state.isFavorite(42)).toBe(true);
  });

  it('removes a post id from favorites on second toggle', () => {
    const { toggleFavorite } = useFavoritesStore.getState();

    toggleFavorite(42);
    expect(useFavoritesStore.getState().isFavorite(42)).toBe(true);

    toggleFavorite(42);
    expect(useFavoritesStore.getState().isFavorite(42)).toBe(false);
    expect(useFavoritesStore.getState().favoriteIds.has(42)).toBe(false);
  });

  it('correctly tracks multiple distinct favorites', () => {
    const { toggleFavorite } = useFavoritesStore.getState();

    toggleFavorite(1);
    toggleFavorite(2);
    toggleFavorite(3);

    const state = useFavoritesStore.getState();
    expect(state.favoriteIds.size).toBe(3);
    expect(state.isFavorite(1)).toBe(true);
    expect(state.isFavorite(2)).toBe(true);
    expect(state.isFavorite(3)).toBe(true);
    expect(state.isFavorite(4)).toBe(false);
  });
});
