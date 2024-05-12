// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEqCa8xfl4Cm_adRCzt0uo6k3XvRkPJFE",
  authDomain: "crypto-contracts.firebaseapp.com",
  projectId: "crypto-contracts",
  storageBucket: "crypto-contracts.appspot.com",
  messagingSenderId: "757182290983",
  appId: "1:757182290983:web:927cdbe4b26e2275780202",
  measurementId: "G-PLY21N51VR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
const auth = getAuth(app);

export default auth;