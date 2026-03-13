import 'package:flutter_test/flutter_test.dart';
import 'package:housebuddy/main.dart';

void main() {
  testWidgets('App starts and shows the Home screen', (WidgetTester tester) async {
    // Build the app and trigger a frame.
    await tester.pumpWidget(const HouseBuddyApp());

    // Verify that the app shows a widget that contains the title "HouseBuddy"
    // (adjust the string if you renamed the title in your UI)
    expect(find.text('HouseBuddy'), findsOneWidget);
  });
}
