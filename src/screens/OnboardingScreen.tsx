import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS, RADIUS, SPACING } from '../constants/theme';

const { width } = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
}

const SLIDES = [
  {
    id: '1',
    title: 'Find Trusted Pros',
    subtitle: 'Connect with verified service providers in your area',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
    color: '#667EEA',
  },
  {
    id: '2',
    title: 'Real Reviews',
    subtitle: 'Read authentic reviews from real customers',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80',
    color: '#764BA2',
  },
  {
    id: '3',
    title: 'Secure Booking',
    subtitle: 'Book with confidence. Pay safely.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    color: '#E94560',
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false, listener: (e: any) => {
      const index = Math.round(e.nativeEvent.contentOffset.x / width);
      setCurrentIndex(index);
    }}
  );

  const renderSlide = ({ item, index }: { item: typeof SLIDES[0]; index: number }) => (
    <View style={styles.slide} key={item.id}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.3)']}
          style={styles.imageGradient}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {SLIDES.map((_, index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 24, 8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              { width: dotWidth, opacity },
              currentIndex === index && styles.dotActive,
            ]}
          />
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {SLIDES.map(renderSlide)}
      </ScrollView>

      <View style={styles.footer}>
        {renderDots()}

        {currentIndex === SLIDES.length - 1 ? (
          <TouchableOpacity style={styles.getStartedButton} onPress={onComplete}>
            <LinearGradient
              colors={['#667EEA', '#764BA2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.skipButton} onPress={onComplete}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => {
                const nextIndex = currentIndex + 1;
                scrollViewRef?.scrollTo({ x: nextIndex * width, animated: true });
              }}
            >
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

let scrollViewRef: any;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: RADIUS.xxl,
    overflow: 'hidden',
    ...SHADOWS.xl,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  textContainer: {
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: 17,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.iosGray,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skipButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  skipText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.full,
    ...SHADOWS.md,
  },
  nextText: {
    fontSize: 16,
    color: COLORS.textInverse,
    fontWeight: '600',
  },
  getStartedButton: {
    borderRadius: RADIUS.full,
    overflow: 'hidden',
    ...SHADOWS.lg,
  },
  buttonGradient: {
    paddingVertical: SPACING.md + 4,
    paddingHorizontal: SPACING.xl * 2,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.textInverse,
    fontWeight: '700',
  },
});
