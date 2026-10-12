/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: PostCard — the primary list item for the Posts list screen.
 *
 * PERFORMANCE:
 *   - React.memo prevents re-renders unless post data or isFavorite changes.
 *   - onToggleFavorite and onPress should be wrapped in useCallback at the
 *     call site to ensure referential stability.
 *   - Body text truncated to ~120 chars to keep cards compact.
 *
 * DESIGN:
 *   - Glass-morphism card with subtle border, gradient-like layering.
 *   - Primary color accent on comment count badge.
 *   - Press animation via active:opacity-75.
 *   - User ID shown as an avatar-like chip.
 */

import { memo, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import type { PostWithCommentCount } from '@/modules/posts/domain/entities';
import { truncate } from '@/shared/utils/strings';

import { FavoriteButton } from './FavoriteButton';

interface PostCardProps {
  post: PostWithCommentCount;
  isFavorite: boolean;
  onPress: (post: PostWithCommentCount) => void;
  onToggleFavorite: (postId: number) => void;
}

// Max body characters before truncation — roughly 2-3 lines on most devices
const BODY_MAX_LENGTH = 120;

export const PostCard = memo<PostCardProps>(({ post, isFavorite, onPress, onToggleFavorite }) => {
  const handlePress = useCallback(() => {
    onPress(post);
  }, [onPress, post]);

  const handleToggleFavorite = useCallback(() => {
    onToggleFavorite(post.id);
  }, [onToggleFavorite, post.id]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={`Post: ${post.title}`}
      accessibilityHint="Double tap to read full post"
      className="mb-3 overflow-hidden rounded-lg border border-border bg-bg-secondary active:opacity-80"
    >
      <View className="p-4">
        {/* User chip + favorite button row */}
        <View className="mb-3 flex-row items-center justify-between">
          <View className="rounded-full bg-primary/20 px-2.5 py-1">
            <Text className="font-medium text-xs text-primary">User #{post.userId}</Text>
          </View>
          <FavoriteButton isFavorite={isFavorite} onToggle={handleToggleFavorite} size="sm" />
        </View>

        {/* Post title */}
        <Text className="mb-2 font-bold text-base text-text-primary" numberOfLines={2}>
          {post.title}
        </Text>

        {/* Post body (truncated) */}
        <Text className="mb-4 font-sans text-sm leading-5 text-text-secondary">
          {truncate(post.body, BODY_MAX_LENGTH)}
        </Text>

        {/* Footer: comment count */}
        <View className="flex-row items-center">
          <View className="flex-row items-center rounded-full bg-bg-overlay px-3 py-1">
            <Text className="mr-1.5 text-sm">💬</Text>
            <Text className="font-medium text-xs text-text-secondary">
              {post.commentCount} {post.commentCount === 1 ? 'comment' : 'comments'}
            </Text>
          </View>
        </View>
      </View>

      {/* Accent border at bottom — a subtle design detail */}
      <View className="h-0.5 bg-primary/30" />
    </TouchableOpacity>
  );
});

PostCard.displayName = 'PostCard';
