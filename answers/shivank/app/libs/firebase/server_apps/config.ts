"use server";
import firebase from 'firebase/app';
// import 'firebase/auth';

// import firebase from 'firebase'
require('firebase/auth')
export const firebaseConfig = {
    apiKey: "AIzaSyBWmC2tyAXLqePImH1Z6Ew6jDtpwSKa6xM",
    authDomain: "lightningnodes-assignment.firebaseapp.com",
    projectId: "lightningnodes-assignment",
    storageBucket: "lightningnodes-assignment.appspot.com",
    messagingSenderId: "754244979264",
    appId: "1:754244979264:web:1c35935bda038c0e6f2da5",
    measurementId: "G-53W4GG2E4G"
};
  


if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
  
  export const auth = firebase.auth();
  
  export default firebase;