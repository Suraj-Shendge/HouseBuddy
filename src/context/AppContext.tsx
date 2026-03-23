import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Worker, Review, User, Notification, Booking, Chat, ChatMessage, ServiceCategory, BookingStatus, TimeSlot, WorkerEarnings } from '../types';
import { MOCK_WORKERS, MOCK_REVIEWS, MOCK_USER, MOCK_BOOKINGS, TIME_SLOTS } from '../constants/theme';

interface AppState {
  user: User | null;
  isOnboarded: boolean;
  workers: Worker[];
  reviews: Review[];
  notifications: Notification[];
  savedWorkers: string[];
  location: string;
  bookings: Booking[];
  chats: Chat[];
  workerBookings: Booking[];
  workerEarnings: WorkerEarnings;
  loading: boolean;
}

interface AppContextType extends AppState {
  setUser: (user: User | null) => void;
  setOnboarded: (value: boolean) => void;
  getWorkersByCategory: (category: ServiceCategory) => Worker[];
  getWorkerById: (id: string) => Worker | undefined;
  getReviewsByWorker: (workerId: string) => Review[];
  addReview: (review: Omit<Review, 'id' | 'created_at'>) => void;
  toggleSavedWorker: (workerId: string) => void;
  setLocation: (location: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'created_at' | 'is_read'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  createBooking: (booking: Omit<Booking, 'id' | 'created_at' | 'payment_status'>) => Promise<Booking>;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  getBookingById: (id: string) => Booking | undefined;
  cancelBooking: (bookingId: string) => void;
  sendChatMessage: (chatId: string, message: string) => void;
  getChatMessages: (chatId: string) => ChatMessage[];
  getOrCreateChat: (workerId: string, workerName: string, bookingId: string) => Chat;
  getWorkerBookings: () => Booking[];
  acceptBooking: (bookingId: string) => void;
  rejectBooking: (bookingId: string) => void;
  completeBooking: (bookingId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(MOCK_USER);
  const [isOnboarded, setOnboarded] = useState(false);
  const [workers, setWorkers] = useState<Worker[]>(MOCK_WORKERS);
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [savedWorkers, setSavedWorkers] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 'n1', type: 'booking', title: 'Booking Confirmed', message: 'Your booking with John Smith has been accepted.', created_at: new Date(Date.now() - 3600000), is_read: false },
    { id: 'n2', type: 'payment', title: 'Payment Successful', message: 'Payment of $80 for Pipe Repair completed.', created_at: new Date(Date.now() - 7200000), is_read: true },
  ]);
  const [location, setLocationState] = useState('Brooklyn, NY');
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [chats, setChats] = useState<Chat[]>([]);
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({});
  const [loading, setLoading] = useState(false);

  const workerEarnings: WorkerEarnings = {
    total_earned: 12450,
    this_month: 2150,
    pending: 320,
    completed_jobs: 156,
    ratings_received: 142,
  };

  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const [saved, onboarded, loc, bookingData] = await Promise.all([
        AsyncStorage.getItem('savedWorkers'),
        AsyncStorage.getItem('isOnboarded'),
        AsyncStorage.getItem('userLocation'),
        AsyncStorage.getItem('bookings'),
      ]);
      if (saved) setSavedWorkers(JSON.parse(saved));
      if (onboarded) setOnboarded(JSON.parse(onboarded));
      if (loc) setLocationState(JSON.parse(loc));
      if (bookingData) setBookings(JSON.parse(bookingData));
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  const getWorkersByCategory = (category: ServiceCategory): Worker[] => {
    return workers.filter(w => w.category.id === category.id);
  };

  const getWorkerById = (id: string): Worker | undefined => {
    return workers.find(w => w.id === id);
  };

  const getReviewsByWorker = (workerId: string): Review[] => {
    return reviews.filter(r => r.worker_id === workerId);
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'created_at'>) => {
    const newReview: Review = { ...reviewData, id: `r${Date.now()}`, created_at: new Date() };
    setReviews(prev => [newReview, ...prev]);
  };

  const toggleSavedWorker = async (workerId: string) => {
    const newSaved = savedWorkers.includes(workerId)
      ? savedWorkers.filter(id => id !== workerId)
      : [...savedWorkers, workerId];
    setSavedWorkers(newSaved);
    await AsyncStorage.setItem('savedWorkers', JSON.stringify(newSaved));
  };

  const setLocation = async (loc: string) => {
    setLocationState(loc);
    await AsyncStorage.setItem('userLocation', JSON.stringify(loc));
  };

  const addNotification = (notificationData: Omit<Notification, 'id' | 'created_at' | 'is_read'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: `n${Date.now()}`,
      created_at: new Date(),
      is_read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const createBooking = async (bookingData: Omit<Booking, 'id' | 'created_at' | 'payment_status'>): Promise<Booking> => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newBooking: Booking = {
      ...bookingData,
      id: `b${Date.now()}`,
      created_at: new Date(),
      payment_status: 'pending',
    };
    
    setBookings(prev => {
      const updated = [newBooking, ...prev];
      AsyncStorage.setItem('bookings', JSON.stringify(updated));
      return updated;
    });
    
    addNotification({
      type: 'booking',
      title: 'Booking Created',
      message: `Your booking for ${bookingData.service} has been submitted.`,
    });
    
    setLoading(false);
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
  };

  const getBookingById = (id: string): Booking | undefined => {
    return bookings.find(b => b.id === id);
  };

  const cancelBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, 'cancelled');
    const booking = getBookingById(bookingId);
    if (booking) {
      addNotification({
        type: 'booking',
        title: 'Booking Cancelled',
        message: `Your booking for ${booking.service} has been cancelled.`,
      });
    }
  };

  const getOrCreateChat = (workerId: string, workerName: string, bookingId: string): Chat => {
    const existing = chats.find(c => c.worker_id === workerId && c.booking_id === bookingId);
    if (existing) return existing;
    
    const newChat: Chat = {
      id: `chat_${Date.now()}`,
      booking_id: bookingId,
      worker_id: workerId,
      worker_name: workerName,
      user_id: user?.id || '',
      unread_count: 0,
    };
    setChats(prev => [...prev, newChat]);
    return newChat;
  };

  const sendChatMessage = (chatId: string, message: string) => {
    const chat = chats.find(c => c.id === chatId);
    if (!chat) return;

    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      booking_id: chat.booking_id,
      sender_id: user?.id || '',
      sender_type: 'user',
      message,
      timestamp: new Date(),
      read: true,
    };

    setChatMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage],
    }));

    setChats(prev => prev.map(c => 
      c.id === chatId 
        ? { ...c, last_message: message, last_message_time: new Date() }
        : c
    ));
  };

  const getChatMessages = (chatId: string): ChatMessage[] => {
    return chatMessages[chatId] || [];
  };

  const getWorkerBookings = (): Booking[] => {
    return bookings.filter(b => b.worker_id === 'w1');
  };

  const acceptBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, 'accepted');
    const booking = getBookingById(bookingId);
    if (booking) {
      addNotification({
        type: 'booking',
        title: 'Booking Accepted',
        message: `Your booking for ${booking.service} has been accepted by ${booking.worker_name}.`,
      });
    }
  };

  const rejectBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, 'rejected');
    const booking = getBookingById(bookingId);
    if (booking) {
      addNotification({
        type: 'booking',
        title: 'Booking Rejected',
        message: `Your booking for ${booking.service} has been rejected.`,
      });
    }
  };

  const completeBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, 'completed');
  };

  const value: AppContextType = {
    user,
    isOnboarded,
    workers,
    reviews,
    notifications,
    savedWorkers,
    location,
    bookings,
    chats,
    workerBookings: getWorkerBookings(),
    workerEarnings,
    loading,
    setUser,
    setOnboarded,
    getWorkersByCategory,
    getWorkerById,
    getReviewsByWorker,
    addReview,
    toggleSavedWorker,
    setLocation,
    addNotification,
    markNotificationRead,
    markAllNotificationsRead,
    createBooking,
    updateBookingStatus,
    getBookingById,
    cancelBooking,
    sendChatMessage,
    getChatMessages,
    getOrCreateChat,
    getWorkerBookings,
    acceptBooking,
    rejectBooking,
    completeBooking,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
