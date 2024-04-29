import Image from "next/image";
import { AuthenticateUser } from "./libs/firebase/server_apps/user_auth_verifier";
import { redirect } from "next/navigation";
import LoginModal from "./components/LoginModal";

export default function Home() {
  const User = AuthenticateUser();
  if (User != null) {
    redirect("/dashboard");
  }
  return (
    <>
      <LoginModal />
    </>
  );
}
