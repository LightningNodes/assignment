// src/firebase.js
import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider , signOut } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAAzgYWldf9PjwYqgo18DD06QPxwmwjbOE",
    authDomain: "crypto-738b2.firebaseapp.com",
    projectId: "crypto-738b2",
    storageBucket: "crypto-738b2.appspot.com",
    messagingSenderId: "566369366205",
    appId: "1:566369366205:web:36d639f49a20c6d07747d4",
    measurementId: "G-RCK8LJY7CG"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const UserLoginContext = React.createContext();
export const db = getDatabase(app);
export const database = getFirestore(app);