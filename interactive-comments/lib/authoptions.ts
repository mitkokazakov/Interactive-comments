
import { AuthOptions } from "next-auth";
import prisma from "./prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@yahoo.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = {
          id: "test-id-123",
          name: "Mock User",
          email: "testmail@yahoo.com",
          emailVerified: null,
          image: null,
        };

        if (user) {
          return user;
        } else {
          return null;
        }
        // //Check if there is am email and password
        // if (!credentials?.email || !credentials.password) {
        //   throw new Error("Missing email or password!");
        // }

        // //Check if there is user with provided email
        // const user = await prisma.user.findUnique({
        //   where: {
        //     email: credentials.email,
        //   },
        // });

        // if (!user || !user?.hashedPassword || user?.isDeleted) {
        //   throw new Error("There is now user with this email.Sorry!");
        // }

        // //Check if the passwords matched
        // const matchedPasswords = await bcrypt.compare(
        //   credentials.password,
        //   user.hashedPassword
        // );

        // if (!matchedPasswords) {
        //   throw new Error("Incorect password!");
        // }

        // return user;
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user, session }) {
  //     console.log("JWT Callback", { token, user, session });

  //     return { ...token, ...user };
  //   },

  // //   async session({ session, token }) {
  // //     session.user.id = token.id;
  // //     session.user.role = token.role;

  // //     return session;
  // //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};
