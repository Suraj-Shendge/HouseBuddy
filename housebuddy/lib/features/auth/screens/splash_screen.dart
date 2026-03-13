import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../routes/app_router.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:rive/rive.dart';

class SplashScreen extends ConsumerStatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);
  @override
  ConsumerState<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends ConsumerState<SplashScreen> {
  @override
  void initState() {
    super.initState();
    // Simulate loading then navigate
    Future.delayed(const Duration(seconds: 2), () {
      // Let the router guard decide where to go
      context.go('/');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.primary,
      body: Center(
        child: RiveAnimation.asset(
          'assets/rive/logo.riv',
          fit: BoxFit.contain,
        ).animate().fadeIn(duration: 800.ms),
      ),
    );
  }
}
