import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "../providers";
import { AppbarClient } from "../components/AppbarClient";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/authOptions";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Go-Pay E-Wallet",
  description: "",
};

export default async function  RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          {user && <AppbarClient />}
          <div className="h-100">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
