import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { Header, EmptyState } from '../components';
import { Notification } from '../types';
import { formatDate } from '../utils/helpers';

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'review',
    title: 'New Review',
    message: 'John Smith left a 5-star review on your profile',
    created_at: new Date(),
    is_read: false,
  },
  {
    id: '2',
    type: 'booking',
    title: 'Booking Confirmed',
    message: 'Your booking with Sarah Johnson has been confirmed for tomorrow at 10 AM',
    created_at: new Date(Date.now() - 3600000),
    is_read: false,
  },
  {
    id: '3',
    type: 'promo',
    title: 'Special Offer',
    message: 'Get 20% off on your next plumbing service booking!',
    created_at: new Date(Date.now() - 86400000),
    is_read: true,
  },
  {
    id: '4',
    type: 'update',
    title: 'Profile Update',
    message: 'Your profile has been verified and trust score updated',
    created_at: new Date(Date.now() - 172800000),
    is_read: true,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'review': return '⭐';
    case 'booking': return '📅';
    case 'promo': return '🎉';
    case 'update': return '📢';
    default: return '🔔';
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'review': return '#FFCC00';
    case 'booking': return '#007AFF';
    case 'promo': return '#34C759';
    case 'update': return '#5856D6';
    default: return COLORS.textSecondary;
  }
};

export const NotificationsScreen: React.FC = () => {
  const notifications = MOCK_NOTIFICATIONS;

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[
        styles.notificationCard,
        !item.is_read && styles.notificationUnread,
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: getNotificationColor(item.type) + '20' }]}>
        <Text style={styles.icon}>{getNotificationIcon(item.type)}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{item.title}</Text>
          {!item.is_read && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{formatDate(item.created_at)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Notifications" />
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="🔔"
            title="No Notifications"
            message="You're all caught up! We'll notify you when something new happens."
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  notificationUnread: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  icon: {
    fontSize: 22,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  message: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    lineHeight: 20,
  },
  time: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
    marginTop: SPACING.sm,
  },
});
