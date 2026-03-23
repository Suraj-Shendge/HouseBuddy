import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, BORDER_RADIUS, SHADOWS, SPACING, FONT_SIZES } from '../constants/theme';
import { RootStackParamList, AvailabilityStatus } from '../types';
import { useApp } from '../context/AppContext';
import { useTrustScore, getTrustBadgeLabel, getTrustBadgeColor } from '../hooks/useTrustScore';
import { StarRating } from '../components/StarRating';
import { TrustBadge } from '../components/TrustBadge';
import { TrustProgress } from '../components/TrustProgress';
import { AvailabilityBadge } from '../components/AvailabilityBadge';
import { ReviewCard } from '../components/ReviewCard';
import { Gallery } from '../components/Gallery';
import { Button } from '../components/Button';
import { SectionHeader } from '../components/SectionHeader';
import { EmptyState } from '../components/EmptyState';

type RouteProps = RouteProp<RootStackParamList, 'WorkerProfile'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const WorkerProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { workerId } = route.params;
  const { getWorkerById, getReviewsByWorker, toggleSavedWorker, savedWorkers } = useApp();
  
  const worker = getWorkerById(workerId);
  const reviews = getReviewsByWorker(workerId);
  const trustScore = useTrustScore(worker!);
  const isSaved = savedWorkers.includes(workerId);
  const [showAllImages, setShowAllImages] = useState(false);

  if (!worker) {
    return (
      <View style={styles.container}>
        <EmptyState
          icon="❌"
          title="Worker Not Found"
          message="This worker profile is no longer available."
          actionLabel="Go Back"
          onAction={() => navigation.goBack()}
        />
      </View>
    );
  }

  const handleCall = () => {
    Linking.openURL(`tel:${worker.phone}`);
  };

  const handleMessage = () => {
    const chat = { id: `chat_${worker.id}`, worker_id: worker.id, worker_name: worker.name, user_id: 'u1', unread_count: 0 };
    navigation.navigate('Chat', { chatId: chat.id, workerName: worker.name });
  };

  const handleBook = () => {
    navigation.navigate('MultiStepBooking', { workerId: worker.id });
  };

  const handleSave = () => {
    toggleSavedWorker(worker.id);
  };

  const trustBadgeColor = getTrustBadgeColor(trustScore.badge);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveIcon}>{isSaved ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={[styles.avatar, { backgroundColor: worker.category.color }]}>
            <Text style={styles.avatarText}>{worker.name[0]}</Text>
          </View>
          <Text style={styles.name}>{worker.name}</Text>
          <Text style={styles.category}>
            {worker.category.icon} {worker.category.name}
          </Text>
          <View style={styles.ratingRow}>
            <StarRating rating={worker.avg_rating} size={18} />
            <Text style={styles.ratingText}>{worker.avg_rating.toFixed(1)}</Text>
            <Text style={styles.reviewsCount}>({worker.reviews_count} reviews)</Text>
          </View>
          <AvailabilityBadge status={worker.availability_status || 'offline'} />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{worker.years_experience || 0}+</Text>
            <Text style={styles.statLabel}>Years Exp.</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{worker.completed_jobs || 0}</Text>
            <Text style={styles.statLabel}>Jobs Done</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{worker.distance?.toFixed(1) || 'N/A'}</Text>
            <Text style={styles.statLabel}>km away</Text>
          </View>
        </View>

        <View style={styles.trustSection}>
          <TrustProgress trustScore={trustScore} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{worker.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pricing</Text>
          <View style={styles.priceCard}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Typical Cost</Text>
              <Text style={styles.priceRange}>{worker.price_range || '$50 - $150'}</Text>
            </View>
            <Text style={styles.priceNote}>
              Final price may vary based on job complexity. Free estimate available.
            </Text>
          </View>
        </View>

        {worker.images && worker.images.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Work Photos" subtitle="Previous work samples" />
            <Gallery images={worker.images} />
          </View>
        )}

        <View style={styles.section}>
          <SectionHeader 
            title={`Reviews (${reviews.length})`} 
            subtitle="What customers say"
            actionLabel="Write Review"
            onActionPress={() => navigation.navigate('WriteReview', { workerId: worker.id })}
          />
          {reviews.length === 0 ? (
            <View style={styles.noReviews}>
              <Text style={styles.noReviewsText}>No reviews yet</Text>
            </View>
          ) : (
            reviews.slice(0, 3).map(review => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconButton} onPress={handleCall}>
          <Text style={styles.iconButtonText}>📞</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleMessage}>
          <Text style={styles.iconButtonText}>💬</Text>
        </TouchableOpacity>
        <Button title="Book Now" onPress={handleBook} style={styles.bookButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.md,
    paddingTop: SPACING.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  backIcon: {
    fontSize: 20,
    color: COLORS.textPrimary,
  },
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  saveIcon: {
    fontSize: 20,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '700',
    color: COLORS.textInverse,
  },
  name: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  category: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
    gap: SPACING.xs,
  },
  ratingText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  reviewsCount: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.medium,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: SPACING.xs,
  },
  trustSection: {
    padding: SPACING.md,
  },
  section: {
    padding: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  priceCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  priceRange: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.primary,
  },
  priceNote: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textTertiary,
    marginTop: SPACING.xs,
  },
  noReviews: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  noReviewsText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  bottomPadding: {
    height: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    gap: SPACING.sm,
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonText: {
    fontSize: 24,
  },
  bookButton: {
    flex: 1,
  },
});
