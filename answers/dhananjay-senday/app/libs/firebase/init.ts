import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const ClientApp = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_authDomain,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_appId,
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
