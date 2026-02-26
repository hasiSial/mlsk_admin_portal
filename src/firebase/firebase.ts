// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

const firebaseConfig = {
  // apiKey: process.env.FIRE_BASE_API_KEY,
  // authDomain: process.env.FIRE_BASE_AUTH_DOMAIN,
  // projectId: process.env.FIRE_BASE_PROJECT_ID,
  // storageBucket: process.env.FIRE_BASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIRE_BASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIRE_BASE_API_ID,

  apiKey: 'AIzaSyCkXWAStltqO0XPK8JZ2gkeWt6irpeDmpU',
  authDomain: 'gearupmma.firebaseapp.com',
  projectId: 'gearupmma',
  storageBucket: 'gearupmma.firebasestorage.app',
  messagingSenderId: '1074247076419',
  appId: '1:1074247076419:web:8189779d8a11163e06a2f6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const now = () => serverTimestamp();
export { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile };
