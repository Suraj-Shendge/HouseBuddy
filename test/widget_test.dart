// test/widget_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:housebuddy/main.dart';   // <-- points to the file that defines MyApp

void main() {
  testWidgets('smoke test – app shows title', (WidgetTester tester) async {
    // Use the actual widget name from your code:
    await tester.pumpWidget(const MyApp());

    // Verify that the title you display on the home screen appears.
    // Adjust the string to match whatever you have in the UI.
    expect(find.text('HouseBuddy'), findsOneWidget);
  });
}
