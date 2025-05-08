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


export interface Trip {
  id: number;
  guest_name: string,
  raft_type_name: number;       // Reference to the type of raft (e.g., single-kayak, double-kayak
  checked_out_by: number;     // Reference to the user who checked out the trip (staff member)
  departure_time: Date;    // ISO string (e.g., "2025-05-07T09:00:00Z")
  arrival_time?: Date | null;      
}

