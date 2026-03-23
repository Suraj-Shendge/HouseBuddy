import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import { COLORS, BORDER_RADIUS, SHADOWS, SPACING } from '../constants/theme';

interface SkeletonProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = 100,
  height = 20,
  borderRadius = BORDER_RADIUS.sm,
  style,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        { width, height, borderRadius, opacity },
        style,
      ]}
    />
  );
};

export const WorkerCardSkeleton: React.FC = () => (
  <View style={cardStyles.card}>
    <View style={cardStyles.header}>
      <Skeleton width={60} height={60} borderRadius={BORDER_RADIUS.md} />
      <View style={cardStyles.headerText}>
        <Skeleton width={120} height={20} />
        <Skeleton width={80} height={16} style={{ marginTop: 8 }} />
      </View>
    </View>
    <Skeleton width={300} height={16} style={{ marginTop: 12 }} />
    <Skeleton width={240} height={16} style={{ marginTop: 8 }} />
    <View style={cardStyles.footer}>
      <Skeleton width={80} height={16} />
      <Skeleton width={70} height={32} borderRadius={16} />
    </View>
  </View>
);

export const ProfileSkeleton: React.FC = () => (
  <View style={profileStyles.container}>
    <View style={profileStyles.avatarContainer}>
      <Skeleton width={100} height={100} borderRadius={50} />
    </View>
    <Skeleton width={140} height={24} style={{ marginTop: 16 }} />
    <Skeleton width={180} height={16} style={{ marginTop: 8 }} />
    <View style={profileStyles.statsContainer}>
      {[1, 2, 3].map(i => (
        <Skeleton key={i} width={90} height={60} borderRadius={BORDER_RADIUS.lg} />
      ))}
    </View>
  </View>
);

export const CategorySkeleton: React.FC = () => (
  <View style={categoryStyles.container}>
    {[1, 2, 3, 4].map(i => (
      <Skeleton key={i} width={80} height={80} borderRadius={BORDER_RADIUS.lg} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: COLORS.border,
  },
});

const cardStyles = StyleSheet.create({
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
  },
  headerText: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
  },
});

const profileStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  avatarContainer: {
    marginBottom: SPACING.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
});

const categoryStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
});
