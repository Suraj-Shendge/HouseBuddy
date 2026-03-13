// test/widget_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:housebuddy/main.dart';   // <-- make sure this imports the file where the widget lives

void main() {
  testWidgets('smoke test – app launches', (WidgetTester tester) async {
    // 👇  <-- Use the real widget name.  Common names are MyApp, AppRoot, HouseBuddyApp, etc.
    await tester.pumpWidget(const MyApp());   // <-- replace `MyApp` with your widget class

    // Example assertion – adjust the text to something that definitely appears on the first screen.
    expect(find.text('HouseBuddy'), findsOneWidget);
  });
}
