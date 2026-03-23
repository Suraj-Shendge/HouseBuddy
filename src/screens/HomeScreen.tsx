import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS, RADIUS, SPACING, ILLUSTRATIONS } from '../constants/theme';
import { WorkerCard } from '../components/WorkerCard';
import { SearchBar } from '../components/SearchBar';
import { Skeleton } from '../components/Skeleton';
import { Worker, SERVICE_CATEGORIES } from '../types';

const { width } = Dimensions.get('window');

// Premium mock data with real images
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
];

const MOCK_REVIEWS = [
  { id: '1', user: 'Alex M.', text: 'Excellent service! Very professional and clean work.', rating: 5 },
  { id: '2', user: 'Jennifer L.', text: 'Arrived on time, fixed everything quickly.', rating: 5 },
  { id: '3', user: 'Robert K.', text: 'Highly recommend for any plumbing needs.', rating: 4 },
];

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const scrollY = new Animated.Value(0);

  const getCategoryImage = (category: string): string => {
    const key = category.toLowerCase() as keyof typeof ILLUSTRATIONS.categories;
    return ILLUSTRATIONS.categories[key] || ILLUSTRATIONS.categories.plumber;
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Premium Hero Section */}
        <LinearGradient
          colors={['#1A1A2E', '#16213E', '#0F3460']}
          style={styles.hero}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroGreeting}>Good morning</Text>
            <Text style={styles.heroTitle}>Find trusted{'\n'}home pros</Text>
            <Text style={styles.heroSubtitle}>
              Verified workers with real reviews
            </Text>
          </View>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' }}
            style={styles.heroImage}
          />
        </LinearGradient>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search services or professionals..."
            onSearch={(query) => navigation.navigate('Search', { query })}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Services</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {SERVICE_CATEGORIES.map((category, index) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => navigation.navigate('Search', { category: category.id })}
                activeOpacity={0.8}
              >
                <Image source={{ uri: getCategoryImage(category.name) }} style={styles.categoryImage} />
                <View style={styles.categoryOverlay}>
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Professionals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Pros</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={MOCK_WORKERS.slice(0, 2)}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
            renderItem={({ item }) => (
              <WorkerCard
                worker={item}
                variant="featured"
                onPress={() => navigation.navigate('WorkerProfile', { worker: item })}
              />
            )}
          />
        </View>

        {/* Top Rated */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Rated</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {MOCK_WORKERS.slice(2, 4).map((worker) => (
            <WorkerCard
              key={worker.id}
              worker={worker}
              onPress={() => navigation.navigate('WorkerProfile', { worker })}
            />
          ))}
        </View>

        {/* Trust Banner */}
        <LinearGradient
          colors={['#667EEA', '#764BA2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.trustBanner}
        >
          <View style={styles.trustContent}>
            <Text style={styles.trustTitle}>Why HouseBuddy?</Text>
            <View style={styles.trustFeatures}>
              <View style={styles.trustItem}>
                <Text style={styles.trustIcon}>🛡️</Text>
                <Text style={styles.trustText}>Verified Workers</Text>
              </View>
              <View style={styles.trustItem}>
                <Text style={styles.trustIcon}>⭐</Text>
                <Text style={styles.trustText}>Real Reviews</Text>
              </View>
              <View style={styles.trustItem}>
                <Text style={styles.trustIcon}>💰</Text>
                <Text style={styles.trustText}>Secure Payments</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            {MOCK_REVIEWS.map((review) => (
              <View key={review.id} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewUser}>{review.user}</Text>
                  <View style={styles.reviewStars}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Text key={i} style={styles.star}>★</Text>
                    ))}
                  </View>
                </View>
                <Text style={styles.reviewText}>{review.text}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  hero: {
    flexDirection: 'row',
    paddingTop: 60,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    borderBottomLeftRadius: RADIUS.xxl,
    borderBottomRightRadius: RADIUS.xxl,
  },
  heroContent: {
    flex: 1,
  },
  heroGreeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textInverse,
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
  },
  heroImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    position: 'absolute',
    right: 20,
    bottom: 20,
    opacity: 0.3,
  },
  searchContainer: {
    marginTop: -20,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  section: {
    marginTop: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  seeAll: {
    fontSize: 15,
    color: COLORS.iosBlue,
    fontWeight: '600',
  },
  categoriesScroll: {
    paddingLeft: SPACING.md,
  },
  categoryCard: {
    width: 100,
    height: 120,
    marginRight: SPACING.md,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.sm,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textInverse,
  },
  featuredList: {
    paddingLeft: SPACING.md,
    paddingRight: SPACING.md,
  },
  trustBanner: {
    marginHorizontal: SPACING.md,
    marginTop: SPACING.lg,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    ...SHADOWS.lg,
  },
  trustContent: {},
  trustTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textInverse,
    marginBottom: SPACING.md,
  },
  trustFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trustItem: {
    alignItems: 'center',
  },
  trustIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  trustText: {
    fontSize: 12,
    color: COLORS.textInverse,
    fontWeight: '500',
  },
  activityCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.sm,
  },
  reviewItem: {
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.iosBg,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewUser: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  reviewStars: {
    flexDirection: 'row',
  },
  star: {
    color: '#FFD700',
    fontSize: 14,
    marginLeft: 2,
  },
  reviewText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  bottomPadding: {
    height: 100,
  },
});
