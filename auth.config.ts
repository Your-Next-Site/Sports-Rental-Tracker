import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import GitLab from "next-auth/providers/gitlab";
import Discord from "next-auth/providers/discord";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Google, GitHub, GitLab, Discord],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.employee = user.employee
        token.admin = user.admin
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.employee = token.employee as boolean
        session.user.admin = token.admin as boolean
      }
      return session
    },
  }
} satisfies NextAuthConfig



