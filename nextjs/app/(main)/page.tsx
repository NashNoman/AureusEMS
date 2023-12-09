"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <main>
      <h1>Hello, World!</h1>
      <Button variant="destructive" onClick={() => signOut()}>
        Logout
      </Button>
    </main>
  );
}
