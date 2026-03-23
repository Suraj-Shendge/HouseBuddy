import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, BORDER_RADIUS, SPACING, FONT_SIZES } from '../constants/theme';
import { TimeSlot } from '../types';

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  slots,
  selectedSlot,
  onSelectSlot,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Time</Text>
      <Text style={styles.subtitle}>Choose a convenient time slot</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Morning</Text>
        <View style={styles.grid}>
          {slots.filter(s => s.period === 'AM').map(slot => (
            <TouchableOpacity
              key={slot.id}
              style={[
                styles.slot,
                !slot.available && styles.slotUnavailable,
                selectedSlot?.id === slot.id && styles.slotSelected,
              ]}
              onPress={() => slot.available && onSelectSlot(slot)}
              disabled={!slot.available}
            >
              <Text style={[
                styles.slotText,
                !slot.available && styles.slotTextUnavailable,
                selectedSlot?.id === slot.id && styles.slotTextSelected,
              ]}>
                {slot.time} {slot.period}
              </Text>
              {!slot.available && (
                <Text style={styles.unavailableLabel}>Booked</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Afternoon</Text>
        <View style={styles.grid}>
          {slots.filter(s => s.period === 'PM').map(slot => (
            <TouchableOpacity
              key={slot.id}
              style={[
                styles.slot,
                !slot.available && styles.slotUnavailable,
                selectedSlot?.id === slot.id && styles.slotSelected,
              ]}
              onPress={() => slot.available && onSelectSlot(slot)}
              disabled={!slot.available}
            >
              <Text style={[
                styles.slotText,
                !slot.available && styles.slotTextUnavailable,
                selectedSlot?.id === slot.id && styles.slotTextSelected,
              ]}>
                {slot.time} {slot.period}
              </Text>
              {!slot.available && (
                <Text style={styles.unavailableLabel}>Booked</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  section: {
    marginTop: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  slot: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    minWidth: 90,
    alignItems: 'center',
  },
  slotUnavailable: {
    backgroundColor: COLORS.borderLight,
    borderColor: COLORS.borderLight,
  },
  slotSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  slotText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  slotTextUnavailable: {
    color: COLORS.textTertiary,
  },
  slotTextSelected: {
    color: COLORS.textInverse,
  },
  unavailableLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
});
