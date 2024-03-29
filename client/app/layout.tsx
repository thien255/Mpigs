import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import React from "react";
import { getServerSession } from "next-auth/next";
import AuthentionContext from "./authention";
import authOptions from "@/api/auth/[...nextauth]/authOptions";
import { Toaster } from "@/components/ui/toaster";
const roboto = Roboto({
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "My App",
  description: "Description",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <AuthentionContext session={session}>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={roboto.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </AuthentionContext>
  );
}
