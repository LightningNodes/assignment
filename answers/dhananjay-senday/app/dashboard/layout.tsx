import { redirect } from "next/navigation";
import LogoutBtn from "../components/client/LogoutBtn";
import { AuthenticateUser } from "../libs/firebase/server_apps/user_auth_verifier";

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
      <div className="bg-black/90 min-h-screen flex flex-col ">
        <Header name={User.name} picture={User.picture} />
        <main className="flex-grow">{children}</main>
      </div>
    </>
  );
}

function Header({ name, picture }: { name: string; picture: string }) {
  return (
    <nav className="border-b">
      <div className="max-w-5xl py-2 w-full  mx-auto  flex justify-between">
        <div className="text-white">Welcome to the Dashboard</div>
        <div className="flex items-center gap-3">
          <div className="text-white">Hello {name}</div>
          <div className="rounded-full w-8 h-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={picture}
              alt="profile"
              className="rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <LogoutBtn />
        </div>
      </div>
    </nav>
  );
}
