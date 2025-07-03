// firebaseConfig.js

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isSupported, getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAa2xtivHUekFYQgITbwhZPXQHQfIcxeto",
  authDomain: "ndrflocationfetching.firebaseapp.com",
  projectId: "ndrflocationfetching",
  storageBucket: "ndrflocationfetching.firebasestorage.app",
  messagingSenderId: "708800420981",
  appId: "1:708800420981:web:d29a60520cd927b346ac3c",
  measurementId: "G-X8R4190F5J"
};

// Initialize the Firebase App if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Realtime Database
const db = getDatabase(app);

// Initialize Auth only once
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  if (error.code === 'auth/already-initialized') {
    // If already initialized, retrieve the existing instance
    // Note: Firebase v9 doesn't provide a direct way to get an existing auth instance,
    // so you might want to export the same instance you've already created.
    console.warn('Firebase Auth already initialized.');
  } else {
    console.error('Error initializing Firebase Auth:', error);
  }
}

// Conditionally initialize Analytics
isSupported()
  .then((supported) => {
    if (supported) {
      try {
        const analytics = getAnalytics(app);
        console.log("Firebase Analytics initialized.");
      } catch (error) {
        console.error("Error initializing Firebase Analytics:", error);
      }
    } else {
      console.log("Firebase Analytics is not supported in this environment.");
    }
  })
  .catch((error) => {
    console.error("Error checking analytics support:", error);
  });

export { app, db, auth };
