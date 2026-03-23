import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { COLORS, BORDER_RADIUS, SHADOWS, SPACING, FONT_SIZES } from '../constants/theme';
import { Worker } from '../types';
import { getTrustScoreColor, formatDistance } from '../utils/helpers';
import { StarRating } from './StarRating';
import { TrustBadge } from './TrustBadge';

interface WorkerCardProps {
  worker: Worker;
  onPress?: () => void;
  onCall?: () => void;
  compact?: boolean;
}

export const WorkerCard: React.FC<WorkerCardProps> = ({
  worker,
  onPress,
  onCall,
  compact = false,
}) => {
  const handleCall = () => {
    Linking.openURL(`tel:${worker.phone}`);
  };

  const trustColor = getTrustScoreColor(worker.trust_score);

  if (compact) {
    return (
      <TouchableOpacity style={compactStyles.card} onPress={onPress} activeOpacity={0.8}>
        <View style={[compactStyles.avatar, { backgroundColor: worker.category.color + '30' }]}>
          <Text style={compactStyles.avatarText}>
            {worker.name.split(' ').map(n => n[0]).join('')}
          </Text>
        </View>
        <Text style={compactStyles.name} numberOfLines={1}>{worker.name}</Text>
        <Text style={compactStyles.category}>{worker.category.name}</Text>
        <View style={compactStyles.ratingRow}>
          <StarRating rating={worker.avg_rating} size={12} />
          <Text style={compactStyles.rating}>{worker.avg_rating.toFixed(1)}</Text>
        </View>
        <Text style={compactStyles.distance}>
          {formatDistance(worker.distance)} away
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: worker.category.color + '30' }]}>
          {worker.images.length > 0 ? (
            <Image source={{ uri: worker.images[0] }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarText}>
              {worker.name.split(' ').map(n => n[0]).join('')}
            </Text>
          )}
        </View>
        <View style={styles.headerInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{worker.name}</Text>
            {worker.is_available && (
              <View style={styles.availableBadge}>
                <Text style={styles.availableText}>Available</Text>
              </View>
            )}
          </View>
          <Text style={styles.category}>{worker.category.name}</Text>
          <View style={styles.ratingRow}>
            <StarRating rating={worker.avg_rating} size={14} />
            <Text style={styles.rating}>{worker.avg_rating.toFixed(1)}</Text>
            <Text style={styles.reviews}>({worker.reviews_count})</Text>
          </View>
        </View>
        <TrustBadge score={worker.trust_score} size="medium" />
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {worker.description}
      </Text>

      <View style={styles.footer}>
        <View style={styles.locationRow}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.location}>{worker.location}</Text>
          {worker.distance && (
            <Text style={styles.distance}> • {formatDistance(worker.distance)}</Text>
          )}
        </View>
        <View style={styles.actions}>
          {worker.price_range && (
            <View style={styles.priceBadge}>
              <Text style={styles.priceText}>{worker.price_range}</Text>
            </View>
          )}
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <Text style={styles.callIcon}>📞</Text>
          </TouchableOpacity>
        </View>
      </View>

      {worker.images.length > 0 && (
        <View style={styles.imageRow}>
          {worker.images.slice(0, 3).map((img, index) => (
            <Image
              key={index}
              source={{ uri: img }}
              style={styles.workImage}
            />
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
  },
  headerInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  availableBadge: {
    backgroundColor: COLORS.success + '20',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.full,
    marginLeft: SPACING.sm,
  },
  availableText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.success,
    fontWeight: '600',
  },
  category: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  rating: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginLeft: SPACING.xs,
  },
  reviews: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
    marginLeft: 2,
  },
  description: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginTop: SPACING.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 12,
    marginRight: SPACING.xs,
  },
  location: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  distance: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textTertiary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceBadge: {
    backgroundColor: COLORS.success + '15',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
    marginRight: SPACING.sm,
  },
  priceText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.success,
    fontWeight: '600',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callIcon: {
    fontSize: 18,
  },
  imageRow: {
    flexDirection: 'row',
    marginTop: SPACING.md,
  },
  workImage: {
    width: 80,
    height: 60,
    borderRadius: BORDER_RADIUS.md,
    marginRight: SPACING.sm,
  },
});

const compactStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    marginRight: SPACING.md,
    width: 140,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  name: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  category: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  rating: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginLeft: 4,
  },
  distance: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
    marginTop: 4,
  },
});
