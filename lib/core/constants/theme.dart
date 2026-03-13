// lib/core/constants/theme.dart
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppColors {
  static const primary = Color(0xFF5B8DEF);
  static const accent = Color(0xFF00C2A8);
  static const background = Color(0xFFF7F9FC);
  static const surface = Colors.white;
  static const onPrimary = Colors.white;
  static const onSurface = Color(0xFF212121);
  static const disabled = Color(0xFFB0B0B0);
}

class AppTheme {
  // A very small, fully‑functional light theme.
  static ThemeData get light => ThemeData(
        brightness: Brightness.light,
        primaryColor: AppColors.primary,
        scaffoldBackgroundColor: AppColors.background,
        colorScheme: const ColorScheme.light(
          primary: AppColors.primary,
          secondary: AppColors.accent,
        ),
        textTheme: GoogleFonts.interTextTheme(),
        appBarTheme: const AppBarTheme(
          backgroundColor: AppColors.primary,
          foregroundColor: AppColors.onPrimary,
          elevation: 0,
        ),
        // NOTE: In Flutter 3.19+ ThemeData.cardTheme expects a CardThemeData,
        // not the older CardTheme widget.
        cardTheme: const CardThemeData(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(20)),
          ),
          elevation: 4,
          margin: EdgeInsets.all(12),
        ),
      );
}
