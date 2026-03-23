import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES } from '../constants/theme';
import { RootStackParamList, TabParamList } from '../types';
import { useApp } from '../context/AppContext';

import { OnboardingScreen } from '../screens/OnboardingScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { WorkerProfileScreen } from '../screens/WorkerProfileScreen';
import { WriteReviewScreen } from '../screens/WriteReviewScreen';
import { BookingsScreen } from '../screens/BookingsScreen';
import { BookingsHistoryScreen } from '../screens/BookingsHistoryScreen';
import { MultiStepBookingScreen } from '../screens/MultiStepBookingScreen';
import { PaymentScreen } from '../screens/PaymentScreen';
import { PaymentSuccessScreen } from '../screens/PaymentSuccessScreen';
import { PaymentFailureScreen } from '../screens/PaymentFailureScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { SavedWorkersScreen } from '../screens/SavedWorkersScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { WorkerDashboardScreen } from '../screens/WorkerDashboardScreen';
import { ChatScreen } from '../screens/ChatScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const TabIcon: React.FC<{ name: string; focused: boolean; icon: string }> = ({ name, focused, icon }) => (
  <View style={styles.tabIconContainer}>
    <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>{icon}</Text>
    <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>{name}</Text>
  </View>
);

const HomeTabs: React.FC = () => {
  const { notifications } = useApp();
  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Home" focused={focused} icon="🏠" />,
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Search" focused={focused} icon="🔍" />,
        }}
      />
      <Tab.Screen
        name="BookingsTab"
        component={BookingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <TabIcon name="Bookings" focused={focused} icon="📅" />
              {unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadCount > 9 ? '9+' : unreadCount}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Profile" focused={focused} icon="👤" />,
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const { isOnboarded } = useApp();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
        initialRouteName={isOnboarded ? 'MainTabs' : 'Onboarding'}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="MainTabs" component={HomeTabs} />
        <Stack.Screen 
          name="Search" 
          component={SearchScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen name="WorkerProfile" component={WorkerProfileScreen} />
        <Stack.Screen name="WriteReview" component={WriteReviewScreen} />
        <Stack.Screen name="Bookings" component={BookingsScreen} />
        <Stack.Screen name="BookingsHistory" component={BookingsHistoryScreen} />
        <Stack.Screen 
          name="MultiStepBooking" 
          component={MultiStepBookingScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen 
          name="Payment" 
          component={PaymentScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen 
          name="PaymentSuccess" 
          component={PaymentSuccessScreen}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen 
          name="PaymentFailure" 
          component={PaymentFailureScreen}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="SavedWorkers" component={SavedWorkersScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="WorkerDashboard" component={WorkerDashboardScreen} />
        <Stack.Screen 
          name="Chat" 
          component={ChatScreen}
          options={{ animation: 'slide_from_right' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 0,
    elevation: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    height: 85,
    paddingTop: 10,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 24,
    opacity: 0.5,
  },
  tabIconFocused: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  tabLabelFocused: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: COLORS.error,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: COLORS.textInverse,
    fontSize: 10,
    fontWeight: '700',
  },
});
