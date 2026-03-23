import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES } from '../constants/theme';

interface StarRatingProps {
  rating: number;
  size?: number;
  showEmpty?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 16,
  showEmpty = true,
}) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Text key={`full-${i}`} style={[styles.star, { fontSize: size }]}>
        ⭐
      </Text>
    );
  }

  if (hasHalfStar) {
    stars.push(
      <Text key="half" style={[styles.star, { fontSize: size }]}>
        ⭐½
      </Text>
    );
  }

  if (showEmpty) {
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Text key={`empty-${i}`} style={[styles.starEmpty, { fontSize: size }]}>
          ☆
        </Text>
      );
    }
  }

  return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 2,
  },
  starEmpty: {
    marginRight: 2,
    opacity: 0.3,
  },
});
