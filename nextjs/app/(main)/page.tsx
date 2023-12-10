"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) return null;

  console.log(session.user);

  return (
    <main>
      <h1>Hello, {session.user.firstName}!</h1>
      <Button variant="destructive" onClick={() => signOut()}>
        Logout
      </Button>
    </main>
  );
}
