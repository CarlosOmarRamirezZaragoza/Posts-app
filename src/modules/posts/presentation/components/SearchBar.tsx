/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: SearchBar — responsive, debounced search input with clear action.
 *
 * Debounces text changes at ~300ms using useDebounce hook to prevent excessive
 * filter recalculations while keeping typing smooth and lag-free.
 */

import { memo, useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useDebounce } from '@/shared/hooks/useDebounce';

interface SearchBarProps {
  value: string;
  onSearch: (text: string) => void;
  placeholder?: string;
}

export const SearchBar = memo<SearchBarProps>(
  ({ value, onSearch, placeholder = 'Search posts by title or body...' }) => {
    const [localQuery, setLocalQuery] = useState(value);
    const debouncedQuery = useDebounce(localQuery, 300);

    // Synchronize parent store when debounced value updates
    useEffect(() => {
      onSearch(debouncedQuery);
    }, [debouncedQuery, onSearch]);

    // Synchronize local input if value is reset externally
    useEffect(() => {
      setLocalQuery(value);
    }, [value]);

    const handleClear = () => {
      setLocalQuery('');
      onSearch('');
    };

    return (
      <View className="mx-4 my-2">
        <View className="flex-row items-center rounded-xl border border-border bg-bg-secondary px-3.5 py-2.5">
          <Text className="mr-2 text-base text-text-muted">🔍</Text>
          <TextInput
            value={localQuery}
            onChangeText={setLocalQuery}
            placeholder={placeholder}
            placeholderTextColor="#8a8a9e"
            className="flex-1 font-sans text-sm text-text-primary"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            accessibilityLabel="Search posts input"
            accessibilityHint="Filters the posts list by title and body content"
          />
          {localQuery.length > 0 && (
            <TouchableOpacity
              onPress={handleClear}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel="Clear search text"
              className="ml-2 rounded-full bg-bg-overlay p-1"
            >
              <Text className="text-xs text-text-secondary font-bold">✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  },
);

SearchBar.displayName = 'SearchBar';
