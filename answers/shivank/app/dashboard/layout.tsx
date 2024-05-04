import { redirect } from "next/navigation";
import LogoutBtn from "../components/client/LogoutBtn";
import { AuthenticateUser } from "../libs/firebase/server_apps/user_auth_verifier";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { log } from "console";
import Image from 'next/image'
import logo from "../components/logo.png";



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
   <Navbar >
      <NavbarBrand>
      <div className="rounded-full w-8 h-8">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img
              src={picture}
              alt="profile"
              className="rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-black p-3">Welcome {name}</div>
      
      </NavbarBrand>
      
      <NavbarContent justify="end">
      
        <NavbarItem className="font-semibold">
          <LogoutBtn />
        </NavbarItem>
      </NavbarContent>
    </Navbar>

  );
}
