// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_FWyBzFnIJxxkhCsxcbYRapNi8KL-Okg",
  authDomain: "cryptowebsite-ae5bc.firebaseapp.com",
  projectId: "cryptowebsite-ae5bc",
  storageBucket: "cryptowebsite-ae5bc.appspot.com",
  messagingSenderId: "282069628180",
  appId: "1:282069628180:web:4270b7b86b529030053e01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app}