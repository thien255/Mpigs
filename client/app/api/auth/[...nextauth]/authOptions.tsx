import { AuthOptions, CookiesOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

async function refreshAccessToken(tokenObject: any) {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accessToken: tokenObject.accessToken,
        refreshToken: tokenObject.refreshToken,
      }),
    };

    const res = await fetch(
      process.env.AUTH_API + "/Auth/RefreshToken",
      options
    );

    if (res.status != 200) {
      throw new Error("Invalid credentials");
    }
    const tokenResponse = await res.json();

    return {
      ...tokenObject,
      accessToken: tokenResponse.accessToken,
      accessTokenExpiry: tokenResponse.accessTokenExpiry,
      refreshToken: tokenResponse.refreshToken,
    };
  } catch (error) {
    return {
      ...tokenObject,
      error: error,
    };
  }
}

const cookies: Partial<CookiesOptions> = {
  sessionToken: {
    name: `next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: "none",
      path: "/",
      domain: process.env.NEXT_PUBLIC_DOMAIN,
      secure: true,
    },
  },
  callbackUrl: {
    name: `next-auth.callback-url`,
    options: {},
  },
  csrfToken: {
    name: "next-auth.csrf-token",
    options: {},
  },
};

const jwt = async ({ token, user }: { token: JWT; user?: User }) => {
  // first call of jwt function just user object is provided
  if (user?.email) {
    return { ...token, ...user };
  }
  // on subsequent calls, token is provided and we need to check if it's expired
  if (token?.accessTokenExpires) {
    if (Date.now() / 1000 < token?.accessTokenExpires)
      return { ...token, ...user };
  } else if (token?.refreshToken) return refreshAccessToken(token);

  return { ...token, ...user };
};

const signIn = async ({ user }: { user?: User }) => {
  if (!user?.name) {
    return false;
  }
  return true;
};
const session = ({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}): Promise<Session> => {
  if (!token?.accessTokenExpires || !token) {
    return Promise.reject({
      error: new Error("Please log in again"),
    });
  }
  if (
    Date.now() / 1000 > token?.accessTokenExpires &&
    token?.refreshTokenExpires &&
    Date.now() / 1000 > token?.refreshTokenExpires
  ) {
    return Promise.reject({
      error: new Error(
        "Refresh token has expired. Please log in again to get a new refresh token."
      ),
    });
  }
  session.token = token?.accessToken as string;
  return Promise.resolve(session);
};

const redirect = ({ url, baseUrl }: { url: String; baseUrl: string }) => {
  return baseUrl;
};
const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials?.email,
            password: credentials?.password,
          }),
        };

        const res = await fetch(process.env.AUTH_API + "/Auth/Sign", options);
        const user = await res.json();
        console.log(user);
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  secret: process?.env?.NEXTAUTH_SECRET,

  callbacks: {
    jwt,
    session,
    redirect,
    signIn,
  },
  session: {
    strategy: "jwt",
  },
  cookies: cookies,
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  events: {},
};
export default authOptions;
