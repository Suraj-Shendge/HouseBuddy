import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { Header, EmptyState } from '../components';
import { RootStackParamList, Booking } from '../types';
import { formatDate } from '../utils/helpers';

type BookingsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    worker_id: 'w1',
    worker_name: 'John Smith',
    worker_category: { id: 'plumber', name: 'Plumber', icon: '🔧', color: '#007AFF' },
    date: new Date(),
    time: '10:00 AM',
    status: 'upcoming',
    service: 'Pipe Repair',
  },
  {
    id: '2',
    worker_id: 'w2',
    worker_name: 'Sarah Johnson',
    worker_category: { id: 'electrician', name: 'Electrician', icon: '⚡', color: '#FFCC00' },
    date: new Date(Date.now() - 86400000 * 3),
    time: '2:00 PM',
    status: 'completed',
    service: 'Wiring Installation',
  },
  {
    id: '3',
    worker_id: 'w3',
    worker_name: 'Mike Wilson',
    worker_category: { id: 'cleaner', name: 'Cleaner', icon: '🧹', color: '#34C759' },
    date: new Date(Date.now() - 86400000 * 10),
    time: '9:00 AM',
    status: 'completed',
    service: 'Deep Cleaning',
  },
];

export const BookingsScreen: React.FC = () => {
  const navigation = useNavigation<BookingsNavigationProp>();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');

  const bookings = MOCK_BOOKINGS.filter(b => 
    activeTab === 'upcoming' ? b.status === 'upcoming' : b.status === 'completed'
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return COLORS.info;
      case 'completed': return COLORS.success;
      case 'cancelled': return COLORS.error;
      default: return COLORS.textSecondary;
    }
  };

  const renderBookingCard = ({ item }: { item: Booking }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('WorkerProfile', { workerId: item.worker_id })}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.categoryIcon, { backgroundColor: item.worker_category.color + '20' }]}>
          <Text style={styles.categoryEmoji}>{item.worker_category.icon}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.workerName}>{item.worker_name}</Text>
          <Text style={styles.service}>{item.service}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>📅</Text>
          <Text style={styles.detailText}>{formatDate(item.date)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>⏰</Text>
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>📍</Text>
          <Text style={styles.detailText}>Brooklyn, NY</Text>
        </View>
      </View>

      {item.status === 'upcoming' && (
        <View style={styles.cardFooter}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Reschedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
            <Text style={[styles.actionButtonText, styles.cancelButtonText]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      {item.status === 'completed' && (
        <View style={styles.cardFooter}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('WriteReview', { workerId: item.worker_id })}
          >
            <Text style={styles.actionButtonText}>Write Review</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Book Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="My Bookings" />

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.tabActive]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.tabTextActive]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.tabActive]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.tabTextActive]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={renderBookingCard}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon={activeTab === 'upcoming' ? '📅' : '✅'}
            title={activeTab === 'upcoming' ? 'No Upcoming Bookings' : 'No Completed Bookings'}
            message={
              activeTab === 'upcoming'
                ? 'Book a service to see your upcoming appointments here.'
                : 'Your completed bookings will appear here.'
            }
            actionLabel={activeTab === 'upcoming' ? 'Find a Professional' : undefined}
            onAction={activeTab === 'upcoming' ? () => navigation.navigate('MainTabs') : undefined}
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
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xs,
    marginBottom: SPACING.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.md,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  tabTextActive: {
    color: COLORS.textInverse,
  },
  list: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryEmoji: {
    fontSize: 24,
  },
  headerInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  workerName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  service: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  statusText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  cardBody: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  detailIcon: {
    fontSize: 14,
    marginRight: SPACING.sm,
  },
  detailText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  cardFooter: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  actionButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.md,
    marginHorizontal: SPACING.xs,
  },
  actionButtonText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.primary,
  },
  cancelButton: {
    backgroundColor: COLORS.error + '10',
  },
  cancelButtonText: {
    color: COLORS.error,
  },
});
