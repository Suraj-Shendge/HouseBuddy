import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, BORDER_RADIUS, SHADOWS, SPACING, FONT_SIZES } from '../constants/theme';
import { Booking, BookingStatus } from '../types';
import { StarRating } from './StarRating';

interface BookingCardProps {
  booking: Booking;
  onPress?: () => void;
  onRebook?: () => void;
  onCancel?: () => void;
  showActions?: boolean;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onPress,
  onRebook,
  onCancel,
  showActions = true,
}) => {
  const getStatusColor = (status: BookingStatus): string => {
    const colors: Record<BookingStatus, string> = {
      pending: '#FF9500',
      accepted: '#007AFF',
      rejected: '#FF3B30',
      completed: '#34C759',
      cancelled: '#8E8E93',
    };
    return colors[status];
  };

  const getStatusLabel = (status: BookingStatus): string => {
    const labels: Record<BookingStatus, string> = {
      pending: 'Pending',
      accepted: 'Accepted',
      rejected: 'Rejected',
      completed: 'Completed',
      cancelled: 'Cancelled',
    };
    return labels[status];
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.workerInfo}>
          {booking.worker_image ? (
            <Image source={{ uri: booking.worker_image }} style={styles.workerImage} />
          ) : (
            <View style={[styles.workerImage, { backgroundColor: booking.worker_category.color }]}>
              <Text style={styles.workerInitial}>
                {booking.worker_category.icon}
              </Text>
            </View>
          )}
          <View style={styles.workerDetails}>
            <Text style={styles.workerName}>{booking.worker_name}</Text>
            <Text style={styles.category}>
              {booking.worker_category.icon} {booking.worker_category.name}
            </Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
            {getStatusLabel(booking.status)}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>📅 Date</Text>
          <Text style={styles.detailValue}>{formatDate(booking.date)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>⏰ Time</Text>
          <Text style={styles.detailValue}>{booking.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>🔧 Service</Text>
          <Text style={styles.detailValue}>{booking.service}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>💰 Amount</Text>
          <Text style={styles.priceValue}>
            ${booking.final_price || booking.price_estimate}
          </Text>
        </View>
      </View>

      {showActions && (booking.status === 'pending' || booking.status === 'accepted') && (
        <View style={styles.actions}>
          {booking.status === 'pending' && (
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}
          {booking.status === 'completed' && (
            <TouchableOpacity style={styles.rebookButton} onPress={onRebook}>
              <Text style={styles.rebookButtonText}>Book Again</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.chatButton}>
            <Text style={styles.chatButtonText}>💬 Chat</Text>
          </TouchableOpacity>
        </View>
      )}

      {booking.status === 'completed' && showActions && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.rebookButton} onPress={onRebook}>
            <Text style={styles.rebookButtonText}>Book Again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reviewButton}>
            <Text style={styles.reviewButtonText}>⭐ Write Review</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  workerImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  workerInitial: {
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 48,
  },
  workerDetails: {
    marginLeft: SPACING.sm,
    flex: 1,
  },
  workerName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  category: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  statusText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: SPACING.md,
  },
  details: {
    gap: SPACING.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  detailValue: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  priceValue: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.primary,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.error,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.error,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  rebookButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  rebookButtonText: {
    color: COLORS.textInverse,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  chatButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  chatButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  reviewButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
  },
  reviewButtonText: {
    color: COLORS.textInverse,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});
