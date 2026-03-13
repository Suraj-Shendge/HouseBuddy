import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/provider.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

final providerRepositoryProvider = Provider<ProviderRepository>((ref) {
  final firestore = ref.read(firestoreProvider);
  return ProviderRepository(firestore);
});

class ProviderRepository {
  final FirebaseFirestore _db;
  ProviderRepository(this._db);

  Stream<List<ProviderModel>> watchNearbyProviders(GeoPoint userLocation) {
    // Simple distance ordering (Firestore doesn't support geo queries natively)
    // For a production app use GeoFlutterFire or geohashes.
    return _db
        .collection('providers')
        .where('status', isEqualTo: 'active')
        .snapshots()
        .map((snap) => snap.docs
            .map((doc) => ProviderModel.fromJson(doc.data()))
            .toList()
          // Sort client‑side by distance
          ..sort((a, b) {
            final dA = _distance(userLocation, a.location);
            final dB = _distance(userLocation, b.location);
            return dA.compareTo(dB);
          }));
  }

  double _distance(GeoPoint a, GeoPoint b) {
    const double p = 0.017453292519943295; // pi/180
    final double lat1 = a.latitude;
    final double lat2 = b.latitude;
    final double lon1 = a.longitude;
    final double lon2 = b.longitude;
    final double a1 = (lat2 - lat1) * p;
    final double a2 = (lon2 - lon1) * p;
    final double c = 2 *
        (a1 / 2).sin() *
        (a2 / 2).sin() *
        (a1 / 2).cos() *
        (a2 / 2).cos();
    return 6371 * c; // Earth radius in km
  }
}
