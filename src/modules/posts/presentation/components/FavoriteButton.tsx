/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: FavoriteButton — toggle heart/star button for a post.
 *
 * React.memo: this button appears on every PostCard in the list.
 * Without memo, toggling a favorite would re-render ALL cards because the
 * parent list re-renders. With memo + stable `onToggle` callback (useCallback
 * in the parent), only the affected card re-renders.
 *
 * Accessibility: has accessibilityRole="button" and a descriptive label
 * that reflects the current state (saved vs not saved).
 */

import React, { useCallback, useRef } from 'react';
import { Animated, TouchableOpacity } from 'react-native';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md';
}

export const FavoriteButton = React.memo<FavoriteButtonProps>(
  ({ isFavorite, onToggle, size = 'md' }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    // Micro-animation: quick bounce on press for tactile feedback
    const handlePress = useCallback(() => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.85,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          bounciness: 12,
        }),
      ]).start();

      onToggle();
    }, [onToggle, scaleAnim]);

    const iconSize = size === 'sm' ? 'text-lg' : 'text-2xl';
    const hitSlop = { top: 8, bottom: 8, left: 8, right: 8 };

    return (
      <TouchableOpacity
        onPress={handlePress}
        hitSlop={hitSlop}
        accessibilityRole="button"
        accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        accessibilityState={{ selected: isFavorite }}
      >
        <Animated.Text style={{ transform: [{ scale: scaleAnim }] }} className={iconSize}>
          {isFavorite ? '⭐' : '☆'}
        </Animated.Text>
      </TouchableOpacity>
    );
  },
);

FavoriteButton.displayName = 'FavoriteButton';
