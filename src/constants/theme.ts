// Premium iOS-inspired theme with professional aesthetics
export const COLORS = {
  // Primary palette - refined blue
  primary: '#1A1A2E',
  primaryLight: '#16213E', 
  primaryAccent: '#0F3460',
  
  // Brand accent - warm gold
  accent: '#E94560',
  accentLight: '#FF6B6B',
  accentGold: '#FFB347',
  
  // Neutrals - warm grays
  background: '#FAFAFA',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  
  // Text hierarchy
  text: '#1A1A1A',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textInverse: '#FFFFFF',
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Trust indicators
  trustExcellent: '#059669',
  trustGood: '#10B981',
  trustFair: '#F59E0B',
  
  // iOS-style
  iosBlue: '#007AFF',
  iosGray: '#8E8E93',
  iosBg: '#F2F2F7',
  iosSeparator: '#C6C6C8',
  iosSystemFill: 'rgba(120, 120, 128, 0.2)',
  
  // Shadows
  shadow: '#000000',
  
  // Gradients (as arrays for LinearGradient)
  gradientPrimary: ['#1A1A2E', '#16213E', '#0F3460'],
  gradientAccent: ['#E94560', '#FF6B6B'],
  gradientGold: ['#FFB347', '#FF6B6B'],
  gradientHero: ['#667EEA', '#764BA2'],
};

export const FONTS = {
  display: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  body: {
    regular: 'System',
    medium: 'System',
  },
};

export const SIZES = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 14,
  lg: 16,
  xl: 18,
  xxl: 24,
  title: 32,
  hero: 40,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 6,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.16,
    shadowRadius: 40,
    elevation: 10,
  },
};

// Premium illustrations (replace emoji)
export const ILLUSTRATIONS = {
  hero: {
    home: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    worker: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80',
    search: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&q=80',
  },
  categories: {
    plumber: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=200&q=80',
    electrician: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=200&q=80',
    cleaner: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&q=80',
    painter: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=200&q=80',
    carpenter: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&q=80',
    hvac: 'https://images.unsplash.com/photo-1631545806609-2dfd2a7159b6?w=200&q=80',
  },
};

export const TIME_SLOTS = [
  { id: '1', time: '08:00 AM', period: 'AM' as const },
  { id: '2', time: '09:00 AM', period: 'AM' as const },
  { id: '3', time: '10:00 AM', period: 'AM' as const },
  { id: '4', time: '11:00 AM', period: 'AM' as const },
  { id: '5', time: '12:00 PM', period: 'PM' as const },
  { id: '6', time: '01:00 PM', period: 'PM' as const },
  { id: '7', time: '02:00 PM', period: 'PM' as const },
  { id: '8', time: '03:00 PM', period: 'PM' as const },
  { id: '9', time: '04:00 PM', period: 'PM' as const },
  { id: '10', time: '05:00 PM', period: 'PM' as const },
  { id: '11', time: '06:00 PM', period: 'PM' as const },
  { id: '12', time: '07:00 PM', period: 'PM' as const },
];
