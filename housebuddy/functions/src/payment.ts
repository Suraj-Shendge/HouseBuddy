// Payment cloud function
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import Razorpay from "razorpay";

const db = admin.firestore();

const razorpay = new Razorpay({
  key_id: functions.config().razorpay.key_id,
  key_secret: functions.config().razorpay.key_secret,
});

export const initiateUPIPayment = async (data: any, context: functions.https.CallableContext) => {
  const { bookingId } = data;
  if (!context.auth?.uid) throw new functions.https.HttpsError('unauthenticated', '');

  const bookingSnap = await db.collection('bookings').doc(bookingId).get();
  if (!bookingSnap.exists) throw new functions.https.HttpsError('not-found', '');

  const booking = bookingSnap.data() as any;

  // Razorpay expects amount in paise
  const amountInPaise = booking.priceEstimate * 100;

  const order = await razorpay.orders.create({
    amount: amountInPaise,
    currency: "INR",
    receipt: bookingId,
    payment_capture: 1,
  });

  return {
    orderId: order.id,
    amount: amountInPaise,
    currency: "INR",
  };
};

// Webhook endpoint – configure in Razorpay dashboard
export const handleRazorpayWebhook = functions.https.onRequest(async (req, res) => {
  const secret = functions.config().razorpay.webhook_secret;
  const signature = req.headers['x-razorpay-signature'] as string;

  const crypto = require('crypto');
  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(req.rawBody)
    .digest('hex');

  if (generatedSignature !== signature) {
    console.warn('Invalid Razorpay webhook signature');
    return res.status(400).send('Invalid signature');
  }

  const event = req.body.event;
  if (event !== 'payment.captured') {
    return res.status(200).send('Ignored');
  }

  const payload = req.body.payload.payment.entity;
  const orderId = payload.order_id;
  const paymentId = payload.id;
  const amount = payload.amount; // paise

  // Find booking by order receipt
  const bookingSnap = await db
    .collection('bookings')
    .where('paymentMethod', '==', 'UPI')
    .where('bookingStatus', '==', 'paymentPending')
    .limit(1)
    .get();

  const bookingDoc = bookingSnap.docs.find(doc => {
    const data = doc.data() as any;
    // Our receipt is bookingId, so match that
    return data.bid === payload.notes?.bookingId;
  });

  if (!bookingDoc) {
    console.error('Booking not found for Razorpay webhook');
    return res.status(400).send('Booking not found');
  }

  const bookingRef = bookingDoc.ref;
  const booking = bookingDoc.data() as any;

  await db.runTransaction(async t => {
    // Mark payment as paid and completed
    t.update(bookingRef, {
      paymentStatus: "paid",
      bookingStatus: "finished",
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Record transaction
    const txId = db.collection('transactions').doc().id;
    t.set(db.collection('transactions').doc(txId), {
      tid: txId,
      bookingId: booking.bid,
      providerId: booking.providerId,
      totalAmount: booking.priceEstimate,
      commission: booking.commissionAmount,
      providerAmount: booking.priceEstimate - booking.commissionAmount,
      paymentMethod: "UPI",
      status: "succeeded",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Add earnings to provider wallet
    const providerRef = db.collection('providers').doc(booking.providerId);
    t.update(providerRef, {
      walletBalance: admin.firestore.FieldValue.increment(booking.priceEstimate - booking.commissionAmount),
    });
  });

  return res.status(200).send('OK');
});

// Provider pays pending commission (cash bookings)
export const payCommission = async (data: any, context: functions.https.CallableContext) => {
  const { providerId, amount } = data;
  if (!context.auth?.uid) throw new functions.https.HttpsError('unauthenticated', '');
  if (context.auth.uid !== providerId) {
    throw new functions.https.HttpsError('permission-denied', 'Can only pay own commission');
  }

  // Create Razorpay order for commission amount
  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: `commission_${providerId}_${Date.now()}`,
    payment_capture: 1,
  });

  // The client will open Razorpay UI using this orderId.
  // Once payment succeeds the same webhook above will fire; we need to distinguish commission payments.
  // For simplicity we will store a temporary doc to map orderId → providerId:
  const pendingRef = db.collection('commissionPending').doc(order.id);
  await pendingRef.set({
    providerId,
    amount,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return {
    orderId: order.id,
    amount: amount * 100,
  };
};
