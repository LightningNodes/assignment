import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const ClientApp = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
});
const provider = new GoogleAuthProvider();
export const Clientauth = getAuth(ClientApp);

export async function GetToken() {
  let result = await signInWithPopup(Clientauth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  if (credential === null) {
    return;
  }
  const user = result.user;
  const Token = await user.getIdToken();
  return Token;
}
