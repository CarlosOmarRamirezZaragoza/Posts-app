/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: PostList — high-performance virtualized FlatList of posts.
 *
 * Implements React Native performance best practices:
 *   - React.memo on items and renderItem wrapper
 *   - keyExtractor using stable string ids
 *   - Tuned windowSize, initialNumToRender, maxToRenderPerBatch
 *   - removeClippedSubviews on Android
 *   - RefreshControl with dark theme spinner colors
 */

import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, Platform, RefreshControl, StyleSheet } from 'react-native';

import type { PostWithCommentCount } from '@/modules/posts/domain/entities';
import { EmptyState } from '@/shared/components/EmptyState';

import { PostCard } from './PostCard';
import type { FilterTab } from '../store/postsUiStore';

interface PostListProps {
  posts: PostWithCommentCount[];
  isFavorite: (id: number) => boolean;
  onPressPost: (post: PostWithCommentCount) => void;
  onToggleFavorite: (id: number) => void;
  refreshing: boolean;
  onRefresh: () => void;
  activeFilter: FilterTab;
  searchQuery: string;
}

export const PostList = React.memo<PostListProps>(
  ({
    posts,
    isFavorite,
    onPressPost,
    onToggleFavorite,
    refreshing,
    onRefresh,
    activeFilter,
    searchQuery,
  }) => {
    const renderItem = useCallback(
      ({ item }: ListRenderItemInfo<PostWithCommentCount>) => (
        <PostCard
          post={item}
          isFavorite={isFavorite(item.id)}
          onPress={onPressPost}
          onToggleFavorite={onToggleFavorite}
        />
      ),
      [isFavorite, onPressPost, onToggleFavorite],
    );

    const keyExtractor = useCallback((item: PostWithCommentCount) => item.id.toString(), []);

    const emptyVariant =
      searchQuery.trim().length > 0
        ? 'noResults'
        : activeFilter === 'favorites'
          ? 'noFavorites'
          : 'noPosts';

    return (
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={7}
        removeClippedSubviews={Platform.OS === 'android'}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#6366f1"
            colors={['#6366f1']}
            progressBackgroundColor="#1a1a2e"
          />
        }
        ListEmptyComponent={<EmptyState variant={emptyVariant} searchQuery={searchQuery} />}
      />
    );
  },
);

PostList.displayName = 'PostList';

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 32,
    flexGrow: 1,
  },
});
