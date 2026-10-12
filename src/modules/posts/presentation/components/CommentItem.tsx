/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: CommentItem — clean, responsive presentation of a single comment.
 *
 * Renders avatar initial, commenter name, email badge, and formatted body text.
 * Memoized to optimize FlatList rendering in post detail screen.
 */

import { memo } from 'react';
import { Text, View } from 'react-native';

import type { Comment } from '@/modules/posts/domain/entities';

interface CommentItemProps {
  comment: Comment;
}

export const CommentItem = memo<CommentItemProps>(({ comment }) => {
  // Generate first character of author name or fallback
  const initial = comment.name.trim().charAt(0).toUpperCase() || '?';

  return (
    <View
      className="mb-3 rounded-xl border border-border bg-bg-secondary p-4"
      accessibilityRole="text"
      accessibilityLabel={`Comment by ${comment.name}`}
    >
      {/* Header: Avatar, Name, Email */}
      <View className="mb-2.5 flex-row items-center">
        <View className="mr-3 h-9 w-9 items-center justify-center rounded-full bg-accent/20">
          <Text className="font-bold text-sm text-accent">{initial}</Text>
        </View>

        <View className="flex-1">
          <Text className="font-semibold text-sm text-text-primary" numberOfLines={1}>
            {comment.name}
          </Text>
          <Text className="font-sans text-xs text-text-muted" numberOfLines={1}>
            {comment.email.toLowerCase()}
          </Text>
        </View>
      </View>

      {/* Comment Body */}
      <Text className="font-sans text-sm leading-5 text-text-secondary">{comment.body}</Text>
    </View>
  );
});

CommentItem.displayName = 'CommentItem';
