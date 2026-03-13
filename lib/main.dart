// lib/main.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:firebase_core/firebase_core.dart';

import 'firebase_options.dart';                 // stub defined above
import 'routes/app_router.dart';               // minimal router
import 'core/constants/theme.dart';            // simple theme

/// The main method – initialise Firebase then launch the app.
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  // ProviderScope gives Riverpod access to the whole widget tree.
  runApp(const ProviderScope(child: HouseBuddyApp()));
}

/// The class name the widget test looks for.
class HouseBuddyApp extends ConsumerWidget {
  const HouseBuddyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp.router(
      title: 'HouseBuddy',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light,          // uses the stub theme we added
      routerConfig: appRouter,       // our minimal router
    );
  }
}
