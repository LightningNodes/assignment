import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVt03NmGdGP-3eEyvSShDAFNbrs-93gDg",
  authDomain: "pi42-assignment-b2bc2.firebaseapp.com",
  projectId: "pi42-assignment-b2bc2",
  storageBucket: "pi42-assignment-b2bc2.appspot.com",
  messagingSenderId: "193805031249",
  appId: "1:193805031249:web:5e4c81424f2ddedbd1a570",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };
