import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, SPACING, BORDER_RADIUS, CATEGORIES } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { SearchBar, CategoryGrid, WorkerCard, SectionHeader, LocationPicker, WorkerCardSkeleton } from '../components';
import { Worker, Category, SearchSuggestion } from '../types';
import { RootStackParamList } from '../navigation';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SEARCH_SUGGESTIONS: SearchSuggestion[] = [
  { id: '1', text: 'Plumber near me', type: 'service' },
  { id: '2', text: 'Electrician', type: 'service' },
  { id: '3', text: 'Emergency repair', type: 'service' },
  { id: '4', text: 'Brooklyn, NY', type: 'location' },
  { id: '5', text: 'Manhattan, NY', type: 'location' },
];

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { workers, location, setLocation } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading] = useState(false);

  const filteredWorkers = useMemo(() => {
    return [...workers].sort((a, b) => b.avg_rating - a.avg_rating).slice(0, 5);
  }, [workers]);

  const recentWorkers = useMemo(() => {
    return [...workers].slice(0, 6);
  }, [workers]);

  const handleCategoryPress = (category: Category) => {
    navigation.navigate('Search', { categoryId: category.id });
  };

  const handleWorkerPress = (worker: Worker) => {
    navigation.navigate('WorkerProfile', { workerId: worker.id });
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigation.navigate('Search', { query: searchQuery });
    }
  };

  const handleSeeAllPress = () => {
    navigation.navigate('Search');
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const renderHeader = () => (
    <>
      <View style={styles.searchSection}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmit={handleSearchSubmit}
          placeholder="Search services"
          suggestions={SEARCH_SUGGESTIONS}
        />
        <LocationPicker value={location} onChange={setLocation} />
      </View>

      <SectionHeader title="Categories" subtitle="Find the right professional" />
      <CategoryGrid categories={CATEGORIES} onCategoryPress={handleCategoryPress} />

      <SectionHeader
        title="Top Rated Near You"
        subtitle="Highest rated professionals in your area"
        actionLabel="See All"
        onActionPress={handleSeeAllPress}
      />
      <FlatList
        data={filteredWorkers}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
        renderItem={({ item }) => (
          <WorkerCard worker={item} onPress={() => handleWorkerPress(item)} compact />
        )}
      />

      <SectionHeader
        title="Recently Added"
        subtitle="New professionals in your area"
      />
    </>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.searchSection}>
          <View style={styles.skeletonSearch} />
        </View>
        <View style={styles.skeletonCategories}>
          {[1, 2, 3, 4].map(i => (
            <View key={i} style={styles.skeletonCategory} />
          ))}
        </View>
        {[1, 2, 3].map(i => (
          <WorkerCardSkeleton key={i} />
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={COLORS.primary}
          />
        }
      >
        {renderHeader()}
        <View style={styles.workerList}>
          {recentWorkers.map((worker) => (
            <WorkerCard
              key={worker.id}
              worker={worker}
              onPress={() => handleWorkerPress(worker)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchSection: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
  },
  skeletonSearch: {
    height: 48,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.lg,
  },
  skeletonCategories: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  skeletonCategory: {
    width: 90,
    height: 90,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.xl,
    marginRight: SPACING.sm,
  },
  horizontalList: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  workerList: {
    paddingBottom: SPACING.xxl,
  },
});
