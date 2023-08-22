import NextAuth from "next-auth";
import Jwt from "next-auth/jwt";
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    name: string;
    email: string;
    role: string;
    accessToken: string;
    refreshToken: string;
    expiration: Date;
    avatar: Date;
  }
  interface Session {
    refreshTokenExpires?: number;
    accessTokenExpires?: number;
    refreshToken?: string;
    token?: string;
    error?: string;
    user?: User;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    refreshTokenExpires?: number;
    accessTokenExpires?: number;
    refreshToken?: string;
    token: string;
    exp?: number;
    iat?: number;
    jti?: string;
  }
}
