/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: EmptyState — shown when the posts list is empty (no results / no favorites).
 *
 * Distinguishes between "no search results" and "no favorites" with contextual
 * messaging so users understand what happened and how to recover.
 */

import { Text, View } from 'react-native';

type EmptyVariant = 'noResults' | 'noFavorites' | 'noPosts';

interface EmptyStateProps {
  variant?: EmptyVariant;
  searchQuery?: string;
}

const CONFIG: Record<EmptyVariant, { emoji: string; title: string; subtitle: string }> = {
  noResults: {
    emoji: '🔍',
    title: 'No results found',
    subtitle: "We couldn't find any posts matching your search.",
  },
  noFavorites: {
    emoji: '⭐',
    title: 'No favorites yet',
    subtitle: 'Tap the star on any post to save it here.',
  },
  noPosts: {
    emoji: '📭',
    title: 'No posts available',
    subtitle: 'Check your connection and pull down to refresh.',
  },
};

export const EmptyState = ({ variant = 'noPosts', searchQuery }: EmptyStateProps) => {
  const config = CONFIG[variant];

  return (
    <View className="flex-1 items-center justify-center px-8 py-16">
      <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-bg-tertiary">
        <Text className="text-4xl">{config.emoji}</Text>
      </View>

      <Text className="mb-2 text-center font-semibold text-xl text-text-primary">
        {config.title}
      </Text>
      <Text className="text-center font-sans text-base text-text-secondary">
        {variant === 'noResults' && searchQuery
          ? `No posts match "${searchQuery}".`
          : config.subtitle}
      </Text>
    </View>
  );
};
