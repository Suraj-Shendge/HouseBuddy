import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { Header, Button, StarRatingInput } from '../components';
import { RootStackParamList } from '../types';

type WriteReviewRouteProp = RouteProp<RootStackParamList, 'WriteReview'>;
type WriteReviewNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const WriteReviewScreen: React.FC = () => {
  const navigation = useNavigation<WriteReviewNavigationProp>();
  const route = useRoute<WriteReviewRouteProp>();
  const { getWorkerById, addReview, user } = useApp();
  
  const worker = getWorkerById(route.params.workerId);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert('Rating Required', 'Please select a rating before submitting.');
      return;
    }
    if (reviewText.trim().length < 10) {
      Alert.alert('Review Too Short', 'Please write at least 10 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addReview({
        worker_id: route.params.workerId,
        user_id: user?.id || 'anonymous',
        user_name: user?.name || 'Anonymous User',
        rating,
        review_text: reviewText.trim(),
      });
      Alert.alert('Success', 'Your review has been submitted!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!worker) {
    return (
      <View style={styles.container}>
        <Header showBack onBack={() => navigation.goBack()} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Worker not found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Write Review" showBack onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.workerInfo}>
          <View style={[styles.avatar, { backgroundColor: worker.category.color + '30' }]}>
            <Text style={styles.avatarText}>
              {worker.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <Text style={styles.workerName}>{worker.name}</Text>
          <Text style={styles.workerCategory}>{worker.category.name}</Text>
        </View>

        <View style={styles.ratingSection}>
          <Text style={styles.sectionTitle}>Your Rating</Text>
          <View style={styles.starsContainer}>
            <StarRatingInput value={rating} onChange={setRating} size={44} />
          </View>
          <Text style={styles.ratingHint}>
            {rating === 0 && 'Tap to rate'}
            {rating === 1 && 'Poor'}
            {rating === 2 && 'Fair'}
            {rating === 3 && 'Good'}
            {rating === 4 && 'Very Good'}
            {rating === 5 && 'Excellent'}
          </Text>
        </View>

        <View style={styles.reviewSection}>
          <Text style={styles.sectionTitle}>Your Review</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Share your experience with this professional..."
              placeholderTextColor={COLORS.textTertiary}
              value={reviewText}
              onChangeText={setReviewText}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>
          <Text style={styles.charCount}>
            {reviewText.length} / 500 characters
          </Text>
        </View>

        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>Tips for a great review:</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>✓</Text>
            <Text style={styles.tipText}>Describe the quality of work</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>✓</Text>
            <Text style={styles.tipText}>Mention their professionalism</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>✓</Text>
            <Text style={styles.tipText}>Share if work was completed on time</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>✓</Text>
            <Text style={styles.tipText}>Be honest and fair</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={isSubmitting ? 'Submitting...' : 'Submit Review'}
          onPress={handleSubmit}
          loading={isSubmitting}
          disabled={rating === 0 || reviewText.trim().length < 10}
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
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  workerInfo: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
  },
  workerName: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  workerCategory: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  ratingSection: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  starsContainer: {
    marginBottom: SPACING.sm,
  },
  ratingHint: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textTertiary,
  },
  reviewSection: {
    marginBottom: SPACING.lg,
  },
  textInputContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  textInput: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    padding: SPACING.md,
    minHeight: 150,
  },
  charCount: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
    textAlign: 'right',
    marginTop: SPACING.xs,
  },
  tipsSection: {
    backgroundColor: COLORS.primary + '10',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.xxl,
  },
  tipsTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: SPACING.md,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  tipIcon: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.success,
    marginRight: SPACING.sm,
    fontWeight: '700',
  },
  tipText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  footer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
  },
});
