// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/compat/auth'
import 'firebase/compat/database'
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0gA2j1_GCen42MCsM9FXZxLD0OwK25Dc",
    authDomain: "pi42-b9e22.firebaseapp.com",
    projectId: "pi42-b9e22",
    storageBucket: "pi42-b9e22.appspot.com",
    messagingSenderId: "877510527964",
    appId: "1:877510527964:web:f68a477d15dd4fa6ed1d19",
    measurementId: "G-PT5BZLZ6SW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase();
export const auth = getAuth();

export default app