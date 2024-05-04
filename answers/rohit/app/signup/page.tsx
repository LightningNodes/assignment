"use client";
import React, { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import signUp from "@/lib/firebase/signup";
import ButtonWithLoader from "@/components/Button";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [waiting, setWaiting] = useState(false);
  const router = useRouter();

  const handleForm: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    try {
      setWaiting(true);
      const { error } = await signUp(email, password);
      if (error) {
        return alert((error as Error).message);
      }
      return router.push("/");
    } finally {
      setWaiting(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
      <Card className="w-11/12 sm:w-1/2 md:w-1/3">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>It&apos;s quick and easy</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-y-3" onSubmit={handleForm}>
            <Label htmlFor="email">Email address</Label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
            <ButtonWithLoader text="Sign Up" loading={waiting} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
