// Booking cloud function
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const db = admin.firestore();
const COMMISSION_PERCENT = 15; // 15%

export const createBooking = async (data: any, context: functions.https.CallableContext) => {
  if (!context.auth?.uid) throw new functions.https.HttpsError('unauthenticated', 'User must be logged in');

  const {
    providerId,
    serviceId,
    address,
    lat,
    lng,
    scheduledAt,
  } = data;

  // Basic validation
  if (!providerId || !serviceId || !address || lat == null || lng == null) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required fields');
  }

  // Fetch service base price
  const serviceSnap = await db.collection('services').doc(serviceId).get();
  if (!serviceSnap.exists) throw new functions.https.HttpsError('not-found', 'Service not found');
  const basePrice = serviceSnap.data()?.basePrice as number;

  // Commission & total price
  const commission = Math.round(basePrice * COMMISSION_PERCENT / 100);
  const priceEstimate = basePrice; // For now we keep service price as estimate

  const bookingId = db.collection('bookings').doc().id;
  const now = admin.firestore.FieldValue.serverTimestamp();

  const booking = {
    bid: bookingId,
    userId: context.auth.uid,
    providerId,
    serviceId,
    address,
    latLon: new admin.firestore.GeoPoint(lat, lng),
    priceEstimate,
    commissionAmount: commission,
    bookingStatus: "requested",
    paymentStatus: "unpaid",
    createdAt: now,
    updatedAt: now,
  };

  await db.collection('bookings').doc(bookingId).set(booking);
  return { bookingId };
};

export const acceptBooking = async (data: any, context: functions.https.CallableContext) => {
  const { bookingId } = data;
  const providerId = context.auth?.uid;
  if (!providerId) throw new functions.https.HttpsError('unauthenticated', '');

  const bookingRef = db.collection('bookings').doc(bookingId);
  const bookingSnap = await bookingRef.get();
  if (!bookingSnap.exists) throw new functions.https.HttpsError('not-found', 'Booking not found');

  const booking = bookingSnap.data()!;
  if (booking.providerId !== providerId) {
    throw new functions.https.HttpsError('permission-denied', 'Not your booking');
  }

  await bookingRef.update({
    bookingStatus: "accepted",
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  // Notify customer:
  const customerSnap = await db.collection('users').doc(booking.userId).get();
  const token = customerSnap.data()?.fcmToken;
  if (token) {
    await admin.messaging().sendToDevice(token, {
      notification: {
        title: "Booking Accepted",
        body: `Your ${booking.serviceId} request was accepted`,
      },
      data: { bookingId, type: "booking_update" },
    });
  }
  return { success: true };
};

export const updateJobStatus = async (data: any, context: functions.https.CallableContext) => {
  const { bookingId, status } = data;
  const providerId = context.auth?.uid;
  if (!providerId) throw new functions.https.HttpsError('unauthenticated', '');

  const bookingRef = db.collection('bookings').doc(bookingId);
  const snap = await bookingRef.get();
  if (!snap.exists) throw new functions.https.HttpsError('not-found', '');
  const booking = snap.data()!;
  if (booking.providerId !== providerId) {
    throw new functions.https.HttpsError('permission-denied', '');
  }

  const allowed = ["accepted", "arriving", "inProgress", "completed"];
  if (!allowed.includes(status)) {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid status transition');
  }

  await bookingRef.update({
    bookingStatus: status,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Notify the customer about progress
  const userSnap = await db.collection('users').doc(booking.userId).get();
  const token = userSnap.data()?.fcmToken;
  if (token) {
    await admin.messaging().sendToDevice(token, {
      notification: {
        title: "Job Update",
        body: `Your booking is now ${status}`,
      },
      data: { bookingId, type: "booking_update" },
    });
  }

  return { success: true };
};

export const completeBooking = async (data: any, context: functions.https.CallableContext) => {
  const { bookingId, paymentMethod } = data;
  const providerId = context.auth?.uid;
  if (!providerId) throw new functions.https.HttpsError('unauthenticated', '');

  const bookingRef = db.collection('bookings').doc(bookingId);
  const snap = await bookingRef.get();
  if (!snap.exists) throw new functions.https.HttpsError('not-found', '');

  const booking = snap.data() as any;

  if (booking.providerId !== providerId) {
    throw new functions.https.HttpsError('permission-denied', '');
  }

  const method = paymentMethod === "UPI" ? "UPI" : "Cash";

  await bookingRef.update({
    paymentMethod: method,
    bookingStatus: "paymentPending",
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Notify the customer to pay
  const userSnap = await db.collection('users').doc(booking.userId).get();
  const token = userSnap.data()?.fcmToken;
  if (token) {
    await admin.messaging().sendToDevice(token, {
      notification: {
        title: "Payment Required",
        body: `Please pay ₹${booking.priceEstimate} for your service`,
      },
      data: { bookingId, type: "payment_required" },
    });
  }

  return { success: true };
};
