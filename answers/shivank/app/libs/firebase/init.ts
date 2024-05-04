import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const ClientApp = initializeApp({
  apiKey: "AIzaSyBWmC2tyAXLqePImH1Z6Ew6jDtpwSKa6xM",
  authDomain: "lightningnodes-assignment.firebaseapp.com",
  projectId: "lightningnodes-assignment",
  storageBucket: "lightningnodes-assignment.appspot.com",
  messagingSenderId: "754244979264",
  appId: "1:754244979264:web:1c35935bda038c0e6f2da5",
  measurementId: "G-53W4GG2E4G"
});

const provider = new GoogleAuthProvider();
export const Clientauth = getAuth(ClientApp);

export async function GetUserToken() {
  let result = await signInWithPopup(Clientauth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  if (credential === null) {
    return;
  }
  const token = credential.accessToken;
  const user = result.user;
  const User_Token = await user.getIdToken();
  return User_Token;
}
