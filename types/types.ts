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
  raftId: number;
  checkedOutBy: number;   // Reference to the user who checked out the trip (staff member)
  departureTime: string;  // ISO string (e.g., "2025-05-07T09:00:00Z")
  arrivalTime?: string | null;
  isActive: boolean;
  createdAt: string;      // ISO string
}

