// src/middleware.ts
import { withAuth } from "next-auth/middleware";


export default withAuth(function middleware(req) {
  // auth is enforced by withAuth; no custom middleware logic here.
});

export const config = {
  matcher: ["/events/:path*"]
};