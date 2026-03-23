import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, BORDER_RADIUS, SHADOWS, SPACING, FONT_SIZES } from '../constants/theme';
import { RootStackParamList, PaymentMethod } from '../types';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { PaymentCard, PaymentSummary } from '../components/PaymentCard';
import { processPayment } from '../services/paymentService';

type RouteProps = RouteProp<RootStackParamList, 'Payment'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const PaymentScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { bookingId } = route.params;
  const { getBookingById, updateBookingStatus } = useApp();
  
  const booking = getBookingById(bookingId);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');
  const [loading, setLoading] = useState(false);

  if (!booking) {
    return (
      <View style={styles.container}>
        <Text>Booking not found</Text>
      </View>
    );
  }

  const handlePayment = async () => {
    setLoading(true);
    try {
      const result = await processPayment(
        { id: '', amount: booking.final_price || booking.price_estimate || 0, method: selectedMethod, status: 'pending', created_at: new Date(), worker_id: booking.worker_id, worker_name: booking.worker_name, service: booking.service },
        selectedMethod
      );
      
      if (result.status === 'success') {
        updateBookingStatus(bookingId, 'accepted');
        navigation.replace('PaymentSuccess', { bookingId, transactionId: result.transaction_id });
      } else {
        navigation.replace('PaymentFailure', { bookingId, error: 'Payment was declined' });
      }
    } catch (error) {
      navigation.replace('PaymentFailure', { bookingId, error: 'Network error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <PaymentSummary
          service={booking.service}
          workerName={booking.worker_name}
          priceEstimate={booking.final_price || booking.price_estimate || 0}
        />

        <View style={styles.methodsSection}>
          <Text style={styles.sectionTitle}>Select Payment Method</Text>
          
          <PaymentCard
            selected={selectedMethod === 'upi'}
            method="upi"
            onSelect={() => setSelectedMethod('upi')}
          />
          <PaymentCard
            selected={selectedMethod === 'card'}
            method="card"
            onSelect={() => setSelectedMethod('card')}
          />
          <PaymentCard
            selected={selectedMethod === 'wallet'}
            method="wallet"
            onSelect={() => setSelectedMethod('wallet')}
          />
        </View>

        <View style={styles.securityNote}>
          <Text style={styles.securityIcon}>🔒</Text>
          <Text style={styles.securityText}>
            Payments are secure and encrypted. We never store your payment details.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={`Pay $${booking.final_price || booking.price_estimate}`}
          onPress={handlePayment}
          loading={loading}
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
    padding: SPACING.md,
  },
  methodsSection: {
    marginTop: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginTop: SPACING.xl,
    gap: SPACING.sm,
  },
  securityIcon: {
    fontSize: 20,
  },
  securityText: {
    flex: 1,
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  footer: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    ...SHADOWS.medium,
  },
});
