// Firebase functions entry
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { createBooking } from "./booking";
import { acceptBooking, updateJobStatus, completeBooking } from "./booking";
import { initiateUPIPayment, handleRazorpayWebhook, payCommission } from "./payment";
import { adminApproveProvider, adminCreateService } from "./admin";

admin.initializeApp();

// ---- Booking Functions ---- //
export const createBooking = functions.https.onCall(createBooking);
export const acceptBooking = functions.https.onCall(acceptBooking);
export const updateJobStatus = functions.https.onCall(updateJobStatus);
export const completeBooking = functions.https.onCall(completeBooking);

// ---- Payment Functions ---- //
export const initiateUPIPayment = functions.https.onCall(initiateUPIPayment);
export const razorpayWebhook = functions.https.onRequest(handleRazorpayWebhook);
export const payCommission = functions.https.onCall(payCommission);

// ---- Admin Functions ---- //
export const adminCreateService = functions.https.onCall(adminCreateService);
export const adminApproveProvider = functions.https.onCall(adminApproveProvider);

// ---- Background Trigger – lock provider on unpaid cash ---- //
export const lockProviderOnCash = functions.firestore
  .document("bookings/{bid}")
  .onUpdate(async (change, context) => {
    const before = change.before.data() as any;
    const after = change.after.data() as any;

    // Detect transition from completed → finished without commission paid (cash)
    if (
      before.bookingStatus === "completed" &&
      after.bookingStatus === "finished" &&
      after.paymentMethod === "Cash" &&
      after.paymentStatus === "unpaid"
    ) {
      const providerRef = admin.firestore().collection("providers").doc(after.providerId);
      await providerRef.update({
        pendingCommission: admin.firestore.FieldValue.increment(after.commissionAmount),
        status: "limited",
      });
    }
    return null;
  });
