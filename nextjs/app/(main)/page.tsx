"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <main>
      <h1>Hello, {session.user.firstName}!</h1>
    </main>
  );
}
