import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        await dbConnect();
        const user = await User.findOne({ username: credentials?.username });

        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(
          credentials?.password || "",
          user.password
        );

        if (!isMatch) throw new Error("Invalid credentials");

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
