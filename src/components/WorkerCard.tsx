import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS, RADIUS, SPACING, ILLUSTRATIONS } from '../constants/theme';
import { Worker } from '../types';

interface WorkerCardProps {
  worker: Worker;
  onPress: () => void;
  variant?: 'default' | 'compact' | 'featured';
}

export const WorkerCard: React.FC<WorkerCardProps> = ({ worker, onPress, variant = 'default' }) => {
  const getCategoryImage = (category: string): string => {
    const categoryKey = category.toLowerCase().replace(/\s+/g, '') as keyof typeof ILLUSTRATIONS.categories;
    return ILLUSTRATIONS.categories[categoryKey] || ILLUSTRATIONS.categories.plumber;
  };

  const getTrustLabel = (score: number): string => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Very Good';
    if (score >= 60) return 'Good';
    return 'Fair';
  };

  const getTrustColor = (score: number): string => {
    if (score >= 90) return COLORS.trustExcellent;
    if (score >= 75) return COLORS.trustGood;
    if (score >= 60) return COLORS.warning;
    return COLORS.error;
  };

  if (variant === 'compact') {
    return (
      <TouchableOpacity style={styles.compactCard} onPress={onPress} activeOpacity={0.8}>
        <Image source={{ uri: getCategoryImage(worker.category) }} style={styles.compactImage} />
        <View style={styles.compactOverlay}>
          <Text style={styles.compactName}>{worker.name}</Text>
          <Text style={styles.compactCategory}>{worker.category}</Text>
        </View>
        <View style={[styles.trustBadge, { backgroundColor: getTrustColor(worker.trustScore) }]}>
          <Text style={styles.trustText}>{worker.trustScore}%</Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (variant === 'featured') {
    return (
      <TouchableOpacity style={styles.featuredCard} onPress={onPress} activeOpacity={0.9}>
        <Image source={{ uri: worker.avatar || getCategoryImage(worker.category) }} style={styles.featuredImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.featuredGradient}
        >
          <View style={styles.featuredContent}>
            <Text style={styles.featuredName}>{worker.name}</Text>
            <Text style={styles.featuredCategory}>{worker.category}</Text>
            <View style={styles.featuredMeta}>
              <View style={styles.ratingContainer}>
                <Text style={styles.featuredRating}>★ {worker.rating.toFixed(1)}</Text>
                <Text style={styles.featuredReviews}>({worker.reviewCount})</Text>
              </View>
              <View style={[styles.trustPill, { backgroundColor: getTrustColor(worker.trustScore) }]}>
                <Text style={styles.trustPillText}>{getTrustLabel(worker.trustScore)}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
        {worker.isVerified && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  // Default card
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: worker.avatar || getCategoryImage(worker.category) }} style={styles.avatar} />
        <View style={styles.headerContent}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{worker.name}</Text>
            {worker.isVerified && (
              <View style={styles.verifiedTag}>
                <Text style={styles.verifiedTagText}>✓ Verified</Text>
              </View>
            )}
          </View>
          <Text style={styles.category}>{worker.category}</Text>
          <Text style={styles.location}>{worker.location}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>★ {worker.rating.toFixed(1)}</Text>
            <Text style={styles.statLabel}>{worker.reviewCount} reviews</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={[styles.statValue, { color: getTrustColor(worker.trustScore) }]}>
              {worker.trustScore}%
            </Text>
            <Text style={styles.statLabel}>{getTrustLabel(worker.trustScore)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{worker.jobsCompleted}</Text>
            <Text style={styles.statLabel}>Jobs done</Text>
          </View>
        </View>

        {worker.badges && worker.badges.length > 0 && (
          <View style={styles.badges}>
            {worker.badges.slice(0, 3).map((badge, index) => (
              <View key={index} style={styles.badge}>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.priceLabel}>Starting from</Text>
          <Text style={styles.price}>${worker.hourlyRate}/hr</Text>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={onPress}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Default card
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    ...SHADOWS.lg,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    padding: SPACING.md,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.md,
  },
  headerContent: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  verifiedTag: {
    backgroundColor: COLORS.success + '20',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
    marginLeft: 8,
  },
  verifiedTagText: {
    fontSize: 11,
    color: COLORS.success,
    fontWeight: '600',
  },
  category: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  location: {
    fontSize: 13,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  cardBody: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.iosBg,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  divider: {
    width: 1,
    backgroundColor: COLORS.iosSeparator,
  },
  badges: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    marginRight: 8,
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.iosBg,
  },
  priceLabel: {
    fontSize: 12,
    color: COLORS.textTertiary,
  },
  price: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: RADIUS.full,
  },
  bookButtonText: {
    color: COLORS.textInverse,
    fontWeight: '600',
    fontSize: 14,
  },

  // Compact card
  compactCard: {
    width: 160,
    height: 200,
    borderRadius: RADIUS.lg,
    marginRight: SPACING.md,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  compactImage: {
    width: '100%',
    height: '100%',
  },
  compactOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.md,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  compactName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textInverse,
  },
  compactCategory: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  trustBadge: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  trustText: {
    color: COLORS.textInverse,
    fontSize: 12,
    fontWeight: '700',
  },

  // Featured card
  featuredCard: {
    width: 280,
    height: 180,
    borderRadius: RADIUS.xl,
    marginRight: SPACING.md,
    overflow: 'hidden',
    ...SHADOWS.xl,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    justifyContent: 'flex-end',
  },
  featuredContent: {
    padding: SPACING.md,
  },
  featuredName: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textInverse,
    letterSpacing: -0.3,
  },
  featuredCategory: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredRating: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFD700',
  },
  featuredReviews: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginLeft: 4,
  },
  trustPill: {
    marginLeft: SPACING.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  trustPillText: {
    color: COLORS.textInverse,
    fontSize: 11,
    fontWeight: '600',
  },
  verifiedBadge: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.md,
    backgroundColor: COLORS.success,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.sm,
  },
  verifiedText: {
    color: COLORS.textInverse,
    fontWeight: '700',
  },
});
