import { withAuth } from "next-auth/middleware";
export default withAuth(function middleware(req) {
  console.log("middleware");
  console.log(req.nextauth.token);
}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (!req.nextUrl.pathname.startsWith("/sign") && token === null) {
        return false;
      }
      return true;
    },
  },
});
