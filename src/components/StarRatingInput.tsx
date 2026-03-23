import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { COLORS, BORDER_RADIUS, SPACING, FONT_SIZES } from '../constants/theme';

interface StarRatingInputProps {
  value: number;
  onChange: (rating: number) => void;
  size?: number;
}

export const StarRatingInput: React.FC<StarRatingInputProps> = ({
  value,
  onChange,
  size = 40,
}) => {
  const [scales, setScales] = useState<Animated.Value[]>(
    Array(5).fill(0).map(() => new Animated.Value(1))
  );

  const handlePress = (index: number) => {
    const newRating = index + 1;
    onChange(newRating);

    Animated.sequence([
      Animated.timing(scales[index], {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scales[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      {Array(5).fill(0).map((_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(index)}
          activeOpacity={0.7}
        >
          <Animated.Text
            style={[
              styles.star,
              {
                fontSize: size,
                transform: [{ scale: scales[index] }],
                opacity: index < value ? 1 : 0.3,
              },
            ]}
          >
            ⭐
          </Animated.Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  star: {
    marginHorizontal: SPACING.xs,
  },
});
