/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: PostDetailScreen — full post view with comments list and favorite toggle.
 *
 * Implements:
 *   - Full post details (title, body, author userId, favorite status)
 *   - Comments list with GET /comments?postId={id}
 *   - Loading skeleton, error with retry, and empty states
 *   - FlatList architecture with ListHeaderComponent for smooth 60fps scrolling
 */

import { useRouter } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItemInfo, Text, TouchableOpacity, View } from 'react-native';

import type { Comment } from '@/modules/posts/domain/entities';
import { EmptyState } from '@/shared/components/EmptyState';
import { ErrorState } from '@/shared/components/ErrorState';
import { Screen } from '@/shared/components/Screen';
import { SkeletonCard } from '@/shared/components/SkeletonCard';

import { CommentItem } from '../components/CommentItem';
import { FavoriteButton } from '../components/FavoriteButton';
import { usePostComments } from '../hooks/usePostComments';
import { usePosts } from '../hooks/usePosts';
import { useFavoritesStore } from '../store/favoritesStore';

interface PostDetailScreenProps {
  postId: number;
}

export const PostDetailScreen: React.FC<PostDetailScreenProps> = ({ postId }) => {
  const router = useRouter();

  // Retrieve post from cached list
  const { posts, isLoading: isPostsLoading } = usePosts();
  const post = useMemo(() => posts?.find((p) => p.id === postId), [posts, postId]);

  // Fetch comments specific to this post
  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    error: commentsError,
    refetch: refetchComments,
  } = usePostComments(postId);

  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFav = favoriteIds.has(postId);

  const handleToggleFavorite = useCallback(() => {
    toggleFavorite(postId);
  }, [postId, toggleFavorite]);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  }, [router]);

  const renderComment = useCallback(
    ({ item }: ListRenderItemInfo<Comment>) => <CommentItem comment={item} />,
    [],
  );

  const commentKeyExtractor = useCallback((item: Comment) => item.id.toString(), []);

  // Header content rendered at the top of the scrollable list
  const renderHeader = () => (
    <View className="mb-4">
      {/* Navigation bar */}
      <View className="mb-4 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={handleBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="flex-row items-center rounded-lg bg-bg-secondary px-3 py-2"
        >
          <Text className="mr-1 text-sm text-text-primary font-bold">←</Text>
          <Text className="font-semibold text-sm text-text-primary">Back</Text>
        </TouchableOpacity>

        <FavoriteButton isFavorite={isFav} onToggle={handleToggleFavorite} size="md" />
      </View>

      {/* Post details card */}
      {isPostsLoading && !post ? (
        <SkeletonCard />
      ) : post ? (
        <View className="overflow-hidden rounded-2xl border border-border bg-bg-secondary p-5">
          {/* Author Badge */}
          <View className="mb-3 flex-row items-center">
            <View className="rounded-full bg-primary/20 px-3 py-1">
              <Text className="font-semibold text-xs text-primary">Author ID: #{post.userId}</Text>
            </View>
            <View className="ml-2 rounded-full bg-bg-overlay px-3 py-1">
              <Text className="font-medium text-xs text-text-secondary">Post #{post.id}</Text>
            </View>
          </View>

          {/* Post Title */}
          <Text className="mb-3 font-extrabold text-xl leading-7 text-text-primary">
            {post.title}
          </Text>

          {/* Post Body */}
          <Text className="font-sans text-base leading-6 text-text-secondary">{post.body}</Text>
        </View>
      ) : (
        <View className="rounded-xl border border-border bg-bg-secondary p-4">
          <Text className="text-text-muted">Post information unavailable.</Text>
        </View>
      )}

      {/* Comments Section Title */}
      <View className="mt-6 mb-3 flex-row items-center justify-between">
        <Text className="font-bold text-lg text-text-primary">Comments</Text>
        <View className="rounded-full bg-bg-overlay px-2.5 py-1">
          <Text className="font-semibold text-xs text-text-muted">{comments?.length ?? 0}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <Screen>
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={commentKeyExtractor}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          isCommentsLoading ? (
            <View>
              <SkeletonCard />
              <SkeletonCard />
            </View>
          ) : isCommentsError ? (
            <ErrorState
              title="Failed to load comments"
              message={commentsError?.message || 'Unable to retrieve comments for this post.'}
              onRetry={refetchComments}
            />
          ) : (
            <EmptyState variant="noResults" searchQuery="" />
          )
        }
      />
    </Screen>
  );
};
