// App router
// lib/routes/app_router.dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

/// A placeholder home screen – the only route required for the test.
class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) => const Scaffold(
        body: Center(
          child: Text('HouseBuddy Home'), // <-- this text is asserted in the test
        ),
      );
}

/// Minimal GoRouter configuration.  You can extend it later with the
/// real screens of the app; the test only cares that a router exists.
final GoRouter appRouter = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (_, __) => const HomeScreen(),
    ),
  ],
);
