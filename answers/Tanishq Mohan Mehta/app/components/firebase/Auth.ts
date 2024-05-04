
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
  let UserToken = cookies().get("token")?.value ?? "";
  if (UserToken == "") {
    return null;
  }
  return jwtDecode(UserToken);
}

