import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github';
import GitLab from 'next-auth/providers/gitlab'
import Discord from 'next-auth/providers/discord';
import Twitter from 'next-auth/providers/twitter';
import NeonAdapter from "@auth/neon-adapter"
import { Pool } from "@neondatabase/serverless"
import authConfig from './auth.config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: NeonAdapter(pool),
    session: { strategy: "jwt" },
    ...authConfig
})


//IN CASE BY PASS AUTH
// import NextAuth from "next-auth";
// import NeonAdapter from "@auth/neon-adapter";
// import { Pool } from "@neondatabase/serverless";
// import authConfig from "./auth.config";

// const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// // Extend existing authConfig with mock user logic
// const extendedAuthConfig = {
//   ...authConfig,
//   callbacks: {
//     ...authConfig.callbacks, // Preserve existing callbacks
//     async session({ session }) {
//       if (true || process.env.NODE_ENV === "development") {
//         return {
//           user: {
//             name: "Dev User",
//             email: "dev@example.com",
//             role: "admin",
//             employee: true,
//           },
//         };
//       }
//       return session;
//     },
//     async jwt({ token }) {
//       if (process.env.NODE_ENV === "development") {
//         return {
//           name: "Dev User",
//           email: "dev@example.com",
//           role: "admin",
//           employee: true,
//         };
//       }
//       return token;
//     },
//   },
// };

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   adapter: NeonAdapter(pool),
//   session: { strategy: "jwt" },
//   ...extendedAuthConfig,
// });
