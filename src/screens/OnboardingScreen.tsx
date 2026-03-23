import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { COLORS, BORDER_RADIUS, SHADOWS, SPACING, FONT_SIZES } from '../constants/theme';
import { Button } from '../components';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface OnboardingData {
  id: string;
  image: string;
  title: string;
  description: string;
  backgroundColor: string;
}

const ONBOARDING_DATA: OnboardingData[] = [
  {
    id: '1',
    image: '🔍',
    title: 'Find Trusted Professionals',
    description: 'Discover verified local service providers with real reviews and trust scores.',
    backgroundColor: '#007AFF',
  },
  {
    id: '2',
    image: '⭐',
    title: 'Read Real Reviews',
    description: 'See genuine reviews from homeowners like you. Our trust score helps you choose wisely.',
    backgroundColor: '#34C759',
  },
  {
    id: '3',
    image: '📸',
    title: 'View Work Proof',
    description: 'Browse photos of completed work. See the quality of service before you book.',
    backgroundColor: '#FF9500',
  },
  {
    id: '4',
    image: '📱',
    title: 'Book with Confidence',
    description: 'Schedule appointments easily and manage all your bookings in one place.',
    backgroundColor: '#5856D6',
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
    Animated.timing(animation, {
      toValue: index,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (currentIndex + 1) * SCREEN_WIDTH,
        animated: true,
      });
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const pagination = ONBOARDING_DATA.map((_, index) => {
    const inputRange = [index - 1, index, index + 1];
    const scale = animation.interpolate({
      inputRange,
      outputRange: [8, 16, 8],
      extrapolate: 'clamp',
    });
    const opacity = animation.interpolate({
      inputRange,
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        key={index}
        style={[
          styles.dot,
          {
            width: scale,
            opacity,
          },
        ]}
      />
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {ONBOARDING_DATA.map((screen) => (
          <View key={screen.id} style={styles.screen}>
            <View
              style={[
                styles.imageContainer,
                { backgroundColor: screen.backgroundColor + '30' },
              ]}
            >
              <Text style={styles.image}>{screen.image}</Text>
            </View>
            <Text style={styles.title}>{screen.title}</Text>
            <Text style={styles.description}>{screen.description}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.pagination}>{pagination}</View>
        <Button
          title={currentIndex === ONBOARDING_DATA.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          size="large"
          fullWidth
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xxl,
  },
  skipButton: {
    padding: SPACING.sm,
  },
  skipText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  screen: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    paddingHorizontal: SPACING.xxl,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.xxxl,
    marginBottom: SPACING.xxxl,
  },
  image: {
    fontSize: 100,
  },
  title: {
    fontSize: FONT_SIZES.title,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: SPACING.lg,
  },
  footer: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xxxl,
    paddingTop: SPACING.xl,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginHorizontal: 4,
  },
});
