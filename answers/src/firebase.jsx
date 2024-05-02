import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnSHt8SejlGLObeZwWCeC-BoFYlqORfmk",
  authDomain: "pi42-b043d.firebaseapp.com",
  projectId: "pi42-b043d",
  storageBucket: "pi42-b043d.appspot.com",
  messagingSenderId: "962188229764",
  appId: "1:962188229764:web:6c1daae70b3e115004d6d1",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };
