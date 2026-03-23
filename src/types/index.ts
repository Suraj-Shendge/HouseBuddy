export type ServiceCategory = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export type AvailabilityStatus = 'available' | 'busy' | 'offline';
export type BookingStatus = 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
export type PaymentMethod = 'upi' | 'card' | 'wallet';
export type PaymentStatus = 'pending' | 'success' | 'failed';

export interface Worker {
  id: string;
  name: string;
  category: ServiceCategory;
  location: string;
  phone: string;
  images: string[];
  avg_rating: number;
  trust_score: number;
  description: string;
  reviews_count: number;
  price_range?: string;
  price_min?: number;
  price_max?: number;
  years_experience?: number;
  is_available?: boolean;
  availability_status?: AvailabilityStatus;
  distance?: number;
  response_speed?: number;
  completed_jobs?: number;
}

export interface Review {
  id: string;
  worker_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  review_text: string;
  created_at: Date;
  user_avatar?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  location?: string;
}

export interface Notification {
  id: string;
  type: 'review' | 'booking' | 'payment' | 'promo' | 'update' | 'message';
  title: string;
  message: string;
  created_at: Date;
  is_read: boolean;
  data?: Record<string, unknown>;
}

export interface Booking {
  id: string;
  user_id: string;
  worker_id: string;
  worker_name: string;
  worker_category: ServiceCategory;
  worker_phone: string;
  worker_image?: string;
  date: string;
  time: string;
  time_slot?: TimeSlot;
  status: BookingStatus;
  service: string;
  service_notes?: string;
  price_estimate?: number;
  final_price?: number;
  payment_status?: PaymentStatus;
  payment_method?: PaymentMethod;
  address?: string;
  created_at: Date;
}

export interface TimeSlot {
  id: string;
  time: string;
  period: 'AM' | 'PM';
  available: boolean;
}

export interface ChatMessage {
  id: string;
  booking_id: string;
  sender_id: string;
  sender_type: 'user' | 'worker';
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface Chat {
  id: string;
  booking_id: string;
  worker_id: string;
  worker_name: string;
  user_id: string;
  last_message?: string;
  last_message_time?: Date;
  unread_count: number;
}

export interface TrustScoreDetails {
  overall: number;
  rating_weight: number;
  jobs_weight: number;
  response_speed_weight: number;
  badge: 'high' | 'medium' | 'low';
  progress: number;
}

export interface WorkerEarnings {
  total_earned: number;
  this_month: number;
  pending: number;
  completed_jobs: number;
  ratings_received: number;
}

export interface PaymentDetails {
  id: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transaction_id?: string;
  created_at: Date;
  worker_id: string;
  worker_name: string;
  service: string;
}

export interface BookingFormData {
  service: string;
  selectedDate: Date | null;
  selectedTimeSlot: TimeSlot | null;
  notes: string;
  priceEstimate: number;
  address: string;
}

export interface SearchFilters {
  category?: string;
  sortBy: 'rating' | 'distance' | 'reviews' | 'price';
  minRating?: number;
  maxPrice?: number;
  availability?: AvailabilityStatus;
}

export type Category = ServiceCategory;

export interface SearchSuggestion {
  id: string;
  text: string;
  type: 'service' | 'location';
}

export interface RootStackParamList {
  Splash: undefined;
  Onboarding: undefined;
  MainTabs: undefined;
  Search: { query?: string; categoryId?: string };
  WorkerProfile: { workerId: string };
  WriteReview: { workerId: string };
  Bookings: undefined;
  BookingsHistory: undefined;
  BookingDetails: { bookingId: string };
  MultiStepBooking: { workerId: string };
  Payment: { bookingId: string };
  PaymentSuccess: { bookingId: string; transactionId?: string };
  PaymentFailure: { bookingId: string; error?: string };
  Notifications: undefined;
  SavedWorkers: undefined;
  Profile: undefined;
  WorkerDashboard: undefined;
  Chat: { chatId: string; workerName: string };
  WorkerChat: { bookingId: string };
  [key: string]: undefined | object;
}

export type TabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  BookingsTab: undefined;
  ProfileTab: undefined;
  [key: string]: undefined;
};
