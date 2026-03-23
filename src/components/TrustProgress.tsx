import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, BORDER_RADIUS, SPACING, FONT_SIZES, SHADOWS } from '../constants/theme';
import { TrustScoreDetails } from '../types';
import { getTrustBadgeColor, getTrustBadgeLabel } from '../hooks/useTrustScore';

interface TrustProgressProps {
  trustScore: TrustScoreDetails;
  showDetails?: boolean;
}

export const TrustProgress: React.FC<TrustProgressProps> = ({ trustScore, showDetails = true }) => {
  const badgeColor = getTrustBadgeColor(trustScore.badge);
  const badgeLabel = getTrustBadgeLabel(trustScore.badge);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trust Score</Text>
        <View style={[styles.badge, { backgroundColor: badgeColor + '20' }]}>
          <Text style={[styles.badgeText, { color: badgeColor }]}>{badgeLabel}</Text>
        </View>
      </View>

      <View style={styles.scoreContainer}>
        <Text style={[styles.score, { color: badgeColor }]}>{trustScore.overall}</Text>
        <Text style={styles.scoreLabel}>/100</Text>
      </View>

      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${trustScore.progress}%`, backgroundColor: badgeColor }
          ]} 
        />
      </View>

      {showDetails && (
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Rating</Text>
            <Text style={styles.detailValue}>{trustScore.rating_weight}%</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Jobs Done</Text>
            <Text style={styles.detailValue}>{trustScore.jobs_weight}%</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Response</Text>
            <Text style={styles.detailValue}>{trustScore.response_speed_weight}%</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  badgeText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: SPACING.sm,
  },
  score: {
    fontSize: 36,
    fontWeight: '700',
  },
  scoreLabel: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.borderLight,
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: BORDER_RADIUS.full,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  detailValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
});
