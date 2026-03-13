// lib/routes/app_router.dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) => const Scaffold(
        body: Center(
          child: Text('HouseBuddy Home'), // the text the test looks for
        ),
      );
}

// Minimal GoRouter – you can expand it later with all your real screens.
final GoRouter appRouter = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (_, __) => const HomeScreen(),
    ),
  ],
);
