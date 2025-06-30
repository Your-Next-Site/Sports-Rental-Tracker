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
  raft_type_name: number;       // Reference to the type of raft (e.g., single-kayak, double-kayak
  checked_out_by: number;     // Reference to the user who checked out the trip (staff member)
  departure_time: Date;    // ISO string (e.g., "2025-05-07T09:00:00Z")
  arrival_time?: Date | null;
  checked_in_by: number | null;
}

// export interface Booking {
//   booking_id: number;
//   code: string;
//   start_date: string;
//   time: string;
// }

// export interface InvoiceData {
//   booking: {
//     invoice: {
//       html: string;
//     };
//   };
// }

// export interface BookingData {
//   customer_name: string;
//   booking_id: number;
//   summary: string;
// }

// export interface GuestData {
//   name: string;
//   bookingId: number;
//   summary: string;
// }
// export interface GuestOption {
//   value: number;
//   label: string;
//   summary: string;
// }

// export interface RaftOption {
//   value: string;
//   label: string;
// }
export interface InputsProps {
  isPending: boolean;
}
// export interface BookingDetails {
//   booking_id: number;
//   code: string;
//   status_id: string;
//   status_name: string;
//   created_date: number;
//   total: string;
//   tax_total: string;
//   paid_total: string;
//   customer_id: number;
//   customer_name: string;
//   customer_email: string;
//   summary: string;
//   date_desc: string;
//   tid: string;
//   token: string;
// }

// export interface BookingWithTime extends Booking {
//   time: string;
//   customer_name?: string;
//   summary?: string;
// }


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
  name: string;
}

export interface Items {
  unitnumber: number;
  type: string;
  rented: boolean;
  status: boolean;
}