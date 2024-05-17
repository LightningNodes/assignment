// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFuD2yVYJ0eOpYDbODTVGkNmBhcACWe1M",
  authDomain: "pi42-dashboard.firebaseapp.com",
  projectId: "pi42-dashboard",
  storageBucket: "pi42-dashboard.appspot.com",
  messagingSenderId: "278247867798",
  appId: "1:278247867798:web:9bef0035399830628d49b7"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();