"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function CreateSession(UserUid: string) {
    cookies().set("token", UserUid, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60,
    });
  }
  
  export async function DeleteSession() {
    cookies().delete("token");
    redirect("/");
  }