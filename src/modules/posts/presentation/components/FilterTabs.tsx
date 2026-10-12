/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: FilterTabs — segmented toggle control for All vs Favorites posts.
 *
 * Provides instant filtering with counter badges and tactile press feedback.
 * Memoized to prevent re-renders when parent list items change.
 */

import { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import type { FilterTab } from '../store/postsUiStore';

interface FilterTabsProps {
  activeFilter: FilterTab;
  onSelectFilter: (filter: FilterTab) => void;
  totalCount: number;
  favoritesCount: number;
}

export const FilterTabs = memo<FilterTabsProps>(
  ({ activeFilter, onSelectFilter, totalCount, favoritesCount }) => {
    return (
      <View
        className="mx-4 my-2 flex-row rounded-xl border border-border bg-bg-secondary p-1"
        accessibilityRole="tablist"
      >
        {/* All Posts Tab */}
        <TouchableOpacity
          onPress={() => onSelectFilter('all')}
          activeOpacity={0.8}
          accessibilityRole="tab"
          accessibilityLabel={`All posts, ${totalCount} items`}
          accessibilityState={{ selected: activeFilter === 'all' }}
          className={`flex-1 flex-row items-center justify-center rounded-lg py-2.5 ${
            activeFilter === 'all' ? 'bg-primary' : 'bg-transparent'
          }`}
        >
          <Text
            className={`font-semibold text-sm ${
              activeFilter === 'all' ? 'text-white' : 'text-text-secondary'
            }`}
          >
            All Posts
          </Text>
          <View
            className={`ml-2 rounded-full px-2 py-0.5 ${
              activeFilter === 'all' ? 'bg-white/20' : 'bg-bg-overlay'
            }`}
          >
            <Text
              className={`font-bold text-xs ${
                activeFilter === 'all' ? 'text-white' : 'text-text-muted'
              }`}
            >
              {totalCount}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Favorites Tab */}
        <TouchableOpacity
          onPress={() => onSelectFilter('favorites')}
          activeOpacity={0.8}
          accessibilityRole="tab"
          accessibilityLabel={`Favorites, ${favoritesCount} items`}
          accessibilityState={{ selected: activeFilter === 'favorites' }}
          className={`flex-1 flex-row items-center justify-center rounded-lg py-2.5 ${
            activeFilter === 'favorites' ? 'bg-primary' : 'bg-transparent'
          }`}
        >
          <Text className="mr-1 text-sm">⭐</Text>
          <Text
            className={`font-semibold text-sm ${
              activeFilter === 'favorites' ? 'text-white' : 'text-text-secondary'
            }`}
          >
            Favorites
          </Text>
          <View
            className={`ml-2 rounded-full px-2 py-0.5 ${
              activeFilter === 'favorites' ? 'bg-white/20' : 'bg-bg-overlay'
            }`}
          >
            <Text
              className={`font-bold text-xs ${
                activeFilter === 'favorites' ? 'text-white' : 'text-text-muted'
              }`}
            >
              {favoritesCount}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  },
);

FilterTabs.displayName = 'FilterTabs';
