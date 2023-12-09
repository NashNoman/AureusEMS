"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2Icon, LoaderIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const usernameRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
        setLoading(false);
        setPassword("");
        usernameRef.current?.select();
        return;
      }

      router.push("/");
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-8">
      <Label htmlFor="username">Username</Label>
      <Input
        id="username"
        name="username"
        type="text"
        autoComplete="off"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        ref={usernameRef}
        autoFocus
      />
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        name="password"
        type="password"
        autoComplete="off"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {loading ? (
        <Button disabled>
          <Loader2Icon className="animate-spin" />
        </Button>
      ) : (
        <Button type="submit">Continue</Button>
      )}
      {error && <small className="text-red-500 text-center">{error}</small>}
    </form>
  );
}
