// src/middleware.ts
export { default } from "next-auth/middleware"

// Require authentication for all routes inside /events
export const config = {
  matcher: ["/events/:path*"]
}