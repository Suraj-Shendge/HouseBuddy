import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { COLORS, BORDER_RADIUS, SHADOWS, SPACING, FONT_SIZES } from '../constants/theme';

interface LocationPickerProps {
  value: string;
  onChange: (location: string) => void;
}

const LOCATIONS = [
  'New York, NY',
  'Brooklyn, NY',
  'Manhattan, NY',
  'Queens, NY',
  'Bronx, NY',
  'Staten Island, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
];

export const LocationPicker: React.FC<LocationPickerProps> = ({ value, onChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSelect = (location: string) => {
    onChange(location);
    setIsVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={() => setIsVisible(true)}>
        <Text style={styles.icon}>📍</Text>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.chevron}>▼</Text>
      </TouchableOpacity>

      <Modal visible={isVisible} transparent animationType="fade">
        <TouchableOpacity 
          style={styles.overlay} 
          activeOpacity={1} 
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.modal}>
            <View style={styles.header}>
              <Text style={styles.title}>Select Location</Text>
              <TouchableOpacity onPress={() => setIsVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={LOCATIONS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.locationItem, item === value && styles.locationItemSelected]}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.locationIcon}>📍</Text>
                  <Text style={[styles.locationText, item === value && styles.locationTextSelected]}>
                    {item}
                  </Text>
                  {item === value && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    ...SHADOWS.small,
  },
  icon: {
    fontSize: 14,
    marginRight: SPACING.xs,
  },
  value: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  chevron: {
    fontSize: 10,
    color: COLORS.textTertiary,
    marginLeft: SPACING.xs,
  },
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  modal: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    width: '100%',
    maxHeight: '70%',
    ...SHADOWS.large,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  closeButton: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
    padding: SPACING.xs,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  locationItemSelected: {
    backgroundColor: COLORS.primary + '10',
  },
  locationIcon: {
    fontSize: 16,
    marginRight: SPACING.md,
  },
  locationText: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
  },
  locationTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  checkmark: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    fontWeight: '700',
  },
});
