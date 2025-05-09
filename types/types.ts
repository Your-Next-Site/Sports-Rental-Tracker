// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "@auth/core/types";

// Extend the type for employee field as verification
declare module "@auth/core/types" {
  interface User extends DefaultUser {
    employee: boolean;
    admin: boolean;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}

export interface Trip {
  id: number;
  guest_name: string,
  unit_number: number;
  raft_type_name: number;       // Reference to the type of raft (e.g., single-kayak, double-kayak
  checked_out_by: number;     // Reference to the user who checked out the trip (staff member)
  departure_time: Date;    // ISO string (e.g., "2025-05-07T09:00:00Z")
  arrival_time?: Date | null;
  checked_in_by: number | null;
}

// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   emailVerified: Date | null;
//   image: string;
//   employee: boolean;
//   admin: boolean;
// }