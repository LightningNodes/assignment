"use client";
import ButtonWithLoader from "@/components/Button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import signIn from "@/lib/firebase/signin";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("stvpmi@hi2.in");
  const [password, setPassword] = useState("stvpmi@hi2.in");
  const [waiting, setWaiting] = useState(false);
  const router = useRouter();

  const handleForm: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    try {
      setWaiting(true);
      const { error } = await signIn(email, password);
      if (error) {
        return alert((error as Error).message);
      }
      router.replace("/");
    } finally {
      setWaiting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
      <Card className="w-11/12 sm:w-1/2 md:w-1/3">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Use pre-filled creds for test account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-y-3"
            onSubmit={handleForm}
            aria-label="signin form"
          >
            <Label htmlFor="email">Email address</Label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              value={email}
            />
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              required
              value={password}
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
            <ButtonWithLoader text="Sign In" loading={waiting} />
          </form>
          <Separator className="my-4" />
          <Button variant="outline" className="w-full" asChild>
            <Link href="/auth/signup">Create account</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
