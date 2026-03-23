import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, BORDER_RADIUS, FONT_SIZES, SPACING, SHADOWS } from '../constants/theme';
import { getTrustScoreColor, getTrustScoreLabel } from '../utils/helpers';

interface TrustBadgeProps {
  score: number;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({
  score,
  size = 'medium',
  showLabel = false,
}) => {
  const color = getTrustScoreColor(score);
  const label = getTrustScoreLabel(score);

  const dimensions = {
    small: { badge: 28, text: FONT_SIZES.xs, icon: 12 },
    medium: { badge: 40, text: FONT_SIZES.sm, icon: 16 },
    large: { badge: 56, text: FONT_SIZES.md, icon: 24 },
  }[size];

  return (
    <View
      style={[
        styles.badge,
        {
          width: dimensions.badge,
          height: dimensions.badge,
          backgroundColor: color + '20',
        },
      ]}
    >
      <Text style={[styles.icon, { fontSize: dimensions.icon }]}>🛡️</Text>
      <Text style={[styles.score, { fontSize: dimensions.text, color }]}>
        {score}
      </Text>
      {showLabel && (
        <Text style={[styles.label, { color }]}>{label}</Text>
      )}
    </View>
  );
};

interface TrustScoreCardProps {
  score: number;
  reviewsCount: number;
}

export const TrustScoreCard: React.FC<TrustScoreCardProps> = ({
  score,
  reviewsCount,
}) => {
  const color = getTrustScoreColor(score);
  const label = getTrustScoreLabel(score);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardTitle}>Trust Score</Text>
          <Text style={styles.cardSubtitle}>Based on {reviewsCount} reviews</Text>
        </View>
        <View style={[styles.scoreCircle, { borderColor: color }]}>
          <Text style={[styles.scoreText, { color }]}>{score}</Text>
        </View>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${score}%`, backgroundColor: color }]} />
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.trustLabel}>{label}</Text>
        <Text style={styles.trustHint}>
          {score >= 90 ? 'Highly trusted' : score >= 80 ? 'Very reliable' : 'Building trust'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: -4,
  },
  score: {
    fontWeight: '700',
    marginTop: 2,
  },
  label: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    marginTop: 4,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    ...SHADOWS.medium,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  cardSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  scoreCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.full,
    marginTop: SPACING.lg,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: BORDER_RADIUS.full,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  trustLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  trustHint: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
});
