// lib/main.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:firebase_core/firebase_core.dart';

import 'firebase_options.dart';               // stub defined above
import 'routes/app_router.dart';               // minimal router
import 'core/constants/theme.dart';            // simple theme

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  // ProviderScope gives the full app access to Riverpod providers.
  runApp(const ProviderScope(child: HouseBuddyApp()));
}

/// The widget name that the test imports (`HouseBuddyApp`).
class HouseBuddyApp extends StatelessWidget {
  const HouseBuddyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'HouseBuddy',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light,
      routerConfig: appRouter,
    );
  }
}
