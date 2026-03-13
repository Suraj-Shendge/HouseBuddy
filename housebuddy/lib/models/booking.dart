import 'package:freezed_annotation/freezed_annotation.dart';

part 'booking.freezed.dart';
part 'booking.g.dart';

enum BookingStatus {
  requested,
  accepted,
  arriving,
  inProgress,
  completed,
  paymentPending,
  finished,
  cancelled,
}

enum PaymentMethod { UPI, Cash }

enum PaymentStatus { unpaid, paid }

@freezed
class Booking with _$Booking {
  const factory Booking({
    required String bid,
    required String userId,
    required String providerId,
    required String serviceId,
    required String address,
    required GeoPoint latLon,
    required double priceEstimate,
    required double commissionAmount,
    @Default(BookingStatus.requested) BookingStatus bookingStatus,
    PaymentMethod? paymentMethod,
    @Default(PaymentStatus.unpaid) PaymentStatus paymentStatus,
    required DateTime createdAt,
    DateTime? updatedAt,
  }) = _Booking;

  factory Booking.fromJson(Map<String, dynamic> json) =>
      _$BookingFromJson(json);
}
