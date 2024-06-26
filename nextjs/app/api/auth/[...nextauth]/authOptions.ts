import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import Dept from "@/models/Dept";
import School from "@/models/School";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        try {
          await dbConnect();

          const user = await User.findOne({ username: username });

          if (!user) throw new Error("Incorrect username/password");

          if (user.type === "student")
            throw new Error("Incorrect username/password");

          const isMatch = await bcrypt.compare(password || "", user.password);

          if (!isMatch) throw new Error("Incorrect username/password");

          const userObj: User = {
            id: user._id,
            username: user.username,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            role: { type: "instructor" },
          };

          if (user.role === "dean") {
            const school = await School.findOne({ dean: user._id });
            if (!school) throw new Error("Incorrect username/password");
            userObj.role = {
              type: "dean",
              school: school._id,
              schoolName: school.title,
            };
          } else if (user.role === "dept_head") {
            const dept = await Dept.findOne({ head: user._id });
            if (!dept) throw new Error("Incorrect username/password");
            userObj.role = {
              type: "dept_head",
              dept: dept._id,
              deptName: dept.title,
            };
          }

          return userObj;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],

  
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
    updateAge: 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return { ...token, ...user };
    },
    async session({ session, token }) {
      const { id, username, firstName, middleName, lastName, role } =
        token as User;
      session.user = {
        id,
        username,
        firstName,
        middleName,
        lastName,
        role,
      };

      return session;
    },
  },
};
