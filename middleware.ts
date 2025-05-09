// import NextAuth from "next-auth"
// import authConfig from "./auth.config"
 
// export const { auth: middleware } = NextAuth(authConfig)

import { auth } from "@/auth"

export default auth((req) => {
  // Check for authenticated user
  if (!req.auth) {
    // Not authenticated, redirect to login
    // return Response.redirect(new URL("/", req.nextUrl.origin))
  }
  // Check if employee-only route and user is not employee
  if (
    req.nextUrl.pathname.startsWith("/on-the-water") &&
    !req.auth.user?.employee
  ) {
    // Redirect to home if not employee
    return Response.redirect(new URL("/", req.nextUrl.origin))
  }
})