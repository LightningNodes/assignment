import { AuthenticateUser } from "./components/firebase/Auth";
import { redirect } from "next/navigation";
import Login from "./components/LoginPage";

export default function Home() {
  const User = AuthenticateUser();
  if (User != null) {
    redirect("/components/dashboard/");
  }
  return (
    <>
      <Login />
    </>
  );
}
