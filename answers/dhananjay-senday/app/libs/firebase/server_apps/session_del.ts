"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function DeleteFirebaseSession() {
  cookies().delete("login_session");
  redirect("/");
}
