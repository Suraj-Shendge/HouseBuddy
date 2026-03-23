import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, BORDER_RADIUS, SPACING, FONT_SIZES } from '../constants/theme';
import { ChatMessage } from '../types';

interface ChatBubbleProps {
  message: ChatMessage;
  isOwn: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isOwn }) => {
  const formatTime = (date: Date): string => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <View style={[styles.container, isOwn ? styles.ownContainer : styles.otherContainer]}>
      <View style={[styles.bubble, isOwn ? styles.ownBubble : styles.otherBubble]}>
        <Text style={[styles.message, isOwn && styles.ownMessage]}>{message.message}</Text>
        <Text style={[styles.time, isOwn && styles.ownTime]}>{formatTime(message.timestamp)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
  },
  ownContainer: {
    alignItems: 'flex-end',
  },
  otherContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
  },
  ownBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: BORDER_RADIUS.xs,
  },
  otherBubble: {
    backgroundColor: COLORS.surface,
    borderBottomLeftRadius: BORDER_RADIUS.xs,
  },
  message: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    lineHeight: 22,
  },
  ownMessage: {
    color: COLORS.textInverse,
  },
  time: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    alignSelf: 'flex-end',
  },
  ownTime: {
    color: COLORS.textInverse + 'AA',
  },
});
