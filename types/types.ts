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
  raftTypeId: number;       // Reference to the type of raft (e.g., single-kayak, double-kayak)
  unitNumber: number;       // The specific raft unit number being used
  checkedOutBy: number;     // Reference to the user who checked out the trip (staff member)
  departureTime: string;    // ISO string (e.g., "2025-05-07T09:00:00Z")
  arrivalTime?: string | null;
  isActive: boolean;       // Whether the trip is still active 
}

