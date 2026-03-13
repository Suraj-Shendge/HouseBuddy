// Payment screen
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../providers/booking_repository.dart';
import 'package:razorpay_flutter/razorpay_flutter.dart';
import '../../../core/constants/theme.dart';
import 'package:go_router/go_router.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class PaymentScreen extends ConsumerStatefulWidget {
  final String bookingId;
  const PaymentScreen({Key? key, required this.bookingId}) : super(key: key);
  @override
  ConsumerState<PaymentScreen> createState() => _PaymentScreenState();
}

class _PaymentScreenState extends ConsumerState<PaymentScreen> {
  PaymentMethod? _selectedMethod;
  bool _loading = false;
  late Razorpay _razorpay;

  @override
  void initState() {
    super.initState();
    _razorpay = Razorpay();
    _razorpay.on(Razorpay.EVENT_PAYMENT_SUCCESS, _onSuccess);
    _razorpay.on(Razorpay.EVENT_PAYMENT_ERROR, _onError);
    _razorpay.on(Razorpay.EVENT_EXTERNAL_WALLET, _onExternalWallet);
  }

  @override
  void dispose() {
    _razorpay.clear();
    super.dispose();
  }

  Future<void> _onPay() async {
    if (_selectedMethod == null) {
      ScaffoldMessenger.of(context)
          .showSnackBar(const SnackBar(content: Text('Select payment method')));
      return;
    }

    setState(() => _loading = true);

    if (_selectedMethod == PaymentMethod.UPI) {
      // The backend will create a Razorpay order and return the order id + payment url
      final repo = ref.read(bookingRepositoryProvider);
      final result = await FirebaseFunctions.instance
          .httpsCallable('initiateUPIPayment')
          .call({'bookingId': widget.bookingId});

      final orderId = result.data['orderId'] as String;
      final options = {
        'key': 'YOUR_RAZORPAY_KEY_ID', // set via env in cloud functions
        'order_id': orderId,
        'amount': result.data['amount'] as int,
        'name': 'HouseBuddy',
        'description': 'Service payment',
        'prefill': {
          'contact': '',
          'email': '',
        },
        'external': {
          'wallets': ['paytm']
        }
      };

      _razorpay.open(options);
    } else {
      // Cash flow – just mark paymentPending & go back to home.
      await ref.read(bookingRepositoryProvider).completeBooking(
          widget.bookingId, PaymentMethod.Cash);
      setState(() => _loading = false);
      context.go('/home');
    }
  }

  void _onSuccess(PaymentSuccessResponse response) async {
    // Notify backend that payment succeeded
    await ref
        .read(bookingRepositoryProvider)
        .completeBooking(widget.bookingId, PaymentMethod.UPI);
    setState(() => _loading = false);
    context.go('/home');
  }

  void _onError(PaymentFailureResponse response) {
    setState(() => _loading = false);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Payment failed: ${response.message}')),
    );
  }

  void _onExternalWallet(ExternalWalletResponse response) {
    // Optional handling for external wallets
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Payment')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: _loading
            ? const Center(child: CircularProgressIndicator())
            : Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Select payment method', style: AppText.subtitle),
                  ListTile(
                    leading: const Icon(Icons.account_balance_wallet),
                    title: const Text('UPI (Razorpay)'),
                    trailing: Radio<PaymentMethod>(
                      value: PaymentMethod.UPI,
                      groupValue: _selectedMethod,
                      onChanged: (v) => setState(() => _selectedMethod = v),
                    ),
                  ),
                  ListTile(
                    leading: const Icon(Icons.money),
                    title: const Text('Cash (Pay to provider)'),
                    trailing: Radio<PaymentMethod>(
                      value: PaymentMethod.Cash,
                      groupValue: _selectedMethod,
                      onChanged: (v) => setState(() => _selectedMethod = v),
                    ),
                  ),
                  const Spacer(),
                  ElevatedButton(
                    onPressed: _onPay,
                    child: const Text('Pay Now'),
                    style: ElevatedButton.styleFrom(
                      minimumSize: const Size.fromHeight(48),
                    ),
                  ),
                ],
              ),
      ),
    );
  }
}
