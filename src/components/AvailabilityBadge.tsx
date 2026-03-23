import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, BORDER_RADIUS, SPACING, FONT_SIZES } from '../constants/theme';
import { AvailabilityStatus } from '../types';

interface AvailabilityBadgeProps {
  status: AvailabilityStatus;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

export const AvailabilityBadge: React.FC<AvailabilityBadgeProps> = ({
  status,
  size = 'medium',
  showLabel = true,
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'available':
        return { color: COLORS.available, emoji: '🟢', label: 'Available Now' };
      case 'busy':
        return { color: COLORS.busy, emoji: '🟡', label: 'Busy' };
      case 'offline':
        return { color: COLORS.offline, emoji: '🔴', label: 'Offline' };
      default:
        return { color: COLORS.offline, emoji: '🔴', label: 'Offline' };
    }
  };

  const config = getStatusConfig();
  const dotSize = size === 'small' ? 8 : size === 'medium' ? 10 : 12;

  return (
    <View style={styles.container}>
      <View style={[styles.dot, { backgroundColor: config.color, width: dotSize, height: dotSize }]} />
      {showLabel && (
        <Text style={[styles.label, { fontSize: size === 'small' ? FONT_SIZES.xs : size === 'medium' ? FONT_SIZES.sm : FONT_SIZES.md }]}>
          {config.label}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  dot: {
    borderRadius: BORDER_RADIUS.full,
  },
  label: {
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
});
