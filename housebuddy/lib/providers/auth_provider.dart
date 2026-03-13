import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../models/user.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

final firebaseAuthProvider = Provider<FirebaseAuth>((ref) => FirebaseAuth.instance);
final firestoreProvider = Provider<FirebaseFirestore>((ref) => FirebaseFirestore.instance);

final firebaseUserProvider = StreamProvider<User?>((ref) {
  return ref.read(firebaseAuthProvider).authStateChanges();
});

final appUserProvider = FutureProvider<UserModel?>((ref) async {
  final firebaseUser = await ref.watch(firebaseUserProvider.future);
  if (firebaseUser == null) return null;
  final snap = await ref
      .read(firestoreProvider)
      .collection('users')
      .doc(firebaseUser.uid)
      .get();
  if (!snap.exists) {
    // First time login – create user doc
    final newUser = UserModel(
      uid: firebaseUser.uid,
      name: '',
      phone: firebaseUser.phoneNumber ?? '',
      role: 'customer',
      createdAt: DateTime.now(),
    );
    await snap.reference.set(newUser.toJson());
    return newUser;
  }
  return UserModel.fromJson(snap.data()!);
});
