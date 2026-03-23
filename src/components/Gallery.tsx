import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, Modal } from 'react-native';
import { COLORS, BORDER_RADIUS, SPACING, FONT_SIZES, SHADOWS } from '../constants/theme';

interface GalleryProps {
  images: string[];
  title?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const Gallery: React.FC<GalleryProps> = ({ images, title }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            style={styles.imageContainer}
            onPress={() => setSelectedIndex(index)}
            activeOpacity={0.9}
          >
            <Image source={{ uri: image }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={selectedIndex !== null} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedIndex(null)}
          >
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
          {selectedIndex !== null && (
            <>
              <Image
                source={{ uri: images[selectedIndex] }}
                style={styles.fullImage}
                resizeMode="contain"
              />
              <View style={styles.counter}>
                <Text style={styles.counterText}>
                  {selectedIndex + 1} / {images.length}
                </Text>
              </View>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  scrollView: {
    paddingHorizontal: SPACING.lg,
  },
  imageContainer: {
    marginRight: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  image: {
    width: 200,
    height: 150,
    backgroundColor: COLORS.border,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
    padding: SPACING.md,
  },
  closeIcon: {
    fontSize: 24,
    color: COLORS.textInverse,
  },
  fullImage: {
    width: SCREEN_WIDTH,
    height: '70%',
  },
  counter: {
    position: 'absolute',
    bottom: 60,
    backgroundColor: COLORS.overlay,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
  },
  counterText: {
    color: COLORS.textInverse,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});
