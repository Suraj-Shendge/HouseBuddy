import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { Header } from '../components';
import { RootStackParamList } from '../types';

type ProfileNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  const { user, reviews } = useApp();

  const menuItems = [
    { icon: '👤', label: 'Edit Profile', action: () => Alert.alert('Coming Soon', 'Profile editing will be available soon!') },
    { icon: '📍', label: 'My Locations', action: () => Alert.alert('Coming Soon', 'Location management will be available soon!') },
    { icon: '💳', label: 'Payment Methods', action: () => Alert.alert('Coming Soon', 'Payment management will be available soon!') },
    { icon: '🔔', label: 'Notifications', action: () => navigation.navigate('Notifications') },
    { icon: '🔒', label: 'Privacy & Security', action: () => Alert.alert('Coming Soon', 'Privacy settings will be available soon!') },
    { icon: '❓', label: 'Help & Support', action: () => Alert.alert('Coming Soon', 'Help center will be available soon!') },
    { icon: '📝', label: 'Terms of Service', action: () => Alert.alert('Terms', 'Terms of Service document would open here.') },
    { icon: '🔐', label: 'Logout', action: () => Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => {} },
    ]) },
  ];

  return (
    <View style={styles.container}>
      <Header title="Profile" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.name?.split(' ').map(n => n[0]).join('') || 'Guest'}
              </Text>
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Text style={styles.editAvatarIcon}>📷</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{user?.name || 'Guest User'}</Text>
          <Text style={styles.email}>{user?.email || 'guest@example.com'}</Text>
          <View style={styles.memberSince}>
            <Text style={styles.memberIcon}>⭐</Text>
            <Text style={styles.memberText}>Member since 2024</Text>
          </View>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{reviews.length}</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.action}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={[
                  styles.menuLabel,
                  item.label === 'Logout' && styles.logoutLabel,
                ]}>
                  {item.label}
                </Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>HouseBuddy v1.0.0</Text>
          <Text style={styles.footerSubtext}>Made with ❤️ for homeowners</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.textInverse,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  editAvatarIcon: {
    fontSize: 16,
  },
  name: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  email: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  memberSince: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary + '20',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  memberIcon: {
    fontSize: 14,
    marginRight: SPACING.xs,
  },
  memberText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.secondary,
    fontWeight: '600',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textTertiary,
    marginTop: SPACING.xs,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  menuSection: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    marginBottom: SPACING.xl,
    ...SHADOWS.small,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: SPACING.md,
  },
  menuLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
  },
  logoutLabel: {
    color: COLORS.error,
  },
  menuArrow: {
    fontSize: 20,
    color: COLORS.textTertiary,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    paddingBottom: SPACING.xxxl,
  },
  footerText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textTertiary,
    marginBottom: SPACING.xs,
  },
  footerSubtext: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
  },
});
