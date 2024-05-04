"use client";
import { Clientauth } from "@/app/libs/firebase/init";
import { DeleteFirebaseSession } from "@/app/libs/firebase/server_apps/session_del";
import { signOut } from "firebase/auth";

export default function LogoutBtn() {
  return (
    <button
      className="bg-white  px-2 py-0.5 rounded-md "
      onClick={async () => {
        await signOut(Clientauth);
        await DeleteFirebaseSession();
      }}
    >
      Logout
    </button>
  );
}
