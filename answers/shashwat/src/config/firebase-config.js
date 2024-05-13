// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_uTcGYEIDIiSY6KPfk85hKhW2bnsalRY",
  authDomain: "pi42-assignment-1bd0d.firebaseapp.com",
  projectId: "pi42-assignment-1bd0d",
  storageBucket: "pi42-assignment-1bd0d.appspot.com",
  messagingSenderId: "702813127729",
  appId: "1:702813127729:web:5a5fe668f6d0d2be418110",
  measurementId: "G-V61C9XQ64K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);