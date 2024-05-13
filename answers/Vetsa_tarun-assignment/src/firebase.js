// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjW8JB4DLtFxFKk9jp0iJNEz2a5hiUIHo",
  authDomain: "assignment-dbbbe.firebaseapp.com",
  projectId: "assignment-dbbbe",
  storageBucket: "assignment-dbbbe.appspot.com",
  messagingSenderId: "825288277919",
  appId: "1:825288277919:web:991fd6f8b6da36882d47aa",
  measurementId: "G-PRPRPF3TMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
export {app,auth}