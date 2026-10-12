/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: PostsListScreen — feature screen coordinating posts list, search, and favorites.
 *
 * Coordinates:
 *   - useFilteredPosts (server state + client search/filter derivation)
 *   - usePostsUiStore (search bar and tab filter state)
 *   - useFavoritesStore (persisted favorites)
 *   - Expo Router navigation to PostDetailScreen
 */

import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import type { PostWithCommentCount } from '@/modules/posts/domain/entities';
import { ErrorState } from '@/shared/components/ErrorState';
import { Screen } from '@/shared/components/Screen';
import { SkeletonCard } from '@/shared/components/SkeletonCard';

import { FilterTabs } from '../components/FilterTabs';
import { PostList } from '../components/PostList';
import { SearchBar } from '../components/SearchBar';
import { useFilteredPosts } from '../hooks/useFilteredPosts';
import { useFavoritesStore } from '../store/favoritesStore';
import { usePostsUiStore } from '../store/postsUiStore';

export const PostsListScreen: React.FC = () => {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { posts, totalCount, isLoading, isError, error, refetch } = useFilteredPosts();

  const searchQuery = usePostsUiStore((state) => state.searchQuery);
  const activeFilter = usePostsUiStore((state) => state.activeFilter);
  const setSearchQuery = usePostsUiStore((state) => state.setSearchQuery);
  const setFilter = usePostsUiStore((state) => state.setFilter);

  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useCallback((id: number) => favoriteIds.has(id), [favoriteIds]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }, [refetch]);

  const handlePressPost = useCallback(
    (post: PostWithCommentCount) => {
      router.push(`/posts/${post.id}`);
    },
    [router],
  );

  return (
    <Screen>
      {/* Header bar with title */}
      <View className="px-4 pt-3 pb-1">
        <Text className="font-extrabold text-2xl text-text-primary">Posts & Feed</Text>
        <Text className="font-sans text-xs text-text-muted">
          Browse, filter, and discover posts from JSONPlaceholder
        </Text>
      </View>

      {/* Search Input */}
      <SearchBar value={searchQuery} onSearch={setSearchQuery} />

      {/* Filter Tabs */}
      <FilterTabs
        activeFilter={activeFilter}
        onSelectFilter={setFilter}
        totalCount={totalCount}
        favoritesCount={favoriteIds.size}
      />

      {/* Main Content Area */}
      {isLoading ? (
        <ScrollView className="flex-1 px-4 pt-2" showsVerticalScrollIndicator={false}>
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </ScrollView>
      ) : isError ? (
        <ErrorState
          title="Could not load posts"
          message={error?.message || 'Something went wrong fetching posts from JSONPlaceholder.'}
          onRetry={refetch}
        />
      ) : (
        <PostList
          posts={posts}
          isFavorite={isFavorite}
          onPressPost={handlePressPost}
          onToggleFavorite={toggleFavorite}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          activeFilter={activeFilter}
          searchQuery={searchQuery}
        />
      )}
    </Screen>
  );
};
