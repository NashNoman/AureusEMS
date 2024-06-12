"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { motion, useAnimate } from "framer-motion";
import { Loader2Icon, LoaderIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [scope, animate] = useAnimate();

  const handleSetState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    return e.target.value;
  };

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
        passwordRef.current?.focus();
        return;
      }

      router.push("/");
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
      <Label htmlFor="username">Username</Label>
      <Input
        className={`transition-color mb-2 ${
          error ? "border-destructive focus-visible:ring-destructive" : ""
        }`}
        id="username"
        name="username"
        type="text"
        autoComplete="off"
        value={username}
        onChange={(e) => setUsername(handleSetState(e))}
        autoFocus
      />
      <Label htmlFor="password">Password</Label>
      <Input
        className={`transition-color mb-2 ${
          error ? "border-destructive focus-visible:ring-destructive" : ""
        }`}
        id="password"
        name="password"
        type="password"
        autoComplete="off"
        value={password}
        ref={passwordRef}
        onChange={(e) => setPassword(handleSetState(e))}
      />
      {loading ? (
        <Button disabled>
          <Loader2Icon className="animate-spin" />
        </Button>
      ) : (
        <Button type="submit">Continue</Button>
      )}
      <small
        ref={scope}
        className="text-center text-destructive dark:text-red-400"
      >
        {error}
      </small>
    </form>
  );
}
