import { Trip } from "@/types/types";
import { Trips } from "./trips";

export default function RentedOut({ tripsPromise }:
  {
    tripsPromise: Promise<{ trips: Trip[], hasMore: boolean, totalPages: number }>
  }) {

  return (
    <>
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl">Guests with rented equipment</h1>
      </div>
      <Trips tripsPromise={tripsPromise} />
    </>
  );
}
