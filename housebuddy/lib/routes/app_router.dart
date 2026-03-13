import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../features/auth/screens/login_screen.dart';
import '../features/services/screens/service_grid.dart';
import '../features/bookings/screens/booking_flow.dart';
import '../features/payments/screens/payment_screen.dart';
import '../features/profile/screens/profile_screen.dart';
import '../features/auth/screens/onboarding_screen.dart';

final GoRouter appRouter = GoRouter(
  initialLocation: '/splash',
  routes: [
    GoRoute(
      path: '/splash',
      builder: (_, __) => const SplashScreen(),
    ),
    GoRoute(
      path: '/onboarding',
      builder: (_, __) => const OnboardingScreen(),
    ),
    GoRoute(
      path: '/login',
      builder: (_, __) => const LoginScreen(),
    ),
    // ==== Main App ==== //
    GoRoute(
      path: '/home',
      builder: (_, __) => const HomeScreen(),
      routes: [
        GoRoute(
          path: 'services/:serviceId',
          builder: (context, state) => ServiceGridScreen(
            serviceId: state.params['serviceId']!,
          ),
        ),
        GoRoute(
          path: 'provider/:providerId',
          builder: (context, state) => ProviderDetailScreen(
            providerId: state.params['providerId']!,
          ),
        ),
        GoRoute(
          path: 'booking/:providerId',
          builder: (context, state) => BookingFlowScreen(
            providerId: state.params['providerId']!,
          ),
        ),
        GoRoute(
          path: 'payment/:bookingId',
          builder: (context, state) => PaymentScreen(
            bookingId: state.params['bookingId']!,
          ),
        ),
        GoRoute(
          path: 'profile',
          builder: (_, __) => const ProfileScreen(),
        ),
      ],
    ),
  ],
  redirect: (context, state) {
    // Simple guard: if not logged in -> go to login
    final auth = ProviderScope.containerOf(context).read(firebaseUserProvider);
    final isLoggedIn = auth.when(data: (u) => u != null, loading: () => false, error: (_, __) => false);
    final loggingIn = state.subloc == '/login' || state.subloc.startsWith('/onboarding') || state.subloc == '/splash';
    if (!isLoggedIn && !loggingIn) return '/login';
    if (isLoggedIn && loggingIn) return '/home';
    return null;
  },
);
