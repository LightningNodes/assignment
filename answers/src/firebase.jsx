import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBftVAkDnC9rmV4zd3h6Y-O5uzafqW4ER4",
  authDomain: "pi42-00.firebaseapp.com",
  projectId: "pi42-00",
  storageBucket: "pi42-00.appspot.com",
  messagingSenderId: "140080589455",
  appId: "1:140080589455:web:ae5f72da6c220eab0b1efa"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };