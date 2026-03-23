export const COLORS = {
  primary: '#007AFF',
  primaryLight: '#5AC8FA',
  primaryDark: '#0051D4',
  secondary: '#FF9500',
  secondaryLight: '#FFCC00',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  textPrimary: '#1C1C1E',
  textSecondary: '#8E8E93',
  textTertiary: '#AEAEB2',
  textInverse: '#FFFFFF',
  success: '#34C759',
  successLight: '#E8F8ED',
  warning: '#FF9500',
  warningLight: '#FFF4E5',
  error: '#FF3B30',
  errorLight: '#FFE5E3',
  info: '#5856D6',
  infoLight: '#EBEAF8',
  trustHigh: '#34C759',
  trustMedium: '#FF9500',
  trustLow: '#FF3B30',
  starFilled: '#FF9500',
  starEmpty: '#D1D1D6',
  border: '#E5E5EA',
  borderLight: '#F2F2F7',
  shadow: '#000000',
  overlay: 'rgba(0, 0, 0, 0.4)',
  available: '#34C759',
  busy: '#FF9500',
  offline: '#8E8E93',
  bookingPending: '#FF9500',
  bookingAccepted: '#007AFF',
  bookingCompleted: '#34C759',
  bookingCancelled: '#FF3B30',
  bookingRejected: '#FF3B30',
  categories: {
    plumber: '#007AFF',
    electrician: '#FFCC00',
    painter: '#FF3B30',
    cleaner: '#34C759',
    carpenter: '#8E5A3C',
    hvac: '#5856D6',
    landscaper: '#34C759',
    roofer: '#8E8E93',
  },
};

export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const FONT_SIZES = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
  xxl: 28,
  title: 36,
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
};

export const CATEGORIES = [
  { id: 'plumber', name: 'Plumber', icon: '🔧', color: '#007AFF' },
  { id: 'electrician', name: 'Electrician', icon: '⚡', color: '#FFCC00' },
  { id: 'painter', name: 'Painter', icon: '🎨', color: '#FF3B30' },
  { id: 'cleaner', name: 'Cleaner', icon: '🧹', color: '#34C759' },
  { id: 'carpenter', name: 'Carpenter', icon: '🪚', color: '#8E5A3C' },
  { id: 'hvac', name: 'HVAC', icon: '❄️', color: '#5856D6' },
  { id: 'landscaper', name: 'Landscaper', icon: '🌿', color: '#34C759' },
  { id: 'roofer', name: 'Roofer', icon: '🏠', color: '#8E8E93' },
];

export const TIME_SLOTS = [
  { id: '1', time: '8:00', period: 'AM', available: true },
  { id: '2', time: '9:00', period: 'AM', available: true },
  { id: '3', time: '10:00', period: 'AM', available: true },
  { id: '4', time: '11:00', period: 'AM', available: false },
  { id: '5', time: '12:00', period: 'PM', available: true },
  { id: '6', time: '1:00', period: 'PM', available: true },
  { id: '7', time: '2:00', period: 'PM', available: true },
  { id: '8', time: '3:00', period: 'PM', available: false },
  { id: '9', time: '4:00', period: 'PM', available: true },
  { id: '10', time: '5:00', period: 'PM', available: true },
  { id: '11', time: '6:00', period: 'PM', available: false },
  { id: '12', time: '7:00', period: 'PM', available: true },
];

export const SERVICES = [
  { id: '1', name: 'Pipe Repair', price: 50 },
  { id: '2', name: 'Drain Cleaning', price: 75 },
  { id: '3', name: 'Water Heater Installation', price: 150 },
  { id: '4', name: 'Faucet Replacement', price: 60 },
  { id: '5', name: 'Toilet Repair', price: 65 },
  { id: '6', name: 'General Inspection', price: 40 },
];

export const ONBOARDING_SCREENS = [
  { id: '1', image: '🔍', title: 'Find Trusted Professionals', description: 'Discover verified local service providers with real reviews and trust scores.', backgroundColor: '#007AFF' },
  { id: '2', image: '⭐', title: 'Read Real Reviews', description: 'See genuine reviews from homeowners like you. Our trust score helps you choose wisely.', backgroundColor: '#34C759' },
  { id: '3', image: '📸', title: 'View Work Proof', description: 'Browse photos of completed work. See the quality of service before you book.', backgroundColor: '#FF9500' },
  { id: '4', image: '📱', title: 'Book with Confidence', description: 'Schedule appointments easily and manage all your bookings in one place.', backgroundColor: '#5856D6' },
];

export const SEARCH_SUGGESTIONS = [
  { id: '1', text: 'Plumber near me', type: 'service' },
  { id: '2', text: 'Electrician', type: 'service' },
  { id: '3', text: 'Emergency repair', type: 'service' },
  { id: '4', text: 'Brooklyn, NY', type: 'location' },
  { id: '5', text: 'Manhattan, NY', type: 'location' },
];

export const MOCK_USER = { id: 'u1', name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 8900', location: 'Brooklyn, NY', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' };

export const MOCK_WORKERS = [
  { id: 'w1', name: 'John Smith', category: { id: 'plumber', name: 'Plumber', icon: '🔧', color: '#007AFF' }, location: 'Brooklyn, NY', phone: '+1 234 567 8901', images: ['https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400'], avg_rating: 4.8, trust_score: 92, description: 'Experienced plumber with over 10 years of service.', reviews_count: 124, price_range: '$50 - $150', price_min: 50, price_max: 150, years_experience: 12, is_available: true, availability_status: 'available', distance: 1.2, response_speed: 95, completed_jobs: 340 },
  { id: 'w2', name: 'Sarah Johnson', category: { id: 'electrician', name: 'Electrician', icon: '⚡', color: '#FFCC00' }, location: 'Manhattan, NY', phone: '+1 234 567 8902', images: ['https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400'], avg_rating: 4.9, trust_score: 96, description: 'Master electrician providing residential and commercial electrical services.', reviews_count: 89, price_range: '$75 - $200', price_min: 75, price_max: 200, years_experience: 15, is_available: true, availability_status: 'busy', distance: 2.5, response_speed: 98, completed_jobs: 256 },
  { id: 'w3', name: 'Mike Wilson', category: { id: 'cleaner', name: 'Cleaner', icon: '🧹', color: '#34C759' }, location: 'Queens, NY', phone: '+1 234 567 8903', images: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400'], avg_rating: 4.7, trust_score: 88, description: 'Professional cleaning service for homes and offices.', reviews_count: 67, price_range: '$40 - $100', price_min: 40, price_max: 100, years_experience: 8, is_available: false, availability_status: 'offline', distance: 3.1, response_speed: 85, completed_jobs: 189 },
  { id: 'w4', name: 'David Brown', category: { id: 'painter', name: 'Painter', icon: '🎨', color: '#FF3B30' }, location: 'Brooklyn, NY', phone: '+1 234 567 8904', images: ['https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400'], avg_rating: 4.6, trust_score: 85, description: 'Interior and exterior painting specialist.', reviews_count: 45, price_range: '$100 - $300', price_min: 100, price_max: 300, years_experience: 10, is_available: true, availability_status: 'available', distance: 1.8, response_speed: 88, completed_jobs: 134 },
  { id: 'w5', name: 'Emily Davis', category: { id: 'carpenter', name: 'Carpenter', icon: '🪚', color: '#8E5A3C' }, location: 'Bronx, NY', phone: '+1 234 567 8905', images: [], avg_rating: 4.8, trust_score: 91, description: 'Custom woodworking and furniture repair.', reviews_count: 38, price_range: '$80 - $180', price_min: 80, price_max: 180, years_experience: 14, is_available: true, availability_status: 'available', distance: 4.2, response_speed: 92, completed_jobs: 98 },
  { id: 'w6', name: 'Robert Chen', category: { id: 'hvac', name: 'HVAC', icon: '❄️', color: '#5856D6' }, location: 'Staten Island, NY', phone: '+1 234 567 8906', images: [], avg_rating: 4.5, trust_score: 82, description: 'Heating, ventilation, and air conditioning services.', reviews_count: 52, price_range: '$90 - $250', price_min: 90, price_max: 250, years_experience: 11, is_available: true, availability_status: 'busy', distance: 5.0, response_speed: 80, completed_jobs: 167 },
];

export const MOCK_REVIEWS = [
  { id: 'r1', worker_id: 'w1', user_id: 'u2', user_name: 'Alice M.', rating: 5, review_text: 'Excellent work! Very professional and clean.', created_at: new Date(Date.now() - 86400000) },
  { id: 'r2', worker_id: 'w1', user_id: 'u3', user_name: 'Bob K.', rating: 5, review_text: 'Great service, on time and very courteous.', created_at: new Date(Date.now() - 172800000) },
  { id: 'r3', worker_id: 'w2', user_id: 'u4', user_name: 'Carol S.', rating: 5, review_text: 'Sarah was amazing! She installed our ceiling fans.', created_at: new Date(Date.now() - 259200000) },
];

const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 172800000).toISOString().split('T')[0];
const nextWeek = new Date(Date.now() + 172800000).toISOString().split('T')[0];

export const MOCK_BOOKINGS = [
  { id: 'b1', user_id: 'u1', worker_id: 'w1', worker_name: 'John Smith', worker_category: { id: 'plumber', name: 'Plumber', icon: '🔧', color: '#007AFF' }, worker_phone: '+1 234 567 8901', worker_image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=100', date: tomorrow, time: '10:00 AM', status: 'accepted', service: 'Pipe Repair', service_notes: 'Kitchen sink is leaking', price_estimate: 75, final_price: 80, payment_status: 'success', payment_method: 'upi', address: '123 Main St, Brooklyn, NY', created_at: new Date(Date.now() - 3600000) },
  { id: 'b2', user_id: 'u1', worker_id: 'w2', worker_name: 'Sarah Johnson', worker_category: { id: 'electrician', name: 'Electrician', icon: '⚡', color: '#FFCC00' }, worker_phone: '+1 234 567 8902', worker_image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=100', date: yesterday, time: '2:00 PM', status: 'completed', service: 'Wiring Installation', price_estimate: 150, final_price: 145, payment_status: 'success', payment_method: 'card', address: '123 Main St, Brooklyn, NY', created_at: new Date(Date.now() - 259200000) },
  { id: 'b3', user_id: 'u1', worker_id: 'w3', worker_name: 'Mike Wilson', worker_category: { id: 'cleaner', name: 'Cleaner', icon: '🧹', color: '#34C759' }, worker_phone: '+1 234 567 8903', date: nextWeek, time: '9:00 AM', status: 'pending', service: 'Deep Cleaning', service_notes: 'Full house cleaning needed', price_estimate: 120, payment_status: 'pending', address: '456 Oak Ave, Brooklyn, NY', created_at: new Date(Date.now() - 7200000) },
  { id: 'b4', user_id: 'u1', worker_id: 'w4', worker_name: 'David Brown', worker_category: { id: 'painter', name: 'Painter', icon: '🎨', color: '#FF3B30' }, worker_phone: '+1 234 567 8904', date: yesterday, time: '11:00 AM', status: 'completed', service: 'Wall Painting', price_estimate: 200, final_price: 195, payment_status: 'success', payment_method: 'wallet', address: '789 Pine St, Brooklyn, NY', created_at: new Date(Date.now() - 345600000) },
];
