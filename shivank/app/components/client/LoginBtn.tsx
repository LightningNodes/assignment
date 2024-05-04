"use client";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { GetUserToken } from "@/app/libs/firebase/init";
import { CreateFirebaseSession } from "@/app/libs/firebase/server_apps/session_gen";

export default function LoginBtn() {
  return (
    <button
      className="bg-blue-800 rounded-md hover:bg-blue-900 text-white px-2 py-2"
      onClick={async () => {
        console.log("trying to login");
        const User_Token = await GetUserToken();
        console.log(User_Token);
        if (User_Token == null) {
          alert("Error Signing In");
          return;
        }
        await CreateFirebaseSession(User_Token);
      }}
    >
      Sign in with Google
    </button>
  );
}
