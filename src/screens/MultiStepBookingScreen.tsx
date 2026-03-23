import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, BORDER_RADIUS, SHADOWS, SPACING, FONT_SIZES, TIME_SLOTS } from '../constants/theme';
import { RootStackParamList, TimeSlot, BookingFormData } from '../types';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { CalendarPicker } from '../components/CalendarPicker';
import { TimeSlotPicker } from '../components/TimeSlotPicker';
import { WorkerCard } from '../components/WorkerCard';

type RouteProps = RouteProp<RootStackParamList, 'MultiStepBooking'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const MultiStepBookingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { workerId } = route.params;
  const { getWorkerById, createBooking, loading } = useApp();
  
  const worker = getWorkerById(workerId);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    service: '',
    selectedDate: null,
    selectedTimeSlot: null,
    notes: '',
    priceEstimate: worker?.price_min || 50,
    address: '123 Main St, Brooklyn, NY',
  });

  const steps = [
    { number: 1, title: 'Service' },
    { number: 2, title: 'Date & Time' },
    { number: 3, title: 'Details' },
    { number: 4, title: 'Confirm' },
  ];

  const services = useMemo(() => [
    { id: '1', name: 'Pipe Repair', price: 50 },
    { id: '2', name: 'Drain Cleaning', price: 75 },
    { id: '3', name: 'Water Heater', price: 150 },
    { id: '4', name: 'Faucet Replacement', price: 60 },
    { id: '5', name: 'Toilet Repair', price: 65 },
    { id: '6', name: 'General Inspection', price: 40 },
  ], []);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleConfirm = async () => {
    if (!worker) return;
    
    try {
      const booking = await createBooking(
        formData,
        worker.id,
        worker.name,
        worker.phone,
        worker.category
      );
      navigation.replace('Payment', { bookingId: booking.id });
    } catch (error) {
      Alert.alert('Error', 'Failed to create booking. Please try again.');
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!formData.service;
      case 2: return !!formData.selectedDate && !!formData.selectedTimeSlot;
      case 3: return !!formData.address;
      case 4: return true;
      default: return false;
    }
  };

  if (!worker) {
    return (
      <View style={styles.container}>
        <Text>Worker not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <View style={styles.stepItem}>
              <View style={[
                styles.stepCircle,
                currentStep >= step.number && styles.stepCircleActive,
                currentStep === step.number && styles.stepCircleCurrent,
              ]}>
                <Text style={[
                  styles.stepNumber,
                  currentStep >= step.number && styles.stepNumberActive,
                ]}>
                  {step.number}
                </Text>
              </View>
              <Text style={[
                styles.stepTitle,
                currentStep >= step.number && styles.stepTitleActive,
              ]}>
                {step.title}
              </Text>
            </View>
            {index < steps.length - 1 && (
              <View style={[
                styles.stepLine,
                currentStep > step.number && styles.stepLineActive,
              ]} />
            )}
          </React.Fragment>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {currentStep === 1 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepHeading}>Select Service</Text>
            <Text style={styles.stepSubheading}>Choose the service you need</Text>
            
            <View style={styles.servicesGrid}>
              {services.map(service => (
                <TouchableOpacity
                  key={service.id}
                  style={[
                    styles.serviceCard,
                    formData.service === service.name && styles.serviceCardSelected,
                  ]}
                  onPress={() => setFormData(prev => ({
                    ...prev,
                    service: service.name,
                    priceEstimate: service.price,
                  }))}
                >
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.servicePrice}>from ${service.price}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {currentStep === 2 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepHeading}>Select Date & Time</Text>
            <Text style={styles.stepSubheading}>Pick a convenient slot</Text>
            
            <CalendarPicker
              selectedDate={formData.selectedDate}
              onSelectDate={(date) => setFormData(prev => ({ ...prev, selectedDate: date }))}
            />
            
            <TimeSlotPicker
              slots={TIME_SLOTS}
              selectedSlot={formData.selectedTimeSlot}
              onSelectSlot={(slot) => setFormData(prev => ({ ...prev, selectedTimeSlot: slot }))}
            />
          </View>
        )}

        {currentStep === 3 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepHeading}>Additional Details</Text>
            <Text style={styles.stepSubheading}>Help the professional prepare</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Service Address</Text>
              <TextInput
                style={styles.textInput}
                value={formData.address}
                onChangeText={(text) => setFormData(prev => ({ ...prev, address: text }))}
                placeholder="Enter your address"
                multiline
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Notes (Optional)</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={formData.notes}
                onChangeText={(text) => setFormData(prev => ({ ...prev, notes: text }))}
                placeholder="Describe the issue or any special instructions..."
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
        )}

        {currentStep === 4 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepHeading}>Confirm Booking</Text>
            <Text style={styles.stepSubheading}>Review your booking details</Text>
            
            <View style={styles.summaryCard}>
              <View style={styles.summarySection}>
                <Text style={styles.summaryLabel}>Professional</Text>
                <Text style={styles.summaryValue}>{worker.name}</Text>
              </View>
              
              <View style={styles.summarySection}>
                <Text style={styles.summaryLabel}>Service</Text>
                <Text style={styles.summaryValue}>{formData.service}</Text>
              </View>
              
              <View style={styles.summarySection}>
                <Text style={styles.summaryLabel}>Date</Text>
                <Text style={styles.summaryValue}>
                  {formData.selectedDate?.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Text>
              </View>
              
              <View style={styles.summarySection}>
                <Text style={styles.summaryLabel}>Time</Text>
                <Text style={styles.summaryValue}>
                  {formData.selectedTimeSlot?.time} {formData.selectedTimeSlot?.period}
                </Text>
              </View>
              
              <View style={styles.summarySection}>
                <Text style={styles.summaryLabel}>Address</Text>
                <Text style={styles.summaryValue}>{formData.address}</Text>
              </View>
              
              {formData.notes && (
                <View style={styles.summarySection}>
                  <Text style={styles.summaryLabel}>Notes</Text>
                  <Text style={styles.summaryValue}>{formData.notes}</Text>
                </View>
              )}
              
              <View style={styles.divider} />
              
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Estimated Price</Text>
                <Text style={styles.priceValue}>${formData.priceEstimate}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Text>
        </TouchableOpacity>
        
        {currentStep < 4 ? (
          <Button
            title="Continue"
            onPress={handleNext}
            disabled={!canProceed()}
            style={styles.continueButton}
          />
        ) : (
          <Button
            title="Confirm & Pay"
            onPress={handleConfirm}
            loading={loading}
            style={styles.confirmButton}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.surface,
    ...SHADOWS.small,
  },
  stepItem: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    backgroundColor: COLORS.primary,
  },
  stepCircleCurrent: {
    backgroundColor: COLORS.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  stepNumber: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textTertiary,
  },
  stepNumberActive: {
    color: COLORS.textInverse,
  },
  stepTitle: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
    marginTop: SPACING.xs,
  },
  stepTitleActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.borderLight,
    marginHorizontal: SPACING.xs,
    marginBottom: SPACING.md,
  },
  stepLineActive: {
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  stepContent: {
    paddingBottom: SPACING.xl,
  },
  stepHeading: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  stepSubheading: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    marginBottom: SPACING.lg,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  serviceCard: {
    width: '48%',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  serviceCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight + '10',
  },
  serviceName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  servicePrice: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  inputLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  textInput: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  summaryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.medium,
  },
  summarySection: {
    paddingVertical: SPACING.sm,
  },
  summaryLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: SPACING.md,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  priceValue: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.primary,
  },
  footer: {
    flexDirection: 'row',
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    ...SHADOWS.medium,
    gap: SPACING.md,
  },
  backButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  continueButton: {
    flex: 2,
  },
  confirmButton: {
    flex: 2,
  },
});
