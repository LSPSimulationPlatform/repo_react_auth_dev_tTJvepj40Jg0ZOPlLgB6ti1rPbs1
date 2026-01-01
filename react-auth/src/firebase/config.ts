// Import Firebase core and authentication functions
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// --------------------------------------------
// 🔹 Firebase Configuration Setup
// --------------------------------------------

// Environment variables (these come from your .env file)
// Make sure you have VITE_ prefixed variables in your Vite project (.env file)
const API_KEY = import.meta.env.VITE_API_KEY;
const FIREBASE_APP_ID = import.meta.env.VITE_FIREBASE_APP_ID;
const FIREBASE_AUTH_DOMAIN = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const FIREBASE_PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const FIREBASE_STORAGE_BUCKET = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const FIREBASE_MESSAGING_SENDER_ID = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const FIREBASE_MEASUREMENT_ID = import.meta.env.VITE_MEASUREMENT_ID;

// --------------------------------------------
// 🔹 Create Firebase Configuration Object
// --------------------------------------------
const firebaseConfig = {
  apiKey: API_KEY, // API key for your Firebase project
  authDomain: FIREBASE_AUTH_DOMAIN, // Domain used for authentication
  projectId: FIREBASE_PROJECT_ID, // Unique Firebase project ID
  storageBucket: FIREBASE_STORAGE_BUCKET, // Storage bucket for files
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID, // Sender ID for Firebase Cloud Messaging
  appId: FIREBASE_APP_ID, // Firebase application ID
  measurementId: FIREBASE_MEASUREMENT_ID, // Optional: Used for analytics tracking
};

// --------------------------------------------
// 🔹 Initialize Firebase App
// --------------------------------------------
const app = initializeApp(firebaseConfig);

// --------------------------------------------
// 🔹 Initialize Firebase Authentication
// --------------------------------------------
// The `auth` instance is used to manage sign-in, sign-up, and auth state
export const auth = getAuth(app);

// Export the initialized Firebase app for use in other parts of your project
export default app;