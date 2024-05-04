import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcncc3jHRdOazEzrY_HYHCMmlxUimxfo0",
  authDomain: "pi42-32e4e.firebaseapp.com",
  projectId: "pi42-32e4e",
  storageBucket: "pi42-32e4e.appspot.com",
  messagingSenderId: "253759941396",
  appId: "1:253759941396:web:bd21753ae757f165ffb001",
  measurementId: "G-9WHLTWHV75"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };
