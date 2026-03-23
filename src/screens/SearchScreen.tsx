import React, { useState, useMemo } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Animated } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS, CATEGORIES } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { SearchBar, WorkerCard, EmptyState, WorkerCardSkeleton } from '../components';
import { RootStackParamList, Worker } from '../types';

type SearchScreenRouteProp = RouteProp<RootStackParamList, 'Search'>;
type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SearchScreen: React.FC = () => {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const route = useRoute<SearchScreenRouteProp>();
  const { workers } = useApp();
  const [searchQuery, setSearchQuery] = useState(route.params?.query || '');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(route.params?.categoryId || null);
  const [sortBy, setSortBy] = useState<'rating' | 'distance' | 'reviews'>('rating');
  const [isLoading, setIsLoading] = useState(false);

  const filteredWorkers = useMemo(() => {
    let result = [...workers];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        w =>
          w.name.toLowerCase().includes(query) ||
          w.category.name.toLowerCase().includes(query) ||
          w.location.toLowerCase().includes(query) ||
          w.description.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      result = result.filter(w => w.category.id === selectedCategory);
    }

    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.avg_rating - a.avg_rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviews_count - a.reviews_count);
        break;
      case 'distance':
        result.sort((a, b) => (a.distance || 0) - (b.distance || 0));
        break;
    }

    return result;
  }, [workers, searchQuery, selectedCategory, sortBy]);

  const handleWorkerPress = (worker: Worker) => {
    navigation.navigate('WorkerProfile', { workerId: worker.id });
  };

  const handleCategoryFilter = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  const sortOptions = [
    { key: 'rating' as const, label: 'Top Rated' },
    { key: 'reviews' as const, label: 'Most Reviewed' },
    { key: 'distance' as const, label: 'Nearest' },
  ];

  const renderFilters = () => (
    <View style={styles.filtersContainer}>
      <FlatList
        data={[{ id: null, name: 'All', icon: '🔍' }, ...CATEGORIES]}
        keyExtractor={(item) => item.id || 'all'}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterChip,
              selectedCategory === item.id && styles.filterChipActive,
            ]}
            onPress={() => handleCategoryFilter(item.id)}
          >
            <Text style={styles.filterIcon}>{item.icon}</Text>
            <Text
              style={[
                styles.filterText,
                selectedCategory === item.id && styles.filterTextActive,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.sortContainer}>
        {sortOptions.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.sortButton,
              sortBy === option.key && styles.sortButtonActive,
            ]}
            onPress={() => setSortBy(option.key)}
          >
            <Text
              style={[
                styles.sortText,
                sortBy === option.key && styles.sortTextActive,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.searchBarWrapper}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search workers, services..."
        />
      </View>
      {renderFilters()}
      <Text style={styles.resultsCount}>
        {filteredWorkers.length} professional{filteredWorkers.length !== 1 ? 's' : ''} found
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        {[1, 2, 3, 4, 5].map(i => (
          <WorkerCardSkeleton key={i} />
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredWorkers}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <EmptyState
            icon="🔍"
            title="No Workers Found"
            message="Try adjusting your search or filters to find more professionals."
            actionLabel="Clear Filters"
            onAction={() => {
              setSearchQuery('');
              setSelectedCategory(null);
            }}
          />
        }
        renderItem={({ item }) => (
          <WorkerCard worker={item} onPress={() => handleWorkerPress(item)} />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingBottom: SPACING.md,
  },
  searchBarWrapper: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  filtersContainer: {
    paddingTop: SPACING.md,
  },
  filtersList: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    marginRight: SPACING.sm,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary + '15',
    borderColor: COLORS.primary,
  },
  filterIcon: {
    fontSize: 14,
    marginRight: SPACING.xs,
  },
  filterText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  filterTextActive: {
    color: COLORS.primary,
  },
  sortContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  sortButton: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    marginRight: SPACING.md,
  },
  sortButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  sortText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textTertiary,
    fontWeight: '500',
  },
  sortTextActive: {
    color: COLORS.primary,
  },
  resultsCount: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
  },
  list: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
});
