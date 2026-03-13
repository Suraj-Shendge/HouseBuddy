// test/widget_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:housebuddy/main.dart';   // <-- adjust the import if your file is elsewhere

void main() {
  testWidgets('Smoke test – app launches', (WidgetTester tester) async {
    // Use the actual root widget name from your code.
    // Replace `HouseBuddyApp` with whatever you call it.
    await tester.pumpWidget(const HouseBuddyApp());

    // Verify a piece of UI that is guaranteed to exist.
    // For the minimal template this is usually the app title.
    expect(find.text('HouseBuddy'), findsOneWidget);
  });
}
