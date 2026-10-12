/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: Screen — foundational layout component managing SafeArea and dark theme backgrounds.
 *
 * Provides consistent screen boundaries, edge-to-edge support, and status bar
 * styling for all screens in the application.
 */

import type { ReactNode } from 'react';
import { StatusBar, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';

interface ScreenProps {
  children: ReactNode;
  style?: ViewStyle;
  edges?: Edge[];
  statusBarStyle?: 'light-content' | 'dark-content';
}

export const Screen = ({
  children,
  style,
  edges = ['top', 'left', 'right'],
  statusBarStyle = 'light-content',
}: ScreenProps) => {
  return (
    <SafeAreaView edges={edges} style={[styles.container, style]}>
      <StatusBar barStyle={statusBarStyle} backgroundColor="#0f0f1a" />
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  content: {
    flex: 1,
  },
});
