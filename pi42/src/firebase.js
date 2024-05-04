// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClKNeHN6b3qUFMeymb_JGIMP75ghEUvug",
  authDomain: "pi42-assignment-f24a5.firebaseapp.com",
  projectId: "pi42-assignment-f24a5",
  storageBucket: "pi42-assignment-f24a5.appspot.com",
  messagingSenderId: "1093437065687",
  appId: "1:1093437065687:web:652e32fc54dbcfe6602392",
  measurementId: "G-L3Q2VFXCF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);