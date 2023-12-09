import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        await dbConnect();

        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        const user = await User.findOne({ username: username });

        if (!user) throw new Error("Incorrect username/password");

        const isMatch = await bcrypt.compare(password || "", user.password);

        if (!isMatch) throw new Error("Incorrect username/password");

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 10 * 60,
    updateAge: 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
