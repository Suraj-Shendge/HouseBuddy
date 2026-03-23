import { useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { Booking, BookingStatus, BookingFormData } from '../types';

export const useBooking = () => {
  const { createBooking, updateBookingStatus, cancelBooking, getBookingById, bookings } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createNewBooking = useCallback(async (formData: BookingFormData, workerId: string, workerName: string, workerPhone: string, category: any) => {
    setLoading(true);
    setError(null);
    try {
      const booking = await createBooking({
        user_id: 'u1',
        worker_id: workerId,
        worker_name: workerName,
        worker_category: category,
        worker_phone: workerPhone,
        date: formData.selectedDate?.toISOString().split('T')[0] || '',
        time: formData.selectedTimeSlot?.time ? `${formData.selectedTimeSlot.time} ${formData.selectedTimeSlot.period}` : '',
        time_slot: formData.selectedTimeSlot || undefined,
        status: 'pending',
        service: formData.service,
        service_notes: formData.notes,
        price_estimate: formData.priceEstimate,
        address: formData.address,
      });
      return booking;
    } catch (err) {
      setError('Failed to create booking');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [createBooking]);

  const cancel = useCallback((bookingId: string) => {
    cancelBooking(bookingId);
  }, [cancelBooking]);

  const getStatusColor = (status: BookingStatus): string => {
    const colors: Record<BookingStatus, string> = {
      pending: '#FF9500',
      accepted: '#007AFF',
      rejected: '#FF3B30',
      completed: '#34C759',
      cancelled: '#8E8E93',
    };
    return colors[status];
  };

  const getStatusLabel = (status: BookingStatus): string => {
    const labels: Record<BookingStatus, string> = {
      pending: 'Pending',
      accepted: 'Accepted',
      rejected: 'Rejected',
      completed: 'Completed',
      cancelled: 'Cancelled',
    };
    return labels[status];
  };

  const upcomingBookings = bookings.filter(b => b.status === 'pending' || b.status === 'accepted');
  const pastBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled' || b.status === 'rejected');

  return {
    createNewBooking,
    cancel,
    getBookingById,
    updateBookingStatus,
    loading,
    error,
    upcomingBookings,
    pastBookings,
    getStatusColor,
    getStatusLabel,
  };
};
