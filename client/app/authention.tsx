"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

function AuthentionContext({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
export default AuthentionContext;
