"use client";

import { useAuthContext } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const { user, loading } = useAuthContext();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [router, user]);
  return user && !loading ? null : children;
}
