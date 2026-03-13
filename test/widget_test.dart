// test/widget_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:housebuddy/main.dart';   // imports HouseBuddyApp

void main() {
  testWidgets('smoke test – app launches', (WidgetTester tester) async {
    // Pump the wrapper widget.
    await tester.pumpWidget(const HouseBuddyApp());

    // The stub router shows a Scaffold with this exact text.
    expect(find.text('HouseBuddy Home'), findsOneWidget);
  });
}
