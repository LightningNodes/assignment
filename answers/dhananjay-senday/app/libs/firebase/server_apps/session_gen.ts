"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function CreateFirebaseSession(UserUid: string) {
  cookies().set("login_session", UserUid, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}
