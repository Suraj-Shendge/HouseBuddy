import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

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

export type RootStackParamList = {
  Main: undefined;
  Search: { query?: string; categoryId?: string };
  WorkerProfile: { workerId: string };
  WriteReview: { workerId: string };
  MultiStepBooking: { workerId: string };
  Payment: { bookingId: string };
  PaymentSuccess: { bookingId: string };
  PaymentFailure: { bookingId: string };
  Chat: { workerId: string };
  WorkerDashboard: undefined;
  Notifications: undefined;
  SavedWorkers: undefined;
};

export type TabParamList = {
  HomeTab: undefined;
  SearchTab: { query?: string; categoryId?: string };
  BookingsTab: undefined;
  ProfileTab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const TabIcon: React.FC<{ focused: boolean; icon: string }> = ({ focused, icon }) => (
  <Text style={{ fontSize: focused ? 26 : 22, opacity: focused ? 1 : 0.6 }}>{icon}</Text>
);

const HomeTabs: React.FC = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: { height: 85, paddingTop: 10, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee' },
    }}
  >
    <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="🏠" /> }} />
    <Tab.Screen name="SearchTab" component={SearchScreen} options={{ tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="🔍" /> }} />
    <Tab.Screen name="BookingsTab" component={BookingsScreen} options={{ tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="📅" /> }} />
    <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="👤" /> }} />
  </Tab.Navigator>
);

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={HomeTabs} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="WorkerProfile" component={WorkerProfileScreen} />
        <Stack.Screen name="WriteReview" component={WriteReviewScreen} />
        <Stack.Screen name="MultiStepBooking" component={MultiStepBookingScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
        <Stack.Screen name="PaymentFailure" component={PaymentFailureScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="WorkerDashboard" component={WorkerDashboardScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="SavedWorkers" component={SavedWorkersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
