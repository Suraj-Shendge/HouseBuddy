import 'package:freezed_annotation/freezed_annotation.dart';

part 'provider.freezed.dart';
part 'provider.g.dart';

@freezed
class ProviderModel with _$ProviderModel {
  const factory ProviderModel({
    required String pid,
    required String name,
    required String phone,
    required List<String> services, // list of serviceId
    @Default(0.0) double rating,
    @Default(0) int ratingCount,
    @Default(0.0) double walletBalance,
    @Default(0.0) double pendingCommission,
    @Default('active') String status, // active / limited / blocked
    @Default('pending') String verificationStatus,
    required GeoPoint location,
    required DateTime createdAt,
    String? profilePic,
  }) = _ProviderModel;

  factory ProviderModel.fromJson(Map<String, dynamic> json) =>
      _$ProviderModelFromJson(json);
}
