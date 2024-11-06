import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@repo/db/prisma";
import bcrypt from "bcrypt";

interface userType {
  name: string; // The user's name
  email: string; // The user's email
  image: string; // URL to the user's profile image
  id?: string; // Optional: If the user was found in the database, it may contain their ID
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "name" },
        email: {
          label: "Email",
          type: "text",
          placeholder: "your-email@example.com",
        },
        phone: {
          label: "Phone",
          type: "text",
          placeholder: "your phone number",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
        confirmPassword: {
          label: "Confirm Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
          console.log("reached to signin credentials");
        const action = req.body?.action;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phonePattern = /^\d{10}$/;

        if (action === "signIn") {
          if (!credentials?.email || !credentials?.password) {
            throw new Error(
              "Email/Phone and password are required for sign-in"
            );
          }

          const isEmail = /[a-zA-Z]/.test(credentials.email);
          if (isEmail && !emailPattern.test(credentials.email)) {
            throw new Error("Invalid Email");
          } else if (!isEmail && !phonePattern.test(credentials.email)) {
            throw new Error("Phone number must consist of 10 digits");
          }

          const existingUser = await prisma.user.findFirst({
            where: {
              OR: [{ email: credentials.email }, { number: credentials.email }],
            },
          });

          if (!existingUser) {
            throw new Error("No user found with the provided credentials");
          }

          const passwordValid = await bcrypt.compare(
            credentials.password,
            existingUser.password as string
          );
          if (!passwordValid) {
            throw new Error("Invalid password");
          }

          return {
            id: existingUser.id.toString(),
            email: existingUser.email,
            phone: existingUser.number,
          };
        }

        if (action === "signUp") {
          if (
            !credentials?.name ||
            !credentials?.email ||
            !credentials?.phone ||
            !credentials?.password ||
            !credentials.confirmPassword
          ) {
            throw new Error("All fields are required for sign-up");
          }

          if (!emailPattern.test(credentials.email)) {
            throw new Error("Invalid email");
          }

          if (!phonePattern.test(credentials.phone)) {
            throw new Error("Phone number must consist of 10 digits");
          }

          if (credentials.password !== credentials.confirmPassword) {
            throw new Error("Passwords do not match");
          }

          const existingUser = await prisma.user.findFirst({
            where: {
              OR: [{ email: credentials.email }, { number: credentials.phone }],
            },
          });

          if (existingUser) {
            if (existingUser.email === credentials.email) {
              throw new Error("Email already exists");
            }
            if (existingUser.number === credentials.phone) {
              throw new Error("Phone number already exists");
            }
          }

          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const user = await prisma.$transaction(async () => {
            const newUser = await prisma.user.create({
              data: {
                name: credentials.name,
                email: credentials.email,
                number: credentials.phone,
                password: hashedPassword,
              },
            });
            await prisma.balance.create({
              data: {
                userId: newUser.id,
                amount: 500000,
                locked: 0,
              },
            });
            return {
              id: newUser.id.toString(),
              email: newUser.email,
              phone: newUser.number,
            };
          });

          return user;
        }

        throw new Error("Invalid action");
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
  callbacks: {
    async session({ token, session, user }: any) {
      if (token?.sub) {
        session.user.id = token.sub;
      } else if (user?.id) {
        session.user.id = user.id;
      }
      console.log(session);
      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return baseUrl + "/dashboard";
    },

    async signIn({ user, account }: { user: userType; account: any }) {
      // Database check or insert goes here
      console.log("reached to signin callback");
      if (account.provider == "google" || account.provider == "github") {
        console.log("reached to by google");
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              name: user.name,
              email: user.email,
            },
          });
          await prisma.balance.create({
            data: {
              userId: newUser.id,
              amount: 500000,
              locked: 0,
            },
          });
          console.log(user);
          return {
            id: 32,
            email: newUser.email,
          };
        }
      }

      return true;
    },
  },
};
