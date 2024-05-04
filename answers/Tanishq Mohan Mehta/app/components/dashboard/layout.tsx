import { redirect } from "next/navigation";
import { AuthenticateUser } from "../firebase/Auth";
import Navbar from "./navbar"
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const User = AuthenticateUser();

  if (User == null) {
    redirect("/");
  }
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar name={User.name} picture={User.picture}/>
        <main className="flex-grow">{children}</main>
      </div>
    </>
  );
}

