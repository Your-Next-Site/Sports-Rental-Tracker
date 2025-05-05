// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "@auth/core/types";

//Extend the type for employee field as verification
declare module "@auth/core/types" {
  interface User extends DefaultUser {
    employee: boolean;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}
