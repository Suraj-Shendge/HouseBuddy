import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where, orderBy, limit } from 'firebase/firestore';
import { getStorage, FirebaseStorage, ref, uploadBytes, getDownloadURL, StorageReference } from 'firebase/storage';
import { getAuth, Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

let app: FirebaseApp;
let db: Firestore;
let storage: FirebaseStorage;
let auth: Auth;

export const initializeFirebase = (): FirebaseApp => {
  if (!app) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    storage = getStorage(app);
    auth = getAuth(app);
  }
  return app;
};

export const getFirebaseApp = (): FirebaseApp => app;
export const getFirestoreDB = (): Firestore => db;
export const getFirebaseStorage = (): FirebaseStorage => storage;
export const getFirebaseAuth = (): Auth => auth;

export { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User };
