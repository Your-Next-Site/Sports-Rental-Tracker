// types/next-auth.d.ts
import { DefaultSession, DefaultUser, Session } from "@auth/core/types";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";

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
  item_type_id: number;       // Reference to the type of raft (e.g., single-kayak, double-kayak
  checked_out_by: number;     // Reference to the user who checked out the trip (staff member)
  departure_time: Date;    // ISO string (e.g., "2025-05-07T09:00:00Z")
  arrival_time?: Date | null;
  checked_in_by: number | null;
}

export interface InputsProps {
  isPending: boolean;
  itemTypesPromise: Promise<ItemTypes[]>
}

export interface PaginationProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  data: { trips: Trip[]; hasMore: boolean; totalPages: number; };
  isPlaceholderData: boolean;
}
export interface PaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

export interface AuthButtonItemProps {
  icon: IconDefinition;
  label: string;
  onClick: () => void;
}

export interface AuthButtonProps {
  session: Session | null;
}


export interface ItemTypes {
  id: number;
  value: string;
  label: string;
}

export interface Items {
  unitnumber: number;
  type: string;
  rented: boolean;
  status: boolean;
}