/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: SkeletonCard — animated loading placeholder for PostCard.
 *
 * Uses React Native's Animated API with a looping opacity pulse.
 * WHY not a third-party skeleton library? The animation needed is simple —
 * a pulse on a card-shaped placeholder. Adding a library for this would be
 * over-engineering. Direct Animated API keeps bundle size lean.
 */

import { memo, useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

interface SkeletonCardProps {
  /** Controls the animation delay offset, creating a staggered effect across cards */
  index?: number;
}

export const SkeletonCard = memo<SkeletonCardProps>(({ index = 0 }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Stagger start by 100ms per card for a cascading shimmer effect
    const delay = index * 80;

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 800,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();
    return () => animation.stop();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }} className="mb-3 rounded-lg bg-bg-secondary p-4">
      {/* Title skeleton */}
      <View className="mb-3 h-4 w-3/4 rounded bg-bg-overlay" />
      <View className="mb-1.5 h-3 w-full rounded bg-bg-overlay" />
      <View className="mb-1.5 h-3 w-5/6 rounded bg-bg-overlay" />
      <View className="mb-4 h-3 w-4/6 rounded bg-bg-overlay" />
      {/* Footer skeleton */}
      <View className="flex-row items-center justify-between">
        <View className="h-3 w-16 rounded bg-bg-overlay" />
        <View className="h-6 w-6 rounded-full bg-bg-overlay" />
      </View>
    </Animated.View>
  );
});

SkeletonCard.displayName = 'SkeletonCard';
