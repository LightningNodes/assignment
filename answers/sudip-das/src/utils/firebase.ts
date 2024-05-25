// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/compat/auth'
import 'firebase/compat/database'
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const VITE_APP_FIREBASE_KEY = import.meta.env.VITE_APP_FIREBASE_KEY
const VITE_APP_FIREBASE_AUTH_DOMAIN = import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN
const VITE_APP_FIREBASE_PROJECT_ID = import.meta.env.VITE_APP_FIREBASE_PROJECT_ID
const VITE_APP_FIREBASE_STORAGE_BUCKET = import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET
const VITE_APP_FIREBASE_MESSAGING_SENDER_ID = import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID
const VITE_APP_FIREBASE_APP_ID = import.meta.env.VITE_APP_FIREBASE_APP_ID
const VITE_APP_FIREBASE_MEASUREMENT_ID = import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: VITE_APP_FIREBASE_KEY,
    authDomain: VITE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: VITE_APP_FIREBASE_PROJECT_ID,
    storageBucket: VITE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: VITE_APP_FIREBASE_APP_ID,
    measurementId: VITE_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase();
export const auth = getAuth();

export default app