import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, BORDER_RADIUS, SHADOWS, SPACING, FONT_SIZES } from '../constants/theme';
import { PaymentMethod } from '../types';

interface PaymentCardProps {
  selected: boolean;
  method: PaymentMethod;
  onSelect: () => void;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({ selected, method, onSelect }) => {
  const getMethodConfig = () => {
    switch (method) {
      case 'upi':
        return { icon: '📱', name: 'UPI', subtitle: 'Pay instantly with any UPI app' };
      case 'card':
        return { icon: '💳', name: 'Credit/Debit Card', subtitle: 'Visa, Mastercard, RuPay' };
      case 'wallet':
        return { icon: '👛', name: 'Wallet', subtitle: 'Paytm, PhonePe, Amazon Pay' };
      default:
        return { icon: '💰', name: 'Other', subtitle: '' };
    }
  };

  const config = getMethodConfig();

  return (
    <TouchableOpacity 
      style={[styles.container, selected && styles.selected]} 
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{config.icon}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{config.name}</Text>
        <Text style={styles.subtitle}>{config.subtitle}</Text>
      </View>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
};

interface PaymentSummaryProps {
  service: string;
  workerName: string;
  priceEstimate: number;
  tax?: number;
  discount?: number;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  service,
  workerName,
  priceEstimate,
  tax = 0,
  discount = 0,
}) => {
  const total = priceEstimate + tax - discount;

  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryTitle}>Payment Summary</Text>
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Service</Text>
        <Text style={styles.summaryValue}>{service}</Text>
      </View>
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Provider</Text>
        <Text style={styles.summaryValue}>{workerName}</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Service Charge</Text>
        <Text style={styles.summaryValue}>${priceEstimate}</Text>
      </View>
      
      {tax > 0 && (
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax</Text>
          <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
        </View>
      )}
      
      {discount > 0 && (
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: COLORS.success }]}>Discount</Text>
          <Text style={[styles.summaryValue, { color: COLORS.success }]}>-${discount.toFixed(2)}</Text>
        </View>
      )}
      
      <View style={styles.divider} />
      
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginBottom: SPACING.sm,
  },
  selected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight + '10',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  icon: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  summaryContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  summaryTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  summaryLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: SPACING.sm,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.sm,
  },
  totalLabel: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  totalValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
