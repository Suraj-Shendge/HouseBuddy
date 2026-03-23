import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS, RADIUS, SPACING, ILLUSTRATIONS, SERVICE_CATEGORIES } from '../constants/theme';
import { WorkerCard } from '../components/WorkerCard';
import { Worker } from '../types';

const MOCK_WORKERS: Worker[] = [
  {
    id: '1',
    name: 'Michael Chen',
    category: 'Plumber',
    rating: 4.9,
    reviewCount: 247,
    hourlyRate: 75,
    location: 'San Francisco, CA',
    trustScore: 98,
    jobsCompleted: 523,
    isVerified: true,
    availability: 'available',
    badges: ['Top Rated', 'Fast Response', '5 Years Exp'],
    workImages: [],
    availabilityStatus: 'available',
    bio: 'Licensed plumber with 15+ years experience',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    category: 'Electrician',
    rating: 4.8,
    reviewCount: 189,
    hourlyRate: 85,
    location: 'San Francisco, CA',
    trustScore: 96,
    jobsCompleted: 412,
    isVerified: true,
    availability: 'available',
    badges: ['Licensed', 'Emergency Service'],
    workImages: [],
    availabilityStatus: 'available',
    bio: 'Master electrician specializing in smart home',
  },
  {
    id: '3',
    name: 'James Wilson',
    category: 'Cleaner',
    rating: 4.7,
    reviewCount: 156,
    hourlyRate: 45,
    location: 'Oakland, CA',
    trustScore: 94,
    jobsCompleted: 389,
    isVerified: true,
    availability: 'busy',
    badges: ['Eco-Friendly', 'Pet Safe'],
    workImages: [],
    availabilityStatus: 'busy',
    bio: 'Professional deep cleaning specialist',
  },
  {
    id: '4',
    name: 'David Park',
    category: 'Painter',
    rating: 4.9,
    reviewCount: 312,
    hourlyRate: 65,
    location: 'Berkeley, CA',
    trustScore: 97,
    jobsCompleted: 678,
    isVerified: true,
    availability: 'available',
    badges: ['Premium Paint', 'Free Estimates', 'Insured'],
    workImages: [],
    availabilityStatus: 'available',
    bio: 'Interior & exterior painting expert',
  },
  {
    id: '5',
    name: 'Maria Garcia',
    category: 'HVAC',
    rating: 4.6,
    reviewCount: 98,
    hourlyRate: 90,
    location: 'San Jose, CA',
    trustScore: 92,
    jobsCompleted: 234,
    isVerified: true,
    availability: 'available',
    badges: ['Certified', 'Energy Efficient'],
    workImages: [],
    availabilityStatus: 'available',
    bio: 'HVAC specialist with 10+ years',
  },
];

interface SearchScreenProps {
  navigation: any;
  route: any;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ navigation, route }) => {
  const [query, setQuery] = useState(route.params?.query || '');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(route.params?.category || null);
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'trust'>('rating');

  const filteredWorkers = useMemo(() => {
    let result = [...MOCK_WORKERS];

    // Filter by query
    if (query) {
      result = result.filter(
        (worker) =>
          worker.name.toLowerCase().includes(query.toLowerCase()) ||
          worker.category.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter((worker) =>
        worker.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'price':
        result.sort((a, b) => a.hourlyRate - b.hourlyRate);
        break;
      case 'trust':
        result.sort((a, b) => b.trustScore - a.trustScore);
        break;
    }

    return result;
  }, [query, selectedCategory, sortBy]);

  const getCategoryImage = (category: string): string => {
    const key = category.toLowerCase() as keyof typeof ILLUSTRATIONS.categories;
    return ILLUSTRATIONS.categories[key] || ILLUSTRATIONS.categories.plumber;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#1A1A2E', '#16213E']} style={styles.header}>
        <Text style={styles.title}>Search</Text>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Services, professionals..."
            placeholderTextColor={COLORS.textTertiary}
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      {/* Categories Filter */}
      <View style={styles.categoriesSection}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[{ id: 'all', name: 'All', icon: '✨' }, ...SERVICE_CATEGORIES]}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.categoriesList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryChip,
                selectedCategory === (item.id === 'all' ? null : item.name.toLowerCase()) &&
                  styles.categoryChipActive,
              ]}
              onPress={() =>
                setSelectedCategory(item.id === 'all' ? null : item.name.toLowerCase())
              }
            >
              <Text style={styles.categoryChipIcon}>{item.icon}</Text>
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === (item.id === 'all' ? null : item.name.toLowerCase()) &&
                    styles.categoryChipTextActive,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.resultCount}>{filteredWorkers.length} professionals found</Text>
        <View style={styles.sortButtons}>
          {(['rating', 'price', 'trust'] as const).map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.sortButton, sortBy === option && styles.sortButtonActive]}
              onPress={() => setSortBy(option)}
            >
              <Text style={[styles.sortButtonText, sortBy === option && styles.sortButtonTextActive]}>
                {option === 'rating' ? '⭐ Rating' : option === 'price' ? '💰 Price' : '🛡️ Trust'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Results */}
      {filteredWorkers.length > 0 ? (
        <FlatList
          data={filteredWorkers}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <WorkerCard
              worker={item}
              onPress={() => navigation.navigate('WorkerProfile', { worker: item })}
            />
          )}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyTitle}>No results found</Text>
          <Text style={styles.emptySubtitle}>
            Try adjusting your search or filters
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    borderBottomLeftRadius: RADIUS.xxl,
    borderBottomRightRadius: RADIUS.xxl,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textInverse,
    marginBottom: SPACING.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textInverse,
    padding: 0,
  },
  clearIcon: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    padding: 4,
  },
  categoriesSection: {
    marginTop: SPACING.md,
  },
  categoriesList: {
    paddingHorizontal: SPACING.md,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    marginRight: SPACING.sm,
    ...SHADOWS.sm,
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary,
  },
  categoryChipIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryChipText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: COLORS.textInverse,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  resultCount: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  sortButtons: {
    flexDirection: 'row',
  },
  sortButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    marginLeft: 8,
    backgroundColor: COLORS.iosBg,
  },
  sortButtonActive: {
    backgroundColor: COLORS.primary,
  },
  sortButtonText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  sortButtonTextActive: {
    color: COLORS.textInverse,
  },
  listContent: {
    paddingBottom: 100,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
