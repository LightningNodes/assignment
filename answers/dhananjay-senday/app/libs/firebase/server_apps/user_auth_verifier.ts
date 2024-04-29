import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export function AuthenticateUser(): null | {
  name: string;
  picture: string;
  iss: string;
  aud: string;
  auth_time: number;
  user_id: string;
  sub: string;
  iat: string;
  exp: string;
  email: string;
  email_verified: boolean;
  firebase: Record<string, unknown>;
} {
  let User_Cookie = cookies().get("login_session")?.value ?? "";
  if (User_Cookie == "") {
    return null;
  }
  return jwtDecode(User_Cookie);
}
