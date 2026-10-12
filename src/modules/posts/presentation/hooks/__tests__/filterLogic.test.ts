/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: Unit tests for post search and favorites filtering logic.
 */

import type { PostWithCommentCount } from '@/modules/posts/domain/entities';

// Pure filter function mirroring the selector logic in useFilteredPosts
function filterPosts(
  posts: PostWithCommentCount[],
  activeFilter: 'all' | 'favorites',
  favoriteIds: Set<number>,
  searchQuery: string,
): PostWithCommentCount[] {
  let result = posts;

  if (activeFilter === 'favorites') {
    result = result.filter((post) => favoriteIds.has(post.id));
  }

  if (searchQuery.trim().length > 0) {
    const q = searchQuery.toLowerCase().trim();
    result = result.filter(
      (post) => post.title.toLowerCase().includes(q) || post.body.toLowerCase().includes(q),
    );
  }

  return result;
}

const mockPosts: PostWithCommentCount[] = [
  {
    id: 1,
    userId: 1,
    title: 'React Native Architecture',
    body: 'Clean Architecture with features and modules.',
    commentCount: 5,
  },
  {
    id: 2,
    userId: 1,
    title: 'TypeScript Best Practices',
    body: 'Leverage strict mode and proper type definitions.',
    commentCount: 3,
  },
  {
    id: 3,
    userId: 2,
    title: 'Expo Managed Workflow',
    body: 'Fast iterations with Continuous Native Generation.',
    commentCount: 0,
  },
];

describe('Post Filtering Logic', () => {
  it('returns all posts when filter is "all" and search is empty', () => {
    const result = filterPosts(mockPosts, 'all', new Set(), '');
    expect(result).toHaveLength(3);
  });

  it('filters posts by favorite ids when activeFilter is "favorites"', () => {
    const favorites = new Set([2, 3]);
    const result = filterPosts(mockPosts, 'favorites', favorites, '');

    expect(result).toHaveLength(2);
    expect(result.map((p) => p.id)).toEqual([2, 3]);
  });

  it('searches posts by title case-insensitively', () => {
    const result = filterPosts(mockPosts, 'all', new Set(), 'typescript');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it('searches posts by body case-insensitively', () => {
    const result = filterPosts(mockPosts, 'all', new Set(), 'clean architecture');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it('combines favorites filter and search query correctly', () => {
    const favorites = new Set([1, 2]);
    // Post 1 matches 'Clean' in body and is in favorites; Post 3 matches 'Fast' but not in favorites
    const result = filterPosts(mockPosts, 'favorites', favorites, 'architecture');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it('returns empty array when search query matches nothing', () => {
    const result = filterPosts(mockPosts, 'all', new Set(), 'nonexistent query 12345');
    expect(result).toHaveLength(0);
  });
});
