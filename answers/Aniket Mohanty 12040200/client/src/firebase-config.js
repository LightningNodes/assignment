// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_WzafFpAxBmNsHID1wcMBBA7ic2FaIoQ",
  authDomain: "pi42aniket.firebaseapp.com",
  projectId: "pi42aniket",
  storageBucket: "pi42aniket.appspot.com",
  messagingSenderId: "1054003368152",
  appId: "1:1054003368152:web:5618f667835d9165a707ad",
  measurementId: "G-L0XXWVHT3S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the authentication service
export const auth = getAuth(app);
