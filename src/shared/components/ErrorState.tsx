/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: ErrorState — reusable error UI with retry callback.
 *
 * Shows when a query fails. Provides a retry button so users can recover
 * without force-quitting the app. The error message can be customized per-screen.
 */

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Oops!',
  message = 'Something went wrong. Please try again.',
  onRetry,
}) => {
  return (
    <View
      className="flex-1 items-center justify-center px-8"
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      {/* Error icon */}
      <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-bg-tertiary">
        <Text className="text-3xl">⚠️</Text>
      </View>

      <Text className="mb-2 text-center font-semibold text-lg text-text-primary">{title}</Text>
      <Text className="mb-8 text-center font-sans text-base text-text-secondary">{message}</Text>

      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          className="rounded-lg bg-primary px-8 py-3 active:opacity-75"
          accessibilityRole="button"
          accessibilityLabel="Retry loading"
        >
          <Text className="font-semibold text-base text-white">Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
