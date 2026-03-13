import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/booking.dart';
import '../models/transaction.dart';
import 'package:uuid/uuid.dart';
import 'package:firebase_functions/firebase_functions.dart';

final bookingRepositoryProvider = Provider<BookingRepository>((ref) {
  final firestore = ref.read(firestoreProvider);
  final functions = FirebaseFunctions.instance;
  return BookingRepository(firestore, functions);
});

class BookingRepository {
  final FirebaseFirestore _db;
  final FirebaseFunctions _functions;
  BookingRepository(this._db, this._functions);

  /// Creates a booking via Cloud Function `createBooking`
  Future<String> createBooking({
    required String providerId,
    required String serviceId,
    required String address,
    required GeoPoint latLon,
    DateTime? scheduledAt,
  }) async {
    final result = await _functions
        .httpsCallable('createBooking')
        .call({
          'providerId': providerId,
          'serviceId': serviceId,
          'address': address,
          'lat': latLon.latitude,
          'lng': latLon.longitude,
          'scheduledAt': scheduledAt?.millisecondsSinceEpoch,
        })
        .timeout(const Duration(seconds: 8));
    return result.data['bookingId'] as String;
  }

  Stream<List<Booking>> watchProviderBookings(String providerId) {
    return _db
        .collection('bookings')
        .where('providerId', isEqualTo: providerId)
        .orderBy('createdAt', descending: true)
        .snapshots()
        .map((snap) => snap.docs
            .map((doc) => Booking.fromJson(doc.data()))
            .toList());
  }

  /// Accept a booking
  Future<void> acceptBooking(String bookingId) async {
    await _functions.httpsCallable('acceptBooking').call({'bookingId': bookingId});
  }

  /// Update job status (arriving, inProgress, completed)
  Future<void> updateJobStatus(String bookingId, BookingStatus status) async {
    await _functions
        .httpsCallable('updateJobStatus')
        .call({'bookingId': bookingId, 'status': status.name});
  }

  /// Complete a booking (choose payment method)
  Future<void> completeBooking(String bookingId, PaymentMethod paymentMethod) async {
    await _functions.httpsCallable('completeBooking').call({
      'bookingId': bookingId,
      'paymentMethod': paymentMethod.name,
    });
  }

  /// Pay pending commission (for cash jobs)
  Future<void> payCommission(String providerId, double amount) async {
    await _functions.httpsCallable('payCommission').call({
      'providerId': providerId,
      'amount': amount,
    });
  }
}
