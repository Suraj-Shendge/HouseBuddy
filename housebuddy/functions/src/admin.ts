// Admin cloud function
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const db = admin.firestore();

// Create a new service category (admin only)
export const adminCreateService = async (data: any, context: functions.https.CallableContext) => {
  if (!context.auth?.token?.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Admin only');
  }
  const { name, iconUrl, basePrice } = data;
  const sid = db.collection('services').doc().id;
  await db.collection('services').doc(sid).set({
    serviceId: sid,
    name,
    icon: iconUrl,
    basePrice,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  return { serviceId: sid };
};

// Approve a provider (admin only)
export const adminApproveProvider = async (data: any, context: functions.https.CallableContext) => {
  if (!context.auth?.token?.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Admin only');
  }
  const { providerId } = data;
  const providerRef = db.collection('providers').doc(providerId);
  await providerRef.update({
    verificationStatus: "approved",
    status: "active",
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  return { success: true };
};
