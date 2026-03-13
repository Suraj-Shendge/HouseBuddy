// Booking flow
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../providers/booking_repository.dart';
import 'package:go_router/go_router.dart';
import '../../../core/constants/theme.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class BookingFlowScreen extends ConsumerStatefulWidget {
  final String providerId;
  const BookingFlowScreen({Key? key, required this.providerId}) : super(key: key);
  @override
  ConsumerState<BookingFlowScreen> createState() => _BookingFlowScreenState();
}

class _BookingFlowScreenState extends ConsumerState<BookingFlowScreen> {
  String? _selectedServiceId;
  final _addressController = TextEditingController();
  GeoPoint? _userLocation;

  @override
  void initState() {
    super.initState();
    _determinePosition();
  }

  Future<void> _determinePosition() async {
    final pos = await Geolocator.getCurrentPosition();
    setState(() {
      _userLocation = GeoPoint(pos.latitude, pos.longitude);
    });
  }

  Future<void> _confirmBooking() async {
    if (_selectedServiceId == null ||
        _addressController.text.isEmpty ||
        _userLocation == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please fill all fields')),
      );
      return;
    }

    final repo = ref.read(bookingRepositoryProvider);
    final bookingId = await repo.createBooking(
      providerId: widget.providerId,
      serviceId: _selectedServiceId!,
      address: _addressController.text,
      latLon: _userLocation!,
    );

    // Navigate to payment screen (or waiting screen)
    context.go('/home/payment/$bookingId');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Book Service')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: _userLocation == null
            ? const Center(child: CircularProgressIndicator())
            : Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Select Service', style: AppText.subtitle),
                  const SizedBox(height: 8),
                  DropdownButtonFormField<String>(
                    items: const [
                      DropdownMenuItem(value: 'sid_plumber', child: Text('Plumbing')),
                      DropdownMenuItem(value: 'sid_electrician', child: Text('Electrical')),
                      // Add all categories
                    ],
                    onChanged: (v) => setState(() => _selectedServiceId = v),
                    hint: const Text('Choose a service'),
                  ),
                  const SizedBox(height: 16),
                  TextFormField(
                    controller: _addressController,
                    decoration: const InputDecoration(
                      labelText: 'Address',
                      prefixIcon: Icon(Icons.home),
                    ),
                  ),
                  const Spacer(),
                  ElevatedButton(
                    onPressed: _confirmBooking,
                    child: const Text('Confirm & Continue'),
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
