import { Trip } from "@/types/types";
import { Trips } from "./trips";
import { Suspense } from "react";
import RentedOutFallback from "../fallbacks/rented-out-fallback";


export default function RentedOut({ tripsPromise }:
  {
    tripsPromise: Promise<{ trips: Trip[], hasMore: boolean, totalPages: number }>
  }) {

  return (
    <>
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl">Guests with rented equipment</h1>
      </div>
      <Suspense fallback={<RentedOutFallback />}>      
        <Trips tripsPromise={tripsPromise} />
      </Suspense>
    </>
  );
}
