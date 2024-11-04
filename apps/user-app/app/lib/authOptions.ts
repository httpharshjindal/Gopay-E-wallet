import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@repo/db/prisma"
import bcrypt from "bcrypt"


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
                name: { label: "Name", type: "text", placeholder: "name" }, // Only required for sign-up
                email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
                phone: { label: "Phone", type: "text", placeholder: "your phone number" },
                password: { label: "Password", type: "password",placeholder:"password"},
                confirmPassword:{label: "confirmPassword", type:"password", placeholder:"password"}
            },
            async authorize(credentials, req) {
                const action = req.body?.action;  // Custom action type to distinguish sign-in/sign-up
                // If action is sign-in, only require email/phone and password
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  // Email validation regex
                const phonePattern = /^\d{10}$/;

                if (action === 'signIn') {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Email/Phone and password are required for sign-in");
                    }


                    if(/[a-zA-Z]/.test(credentials.email)){
                        if(!emailPattern.test(credentials.email)){
                            throw new Error("Invalid Email")
                        }
                    }else{
                        if(!phonePattern.test(credentials.email)){
                            throw new Error("Phone number must consist 10 Digits")
                        }
                    }

                    // Lookup user in the database by email/phone
                    const existingUser = await prisma.user.findFirst({
                        where: {
                            OR: [{ email: credentials?.email }, { number: credentials?.email }],
                        },
                    });
                    if (!existingUser) {
                        throw new Error("No user found with the provided credentials");
                    }
                    
                    console.log(credentials.email)
                    // Validate password
                    const passwordValid = await bcrypt.compare(credentials.password, existingUser.password);
                    if (!passwordValid) {
                        throw new Error("Invalid password");
                    }
                    return { id: existingUser.id, email: existingUser.email, phone: existingUser.number };
                }

                // If action is sign-up, require name, email, phone, and password
                if (action === 'signUp') {
                    if (!credentials?.name || !credentials?.email || !credentials?.phone || !credentials?.password || !credentials.confirmPassword) {
                        throw new Error("All fields are required for sign-up");
                    }
                    if (!emailPattern.test(credentials.email)) {
                        throw new Error("Invalid email");
                      }

                    if(!phonePattern.test(credentials.phone)){
                        throw new Error("Phone number must consist 10 Digits")
                    }

                    if(credentials.password !== credentials.confirmPassword){
                        throw new Error("Password do not match")
                    }
                    const existingUser: any = await prisma.user.findFirst({
                        where: {
                            OR: [
                                { email: credentials?.email },
                                { number: credentials?.phone },
                            ],
                        },
                    });
                    
                    if (existingUser) {
                        // Check if the found user has the same email or phone number
                        if (existingUser.email === credentials?.email) {
                            throw new Error("Email already exists");
                        }
                        if (existingUser.number === credentials?.phone) {
                            throw new Error("Phone number already exists");
                        }
                    }
                    
                    const hashedPassword = await bcrypt.hash(credentials?.password, 10);
                    const user = await prisma.$transaction(async (tx)=>{
                        const newUser = await tx.user.create({
                            data: {
                                name: credentials?.name,
                                email: credentials?.email,
                                number: credentials?.phone,
                                password: hashedPassword,
                            },
                        });
                        const balance = tx.balance.create({
                            data:{
                              userId:newUser.id,
                              amount:500000,
                              locked:0  
                            }
                        })
                        return { id: newUser.id, email: newUser.email, phone: newUser.number,balance:(await balance).amount };
                    })
                    return user
                }
                throw new Error("Invalid action");
            },
        })
    ],
    pages: {
        signIn: "/auth/signin",
        signUp: "/auth/signup",
    },
    secret: process.env.NEXTAUTH_SECRET || "secret",
    callbacks: {
        async session({ token, session }: any) {
            session.user.id = token.sub
            return session
        },
        async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
            // Redirect to /dashboard after a successful login
            return baseUrl + '/dashboard';
        }
    },
}