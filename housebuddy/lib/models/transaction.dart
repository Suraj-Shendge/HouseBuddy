import 'package:freezed_annotation/freezed_annotation.dart';

part 'transaction.freezed.dart';
part 'transaction.g.dart';

enum TransactionStatus { succeeded, failed }

@freezed
class TransactionModel with _$TransactionModel {
  const factory TransactionModel({
    required String tid,
    required String bookingId,
    required String providerId,
    required double totalAmount,
    required double commission,
    required double providerAmount,
    required PaymentMethod paymentMethod,
    @Default(TransactionStatus.succeeded) TransactionStatus status,
    required DateTime createdAt,
  }) = _TransactionModel;

  factory TransactionModel.fromJson(Map<String, dynamic> json) =>
      _$TransactionModelFromJson(json);
}
