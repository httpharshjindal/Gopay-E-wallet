import prisma from "@repo/db/prisma";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn, signOut } from "next-auth/react";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "1231231231",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "123456789",
        },
      },
      // TODO: User credentials type from next-aut
      async authorize(credentials: any) {
        // Do zod validation, OTP validation here
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await prisma.user.findFirst({
          where: {
            number: credentials.phone,
          },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              number: existingUser.number,
              email: existingUser.email,
            };
          }
          return null;
        }

        try {
          const user = await prisma.user.create({
            data: {
              number: credentials.phone,
              password: hashedPassword,
            },
          });
          const balance = await prisma.balance.create({
            data: {
              userId: user.id,
              amount: 0,
              locked: 0,
            },
          });

          return {
            id: user.id.toString(),
            name: user.name,
            number: user.number,
            email: user.email,
          };
        } catch (e) {
          console.error(e);
        }

        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    // TODO: can u fix the type here? Using any is bad
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
};
